const enquiryModel = require("../../models/enquiryModels");

let enquiryInsert = (req, res) => {
  let { name, email, phone, message } = req.body;

  // Basic validation
  if (!name || !email || !phone || !message) {
    return res.status(400).json({
      status: 0,
      message: "All fields are required"
    });
  }

  let enquiry = new enquiryModel({
    name,
    email,
    phone,
    message,
  });
  enquiry
    .save()
    .then(() => {
      res.status(201).json({ status: 1, message: "Enquiry Insert Successfully" });
    })
    .catch((err) => {
      console.error("Error inserting enquiry:", err);
      res.status(500).json({ status: 0, message: "Error inserting enquiry", error: err.message });
    });
};

let enquiryList = async (req, res) => {
  try {
    let enquiryList = await enquiryModel.find().sort({ _id: -1 });
    res.status(200).json({ 
      status: 1, 
      message: "Enquiry List", 
      enquiryList: enquiryList 
    });
  } catch (err) {
    console.error("Error fetching enquiries:", err);
    res.status(500).json({ 
      status: 0, 
      message: "Error fetching enquiries", 
      error: err.message 
    });
  }
};

let enquiryDelete = async (req, res) => {
  try {
    let enId = req.params.id;
    let enquiry = await enquiryModel.deleteOne({ _id: enId });
    
    if (enquiry.deletedCount === 0) {
      return res.status(404).json({
        status: 0,
        message: "Enquiry not found"
      });
    }
    
    res.status(200).json({
      status: 1,
      message: "Enquiry Deleted Successfully",
      enquiry,
    });
  } catch (err) {
    console.error("Error deleting enquiry:", err);
    res.status(500).json({
      status: 0,
      message: "Error deleting enquiry",
      error: err.message
    });
  }
};

let enquirysingleRow = async (req, res) => {
  try {
    let enId = req.params.id;
    let enquiry = await enquiryModel.findOne({ _id: enId });
    
    if (!enquiry) {
      return res.status(404).json({
        status: 0,
        message: "Enquiry not found"
      });
    }
    
    res.status(200).json({
      status: 1,
      message: "Enquiry fetched successfully",
      enquiry,
    });
  } catch (err) {
    console.error("Error fetching enquiry:", err);
    res.status(500).json({
      status: 0,
      message: "Error fetching enquiry",
      error: err.message
    });
  }
};

let enquiryUpdate = async (req, res) => {
  try {
    let enquiryId = req.params.id;
    let { name, phone, email, message } = req.body;
    
    // Basic validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        status: 0,
        message: "All fields are required"
      });
    }
    
    let updateObject = {
      name,
      phone,
      email,
      message,
    };
    
    let updateRes = await enquiryModel.updateOne(
      { _id: enquiryId },
      updateObject
    );
    
    if (updateRes.matchedCount === 0) {
      return res.status(404).json({
        status: 0,
        message: "Enquiry not found"
      });
    }

    res.status(200).json({
      status: 1,
      message: "Enquiry Updated Successfully",
      updateRes,
    });
  } catch (err) {
    console.error("Error updating enquiry:", err);
    res.status(500).json({
      status: 0,
      message: "Error updating enquiry",
      error: err.message
    });
  }
};

module.exports = {
  enquiryInsert,
  enquiryList,
  enquiryDelete,
  enquirysingleRow,
  enquiryUpdate,
};
