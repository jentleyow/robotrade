import React from "react";

const UserEdit = props => {
  const { handleChange, genderChanged, gender, authError } = props;
  let error = "";
  if (authError !== null) {
    error = authError;
  }
  return (
    <div className="row">
      <div className="col s12">
        <h5 className="grey-text text-darken-3">Create a new account</h5>
        <p className="red-text" style={{ paddingBottom: "30px" }}>
          {error}
        </p>
      </div>
      <div className="input-field">
        <div className="col s12 l6">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            onChange={handleChange}
            placeholder="Enter your first name ..."
          />
        </div>
        <div className="col s12 l6">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            onChange={handleChange}
            placeholder="Enter your last name ..."
          />
        </div>
        <div className="col s12 l5">
          <label htmlFor="nric">Nric</label>
          <input
            type="text"
            id="nric"
            onChange={handleChange}
            placeholder="Enter your NRIC ..."
          />
        </div>
        <div className="col s12 l5">
          <label htmlFor="lastName">Nationality</label>
          <input
            type="text"
            id="nationality"
            onChange={handleChange}
            placeholder="Enter your nationality ..."
          />
        </div>
        <div className="col s12 l2">
          <label htmlFor="nric">Gender</label>
          <p style={{ marginTop: "25px" }}>
            <label>
              <input
                className="with-gap"
                type="radio"
                value="male"
                onChange={genderChanged}
                checked={gender}
              />
              <span>Male</span>
            </label>
            &nbsp;
            <label>
              <input
                className="with-gap"
                type="radio"
                value="female"
                onChange={genderChanged}
                checked={!gender}
              />
              <span>Female</span>
            </label>
          </p>
        </div>
        <div className="col s12">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            className="materialize-textarea"
            onChange={handleChange}
            placeholder="Enter your address ..."
          />
        </div>
        <div className="col s12 l4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            placeholder="Enter your email ..."
          />
        </div>
        <div className="col s12 l4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            placeholder="Enter your password ..."
          />
        </div>
        <div className="col s12 l4">
          <label htmlFor="retype">Re-type Password</label>
          <input
            type="password"
            id="retype"
            onChange={handleChange}
            placeholder="Re-type your password ..."
          />
        </div>
      </div>
    </div>
  );
};
export default UserEdit;
