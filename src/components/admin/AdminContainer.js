import React from "react";
import Navbar from "./nav/Navbar";
import Login from "./dashboard/Login";
import Dashboard from "./dashboard/Dashboard";
const AdminContainer = ({ type }) => {
  let display = "";
  if (type === "login") {
    display = <Login />;
  } else if (type === "dashboard") {
    display = <Dashboard />;
  }

  return (
    <React.Fragment>
      {type === "login" ? null : <Navbar />}
      <div className="container">{display}</div>
    </React.Fragment>
  );
};
export default AdminContainer;
