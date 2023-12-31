import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";



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
  const history = useHistory(); // Initialize useHistory

  const getNextTicketId = () => {
    // Retrieve existing bookings from localStorage
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Find the highest ticket ID in existing bookings
    const maxTicketId = existingBookings.reduce((maxId, booking) => {
      const ticketId = parseInt(booking.ticketId, 10);
      return ticketId > maxId ? ticketId : maxId;
    }, 0);

    // Increment the highest ticket ID by 1 to get the next ticket ID
    return (maxTicketId + 1).toString();
  };

  const handleBooking = () => {
    const ticketId = getNextTicketId();

    const booking = {
      ticketId, // Assign the next ticket ID
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
    history.push("/admin/dashboard"); // Replace '/dashboard' with the desired URL
  };



  const config = {
    public_key: "FLWPUBK_TEST-6f5c9ef754ca381a9506b957146de933-X",
    tx_ref: Date.now(),
    amount: passengers * 1000,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "test@gmail.com",
      name: "",
    },
    customizations: {
      title: "RAILRIDER",
      description: "Pay for your rail ride",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);
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
                onClick={() =>
                  handleFlutterPayment({
                    callback: (response) => {
                      console.log(response);
                      handleBooking();
                      closePaymentModal();
                    },
                    onClose: () => { },
                  })
                }              >
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
