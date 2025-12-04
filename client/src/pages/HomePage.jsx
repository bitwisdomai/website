import React, { useEffect, lazy, Suspense } from "react";
import Banner from "../components/landing/Banner";
import Hero from "../components/landing/Hero";
import NavBar from "../components/landing/NavBar";
import Footer from "../components/landing/Footer";

// Lazy load below-the-fold components for better initial load performance
const FeaturesSection = lazy(() =>
  import("../components/landing/FeaturesSection")
);
const ProfitCalculator = lazy(() =>
  import("../components/landing/ProfitCalculator")
);
const PaymentTransition = lazy(() =>
  import("../components/landing/PaymentTransition")
);
const BitWisdom = lazy(() => import("../components/landing/BitWisdom"));
const CryptoNodeSection = lazy(() =>
  import("../components/landing/CryptoNodeSection")
);
const MobileNodeSection = lazy(() =>
  import("../components/landing/MobileNodeSection")
);
const DonationSection = lazy(() =>
  import("../components/landing/DonationSection")
);
const ContactForm = lazy(() => import("../components/landing/ContactForm"));

const HomePage = () => {
  // Handle scroll to section when coming from another page with hash or sessionStorage
  useEffect(() => {
    // Check if we should scroll to mobile node section
    const shouldScrollToMobileNode = sessionStorage.getItem("scrollToMobileNode");
    const hash = window.location.hash;

    if (shouldScrollToMobileNode === "true" || hash === "#mobile-node" || hash === "#mobile-node-section") {
      // Clear the sessionStorage flag
      sessionStorage.removeItem("scrollToMobileNode");

      // Wait for lazy-loaded component to render with polling
      const scrollToSection = () => {
        const section = document.getElementById("mobile-node-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
          return true;
        }
        return false;
      };

      // Try to scroll immediately
      if (!scrollToSection()) {
        // If section not found, poll for it (max 5 seconds)
        let attempts = 0;
        const maxAttempts = 50; // 50 attempts * 100ms = 5 seconds max

        const intervalId = setInterval(() => {
          attempts++;
          if (scrollToSection() || attempts >= maxAttempts) {
            clearInterval(intervalId);
          }
        }, 100); // Check every 100ms
      }
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
        <DonationSection />
        <ContactForm />
      </Suspense>
      <Footer />
    </div>
  );
};

export default HomePage;
