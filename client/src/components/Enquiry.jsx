import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import EnquiryList from "./EnquiryList";
import Swal from "sweetalert2/dist/sweetalert2.js";

function Enquiry() {
  const [enquiryList, setEnquiryList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "",
  });

  let saveEnquiry = (e) => {
    e.preventDefault();

    if (formData._id) {
      axios
        .put(
          `http://localhost:8000/api/website/enquiry/update/${formData._id}`,
          formData
        )
        .then((res) => {
          toast.success("Enquiry Updated Successfully");
          setFormData({ name: "", email: "", phone: "", message: "", _id: "" });
          getAllEnquiry();
        });
    } else {
      axios
        .post(`http://localhost:8000/api/website/enquiry/insert`, formData)
        .then((res) => {
          console.log(res.data);
          toast.success("Enquiry Saved Successfully");
          setFormData({ name: "", email: "", phone: "", message: "" });
          getAllEnquiry();
        });
    }
  };

  let getAllEnquiry = () => {
    axios
      .get(`http://localhost:8000/api/website/enquiry/view`)
      .then((res) => {
        return res.data;
      })
      .then((finalData) => {
        if (finalData.status) {
          setEnquiryList(finalData.enquiryList);
        }
      });
  };

  let getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let oldData = { ...formData };
    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  useEffect(() => {
    getAllEnquiry();
  }, []);

  return (
    <div>
      <ToastContainer />
      <h1 className="text-[40px] text-center py-6 font-bold">User Enquiry</h1>
      <div className="grid grid-cols-[30%_auto] gap-10">
        <div className="bg-gray-200 p-4">
          <h2 className="text-[20px] font-bold mb-4">Enquiry Form</h2>
          <form action="" onSubmit={saveEnquiry} className="max-w-sm mx-auto">
            <div className="py-3">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Your Name
              </label>
              <input
                onChange={getValue}
                value={formData.name}
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Your Name"
                required
              />
            </div>
            <div className="py-3">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Your Email
              </label>
              <input
                onChange={getValue}
                value={formData.email}
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="py-3">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Your Phone
              </label>
              <input
                onChange={getValue}
                value={formData.phone}
                type="text"
                name="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Your Phone"
                required
              />
            </div>
            <div className="py-3">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Your message
              </label>
              <textarea
                onChange={getValue}
                value={formData.message}
                name="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Your Message"
              ></textarea>
            </div>
            <div className="py-3">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-[100%] px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {formData._id ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
        <EnquiryList
          data={enquiryList}
          getAllEnquiry={getAllEnquiry}
          Swal={Swal}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}

export default Enquiry;
