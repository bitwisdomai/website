import React from "react";
import Banner from "../components/landing/Banner";
import Hero from "../components/landing/Hero";
import Footer from "../components/landing/Footer";
import FeaturesSection from "../components/landing/FeaturesSection";
import ProfitCalculator from "../components/landing/ProfitCalculator";
import PaymentTransition from "../components/landing/PaymentTransition";
import CryptoPaymentsSection from "../components/landing/CryptoPaymentsSection";
import BitWisdom from "../components/landing/BitWisdom";
import CryptoNodeSection from "../components/landing/CryptoNodeSection";
import ContactForm from "../components/landing/ContactForm";
import NavBar from "../components/landing/NavBar";
const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Banner */}
      <Banner />
      <NavBar />
      <Hero />
      <FeaturesSection />
      <ProfitCalculator />
      <PaymentTransition />
      <CryptoPaymentsSection />
      <BitWisdom />
      <CryptoNodeSection />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default HomePage;
