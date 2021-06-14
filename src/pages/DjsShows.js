import React from "react";

import Header from "../components/Header";
import OurDJs from "../components/DjsShows/OurDJs";
import OurHistory from "../components/DjsShows/OurHistory";
import WhoWeAre from "../components/DjsShows/WhoWeAre";
import Footer from "../components/Footer";

const DjsShows = () => {
  return (
    <div className="page animated">
      <Header />
      <OurDJs />
      <OurHistory />
      <WhoWeAre />
      <Footer />
    </div>
  );
};

export default DjsShows;
