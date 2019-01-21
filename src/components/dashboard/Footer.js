import React from "react";
const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#0d47a1",
        color: "white",
        padding: "10px",
        position: "fixed",
        bottom: "0",
        width: "100%",
        marginTop: "100px",
        zIndex: "1000"
      }}
    >
      <div className="container center-align">
        <p>&copy; 2018 Robo-Trade</p>
      </div>
    </footer>
  );
};
export default Footer;
