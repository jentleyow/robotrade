import React from "react";
import Navbar from "./nav/Navbar";
import Login from "./dashboard/Login";
import Dashboard from "./dashboard/Dashboard";
import User from "./dashboard/User";

const AdminContainer = props => {
  let display = "";
  const { type } = props;
  if (type === "login") {
    display = <Login />;
  } else if (type === "dashboard") {
    display = <Dashboard />;
  } else if (type === "user") {
    display = <User id={props.match.params.id} />;
  }

  return (
    <React.Fragment>
      {type === "login" ? null : <Navbar />}
      <div className="container">{display}</div>
    </React.Fragment>
  );
};
export default AdminContainer;
