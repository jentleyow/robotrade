import React from "react";
import { NavLink } from "react-router-dom";
import { Collapsible, CollapsibleItem } from "react-materialize";
import styles from "./AllUsersTable.module.css";
const AllUsersTable = ({ users }) => {
  return users.map(user => {
    let header = user.fullName;
    let amount = 0;
    let link = "/admin/user/" + user.id;
    if (user.gender) {
      header += " (Male)";
    } else {
      header += " (Female)";
    }
    if (user.amount) {
      amount = user.amount;
    }
    return (
      <Collapsible style={{ fontSize: "18px" }} key={user.id}>
        <CollapsibleItem header={header}>
          <div className="row">
            <p>
              <strong>Nationality: </strong>
              {user.nationality}
            </p>
            <p>
              <strong>NRIC: </strong>
              {user.nric}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
            <p>
              <strong>Email: </strong>
              {user.email}
            </p>
            <p>
              <strong>Amount: </strong>${amount.toFixed(2)}
            </p>
            <NavLink
              to={link}
              className="waves-effect waves-light btn blue darken-3"
              style={{ marginTop: "10px" }}
            >
              View Profile
            </NavLink>
          </div>
        </CollapsibleItem>
      </Collapsible>
    );
  });
};
export default AllUsersTable;
