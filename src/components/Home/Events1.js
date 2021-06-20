import React from "react";
import OwlCarousel from "react-owl-carousel";

import i1 from "../../assets/images/post-event-01-513x518.jpg";
import i2 from "../../assets/images/post-event-02-513x518.jpg";
import i3 from "../../assets/images/post-event-03-513x518.jpg";
import i4 from "../../assets/images/post-event-04-513x518.jpg";
const options = {
  loop: true,
  autoplay: true,
  smartSpeed: 450,
  dots: false,
  dotsEach: 1,
  nav: false,
  items: 3,
  navClass: ["owl-prev fa fa-angle-left", "owl-next fa fa-angle-right"],
};
class Events1 extends React.Component {
  render() {
    return (
      <section className="section">
        <div
          className="owl-events"
          // className="owl-carousel owl-events"
          data-items={1}
          data-sm-items={2}
          data-md-items={2}
          data-lg-items={3}
          data-xl-items={3}
          data-xxl-items={4}
          data-dots="true"
          data-autoplay={4798}
          data-speed={750}
          data-loop="true"
          data-mouse-drag="false"
        >
          <OwlCarousel {...options}>
            <div className="post-event">
              <div
                className="post-event-figure"
                style={{
                  backgroundImage: "url(" + i1 + ")",
                }}
              />
              <h2 className="post-event-title">
                <a href="#">
                  Pearl <br /> Jam
                </a>
              </h2>
              <div className="box-event box-event-mod-2">
                <div className="box-event-data">22/12</div>
                <div className="box-event-description">
                  <h4 className="box-event-title">
                    <a href="#">Hall of Music</a>
                  </h4>
                  <div className="box-event-address">
                    <a href="#">
                      28 Jackson Blvd Ste 1020 Chicago, IL 60604-2340
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="post-event">
              <div
                className="post-event-figure"
                style={{
                  backgroundImage: "url(" + i2 + ")",
                }}
              />
              <h2 className="post-event-title">
                <a href="#">
                  Chet <br /> Faker
                </a>
              </h2>
              <div className="box-event box-event-mod-2">
                <div className="box-event-data">23/12</div>
                <div className="box-event-description">
                  <h4 className="box-event-title">
                    <a href="#">Chicago Concert Hall</a>
                  </h4>
                  <div className="box-event-address">
                    <a href="#">
                      28 Jackson Blvd Ste 1020 Chicago, IL 60604-2340
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="post-event">
              <div
                className="post-event-figure"
                style={{
                  backgroundImage: "url(" + i3 + ")",
                }}
              />
              <h2 className="post-event-title">
                <a href="#">
                  Mark <br /> Lanegan
                </a>
              </h2>
              <div className="box-event box-event-mod-2">
                <div className="box-event-data">24/12</div>
                <div className="box-event-description">
                  <h4 className="box-event-title">
                    <a href="#">Alligator Club</a>
                  </h4>
                  <div className="box-event-address">
                    <a href="#">
                      28 Jackson Blvd Ste 1020 Chicago, IL 60604-2340
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="post-event">
              <div
                className="post-event-figure"
                style={{
                  backgroundImage: "url(" + i4 + ")",
                }}
              />
              <h2 className="post-event-title">
                <a href="#">
                  Dave <br /> Gahan
                </a>
              </h2>
              <div className="box-event box-event-mod-2">
                <div className="box-event-data">25/12</div>
                <div className="box-event-description">
                  <h4 className="box-event-title">
                    <a href="#">Hearst Stadium</a>
                  </h4>
                  <div className="box-event-address">
                    <a href="#">
                      28 Jackson Blvd Ste 1020 Chicago, IL 60604-2340
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </section>
    );
  }
}

export default Events1;
