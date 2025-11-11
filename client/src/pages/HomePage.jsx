import React from "react";
import Banner from "../components/landing/Banner";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import ProfitEstimator from "../components/landing/ProfitEstimator";
import Transformation from "../components/landing/Transformation";
import CryptoPayments from "../components/landing/CryptoPayments";
import GetToKnow from "../components/landing/GetToKnow";
import WhyRunNode from "../components/landing/WhyRunNode";
import ContactUs from "../components/landing/ContactUs";
import Footer from "../components/landing/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Banner */}
      <Banner />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Profit Estimator */}
      <ProfitEstimator />

      {/* Transformation Section */}
      <Transformation />

      {/* Crypto Payments Section */}
      <CryptoPayments />

      {/* Get To Know Section */}
      <GetToKnow />

      {/* Why Run a Node Section */}
      <WhyRunNode />

      {/* Contact Us Section */}
      <ContactUs />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
