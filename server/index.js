const express = require("express");
const mongoose = require("mongoose");
let cors = require("cors");
const enquiryRouter = require("./App/routes/web/enquiryRoutes");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Server is running successfully!" });
});

// Routes
app.use("/api/website/enquiry", enquiryRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 0, 
    message: "Something went wrong!", 
    error: err.message 
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ 
    status: 0, 
    message: "Route not found" 
  });
});

// Connect To MongoDB
mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("Connected To MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}/`);
    });
  })
