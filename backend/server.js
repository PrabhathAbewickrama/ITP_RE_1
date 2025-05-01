const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorMiddleware");

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const brandRoute = require("./routes/brandRoute");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Initialize dotenv for environment variables
dotenv.config();

// Create an express app
const app = express();

// Set up CORS options
const corsOptions = {
  origin: "http://localhost:5173", // This should match the port your React app is running on
  credentials: true, // This ensures cookies are sent with the request
};
app.use(cors(corsOptions));


app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies sent with the requests

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Use routes for user operations
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute); // ✅ Make sure it's correctly used
app.use("/api/brand", brandRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Error Middleware for handling errors
app.use(errorHandler);

// Basic route to check if the server is working
app.get("/", (req, res) => {
  res.send("Hello from the Backend!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
