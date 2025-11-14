import React, { useEffect, useRef } from "react";
import brainImg from "../../assets/brain.png";

const FeatureCard = ({ number, title, description }) => (
  <div className="relative flex flex-col justify-between border border-[#00BFFF]/40 rounded-xl bg-[#121212]/90 px-4 sm:px-6 md:px-8 py-8 sm:py-9 md:py-10 backdrop-blur-sm hover:border-[#00BFFF]/70 hover:shadow-[0_0_25px_rgba(0,191,255,0.25)] hover:scale-105 transition-all duration-300 min-h-[280px] sm:min-h-[320px] md:min-h-[340px] cursor-pointer">
    {/* Hollow Number Badge - matches background */}
    <div className="absolute -top-4 sm:-top-5 left-4 sm:left-6 md:left-8 flex items-center justify-center w-[48px] sm:w-[52px] md:w-[54px] h-[32px] sm:h-[34px] md:h-[36px] rounded-md border border-[#00BFFF]/50 text-[#00BFFF] font-bold text-base sm:text-lg bg-[#121212]/90 shadow-[0_0_10px_rgba(0,191,255,0.2)]">
      {number}
    </div>

    {/* Content */}
    <div className="mt-3 sm:mt-4">
      <h3 className="text-white text-lg sm:text-xl font-semibold mb-2 sm:mb-3 tracking-wide">
        {title}
      </h3>
      {Array.isArray(description) ? (
        <div className="space-y-3 sm:space-y-4">
          {description.map((para, index) => (
            <p
              key={index}
              className="text-gray-300 leading-relaxed text-sm sm:text-[15px]"
            >
              {para}
            </p>
          ))}
        </div>
      ) : (
        <p className="text-gray-300 leading-relaxed text-sm sm:text-[15px]">
          {description}
        </p>
      )}
    </div>
  </div>
);

const FeaturesSection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const section = canvas.parentElement;
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;

    const particles = [];
    const particleCount = 50;
    const connectionDistance = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(255,255,255,${opacity * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      drawConnections();
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const features = [
    {
      number: "01",
      title: "Deploy Anywhere",
      description: [
        "We will help you launch a crypto node in the cloud, or your own locally-hosted hardware, including our MOBILE PHONE CRYPTO NODE (patent-pending), by using BitWisdom’s patent-pending Clearnet security connection procedures and no commitment, ever!",
        "** With the exception of lifetime license to only one business in USA and only one business in any other country, limited-time offer.",
      ],
    },
    {
      number: "02",
      title: "Integrate Seamlessly",
      description:
        "When your merchants complete a simple-onboarding process, they choose from a range of POS apps, and/or connect their ecommerce platform to start accepting crypto payments in as little as a 30-minute signup process.",
    },
    {
      number: "03",
      title: "Receive Instantly",
      description:
        "Initial ~0.1 second consumer/merchant settlement is followed by the transactional residuals ported to your business. Final settlement occurs at the lowest network fees using Bluvision's patent-pending AI system directly to your merchants’ connected wallet.",
    },
  ];

  return (
    <section className="relative bg-[#0E0E0E] py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-30"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-center mb-10 sm:mb-12 md:mb-14">
          <div className="bg-[#00BFFF] text-black font-semibold text-sm sm:text-base md:text-lg px-6 sm:px-7 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-3.5 rounded-md shadow-md text-center">
            Qualifying BitWisdom AI Network Customers
          </div>
        </div>

        {/* 3 Cards in Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-14">
          {features.map((f) => (
            <FeatureCard key={f.number} {...f} />
          ))}
        </div>
      </div>

      {/* Larger Brain Image - Hidden on mobile to prevent collision */}
      <div className="absolute top-6 right-6 md:right-10 w-[130px] md:w-[160px] h-[130px] md:h-[160px] opacity-80 md:opacity-85 hidden sm:block">
        <img
          src={brainImg}
          alt="AI Brain"
          className="w-full h-full object-contain"
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
