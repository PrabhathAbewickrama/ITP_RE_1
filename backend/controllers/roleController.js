// // controllers/roleController.js
// const asyncHandler = require("express-async-handler");
// const Role = require("../models/roleModel");

// // controllers/roleController.js
// const createRole = asyncHandler(async (req, res) => {
//   const { name, permissions } = req.body;

//   if (!name || !permissions) {
//     res.status(400);
//     throw new Error("Please provide role name and permissions");
//   }

//   // Check if role already exists
//   const roleExists = await Role.findOne({ name });
//   if (roleExists) {
//     res.status(400);
//     throw new Error("Role already exists");
//   }

//   // Create new role
//   const role = await Role.create({ name, permissions });

//   // Log the role to verify it is being created correctly
//   console.log(role);
//   res.status(201).json(role);
// });


// // Get All Roles
// const getRoles = asyncHandler(async (req, res) => {
//   const roles = await Role.find();
//   res.status(200).json(roles);
// });

// module.exports = { createRole, getRoles };
