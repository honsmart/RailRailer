import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function SuperAdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();


  // Define a default user
  const defaultUser = {
    "status": "active",
    "username": "hikmah",
    email: "hikmah@gmail.com",
    password: "hikmah",
  };

  const handleLogin = () => {

    // Retrieve existing bookings from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Add the new booking to the existing bookings
    existingUsers.push(defaultUser);

    localStorage.setItem("users", JSON.stringify(existingUsers));

    if (!email || !password) {
      alert("Invalid email or password");
      return;
    }
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      // If no user data is stored, create a new user
      const newUser = {
        email,
        password,
      };
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(newUser));
      // Redirect to another page after successful registration
      history.push("/supperadmin"); // Replace '/dashboard' with the desired URL
    } else if (
      (storedUser.email === email && storedUser.password === password) ||
      (defaultUser.email === email && defaultUser.password === password)
    ) {
      // Successful login, redirect to another page
      history.push("/supperadmin"); // Replace '/dashboard' with the desired URL
    } else {
      // Display an error message or handle unsuccessful login
      alert("Invalid email or password"); // You can replace this with your error handling logic
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      id="grid-email"
                      required // Added required attribute
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      id="grid-password"
                      required // Added required attribute
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleLogin}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
