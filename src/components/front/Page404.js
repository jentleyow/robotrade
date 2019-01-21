import React from "react";
const Page404 = () => {
  return (
    <div class="container" style={{ marginTop: "100px" }}>
      <div class="card" style={{ padding: "0px 0px  100px" }}>
        <div class="card-content center">
          <div>
            <h1>
              <strong>404</strong>
            </h1>
            <h2 style={{ marginTop: "-20px" }}>
              <strong>Page not found</strong>
            </h2>
          </div>
          <p
            style={{
              marginTop: "50px",
              maxWidth: "400px",
              margin: "0px auto",
              lineHeight: "25px"
            }}
          >
            We're sorry. The page you requested could not be found. Please go
            back to the homepage or contact us @ support@robotrade.com
          </p>
        </div>
      </div>
    </div>
  );
};
export default Page404;
