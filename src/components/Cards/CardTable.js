import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

export default function CardTable({ color }) {
  const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const history = useHistory(); // Initialize useHistory

  const handleCancelBooking = (index) => {
    // Get the existing bookings from local storage
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Update the status of the booking at the specified index to "Canceled"
    if (existingBookings[index]) {
      existingBookings[index].status = "Canceled";

      // Update localStorage with the updated bookings
      localStorage.setItem("bookings", JSON.stringify(existingBookings));
    }

    // Refresh the page or update the state to re-render the table
    history.push("/admin/dashboard"); // Replace '/dashboard' with the desired URL
  };

  const handleRebook = (index) => {
    // Get the existing bookings from local storage
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Update the status of the booking at the specified index to "Canceled"
    if (existingBookings[index]) {
      existingBookings[index].status = "Booked";

      // Update localStorage with the updated bookings
      localStorage.setItem("bookings", JSON.stringify(existingBookings));
    }

    // Refresh the page or update the state to re-render the table
    history.push("/admin/dashboard"); // Replace '/dashboard' with the desired URL
  };


  const handlePrintReceipt = (booking) => {
    const receiptStyles = `
      <style>
        /* Add CSS styles for the receipt here */
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: ${color === "light" ? "#f2f2f2" : "#333"};
          color: ${color === "light" ? "#333" : "#fff"};
        }
      </style>
    `;

    const receiptContent = `
      <div>
        <h2>Receipt</h2>
        <table>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>Ticket ID</td>
            <td>${booking.ticketId}</td>
          </tr>
          <tr>
            <td>Date</td>
            <td>${booking.date}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>${booking.status}</td>
          </tr>
          <!-- Add more details here as needed -->
        </table>
      </div>
    `;

    const popupWin = window.open("", "_blank", "width=600,height=600");
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          ${receiptStyles}
        </head>
        <body onload="window.print();">${receiptContent}</body>
      </html>
    `);
    popupWin.document.close();
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Bookings
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  From
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  To
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Date
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Passengers
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {existingBookings.map((booking, index) => (
                <tr key={index}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {booking.from}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {booking.to}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {booking.date}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {booking.passengers}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {booking.status}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    {booking.status === "Canceled" ? (
                      <button
                        className="bg-black text-white active:bg-gray-700 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => handleRebook(index)}
                      >
                        Rebook
                      </button>
                    ) : (
                      <div></div>
                    )}
                    {booking.status === "Booked" ? (
                      <div>
                        <button
                          className="bg-black text-white active:bg-gray-700 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => handleCancelBooking(index)}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-black text-white active:bg-gray-700 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => handlePrintReceipt(booking)}
                        >
                          Print Receipt
                        </button>
                      </div>
                    ) : (
                      <div></div>

                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
