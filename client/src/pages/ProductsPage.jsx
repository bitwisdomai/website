import React, { lazy, Suspense, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/landing/NavBar";
import Footer from "../components/landing/Footer";
import Banner from "../components/landing/Banner";
import ParticlesBackground from "../components/common/ParticlesBackground";
import EbayStoreSection from "../components/products/EbayStoreSection";
import QualifyingForm from "../components/qualifying/QualifyingForm";
import phoneImg from "../assets/bwphone.png";
import cardMachineImg from "../assets/cardmachine.png";
import nodeMobileImg from "../assets/nodemobile.png";
import bitcoinImg from "../assets/bitcoin.png";
import bitbackVideo from "../assets/bitbackvideo.mp4";
import bitbackPoster from "../assets/bitback.jpg";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [showQualifyingForm, setShowQualifyingForm] = useState(false);

  // Handle scroll to section when coming from another page with hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#waitlist-buttons') {
      setTimeout(() => {
        const section = document.getElementById('waitlist-buttons');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300); // Wait for page to render
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Banner />
      <NavBar />

      {/* Hero Section */}
      <section className="relative bg-[#0E0E0E] text-white pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden">
        {/* Particles Background */}
        <ParticlesBackground variant="cosmic" />

        {/* Background Gradient */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
          <div className="w-full h-full bg-gradient-to-l from-cyan-400/20 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-b from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Our Products
            </span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
            Cutting-edge technology solutions powered by AI and blockchain
            innovation
          </p>
        </div>

        {/* Decorative Glow */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[300px] md:w-[400px] h-[300px] md:h-[400px] opacity-30">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/20 blur-3xl"></div>
        </div>
      </section>

      {/* Core Software and System */}
      <section className="relative bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden">
        {/* Particles Background */}
        <ParticlesBackground variant="default" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="inline-block bg-cyan-400 text-black font-semibold text-sm sm:text-base px-6 py-2.5 rounded-md mb-6">
                Core Technology
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                <span className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">
                  Our Core Software and System
                </span>
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
                The uniquely-generated QR-code and tap-to-pay front end
                merchant/consumer experience is followed by our patent-pending
                core system. The core is the automated flow of funds and the
                function that performs the low fee optimized timing of the final
                settlement of funds, based on thresholds met for each merchant.
              </p>
            </div>
            <div className="relative flex items-center justify-center">
              <img
                src={phoneImg}
                alt="BitWisdom Phone"
                className="w-full max-w-[300px] md:max-w-[400px] h-auto object-contain drop-shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:drop-shadow-[0_0_40px_rgba(0,240,255,0.6)] transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Decentralized AI */}
      <section className="relative bg-[#0E0E0E] py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={bitbackPoster}
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
        >
          <source src={bitbackVideo} type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Particles Background */}
        <ParticlesBackground variant="default" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div></div>
            <div>
              <div className="inline-block bg-cyan-400 text-black font-semibold text-sm sm:text-base px-6 py-2.5 rounded-md mb-6">
                AI Innovation
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                <span className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">
                  Decentralized AI
                </span>
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
                To further improve upon our core offering, we have implemented a
                patent-pending hybrid decentralized/centralized
                workstation-powered AI system, with blockchain database residing
                on every node that allows our worldwide network of crypto nodes
                to work at scale. This AI system does the timing of final
                settlement of funds, in an enhanced, cooperative way and the
                core low fee settlement timing function becomes the fallback
                position in the rare event of the blockchain database or AI
                system becoming unreachable.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Our customers can optionally run their own AI system
                workstation/server, which gives their node(s) high availability
                to the AI system and allows them to take full advantage of our
                Self-Healing Node Technology, simultaneously enhancing the
                decentralized AI systems's lowest fee effectiveness, while
                increasing the effectiveness and redundancy of our entire
                worldwide network of cooperative crypto nodes. The more AI
                systems in operation, the more compute power, resulting in even
                lower fees for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Features Grid */}
      <section className="relative bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden">
        {/* Particles Background */}
        <ParticlesBackground variant="default" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">
                Advanced Features
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Enterprise-grade solutions for the modern crypto ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Clearnet Security */}
            <div className="border border-cyan-400/40 rounded-xl p-6 sm:p-8 hover:border-cyan-400/70 hover:shadow-[0_0_25px_rgba(0,191,255,0.25)] hover:scale-105 transition-all duration-300">
              <div className="bg-cyan-400/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-3">
                Clearnet Security
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                All locally-hosted crypto nodes must have a Clearnet connection,
                accessible worldwide, to work properly with POS terminal apps
                and e-commerce website integrations. We implement on every node,
                our patent-pending Clearnet security approach. No
                internet-connected device is ever hackproof or foolproof and we
                have strived to mitigate these concerns. We've employed multiple
                layers of cybersecurity to bring each node online without
                sacrificing speed or usability.
              </p>
            </div>

            {/* Node Self-Healing */}
            <div className="border border-cyan-400/40 rounded-xl p-6 sm:p-8 hover:border-cyan-400/70 hover:shadow-[0_0_25px_rgba(0,191,255,0.25)] hover:scale-105 transition-all duration-300">
              <div className="bg-cyan-400/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-3">
                Node Self-Healing
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Automation, high availability and uptime is what we strive for.
                If or when a node detects it's lost Clearnet connection, it
                automatically takes steps to bring itself online. If it is
                unable to, and an onsite AI system workstation/server is being
                run also, it detects the node's offline status and after certain
                time elapses, an alert is sent to the system administrator that
                manual intervention is required.
              </p>
            </div>

            {/* Automated Backup */}
            <div className="border border-cyan-400/40 rounded-xl p-6 sm:p-8 hover:border-cyan-400/70 hover:shadow-[0_0_25px_rgba(0,191,255,0.25)] hover:scale-105 transition-all duration-300">
              <div className="bg-cyan-400/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-3">
                Automated Backup
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Our patent-pending automated backup solution backs up some of
                the most critical data on each crypto node. Every node has
                funded channels and this channel state data is backed up when a
                change is detected along with scheduled backups. Furthermore,
                merchant data is also backed up automatically on a schedule.
              </p>
            </div>

            {/* Mobile App For Sales */}
            <div className="border border-cyan-400/40 rounded-xl p-6 sm:p-8 hover:border-cyan-400/70 hover:shadow-[0_0_25px_rgba(0,191,255,0.25)] hover:scale-105 transition-all duration-300">
              <div className="bg-cyan-400/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-3">
                Mobile App For Sales
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                We've developed a mobile app that allows our customers to follow
                metrics for each merchant on their crypto node. An easy
                onboarding process allows merchants to start accepting crypto
                transactions in as little as 30 minutes and can follow their own
                metrics such as real-time monthly average merchant processing
                fees including a customer refund feature.
              </p>
            </div>

            {/* nodeFÔN */}
            <div className="border border-cyan-400/40 rounded-xl p-6 sm:p-8 hover:border-cyan-400/70 hover:shadow-[0_0_25px_rgba(0,191,255,0.25)] hover:scale-105 transition-all duration-300">
              <div className="bg-cyan-400/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-3">
                nodeFÔN
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-3">
                Learn more about our patent-pending mobile phone crypto node.
              </p>
              <a
                href="/#mobile-node"
                className="text-cyan-400 text-sm font-semibold hover:underline transition inline-flex items-center"
              >
                Learn more
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>

            {/* Laptop Crypto Node */}
            <div className="border border-cyan-400/40 rounded-xl p-6 sm:p-8 hover:border-cyan-400/70 hover:shadow-[0_0_25px_rgba(0,191,255,0.25)] hover:scale-105 transition-all duration-300">
              <div className="bg-cyan-400/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-3">
                Laptop Crypto Node
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Our highly-customized crypto node system notebooks are
                business-grade and packed with power. Most notebooks have Intel®
                Core-i7 processors, 32GB or more RAM (memory), 2TB Pro NVMe SSD
                and run our BitWisdom AI Network™ system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Flexibility Section */}
      <section className="relative bg-[#0E0E0E] py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden">
        {/* Particles Background */}
        <ParticlesBackground variant="default" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="border border-cyan-400/40 rounded-xl bg-[#121212]/90 p-8 sm:p-10 md:p-12 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="inline-block bg-cyan-400 text-black font-semibold text-sm sm:text-base px-6 py-2.5 rounded-md mb-6">
                Hardware Flexibility
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">
                  Run Almost Any Crypto Node
                </span>
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base text-center max-w-4xl mx-auto">
              From a power-sipping Raspberry Pi on up to an obscenely powerful
              workstation or server, our system can run on most hardware
              configurations. Qualifying BW Customers should check with us first
              before purchasing any hardware to ensure compatibility.
            </p>
          </div>
        </div>
      </section>

      {/* eBay Store Section */}
      <EbayStoreSection />

      {/* CTA Section */}
      <section className="relative bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden">
        {/* Particles Background */}
        <ParticlesBackground variant="cosmic" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">
              Ready to Get Started?
            </span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mb-8 sm:mb-10">
            Join the BitWisdom AI Network and revolutionize your crypto payment
            processing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                navigate('/contact');
                window.scrollTo(0, 0);
              }}
              className="bg-cyan-400 text-black px-6 sm:px-8 py-3 sm:py-4 rounded text-sm sm:text-base font-semibold hover:bg-cyan-300 transition cursor-pointer"
            >
              Schedule A Callback
            </button>
            <button
              onClick={() => setShowQualifyingForm(true)}
              className="border border-cyan-400 text-white px-6 sm:px-8 py-3 sm:py-4 rounded text-sm sm:text-base font-semibold hover:bg-cyan-400/10 transition cursor-pointer"
            >
              Join Our Network
            </button>
          </div>
        </div>

        {/* Background Glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] opacity-20">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/20 blur-3xl"></div>
        </div>
      </section>

      <Footer />

      {/* Qualifying Form Modal */}
      {showQualifyingForm && (
        <QualifyingForm onClose={() => setShowQualifyingForm(false)} />
      )}
    </div>
  );
};

export default ProductsPage;
