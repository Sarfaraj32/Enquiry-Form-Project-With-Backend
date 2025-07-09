const express = require("express");
const mongoose = require("mongoose");
let cors = require("cors");
const enquiryRouter = require("./App/routes/web/enquiryRoutes");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/website/enquiry", enquiryRouter);

// Connect To MongoDB
mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("Connected To MongoDB");
    app.listen(process.env.PORT || 3000, () => {
      console.log("App is Connected on http://localhost:6000/");
    });
  })
  .catch((err) => console.log(err));
