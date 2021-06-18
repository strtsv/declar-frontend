import React from "react";

import $ from "jquery";
import "../assets/js/jquery.easing.1.3.js";
import "../assets/js/tmstickup.js";
import "../assets/js/tmstickup.js";
import "../assets/js/parallax.js";
import "../assets/js/jquery.ui.totop.my.js";

import i1 from "../assets/images/logo-default-666x144.png";
import i2 from "../assets/images/nav-news-01-270x210.jpg";
import i3 from "../assets/images/nav-news-02-270x210.jpg";
import i4 from "../assets/images/home-01-75x72.jpg";
import i5 from "../assets/images/volume-30x30.png";

class Header extends React.Component {
  constructor(props) {
    super(props);
    $(document).ready(function() {
      $(".rd-navbar").TMStickUp({});
      $().UItoTop({
        easingType: "easeOutQuad",
        containerClass: "ui-to-top fa fa-angle-up",
      });
    });
  }
  render() {
    return (
      <header className="section page-header bg-pattern bg-gray-800">
        {}
        <div className="rd-navbar-wrap">
          <nav
            className="rd-navbar rd-navbar-original rd-navbar-static"
            data-layout="rd-navbar-fixed"
            data-sm-layout="rd-navbar-fixed"
            data-md-layout="rd-navbar-fixed"
            data-lg-layout="rd-navbar-static"
            data-xl-layout="rd-navbar-static"
            data-md-device-layout="rd-navbar-fixed"
            data-lg-device-layout="rd-navbar-static"
            data-xl-device-layout="rd-navbar-static"
            data-lg-stick-up-offset="200px"
            data-xl-stick-up-offset="120px"
            data-xxl-stick-up-offset="120px"
            data-lg-stick-up="true"
            data-xl-stick-up="true"
            data-xxl-stick-up="true"
          >
            <div className="rd-navbar-main-outer">
              <div className="rd-navbar-main">
                {}
                <div className="rd-navbar-panel">
                  {}
                  <button
                    className="rd-navbar-toggle"
                    data-rd-navbar-toggle=".rd-navbar-nav-wrap"
                  >
                    <span />
                  </button>
                  {}
                  <div className="rd-navbar-brand">
                    {}
                    <a className="brand" href="index.html">
                      <img src={i1} alt width={333} height={72} />
                    </a>
                  </div>
                </div>
                <div className="rd-navbar-main-element">
                  <div className="rd-navbar-nav-wrap">
                    <ul className="rd-navbar-nav">
                      <li className="rd-nav-item active">
                        <a className="rd-nav-link" href="index.html">
                          Home
                        </a>
                      </li>
                      <li className="rd-nav-item">
                        <a className="rd-nav-link" href="djs-&-shows.html">
                          DJs & Shows
                        </a>
                        <ul className="rd-menu rd-navbar-dropdown">
                          <li className="rd-dropdown-item">
                            <a className="rd-dropdown-link" href="#">
                              DJ Suzana
                            </a>
                          </li>
                          <li className="rd-dropdown-item">
                            <a className="rd-dropdown-link" href="#">
                              DJ Smith
                            </a>
                          </li>
                          <li className="rd-dropdown-item">
                            <a className="rd-dropdown-link" href="#">
                              DJ Amarok
                            </a>
                            <ul className="rd-menu rd-navbar-dropdown">
                              <li className="rd-dropdown-item">
                                <a className="rd-dropdown-link" href="#">
                                  Morning Show
                                </a>
                              </li>
                              <li className="rd-dropdown-item">
                                <a className="rd-dropdown-link" href="#">
                                  Evening Shows
                                </a>
                              </li>
                              <li className="rd-dropdown-item">
                                <a className="rd-dropdown-link" href="#">
                                  Night Show
                                </a>
                              </li>
                              <li className="rd-dropdown-item">
                                <a className="rd-dropdown-link" href="#">
                                  Weekend Show
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="rd-nav-item">
                        <a className="rd-nav-link" href="events.html">
                          Events
                        </a>
                      </li>
                      <li className="rd-nav-item">
                        <a className="rd-nav-link" href="news-&-info.html">
                          News & Info
                        </a>
                        <ul className="rd-menu rd-navbar-megamenu rd-navbar-dropdown-news">
                          <li className="rd-megamenu-item">
                            <div className="rd-megamenu-figure">
                              <a href="single-post.html">
                                <img src={i2} alt width={270} height={210} />
                              </a>
                            </div>
                            <div className="rd-megamenu-tag">
                              <a href="news-&-info.html">Music News</a>
                            </div>
                            <div className="rd-megamenu-link">
                              <a href="single-post.html">
                                Adele UK Tour is Happening!
                              </a>
                            </div>
                          </li>
                          <li className="rd-megamenu-item">
                            <div className="rd-megamenu-figure">
                              <a href="single-post.html">
                                <img src={i3} alt width={270} height={210} />
                              </a>
                            </div>
                            <div className="rd-megamenu-tag">
                              <a href="news-&-info.html">Music News</a>
                            </div>
                            <div className="rd-megamenu-link">
                              <a href="single-post.html">
                                Coldplay Turn Chimps in Their New Video.
                              </a>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li className="rd-nav-item">
                        <a className="rd-nav-link" href="schedule.html">
                          Schedule
                        </a>
                      </li>
                      <li className="rd-nav-item">
                        <a className="rd-nav-link" href="contacts.html">
                          Contacts
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="box-live-wrap">
          <div className="box-live-col-2">
            <div className="box-live-onair bg-gray-600">
              <div className="unit align-items-center justify-content-center justify-content-sm-start">
                <div className="unit-left">
                  <img
                    className="border-radius-lg"
                    src={i4}
                    alt
                    width={75}
                    height={72}
                  />
                </div>
                <div className="unit-right">
                  <p className="big">On Air</p>
                  <p className="big text-white">
                    <a className="link-color-inherit" href="#">
                      DJ Suzana
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="button-listen-wrap bg-gray-700">
              <a className="button-listen" href="#">
                Listen Live
                <span>
                  <img src={i5} alt width={30} height={30} />
                </span>
              </a>
            </div>
          </div>
          <div className="box-live-col-1 bg-gray-500">
            <p className="big">
              Now Playing on <a href="#">Radiofm.</a>
            </p>
            <p className="big text-white">
              <a className="link-color-inherit" href="#">
                Johnny Cash - Cry, Cry, Cry
              </a>
            </p>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
