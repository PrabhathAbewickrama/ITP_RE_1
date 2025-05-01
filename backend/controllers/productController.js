const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const mongoose = require("mongoose");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config(); // ✅ Ensure environment variables are loaded


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to use Cloudinary for file upload
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products", // ✅ Store images in "products" folder
    allowed_formats: ["jpg", "jpeg", "png"],
    resource_type: "image", // ✅ Only allow image uploads
  },
});


const upload = multer({ storage });




// Create Prouct
const createProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      sku,
      category,
      brand,
      quantity,
      price,
      description,
      regularPrice,
      color,
    } = req.body;

    // Validate required fields
    if (!name || !category || !brand || !quantity || !price || !description) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields" });
    }

    // Handle multiple images
    let uploadedImages = [];
    if (req.files && req.files.length > 0) {
      uploadedImages = req.files.map((file) => file.path); // ✅ Store Cloudinary URLs
    }

    // Create product
    const product = await Product.create({
      name,
      sku,
      category,
      brand,
      quantity,
      price,
      description,
      image: uploadedImages, // ✅ Store array of images
      regularPrice,
      color,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Product creation error:", error);
    res.status(500).json({ message: "Product creation failed" });
  }
});




// Get single product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});




// Get all Products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort("-createdAt");
  res.status(200).json(products);
});




// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  // If product doesn't exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Use findByIdAndDelete to delete the product
  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Product deleted." });
});


// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    sku,
    category,
    brand,
    quantity,
    price,
    description,
    regularPrice,
    color,
  } = req.body;

  // Ensure removedImages is always an array
  // Ensure removedImages is always an array
  let removedImages = [];
  try {
    if (req.body.removedImages) {
      removedImages = JSON.parse(req.body.removedImages);
    }
  } catch (error) {
    console.error("Failed to parse removedImages", error);
  }

  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Handle image upload if provided
  let updatedImages = product.image; // Retain old images

  if (req.files && req.files.length > 0) {
    // If new images are uploaded, append them to the old images
    updatedImages = [...updatedImages, ...req.files.map((file) => file.path)];
  }

  console.log("Final images array: ", updatedImages); // Log the final merged image array
  console.log("Old images: ", product.image); // Log old images

  console.log("New images: ", req.files); // Log newly uploaded images
  console.log("Removed images: ", removedImages); // Log the removed images

  // Remove the images that were marked for deletion
  if (removedImages && removedImages.length > 0) {
    // Filter out the removed images from the updatedImages array
    updatedImages = updatedImages.filter(
      (image) => !removedImages.includes(image)
    );

    // Delete images from Cloudinary if necessary
    removedImages.forEach((image) => {
      // Extract public ID from the URL (including the folder)
      const startIndex = image.indexOf("products/");
      if (startIndex === -1) {
        console.error("Could not find 'products/' in image URL:", image);
        return;
      }
      // Remove the file extension by finding the last dot after "products/"
      const endIndex = image.lastIndexOf(".");
      const publicId = image.substring(startIndex, endIndex);

      // Call Cloudinary's destroy function with the proper callback signature
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          console.error(`Error deleting image ${publicId}:`, error);
        } else {
          console.log("Cloudinary image removed:", result);
          if (result && result.result === "ok") {
            console.log(`Image ${publicId} deleted successfully.`);
          } else {
            console.error(`Failed to delete image ${publicId}.`);
          }
        }
      });
    });
  }

  // Update the product with the new data
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      sku,
      category,
      brand,
      quantity,
      price,
      description,
      image: updatedImages, // Updated images (with removed images filtered out)
      regularPrice,
      color,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});





const reviewProduct = asyncHandler(async (req, res) => {
  const { star, review } = req.body; // Review is optional
  const { id } = req.params;

  // Validation
  if (!star || star < 1 || star > 5) {
    res.status(400);
    throw new Error("Please provide a valid star rating (1-5)");
  }

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Check if user has already rated
  const userRatingExists = product.ratings.some(
    (rating) => rating.userID.toString() === req.user._id.toString()
  );
  if (userRatingExists) {
    res.status(400);
    throw new Error("You have already rated this product");
  }

  // Add the rating
  product.ratings.push({
    star,
    review: review || "", // Optional review text
    reviewDate: Date.now(),
    name: req.user.name,
    userID: req.user._id,
  });

  await product.save();
  res.status(200).json({ message: "Rating added successfully" });
});


// Delete Product
const deleteReview = asyncHandler(async (req, res) => {
  const { userID } = req.body;

  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const newRatings = product.ratings.filter((rating) => {
    return rating.userID.toString() !== userID.toString();
  });
  console.log(newRatings);
  product.ratings = newRatings;
  product.save();
  res.status(200).json({ message: "Product rating deleted!!!." });
});

// Edit Review
const updateReview = asyncHandler(async (req, res) => {
  const { star, review, reviewDate, userID } = req.body;
  const { id } = req.params;

  // validation
  if (star < 1 || !review) {
    res.status(400);
    throw new Error("Please add star and review");
  }

  const product = await Product.findById(id);

  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match user to review
  if (req.user._id.toString() !== userID) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // // Update Product review
  const updatedReview = await Product.findOneAndUpdate(
    { _id: product._id, "ratings.userID": mongoose.Types.ObjectId(userID) },
    {
      $set: {
        "ratings.$.star": Number(star),
        "ratings.$.review": review,
        "ratings.$.reviewDate": reviewDate,
      },
    }
  );

  if (updatedReview) {
    res.status(200).json({ message: "Product review updated." });
  } else {
    res.status(400).json({ message: "Product review NOT updated." });
  }
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteReview,
  updateReview,
  upload,
};
