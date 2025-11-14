import React, { useEffect, useRef, useState } from "react";
import antiquatedImg from "../../assets/Group-112.png";
import phoneImg from "../../assets/newphone.png";
import shopifyImg from "../../assets/shopify.png";
import woocommerceImg from "../../assets/wocommerce.png";
import drupalImg from "../../assets/drupal.png";
import prestolImg from "../../assets/prestoShop.png";
import magentoImg from "../../assets/magentoo.png";
import bitcoinImg from "../../assets/bitcoin.png";

const PaymentTransition = () => {
  const canvasRef = useRef(null);

  // Rotating Bitcoin icons background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const section = canvas.parentElement;

    const resizeCanvas = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    resizeCanvas();

    // Load bitcoin image
    const bitcoinImage = new Image();
    bitcoinImage.src = bitcoinImg;

    let imageLoaded = false;
    bitcoinImage.onload = () => {
      imageLoaded = true;
    };

    // Bitcoin system - small rotating icons
    const bitcoins = [];
    const bitcoinCount = 20;

    class Bitcoin {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 25 + Math.random() * 25; // 25-50px
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.opacity = 0.15 + Math.random() * 0.15; // 0.15-0.3
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        // Wrap around edges
        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
      }

      draw() {
        if (!imageLoaded) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        // Draw Bitcoin image
        ctx.drawImage(
          bitcoinImage,
          -this.size / 2,
          -this.size / 2,
          this.size,
          this.size
        );

        ctx.restore();
      }
    }

    // Initialize bitcoins
    for (let i = 0; i < bitcoinCount; i++) {
      bitcoins.push(new Bitcoin());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bitcoins.forEach((bitcoin) => {
        bitcoin.update();
        bitcoin.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <section className="relative py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 flex flex-col items-center text-white bg-[#0E0E0E] overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      />
      {/* TOP ROW: TEXT + ARROW + TEXT */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-10 lg:gap-20 xl:gap-40 w-full max-w-[1400px] mb-8 sm:mb-10 md:mb-12">
        {/* LEFT TEXT */}
        <h2
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold
                     bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent text-center md:text-left"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          From Antiquated
        </h2>

        {/* ARROW IN THE MIDDLE */}
        <svg
          width="100"
          height="20"
          viewBox="0 0 150 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 hidden md:block md:w-[100px] lg:w-[120px] xl:w-[150px]"
        >
          <line
            x1="0"
            y1="12"
            x2="125"
            y2="12"
            stroke="#00E5FF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="M125 6 L150 12 L125 18" fill="#00E5FF" />
        </svg>

        {/* Mobile Arrow (vertical) */}
        <svg
          width="20"
          height="30"
          viewBox="0 0 25 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 md:hidden"
        >
          <line
            x1="12"
            y1="0"
            x2="12"
            y2="30"
            stroke="#00E5FF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="M6 30 L12 40 L18 30" fill="#00E5FF" />
        </svg>

        {/* RIGHT TEXT */}
        <h2
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold
                     bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent text-center md:text-left"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          To Innovative
        </h2>
      </div>

      {/* IMAGES ROW */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-10 md:gap-16 lg:gap-24 xl:gap-40 w-full max-w-[1400px]">
        {/* LEFT IMAGE */}
        <div className="max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[420px] w-full md:-mt-8 lg:-mt-12">
          <img
            src={antiquatedImg}
            alt="Old payment terminal"
            className="w-full h-auto drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]"
            loading="lazy"
          />
        </div>

        {/* RIGHT SIDE: IMAGE + PLATFORM SECTION */}
        <div className="flex flex-col items-center max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[500px] w-full md:ml-0 md:pt-0 lg:pt-10">
          {/* Phone Image */}
          <img
            src={phoneImg}
            alt="Bitwisdom phone"
            className="w-full h-auto mb-4 sm:mb-5 md:mb-6 drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]"
            loading="lazy"
          />

          {/* PLATFORM TEXT + LOGOS DIRECTLY UNDER RIGHT IMAGE */}
          <div className="mt-2 w-full px-2 sm:px-4 md:px-0">
            <p
              className="text-sky-200 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 text-center"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              Also Supports Leading E-Commerce Platforms
            </p>

            <div className="flex justify-center flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              {[
                shopifyImg,
                woocommerceImg,
                prestolImg,
                magentoImg,
                drupalImg,
              ].map((logo, idx) => (
                <img
                  key={idx}
                  src={logo}
                  alt="platform logo"
                  className="w-8 h-7 sm:w-10 sm:h-9 md:w-12 md:h-10 lg:w-16 lg:h-12 xl:w-20 xl:h-14
                             bg-white object-contain p-1 rounded"
                  loading="lazy"
                />
              ))}
            </div>

            <p className="text-gray-400 text-[8px] sm:text-[9px] md:text-[10px] text-center">
              *Our POS system is the core — eCommerce integrations are available
              as add-ons.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentTransition;
