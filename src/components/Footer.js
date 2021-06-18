import React from "react";

import i1 from "../assets/images/icon-email-34x25.png";
import i2 from "../assets/images/logo-default-666x144.png";
import i3 from "../assets/images/icon-marker-31x38.png";

class Footer extends React.Component {
  render() {
    return (
      <footer className="section footer-classic footer-classic-newsletter bg-pattern bg-gray-600">
        <div className="container">
          <div className="box-newsletter">
            <div className="row row-fix row-30 justify-content-sm-between align-items-center">
              <div className="col-lg-6">
                <div className="unit align-items-center">
                  <div className="unit-left">
                    <img src={i1} alt width={34} height={25} />
                  </div>
                  <div className="unit-body">
                    <h3>Newsletter</h3>
                  </div>
                </div>
                <h5 className="text-gray-400">
                  Subscribe to our newsletter to receive news, updates, and
                  special offers by email.
                </h5>
              </div>
              <div className="col-lg-6">
                <form
                  className="rd-form rd-mailform rd-form-inline"
                  data-form-output="form-output-global"
                  data-form-type="subscribe"
                  method="post"
                  action="bat/rd-mailform.php"
                >
                  <div className="form-wrap">
                    <input
                      className="form-input"
                      id="subscribe-form-email"
                      type="email"
                      name="email"
                      data-constraints="@Email @Required"
                    />
                    <label
                      className="form-label"
                      htmlFor="subscribe-form-email"
                    >
                      Your Email Address
                    </label>
                  </div>
                  <div className="form-button">
                    <button
                      className="button button-primary-2 button-lg"
                      type="submit"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="row row-30 align-items-center justify-content-between text-center text-lg-left">
            <div className="col-xl-5 text-xl-left text-center">
              {}
              <a className="brand" href="index.html">
                <img src={i2} alt width={333} height={72} />
              </a>
            </div>
            <div className="col-xl-4 col-lg-4">
              <div className="unit unit-spacing-md align-items-center justify-content-center justify-content-lg-start">
                <div className="unit-left">
                  <img src={i3} alt width={31} height={38} />
                </div>
                <div className="unit-body">
                  <address>
                    <a href="#">
                      28 Jackson Blvd Ste 1020 <br /> Chicago, IL 60604-2340
                    </a>
                  </address>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4">
              <p className="rights">
                <span className="text-primary">Radiofm</span>
                <span>. </span>
                <span>© </span>
                <span className="copyright-year" />
                <span>  |  </span>
                <a href="privacy-policy.html">Privacy Policy</a>
              </p>
              <ul className="list-inline group">
                <li>
                  <a
                    className="icon novi-icon icon-lg button-social button-gray-500 fa fa-instagram"
                    href="#"
                  />
                </li>
                <li>
                  <a
                    className="icon novi-icon icon-lg button-social button-gray-500 fa fa-twitter"
                    href="#"
                  />
                </li>
                <li>
                  <a
                    className="icon novi-icon icon-lg button-social button-gray-500 fa fa-facebook"
                    href="#"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
