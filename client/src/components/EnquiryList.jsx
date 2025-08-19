import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

function EnquiryList({ data, getAllEnquiry, Swal, setFormData }) {
  let deleteRow = (delid) => {
    Swal.fire({
      title: "Do you want to delete the data?",
      text: "This action cannot be undone!",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#d33",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/website/enquiry/delete/${delid}`)
          .then((res) => {
            if (res.data.status) {
              toast.success("Enquiry Deleted Successfully");
              getAllEnquiry();
            } else {
              toast.error("Failed to delete enquiry");
            }
          })
          .catch((err) => {
            console.error("Delete error:", err);
            toast.error("Error deleting enquiry");
          });
      } else if (result.isDenied) {
        // User clicked "Don't save" - do nothing
      }
    });
  };

  let editRow = (editid) => {
    axios(`http://localhost:8000/api/website/enquiry/single/${editid}`)
      .then((res) => {
        if (res.data.status) {
          let data = res.data.enquiry;
          setFormData(data);
          toast.info("Enquiry loaded for editing");
        } else {
          toast.error("Failed to load enquiry");
        }
      })
      .catch((err) => {
        console.error("Edit error:", err);
        toast.error("Error loading enquiry");
      });
  };

  return (
    <div className="bg-gray-200 p-2 sm:p-4">
      <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4 text-center w-full">
        Enquiry List
      </h2>
      {/* Card view for mobile */}
      <div className="sm:hidden space-y-4">
        {data.length >= 1 ? (
          data.map((items, index) => (
            <div
              key={items._id || index}
              className="bg-gray-700 text-white rounded-lg shadow p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between text-xs text-gray-300 mb-1">
                <span>#{index + 1}</span>
                <span>{items.email}</span>
              </div>
              <div className="font-bold text-base">{items.name}</div>
              <div className="text-sm">Phone: {items.phone}</div>
              <div className="text-sm">Message: {items.message}</div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => editRow(items._id)}
                  className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteRow(items._id)}
                  className="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 bg-gray-700 text-white rounded">
            No Data Found
          </div>
        )}
      </div>
      {/* Table view for tablet/desktop */}
      <div className="w-full overflow-x-auto hidden sm:block">
        <table className="min-w-[600px] w-full text-xs sm:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs sm:text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-2 sm:px-6 py-2 sm:py-3">Sr No.</th>
              <th className="px-2 sm:px-6 py-2 sm:py-3">Name</th>
              <th className="px-2 sm:px-6 py-2 sm:py-3">Email</th>
              <th className="px-2 sm:px-6 py-2 sm:py-3">Phone</th>
              <th className="px-2 sm:px-6 py-2 sm:py-3">Message</th>
              <th className="px-2 sm:px-6 py-2 sm:py-3">Edit</th>
              <th className="px-2 sm:px-6 py-2 sm:py-3">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-gray-700 text-white">
            {data.length >= 1 ? (
              data.map((items, index) => (
                <tr
                  key={items._id || index}
                  className="border-b border-gray-600 last:border-0"
                >
                  <td className="px-2 sm:px-6 py-2 sm:py-4">{index + 1}</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4">{items.name}</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4">{items.email}</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4">{items.phone}</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4">{items.message}</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4">
                    <button
                      onClick={() => editRow(items._id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs sm:text-sm"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4">
                    <button
                      onClick={() => deleteRow(items._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EnquiryList;
