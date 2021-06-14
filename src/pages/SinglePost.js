import React from "react";

import Header from "../components/Header";
import Content from "../components/SinglePost/Content";
import Footer from "../components/Footer";

const SinglePost = () => {
  return (
    <div className="page animated">
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default SinglePost;
