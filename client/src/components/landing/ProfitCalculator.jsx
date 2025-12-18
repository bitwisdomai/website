import React, { useState, useEffect, useRef } from "react";

// Currency configuration with symbols and exchange rates (approximate rates)
const CURRENCIES = {
  // Americas
  USD: { symbol: "$", name: "US Dollar", rate: 1 },
  CAD: { symbol: "C$", name: "Canadian Dollar", rate: 1.36 },
  MXN: { symbol: "$", name: "Mexican Peso", rate: 17.08 },
  BRL: { symbol: "R$", name: "Brazilian Real", rate: 4.97 },
  ARS: { symbol: "$", name: "Argentine Peso", rate: 350.0 },
  CLP: { symbol: "$", name: "Chilean Peso", rate: 890.0 },
  COP: { symbol: "$", name: "Colombian Peso", rate: 3950.0 },
  PEN: { symbol: "S/", name: "Peruvian Sol", rate: 3.72 },

  // Europe
  EUR: { symbol: "€", name: "Euro", rate: 0.92 },
  GBP: { symbol: "£", name: "British Pound", rate: 0.79 },
  CHF: { symbol: "Fr", name: "Swiss Franc", rate: 0.88 },
  NOK: { symbol: "kr", name: "Norwegian Krone", rate: 10.85 },
  SEK: { symbol: "kr", name: "Swedish Krona", rate: 10.6 },
  DKK: { symbol: "kr", name: "Danish Krone", rate: 6.87 },
  PLN: { symbol: "zł", name: "Polish Zloty", rate: 4.02 },
  CZK: { symbol: "Kč", name: "Czech Koruna", rate: 22.5 },
  HUF: { symbol: "Ft", name: "Hungarian Forint", rate: 355.0 },
  RON: { symbol: "lei", name: "Romanian Leu", rate: 4.57 },
  BGN: { symbol: "лв", name: "Bulgarian Lev", rate: 1.8 },
  RUB: { symbol: "₽", name: "Russian Ruble", rate: 92.0 },
  UAH: { symbol: "₴", name: "Ukrainian Hryvnia", rate: 36.5 },
  TRY: { symbol: "₺", name: "Turkish Lira", rate: 32.5 },

  // Asia
  INR: { symbol: "₹", name: "Indian Rupee", rate: 83.12 },
  CNY: { symbol: "¥", name: "Chinese Yuan", rate: 7.24 },
  JPY: { symbol: "¥", name: "Japanese Yen", rate: 149.5 },
  KRW: { symbol: "₩", name: "South Korean Won", rate: 1330.0 },
  SGD: { symbol: "S$", name: "Singapore Dollar", rate: 1.35 },
  HKD: { symbol: "HK$", name: "Hong Kong Dollar", rate: 7.83 },
  TWD: { symbol: "NT$", name: "Taiwan Dollar", rate: 31.5 },
  THB: { symbol: "฿", name: "Thai Baht", rate: 34.8 },
  MYR: { symbol: "RM", name: "Malaysian Ringgit", rate: 4.48 },
  IDR: { symbol: "Rp", name: "Indonesian Rupiah", rate: 15650.0 },
  PHP: { symbol: "₱", name: "Philippine Peso", rate: 56.5 },
  VND: { symbol: "₫", name: "Vietnamese Dong", rate: 24500.0 },
  PKR: { symbol: "₨", name: "Pakistani Rupee", rate: 278.0 },
  BDT: { symbol: "৳", name: "Bangladeshi Taka", rate: 110.0 },
  LKR: { symbol: "Rs", name: "Sri Lankan Rupee", rate: 325.0 },
  NPR: { symbol: "Rs", name: "Nepalese Rupee", rate: 133.0 },

  // Middle East
  AED: { symbol: "د.إ", name: "UAE Dirham", rate: 3.67 },
  SAR: { symbol: "﷼", name: "Saudi Riyal", rate: 3.75 },
  QAR: { symbol: "﷼", name: "Qatari Riyal", rate: 3.64 },
  KWD: { symbol: "د.ك", name: "Kuwaiti Dinar", rate: 0.31 },
  OMR: { symbol: "﷼", name: "Omani Rial", rate: 0.38 },
  BHD: { symbol: "د.ب", name: "Bahraini Dinar", rate: 0.38 },
  ILS: { symbol: "₪", name: "Israeli Shekel", rate: 3.65 },
  JOD: { symbol: "د.ا", name: "Jordanian Dinar", rate: 0.71 },

  // Oceania
  AUD: { symbol: "A$", name: "Australian Dollar", rate: 1.53 },
  NZD: { symbol: "NZ$", name: "New Zealand Dollar", rate: 1.66 },

  // Africa
  ZAR: { symbol: "R", name: "South African Rand", rate: 18.5 },
  EGP: { symbol: "E£", name: "Egyptian Pound", rate: 30.9 },
  NGN: { symbol: "₦", name: "Nigerian Naira", rate: 1540.0 },
  KES: { symbol: "KSh", name: "Kenyan Shilling", rate: 129.0 },
  GHS: { symbol: "₵", name: "Ghanaian Cedi", rate: 15.5 },
  MAD: { symbol: "د.م.", name: "Moroccan Dirham", rate: 10.1 },
  TND: { symbol: "د.ت", name: "Tunisian Dinar", rate: 3.1 },
};

// Country to currency mapping (expanded to 100+ countries)
const COUNTRY_CURRENCY_MAP = {
  // Americas
  US: "USD",
  CA: "CAD",
  MX: "MXN",
  BR: "BRL",
  AR: "ARS",
  CL: "CLP",
  CO: "COP",
  PE: "PEN",
  VE: "USD",
  EC: "USD",
  BO: "USD",
  PY: "USD",
  UY: "USD",
  CR: "USD",
  PA: "USD",
  GT: "USD",
  HN: "USD",
  SV: "USD",
  NI: "USD",
  DO: "USD",
  CU: "USD",
  JM: "USD",
  HT: "USD",
  TT: "USD",

  // Europe
  GB: "GBP",
  IE: "EUR",
  CH: "CHF",
  NO: "NOK",
  SE: "SEK",
  DK: "DKK",
  PL: "PLN",
  CZ: "CZK",
  HU: "HUF",
  RO: "RON",
  BG: "BGN",
  RU: "RUB",
  UA: "UAH",
  TR: "TRY",
  RS: "EUR",
  HR: "EUR",
  BA: "EUR",
  MK: "EUR",
  AL: "EUR",
  XK: "EUR",
  ME: "EUR",
  IS: "EUR",
  BY: "RUB",

  // EU countries using Euro
  DE: "EUR",
  FR: "EUR",
  IT: "EUR",
  ES: "EUR",
  NL: "EUR",
  BE: "EUR",
  AT: "EUR",
  PT: "EUR",
  FI: "EUR",
  GR: "EUR",
  LU: "EUR",
  SI: "EUR",
  CY: "EUR",
  MT: "EUR",
  SK: "EUR",
  EE: "EUR",
  LV: "EUR",
  LT: "EUR",

  // Asia
  IN: "INR",
  CN: "CNY",
  JP: "JPY",
  KR: "KRW",
  SG: "SGD",
  HK: "HKD",
  TW: "TWD",
  TH: "THB",
  MY: "MYR",
  ID: "IDR",
  PH: "PHP",
  VN: "VND",
  PK: "PKR",
  BD: "BDT",
  LK: "LKR",
  NP: "NPR",
  MM: "USD",
  KH: "USD",
  LA: "USD",
  MN: "USD",
  BN: "USD",
  MO: "HKD",
  KZ: "USD",
  UZ: "USD",
  TM: "USD",
  TJ: "USD",
  KG: "USD",
  AF: "USD",

  // Middle East
  AE: "AED",
  SA: "SAR",
  QA: "QAR",
  KW: "KWD",
  OM: "OMR",
  BH: "BHD",
  IL: "ILS",
  JO: "JOD",
  LB: "USD",
  SY: "USD",
  IQ: "USD",
  YE: "USD",
  IR: "USD",
  PS: "USD",

  // Oceania
  AU: "AUD",
  NZ: "NZD",
  FJ: "USD",
  PG: "USD",
  NC: "EUR",
  PF: "EUR",

  // Africa
  ZA: "ZAR",
  EG: "EGP",
  NG: "NGN",
  KE: "KES",
  GH: "GHS",
  MA: "MAD",
  TN: "TND",
  DZ: "USD",
  LY: "USD",
  SD: "USD",
  ET: "USD",
  TZ: "USD",
  UG: "USD",
  AO: "USD",
  MZ: "USD",
  ZW: "USD",
  BW: "USD",
  NA: "USD",
  ZM: "USD",
  MW: "USD",
  RW: "USD",
  SN: "USD",
  CI: "EUR",
  CM: "EUR",
  MG: "USD",
  ML: "EUR",
  BF: "EUR",
  NE: "EUR",
  TD: "EUR",
  MR: "USD",
  BJ: "EUR",
  TG: "EUR",
  SL: "USD",
  LR: "USD",
  GM: "USD",
  GN: "USD",
};

const ProfitCalculator = () => {
  const canvasRef = useRef(null);
  const [totalAmount, setTotalAmount] = useState(50000);
  const [monthlyProfit, setMonthlyProfit] = useState(0);
  const [annualProfit, setAnnualProfit] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [isDetecting, setIsDetecting] = useState(true);

  // Auto-detect user's country and set currency
  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Try to get location from ipapi.co (free, no API key needed)
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        if (data.country_code) {
          const detectedCurrency =
            COUNTRY_CURRENCY_MAP[data.country_code] || "USD";
          setCurrency(detectedCurrency);

          // Convert default amount to detected currency
          const rate = CURRENCIES[detectedCurrency].rate;
          setTotalAmount(Math.round(50000 * rate));
        }
      } catch (error) {
        console.log("Could not detect location, defaulting to USD");
        setCurrency("USD");
      } finally {
        setIsDetecting(false);
      }
    };

    detectLocation();
  }, []);

  // Background Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 130})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  // Calculate profit with currency conversion
  const calculateProfit = () => {
    const total = Number(totalAmount);
    const currentRate = CURRENCIES[currency].rate;

    // Convert to USD for calculation (base currency)
    const totalInUSD = total / currentRate;

    // 1. Gross amount (1.25%)
    const grossAmountUSD = totalInUSD * 0.0125;

    // 2. Fee calculation (tiers)
    let feeUSD = Math.ceil(totalInUSD / 16000) * 100;
    if (feeUSD > 1000) feeUSD = 1000; // cap fee

    // 3. Profit in USD
    const profitUSD = grossAmountUSD - feeUSD;

    // Convert back to selected currency
    const profitInCurrency = profitUSD * currentRate;

    setMonthlyProfit(profitInCurrency);
    setAnnualProfit(profitInCurrency * 12);
  };

  useEffect(() => {
    calculateProfit();
  }, [totalAmount, currency]);

  const resetToDefaults = () => {
    const rate = CURRENCIES[currency].rate;
    setTotalAmount(Math.round(50000 * rate));
  };

  const handleCurrencyChange = (newCurrency) => {
    const oldRate = CURRENCIES[currency].rate;
    const newRate = CURRENCIES[newCurrency].rate;

    // Convert current amount to new currency
    const amountInUSD = totalAmount / oldRate;
    const convertedAmount = Math.round(amountInUSD * newRate);

    setCurrency(newCurrency);
    setTotalAmount(convertedAmount);
  };

  const formatCurrency = (amount) => {
    const symbol = CURRENCIES[currency].symbol;
    return `${symbol}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="relative min-h-screen bg-[#0E0E0E] text-white flex flex-col justify-start overflow-hidden">
      {/* Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-30"
      />

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-[1600px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-8 sm:pb-12 md:pb-14 lg:pb-16">
        {/* Heading */}
        <div className="mb-6 sm:mb-8 text-left max-w-5xl">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold leading-tight tracking-wide">
            <span className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">
              Total Profit Estimator — Running a Crypto Node on the BitWisdom AI
              Network
            </span>
          </h1>
          <p className="text-gray-300 mt-2 sm:mt-3 text-xs sm:text-sm md:text-base">
            Enter the Total Amount of Transactions for all Merchants on your
            Crypto Node
          </p>
        </div>

        {/* Calculator Box */}
        <div className="bg-transparent text-white border border-[#00f0ff] rounded-lg shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14">
          {/* LEFT SECTION */}
          <div>
            <div className="mb-6 sm:mb-8 md:mb-12">
              <label className="block text-white text-sm sm:text-base font-semibold mb-2 sm:mb-3">
                Total Monthly Transactions ({currency})
                {isDetecting && (
                  <span className="text-sky-500 text-xs sm:text-sm font-normal ml-2">
                    (Detecting currency...)
                  </span>
                )}
              </label>
              <input
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#00f0ff] rounded-md px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 md:py-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-400 text-base sm:text-lg"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-12">
              <button
                onClick={resetToDefaults}
                className="w-full sm:w-auto border border-[#00f0ff] text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-md hover:bg-[#00f0ff] hover:text-black transition text-sm sm:text-base"
              >
                Reset to Defaults
              </button>
            </div>

            <p className="text-white text-xs sm:text-sm leading-relaxed mt-6 sm:mt-8 md:mt-12 max-w-2xl">
              *This estimate does not include equipment, electricity, or other
              overhead costs. Profit is based on BitWisdom's gross model minus
              tiered operational fees.
            </p>
          </div>

          {/* RIGHT SECTION */}
          <div className="bg-[#00f0ff] rounded-md p-4 sm:p-6 md:p-8 border border-[#00f0ff] shadow-inner self-start lg:sticky lg:top-4">
            <div className="mb-6 sm:mb-8 md:mb-10">
              <p className="text-black text-sm sm:text-base font-medium mb-1 sm:mb-2">
                Estimated Monthly Profit
              </p>
              <p className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold break-words">
                {formatCurrency(monthlyProfit)}
              </p>
            </div>

            <div className="border-t border-black my-4 sm:my-6 md:my-8"></div>

            <div>
              <p className="text-black text-sm sm:text-base font-medium mb-1 sm:mb-2">
                Estimated Annual Profit
              </p>
              <p className="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold break-words">
                {formatCurrency(annualProfit)}
              </p>
              <p className="text-black text-xs mt-2 sm:mt-3">
                Auto-detected: {CURRENCIES[currency].name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitCalculator;
