import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";


export default function CardTableUsers({ color }) {
  const history = useHistory(); // Initialize useHistory
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];


  const handleSuspendUser = (index) => {
    // Get the existing bookings from local storage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Update the status of the booking at the specified index to "Canceled"
    if (existingUsers[index]) {
      existingUsers[index].status = "Suspended";

      // Update localStorage with the updated bookings
      localStorage.setItem("users", JSON.stringify(existingUsers));
    }

    // Refresh the page or update the state to re-render the table
    history.push("/supperadmin/users"); // Replace '/dashboard' with the desired URL
  };

  const handleActivate = (index) => {
    // Get the existing bookings from local storage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Update the status of the booking at the specified index to "Canceled"
    if (existingUsers[index]) {
      existingUsers[index].status = "Active";

      // Update localStorage with the updated bookings
      localStorage.setItem("users", JSON.stringify(existingUsers));
    }

    // Refresh the page or update the state to re-render the table
    history.push("/supperadmin/users"); // Replace '/dashboard' with the desired URL
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
                Manage Users
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
                  Username                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  EMAIL
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
              {existingUsers.map((user, index) => (
                <tr key={index}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.username}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.email}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.date}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.passengers}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    {user.status === "Suspended" ? (
                      <button
                        className="bg-black text-white active:bg-gray-700 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => handleActivate(index)}
                      >
                        Activate
                      </button>
                    ) : (
                      <button
                        className="bg-black text-white active:bg-gray-700 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => handleSuspendUser(index)}
                      >
                        Suspend
                      </button>)}


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

CardTableUsers.defaultProps = {
  color: "light",
};

CardTableUsers.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
