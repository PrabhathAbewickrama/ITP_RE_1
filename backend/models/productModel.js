const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Please add a brand"],
      trim: true,
    },
    color: {
      type: String,
      default: "As seen",
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
    },
    regularPrice: {
      type: Number,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
    },
    image: {
      type: [String], // ✅ Array to store multiple images
    },
    ratings: [
      {
        star: { type: Number, required: true, min: 1, max: 5 },
        review: { type: String, default: "" }, // Optional review text
        reviewDate: { type: Date, default: Date.now },
        name: { type: String },
        userID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product; // ✅ Fix export syntax
