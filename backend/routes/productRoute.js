const express = require("express");
const {
  createProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteReview,
  updateReview,
  upload,
} = require("../controllers/productController");
const router = express.Router();
const { protect, adminOnly } = require("../middlewares/authMiddleware");


router.post("/", protect, adminOnly, upload.array("image", 5), createProduct);
router.get("/:id", getProduct);
router.get("/", getProducts);
router.delete("/:id", protect, adminOnly, deleteProduct);
router.patch(
  "/:id",
  protect,
  adminOnly,
  upload.array("image", 5),
  updateProduct
);
router.patch("/review/:id", protect, reviewProduct);
router.patch("/deleteReview/:id", protect, deleteReview);
router.patch("/updateReview/:id", protect, updateReview);


module.exports = router;
