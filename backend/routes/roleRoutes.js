// // routes/roleRoutes.js
// const express = require("express");
// const { createRole, getRoles } = require("../controllers/roleController");
// const { protect, adminOnly } = require("../middlewares/authMiddleware");
// const router = express.Router();

// // Protect route with adminOnly middleware
// router.post("/create", protect, adminOnly, createRole);
// router.get("/all", protect, adminOnly, getRoles);

// module.exports = router;
