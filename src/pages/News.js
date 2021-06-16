import React from "react";

import Header from "../components/Header";
import OurDJs from "../components/News/OurDJs";
import Footer from "../components/Footer";

const News = () => {
  return (
    <div className="page animated">
      <Header />
      <OurDJs />
      <Footer />
    </div>
  );
};

export default News;
