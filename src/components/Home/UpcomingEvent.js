import React from "react";
import $ from "jquery";

import i from "../../assets/images/home-02-1920x1217.jpg";

class UpcomingEvent extends React.Component {
  componentDidMount() {
    $(".parallax-container").parallax({});
  }
  render() {
    return (
      <section
        className="parallax-container section-xxl context-dark"
        data-parallax-img={i}
        data-image-src={i}
      >
        <div className="parallax-content">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-7 col-md-9 col-sm-11">
                <h4 className="text-primary">Upcoming Event</h4>
                <h1>
                  <a className="link-white" href="#">
                    The <br /> Kooks
                  </a>
                </h1>
                <div className="box-event box-event-mod-1">
                  <div className="box-event-data">21/12</div>
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
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default UpcomingEvent;
