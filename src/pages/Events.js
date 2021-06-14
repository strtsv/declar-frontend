import React from "react";

import Header from "../components/Header";
import Slider from "../components/Events/Slider";
import UpcomingEvents from "../components/Events/UpcomingEvents";
import Footer from "../components/Footer";

const Events = () => {
  return (
    <div className="page animated">
      <Header />
      <Slider />
      <UpcomingEvents />
      <Footer />
    </div>
  );
};

export default Events;
