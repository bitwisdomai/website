import React, { useState, useEffect, useRef } from "react";
import nodeMobileImg from "../../assets/Nodemobile.png";

const MobileNodeSection = () => {
  const [open, setOpen] = useState(false);
  const canvasRef = useRef(null);

  // Dots connecting animation
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

    // Dots system
    const dots = [];
    const dotCount = 40;
    const maxDistance = 200;

    class Dot {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = 3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Keep within bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }

      draw() {
        // Dot with glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 240, 255, 0.8)";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(0, 240, 255, 0.6)";
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner bright center
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fill();
      }
    }

    // Initialize dots
    for (let i = 0; i < dotCount; i++) {
      dots.push(new Dot());
    }

    function drawConnections() {
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            // Calculate opacity based on distance
            const opacity = (1 - distance / maxDistance) * 0.5;

            // Draw line
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections first
      drawConnections();

      // Update and draw dots
      dots.forEach((dot) => {
        dot.update();
        dot.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <>
      <style>{`
        /* Smooth floating animation for the phone */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(-12px) rotate(0.5deg); }
        }
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <section
        id="mobile-node-section"
        className="relative bg-gradient-to-br from-black via-[#0a0a0a] to-[#0d1117] text-white py-14 sm:py-16 md:py-20 lg:py-24 px-6 lg:px-12 overflow-hidden"
      >
        {/* Canvas Background Animation */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        />

        {/* Enhanced Background Glow Effects */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]"></div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Image */}
          <div className="flex justify-center md:justify-start order-2 md:order-1">
            <img
              src={nodeMobileImg}
              alt="Mobile Phone Crypto Node"
              className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[580px] h-auto drop-shadow-[0_0_30px_rgba(0,240,255,0.5)] float-animation"
              loading="lazy"
            />
          </div>

          {/* Right: Content */}
          <div className="order-1 md:order-2 space-y-6 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">
                Introducing the nodeFON - Mobile Phone Crypto Node
              </span>
              <span className="block text-cyan-300 text-xs sm:text-sm md:text-base font-light mt-1">
                (Patent-Pending)
              </span>

              
            </h2>

            {/* Main Pointers */}
            <ul className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed space-y-3 list-disc ml-5">
              <li>
                Crypto Nodes are typically bulky metal hardware or cloud-hosted
                VPS deployments.
              </li>
              <li>
                Consumers use mobile wallets to pay merchants while nodes
                validate transactions.
              </li>
              <li>
                This time, the mobile phone is the node — processing crypto
                directly.
              </li>
              <li>
                Modern smartphones are powerful, efficient, and increasingly
                affordable.
              </li>
              <li>
                Some now rival traditional nodes while using far less energy.
              </li>
              <li>
                Combined with our AI tech, they can process regional-level
                transaction loads.
              </li>
              <li>
                A node in such a small package can fundamentally reshape global
                commerce.
              </li>
            </ul>

            {/* Accordion */}
            <div className="mt-2 border border-gray-700 rounded-lg bg-transparent">
              <button
                onClick={() => setOpen(!open)}
                className="w-full text-left px-4 py-3 sm:px-5 sm:py-4 flex justify-between items-center text-sm sm:text-base font-semibold text-cyan-300 hover:text-white transition"
              >
                How is a Mobile Phone Crypto Node even possible?
                <span className="text-xl">{open ? "−" : "+"}</span>
              </button>

              {open && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed space-y-4">
                  <ul className="list-disc ml-5 space-y-2">
                    <li>
                      Custom-built devices running our proprietary software and
                      patent-pending Clearnet system.
                    </li>
                    <li>
                      1.75TB blockchain storage, powerful Octa-core CPU, and
                      high-performance memory.
                    </li>
                    <li>
                      Cooling stand ensures stable 24/7 performance under heavy
                      load.
                    </li>
                    <li>
                      Prototype ran for 6 months continuously with no failures.
                    </li>
                    <li>
                      Designed for low-power, unstable-grid environments yet
                      capable of serving global regions.
                    </li>
                    <li>
                      Traditional node hardware is still recommended for most
                      customers.
                    </li>
                    <li>
                      This invention marks a historic breakthrough in
                      decentralized infrastructure.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MobileNodeSection;
