import React from "react";

import i1 from "../../assets/images/post-classic-01-270x270.jpg";
import i2 from "../../assets/images/post-classic-02-270x270.jpg";
import i3 from "../../assets/images/post-classic-03-270x270.jpg";
import i4 from "../../assets/images/post-classic-04-270x270.jpg";
import i5 from "../../assets/images/icon-button-01-21x27.png";
import i6 from "../../assets/images/home-03-269x57.png";

class LatestNews extends React.Component {
  render() {
    return (
      <section className="section section-lg">
        <div className="container">
          <div className="row row-85">
            <div className="col-xl-8">
              <h2 className="text-primary">Latest News</h2>
              <div className="row row-80">
                <div className="col-sm-6">
                  <div className="post-classic">
                    <div className="post-classic-figure">
                      <a href="single-post.html">
                        <img src={i1} alt width={270} height={270} />
                      </a>
                    </div>
                    <h5 className="post-classic-tag">
                      <a href="news-&-info.html">Music News</a>
                    </h5>
                    <h4 className="post-classic-title">
                      <a href="single-post.html">Adele UK Tour is Happening!</a>
                    </h4>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="post-classic">
                    <div className="post-classic-figure">
                      <a href="single-post.html">
                        <img src={i2} alt width={270} height={270} />
                      </a>
                    </div>
                    <h5 className="post-classic-tag">
                      <a href="news-&-info.html">Music News</a>
                    </h5>
                    <h4 className="post-classic-title">
                      <a href="single-post.html">
                        Coldplay Turn Chimps in Their New Video.
                      </a>
                    </h4>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="post-classic">
                    <div className="post-classic-figure">
                      <a href="single-post.html">
                        <img src={i3} alt width={270} height={270} />
                      </a>
                    </div>
                    <h5 className="post-classic-tag">
                      <a href="news-&-info.html">Music News</a>
                    </h5>
                    <h4 className="post-classic-title">
                      <a href="single-post.html">
                        Lady Gaga is working with Mark Ronson
                      </a>
                    </h4>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="post-classic">
                    <div className="post-classic-figure">
                      <a href="single-post.html">
                        <img src={i4} alt width={270} height={270} />
                      </a>
                    </div>
                    <h5 className="post-classic-tag">
                      <a href="news-&-info.html">Music News</a>
                    </h5>
                    <h4 className="post-classic-title">
                      <a href="single-post.html">
                        Rihanna announces ANTI World Tour
                      </a>
                    </h4>
                  </div>
                </div>
              </div>
              <a
                className="button button-default button-icon button-icon-left"
                href="#"
              >
                <span className="icon">
                  <img src={i5} alt width={21} height={27} />
                </span>
                View All
              </a>
            </div>
            <div className="col-xl-4">
              <h2>Music Chart</h2>
              <div className="row row-85">
                <div className="col-xl-12 col-md-6">
                  <ul className="list-marked small font-weight-sbold">
                    <li>
                      <a className="link-gray-900" href="#">
                        Eric Clapton — Cocaine
                      </a>
                    </li>
                    <li>
                      <a className="link-gray-900" href="#">
                        Eric Clapton — Rambling On My Mind
                      </a>
                    </li>
                    <li>
                      <a className="link-gray-900" href="#">
                        Stevie Ray Vaughan — Texas Flood
                      </a>
                    </li>
                    <li>
                      <a className="link-gray-900" href="#">
                        Fleetwood Mac — I Loved Another Woman
                      </a>
                    </li>
                    <li>
                      <a className="link-gray-900" href="#">
                        Stevie Ray Vaughan — Pride and Joy
                      </a>
                    </li>
                    <li>
                      <a className="link-gray-900" href="#">
                        Buddy Guy — Messing With The Kid
                      </a>
                    </li>
                    <li>
                      <a className="link-gray-900" href="#">
                        B.B. King & Eric Clapton — The Thrill Is Gone
                      </a>
                    </li>
                    <li>
                      <a className="link-gray-900" href="#">
                        Robert Johnson — Sweet Home Chicago
                      </a>
                    </li>
                    <li>
                      <a className="link-gray-900" href="#">
                        Gary Moore — Stormy Monday
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-xl-12 col-md-6">
                  <div className="box-tune">
                    <div className="box-tune-body bg-pattern bg-pattern-mod-1">
                      <h4 className="box-tune-pretitle">Listen to</h4>
                      <h2 className="box-tune-title">
                        <a href="#">Radiofm. Live</a>
                      </h2>
                      <h4 className="box-tune-subtitle">From Anywhere with</h4>
                    </div>
                    <a className="box-tune-footer" href="#">
                      <img src={i6} alt width={269} height={57} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default LatestNews;
