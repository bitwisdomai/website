import React from "react";
import Banner from "../components/landing/Banner";
import NavBar from "../components/landing/NavBar";
import CookiesHero from "../components/faq/CookiesHero";
import CookiesContent from "../components/cookies/CookiesContent";
import Footer from "../components/landing/Footer";

const CookiesPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Banner />
      <NavBar />
      <CookiesHero />
      <CookiesContent />
      <Footer />
    </div>
  );
};

export default CookiesPolicyPage;
