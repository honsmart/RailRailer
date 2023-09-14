import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar2 from "components/Navbars/AdminNavbar2.js";
import Sidebar2 from "components/Sidebar/Sidebar2.js";
import HeaderStats2 from "components/Headers/HeaderStats2.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Users from "views/admin/Users.js";
import AdminDash from "views/admin/Admin.js";


export default function SuperAdmin() {
  return (
    <>
      <Sidebar2 />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar2 />
        {/* Header */}
        <HeaderStats2 />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/supperadmin/admin" exact component={AdminDash} />
            <Route path="/supperadmin/users" exact component={Users} />
            <Redirect from="/supperadmin" to="/supperadmin/admin" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
