const enquiryModel = require("../../models/enquiryModels");

let enquiryInsert = (req, res) => {
  let { name, email, phone, message } = req.body;

  let enquiry = new enquiryModel({
    name,
    email,
    phone,
    message,
  });
  enquiry
    .save()
    .then(() => {
      res.send({ status: 1, message: "Enquiry Insert Successfully" });
    })
    .catch((err) => {
      res.send({ status: 0, message: "Error", error: err });
    });
};

let enquiryList = async (req, res) => {
  let enquiryList = await enquiryModel.find();

  res
    .status(200)
    .json({ status: 1, message: "Enquiry List", enquiryList: enquiryList });
};

let enquiryDelete = async (req, res) => {
  let enId = req.params.id;
  let enquiry = await enquiryModel.deleteOne({ _id: enId });
  res.send({
    status: 1,
    message: "Enquiry Deleted Successfully",
    enquiry,
  });
};

let enquirysingleRow = async (req, res) => {
  let enId = req.params.id;
  let enquiry = await enquiryModel.findOne({ _id: enId });
  res.send({
    status: 1,
    message: "Enquiry Edited Successfully",
    enquiry,
  });
};

let enquiryUpdate = async (req, res) => {
  let enquiryId = req.params.id;
  let { name, phone, email, message } = req.body;
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

  res.send({
    status: 1,
    message: "Enquiry Updated Successfully",
    updateRes,
  });
};

module.exports = {
  enquiryInsert,
  enquiryList,
  enquiryDelete,
  enquirysingleRow,
  enquiryUpdate,
};
