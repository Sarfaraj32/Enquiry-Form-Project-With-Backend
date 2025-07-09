import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

function EnquiryList({ data, getAllEnquiry, Swal, setFormData }) {
  let deleteRow = (delid) => {
    Swal.fire({
      title: "Do you want to delete the data?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/website/enquiry/delete/${delid}`)
          .then((res) => {
            toast.success("Enquiry Deleted Successfully");
            getAllEnquiry();
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  let editRow = (editid) => {
    axios(`http://localhost:8000/api/website/enquiry/single/${editid}`).then(
      (res) => {
        let data = res.data.enquiry;
        setFormData(data);
      }
    );
  };

  return (
    <div className="bg-gray-200 p-4">
      <h2 className="text-[20px] font-bold mb-4">Enquiry List</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sr No.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className=" bg-gray-700 text-white">
            {data.length >= 1 ? (
              data.map((items, index) => (
                <tr key={items._id || index}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{items.name}</td>
                  <td className="px-6 py-4">{items.email}</td>
                  <td className="px-6 py-4">{items.phone}</td>
                  <td className="px-6 py-4">{items.message}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => editRow(items._id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteRow(items._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
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
