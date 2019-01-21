import React from "react";
import { Input } from "react-materialize";
const Textbox = ({ id, type, field, s, l, value, handleChange }) => {
  let defaultValue = "";
  if (value) {
    defaultValue = value;
  }
  return (
    <React.Fragment>
      <Input
        id={id}
        s={s}
        l={l}
        label={field}
        type={type}
        onChange={handleChange}
        value={defaultValue}
      />
    </React.Fragment>
  );
};
export default Textbox;
