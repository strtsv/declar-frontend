import React from "react";

import Header from "../components/Header";
import ContactInformation from "../components/Contacts/ContactInformation";
import Mailform from "../components/Contacts/Mailform";
import Feedback from "../components/Contacts/Feedback";
import Footer from "../components/Footer";

const Contacts = () => {
  return (
    <div className="page animated">
      <Header />
      <ContactInformation />
      <Mailform />
      <Feedback />
      <Footer />
    </div>
  );
};

export default Contacts;
