import React from "react";
const Footer = () => {
  return (
    <footer className="page-footer blue darken-3">
      <div className="container">
        <div className="row">
          <div className="col s12 l6">
            <h5>About me</h5>
            <p>
              Robo-Trade™ is a Singapore-based technology and marketing company
              specializing in Robotic Stocks and Commodities Trading Software.
              Robotic Stock Trading is an artificial intelligence technology
              referred to as the next generation of automated stock trading.
            </p>
            <p>
              Trading robots are most fit for Day-Traders/Spinsters who rely the
              speed of execution to repeatedly take profit on stock fluctuations
              throughout a trading session. This is why the Robotic Trading
              system is gaining popularity among the smart investors. We are
              operational in this segment from last 3 years and we have more
              than 1000 plus happy traders on board.
            </p>
          </div>
          <div className="col s12 l4 offset-l2">
            <h5>Connect</h5>
            <ul>
              <li>
                <a href="#" className="grey-text text-lighten-3">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="grey-text text-lighten-3">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="grey-text text-lighten-3">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="grey-text text-lighten-3">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright blue darken-4">
        <div className="container center-align">&copy; 2018 Robo-Trade</div>
      </div>
    </footer>
  );
};
export default Footer;
