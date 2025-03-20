const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");

// Get pets associated with a user
router.get("/user/:userId", async (req, res) => {
  try {
    const pets = await Pet.find({ userId: req.params.userId });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pets", error });
  }
});

module.exports = router;
