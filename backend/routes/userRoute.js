const express = require("express");
const { registerUser, loginUser, logout, getUser, getLoginStatus, updateUser, updatePhoto, getUsers, deleteUser } = require("../controllers/userController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getUser", protect, getUser);
router.get("/getLoginStatus", getLoginStatus);
router.patch("/updateUser", protect, updateUser);
router.patch("/updatePhoto", protect, updatePhoto);

// Admin route to get all users
router.get("/getUsers", protect, adminOnly, getUsers);
router.delete("/:id", protect, adminOnly, deleteUser); // Added


module.exports = router;
