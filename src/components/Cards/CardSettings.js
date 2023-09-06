import React, { useState } from "react";
import PayButton
  from "views/admin/PayButton";
// Define an array of popular states in Nigeria
const popularStatesInNigeria = [
  "Lagos",
  "Abuja",
  "Kano",
  "Ibadan",
  "Port Harcourt",
  // Add more states as needed
];

export default function CardSettings() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("");



  const handleBooking = () => {
    const booking = {
      from,
      to,
      date,
      passengers,
      status: "Booked",
    };

    // Retrieve existing bookings from localStorage
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Add the new booking to the existing bookings
    existingBookings.push(booking);

    // Store updated bookings in localStorage
    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    // Clear form fields
    setFrom("");
    setTo("");
    setDate("");
    setPassengers("");
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Train Booking
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="from"
                  >
                    From
                  </label>
                  <select
                    id="from"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  >
                    <option value="">Select a location</option>
                    {popularStatesInNigeria.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="to"
                  >
                    To
                  </label>
                  <select
                    id="to"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  >
                    <option value="">Select a location</option>
                    {popularStatesInNigeria.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="date"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="passengers"
                  >
                    Passengers
                  </label>
                  <input
                    type="number"
                    id="passengers"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Number of passengers"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                type="button"
                onClick={handleBooking}
              >
                Book Train
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Render the PayButton component */}

    </>
  );
}
