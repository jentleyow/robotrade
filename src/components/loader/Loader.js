import React from "react";
const Loader = () => {
  return (
    <div className="progress" style={{ backgroundColor: "#0d47a1" }}>
      <div className="indeterminate" style={{ backgroundColor: "#1e88e5" }} />
    </div>
  );
};
export default Loader;
