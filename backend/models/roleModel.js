// // models/roleModel.js
// const mongoose = require("mongoose");

// const roleSchema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Please add a role name"],
//       unique: true,
//     },
//     permissions: [
//       {
//         type: String,
//         enum: ["create", "read", "update", "delete"],
//         required: true,
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

// const Role = mongoose.model("Role", roleSchema);
// module.exports = Role;
