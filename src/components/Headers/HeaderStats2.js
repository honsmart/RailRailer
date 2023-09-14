import React, { useEffect, useState } from "react";
import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  // const [completedBookings, setCompletedBookings] = useState(0);
  const [suspendedBookings, setSuspendedBookings] = useState(0);
  const [canceledBookings, setCanceledBookings] = useState(0);

  // Calculate the total number of bookings, completed, suspended, and canceled bookings
  useEffect(() => {
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    setTotalBookings(existingBookings.length);

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    setTotalUsers(existingUsers.length);



    // Assuming "status" is a property in your booking objects
    // const completedBookingsCount = existingBookings.filter(
    //   (booking) => booking.status === "Completed"
    // ).length;
    // setCompletedBookings(completedBookingsCount);

    const suspendedBookingsCount = existingBookings.filter(
      (booking) => booking.status === "Suspended"
    ).length;
    setSuspendedBookings(suspendedBookingsCount);

    const canceledBookingsCount = existingBookings.filter(
      (booking) => booking.status === "Canceled"
    ).length;
    setCanceledBookings(canceledBookingsCount);
  }, []);

  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TOTAL BOOKINGS"
                  statTitle={totalBookings.toString()} // Convert to string
                  statArrow="up"
                  statPercent="0.00" // You can set this to any appropriate value
                  statPercentColor="text-emerald-500"
                  statDescripiron="Total bookings made"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TOTAL USERS"
                  statTitle={totalUsers.toString()} // Convert to string
                  statArrow="up"
                  statPercent="0.00" // You can set this to any appropriate value
                  statPercentColor="text-emerald-500"
                  statDescripiron="Total completed"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="SUSPENDED BOOKINGS"
                  statTitle={suspendedBookings.toString()} // Convert to string
                  statArrow="up"
                  statPercent="0.00" // You can set this to any appropriate value
                  statPercentColor="text-emerald-500"
                  statDescripiron="Total suspended"
                  statIconName="fas fa-chart-pie" // Change the icon as needed
                  statIconColor="bg-blue-500" // Change the color as needed
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="CANCLED BOOKINGS"
                  statTitle={canceledBookings.toString()} // Convert to string
                  statArrow="up"
                  statPercent="0.00" // You can set this to any appropriate value
                  statPercentColor="text-emerald-500"
                  statDescripiron="Total canceled"
                  statIconName="fas fa-chart-pie" // Change the icon as needed
                  statIconColor="bg-red-500" // Change the color as needed
                />
              </div>
              {/* Add more CardStats components for other statistics */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
