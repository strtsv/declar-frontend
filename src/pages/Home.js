import React from "react";

import Header from "../components/Header";
import UpcomingEvent from "../components/Home/UpcomingEvent";
import Events1 from "../components/Home/Events1";
import Events2 from "../components/Home/Events2";
import LatestNews from "../components/Home/LatestNews";
import Mixcloud from "../components/Home/Mixcloud";
import Map from "../components/Home/Map";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="page animated">
      <Header />
      <UpcomingEvent />
      <Events1 />
      <Events2 />
      <LatestNews />
      <Mixcloud />
      <Map />
      <Footer />
    </div>
  );
};

export default Home;
