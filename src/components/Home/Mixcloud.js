import React from "react";

import i1 from "../../assets/images/mixcloud-524x78.png";
import i2 from "../../assets/images/icon-button-02-25x26.png";

class Mixcloud extends React.Component {
  render() {
    return (
      <section className="section section-xl bg-gray-100 bg-pattern bg-pattern-mod-2 text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-sm-10">
              <a href="#">
                <img src={i1} alt width={524} height={78} />
              </a>
              <h4 className="text-primary">
                <a href="#">
                  Follow Us on Mixcloud <br /> and Stay Tuned for Our Podcasts
                </a>
              </h4>
              <a
                className="button button-white button-icon button-icon-left"
                href="#"
              >
                <span className="icon">
                  <img src={i2} alt width={25} height={26} />
                </span>
                Follow Us
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Mixcloud;
