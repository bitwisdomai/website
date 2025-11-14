import React, { useEffect, lazy, Suspense } from "react";
import Banner from "../components/landing/Banner";
import Hero from "../components/landing/Hero";
import NavBar from "../components/landing/NavBar";
import Footer from "../components/landing/Footer";

// Lazy load below-the-fold components for better initial load performance
const FeaturesSection = lazy(() => import("../components/landing/FeaturesSection"));
const ProfitCalculator = lazy(() => import("../components/landing/ProfitCalculator"));
const PaymentTransition = lazy(() => import("../components/landing/PaymentTransition"));
const BitWisdom = lazy(() => import("../components/landing/BitWisdom"));
const CryptoNodeSection = lazy(() => import("../components/landing/CryptoNodeSection"));
const MobileNodeSection = lazy(() => import("../components/landing/MobileNodeSection"));
const ContactForm = lazy(() => import("../components/landing/ContactForm"));

const HomePage = () => {
  // Handle scroll to section when coming from another page with hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#mobile-node') {
      setTimeout(() => {
        const section = document.getElementById('mobile-node-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300); // Wait for page to render
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Above-the-fold - Load immediately */}
      <Banner />
      <NavBar />
      <Hero />

      {/* Below-the-fold - Lazy loaded with Suspense */}
      <Suspense fallback={<div className="min-h-[200px] bg-black" />}>
        <FeaturesSection />
        <ProfitCalculator />
        <PaymentTransition />
        <BitWisdom />
        <CryptoNodeSection />
        <MobileNodeSection />
        <ContactForm />
      </Suspense>

      <Footer />
    </div>
  );
};

export default HomePage;
