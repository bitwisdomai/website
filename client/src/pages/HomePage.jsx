import React from "react";
import Banner from "../components/landing/Banner";
import Hero from "../components/landing/Hero";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Banner */}
      <Banner />
      <Hero />
    </div>
  );
};

export default HomePage;
