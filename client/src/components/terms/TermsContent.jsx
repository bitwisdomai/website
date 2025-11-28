import React from "react";
import ProtectedEmail from "../common/ProtectedEmail";

const TermsContent = () => {
  const sections = [
    {
      title: "1. ACCEPTANCE OF TERMS",
      content: [
        "By accessing or using BitWisdom Ai Network's Software and Services, you agree to comply with and be legally bound by these Terms of Service, the Privacy Policy, and the AML/KYC Policy. If you are using or accessing the Software and Services on behalf of a business or organization, you represent that you have the authority to bind that entity to these Terms.",
      ],
    },
    {
      title: "2. DEFINITIONS",
      subsections: [
        {
          subtitle: "BitWisdom Ai Network",
          content:
            "Refers to BitWisdom Ai Network, Inc., the company providing the Software and Services.",
        },
        {
          subtitle: "Software",
          content:
            "The cryptocurrency transaction facilitation platform and associated services provided by BitWisdom Ai Network to Licensees, Merchants, and Consumers.",
        },
        {
          subtitle: "Licensee",
          content:
            "An individual, business or entity granted a license to access or use BitWisdom Ai Network’s Software to facilitate cryptocurrency transactions for Merchants and Consumers. A Merchant may also be a Licensee.",
        },
        {
          subtitle: "Merchant",
          content:
            "A business or entity onboarded by a Licensee to use or access BitWisdom Ai Network's Software and Services to accept cryptocurrency transactions from Consumers.",
        },
        {
          subtitle: "Consumer",
          content:
            "An individual, business, or entity interacting with a Merchant to conduct cryptocurrency transactions through BitWisdom Ai Network’s Software.",
        },
        {
          subtitle: "Services",
          content:
            "All services provided by BitWisdom Ai Network through the Software, including the facilitation of cryptocurrency transactions and residual payment processing.",
        },
      ],
    },
    {
      title: "3. LICENSE GRANT",
      content: [
        "BitWisdom Ai Network grants you a non-exclusive, non-transferable, revocable license to use and access the Software and Services for the purpose of facilitating cryptocurrency transactions, subject to the terms of this Agreement.",
        "Licensee: Licensees are granted a license to use and access BitWisdom Ai Network’s Software in accordance with these Terms and may onboard Merchants to use the Software.",
        "Merchants and Consumers: Merchants and Consumers may use and access the Software in accordance with this Agreement, as facilitated by the Licensee.",
      ],
    },
    {
      title: "4. USER REGISTRATION AND ACCOUNT SECURITY",
      content: [
        "To access and use the Software, you may be required to create an account and provide certain information, including personal, business, and financial data, as outlined in our Privacy Policy and AML/KYC Policy. You agree to provide accurate and complete information and to update it as necessary.",
        "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
        "You must immediately notify BitWisdom Ai Network if you suspect any unauthorized access or activity related to your account.",
      ],
    },
    {
      title: "5. USER RESPONSIBILITIES",
      subsections: [
        {
          subtitle: "5.1. Compliance with Laws",
          content:
            "You agree to comply with all applicable local, state, federal, and international laws, including Anti-Money Laundering (AML) and Know Your Customer (KYC) regulations, when using BitWisdom Ai Network’s Software and Services. You are responsible for ensuring that your activities comply with all legal obligations and regulations, and you agree to cooperate with BitWisdom Ai Network in any investigation related to your use of the Software.",
        },
        {
          subtitle: "5.2. Prohibited Activities",
          content:
            "You agree not to engage in any of the following activities:\n• Fraudulent or Illegal Activities: Using the Software for money laundering, terrorist financing, fraud, or any illegal activity.\n• Tampering or Disruption: Attempting to tamper with, crack password-protected files or systems, or disrupt the functionality or security of the Software, including reverse engineering or unauthorized access to any part of the platform.\n• Violation of Intellectual Property: Violating the intellectual property rights of BitWisdom Ai Network or third parties by using the Software in an unauthorized manner.\n• Misuse of Merchant Funds: Using the Software in a manner that misleads or defrauds Merchants or Consumers.\nAny violation of these prohibitions may result in the suspension or termination of your account and potential legal action.",
        },
      ],
    },
    {
      title: "6. FEES AND PAYMENTS",
      subsections: [
        {
          subtitle: "6.1. Residual Payments",
          content:
            "Licensees will receive a 1.25% residual of the cryptocurrency transaction value from the Merchants they onboard to the Software. Residuals will be calculated based on each transaction and paid to Licensees after transaction settlement.",
        },
        {
          subtitle: "6.2. License Fees",
          content:
            "Licensees are responsible for paying tiered licensing fees to BitWisdom Ai Network, as described in the Licensing Agreement section of this Agreement. These fees will be deducted from the residuals earned by Licensees from the transactions facilitated through the Software.\n• The minimum monthly licensing fee is $100 USD in Bitcoin Satoshi or the equivalent amount in cryptocurrency at the commencement date (11/24/2025).\n• The licensing fee will increase in $100 USD increments or Bitcoin Satoshi equivalent at the commencement date (11/24/2025), depending on the total transaction volume processed by Licensees' Merchants.\n• The maximum monthly licensing fee is $1,000 USD or Bitcoin Satoshi equivalent at the commencement date (11/24/2025), which will never exceed this threshold, regardless of total transaction volume.\nFees will be deducted from the Licensee's residual payments at a rate of 50% of the residuals until the total monthly licensing fee is paid.",
        },
        {
          subtitle: "6.3. Transaction Fees",
          content:
            "BitWisdom Ai Network retains a 0.19444444444% residual from every transaction processed through the Software to cover network and processing fees.\n• The total fee paid by the Merchant on each transaction will usually be around 1.5% but may fluctuate due to network conditions. BitWisdom Ai Network is not liable for fluctuations in transaction fees.",
        },
      ],
    },
    {
      title: "7. INTELLECTUAL PROPERTY RIGHTS",
      content: [
        "BitWisdom Ai Network retains all rights, title, and interest in the Software and Services, including all intellectual property rights. You acknowledge that, except for the limited license granted in these Terms, you do not acquire any ownership rights in the Software or any related intellectual property.",
        "You may not copy, modify, distribute, or reverse-engineer any part of the Software, except as expressly authorized by BitWisdom Ai Network in writing.",
      ],
    },
    {
      title: "8. TERMINATION",
      content: [
        "BitWisdom Ai Network may suspend or terminate your use and access to the Software at any time, without notice, if we believe that you have violated these Terms or if we need to comply with legal or regulatory obligations.",
        "Licensee: BitWisdom Ai Network reserves the right to terminate your license to use and access the Software and Services if you violate any term of this Agreement, including tampering with or abusing the Software.",
        "Merchants and Consumers: Access to the Software may also be terminated if your actions are deemed harmful or illegal.",
        "Upon termination, you must immediately cease using and accessing the Software and destroy any copies of the Software in your possession.",
      ],
    },
    {
      title: "9. DISCLAIMERS AND LIMITATION OF LIABILITY",
      subsections: [
        {
          subtitle: "9.1. Software Availability",
          content:
            "BitWisdom Ai Network makes no guarantees about the availability or uptime of the Software. While we strive to provide continuous access, interruptions or downtime may occur due to system maintenance, updates, or other factors.",
        },
        {
          subtitle: "9.2. Cryptocurrency Transactions",
          content:
            "Cryptocurrency transactions are inherently volatile and involve risks. BitWisdom Ai Network is not responsible for any financial loss or damages resulting from fluctuations in cryptocurrency value, failed transactions, or network issues.",
        },
        {
          subtitle: "9.3. Limitation of Liability",
          content:
            "To the fullest extent permitted by applicable law, BitWisdom Ai Network shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of your use or access of the Software or Services, even if BitWisdom Ai Network has been advised of the possibility of such damages.",
        },
        {
          subtitle: "9.4. Indemnity",
          content:
            "You agree to indemnify and hold BitWisdom Ai Network harmless from any claims, losses, or damages arising out of your breach of these Terms, including any violation of intellectual property rights or legal regulations.",
        },
      ],
    },
    {
      title: "10. ARBITRATION AND DISPUTE RESOLUTION",
      content: [
        "Any disputes arising from or relating to these Terms will be resolved through binding arbitration in Atlanta, Georgia, governed by the laws of the United States and the State of Georgia. The arbitration process will be confidential, and a neutral arbitrator will resolve the dispute.",
      ],
    },
    {
      title: "11. PRIVACY AND DATA PROTECTION",
      content: [
        "BitWisdom Ai Network respects your privacy and will handle your personal data in accordance with our Privacy Policy and AML/KYC Policy, which are incorporated by reference into these Terms.",
      ],
    },
    {
      title: "12. CHANGES TO THESE TERMS",
      content: [
        "BitWisdom Ai Network reserves the right to update or modify these Terms of Service at any time. We will notify you of significant changes by posting a revised version on our website or sending you an email. Any changes will be effective immediately upon posting.",
      ],
    },
    {
      title: "13. GOVERNING LAW",
      content: [
        "These Terms of Service will be governed by and construed in accordance with the laws of the State of Georgia, United States, without regard to its conflict of law principles.",
      ],
    },
    {
      title: "14. CONTACT US",
      content: [
        "If you have any questions or concerns about these Terms of Service, please contact us at:",
        "BitWisdom Ai Network",
      ],
      email: { user: "info", domain: "bitwisdom.ai" },
    },
  ];

  return (
    <section className="relative bg-[#0E0E0E] text-white py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
            Welcome to{" "}
            <span className="font-semibold text-cyan-400">
              BitWisdom Ai Network
            </span>
            ! These Terms of Service ("Agreement") govern your use of BitWisdom
            Ai Network's software ("Software") and related services
            ("Services"), which facilitate cryptocurrency transactions between
            merchants and consumers.
          </p>
          <p className="text-red-400 text-sm sm:text-base md:text-lg leading-relaxed mt-4 font-semibold">
            By accessing or using our Software and Services, you agree to be
            bound by these terms. If you do not agree to these terms, you must
            not use our Software or Services.
          </p>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-4">
            Effective Date: 11/24/2025
          </p>
        </div>

        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          {sections.map((section, index) => (
            <div
              key={index}
              className="group border border-cyan-400/30 rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 hover:border-cyan-400 transition-all duration-500 hover:shadow-[0_0_25px_rgba(0,191,255,0.2)]"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6">
                <span className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">
                  {section.title}
                </span>
              </h2>
              <div className="space-y-3 sm:space-y-4 md:space-y-5">
                {section.subsections ? (
                  section.subsections.map((subsection, sIndex) => (
                    <div key={sIndex} className="pl-2 sm:pl-3 md:pl-4">
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-cyan-300 mb-2 sm:mb-3">
                        {subsection.subtitle}
                      </h3>
                      <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-line">
                        {subsection.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <>
                    {section.content.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-line"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {section.email && (
                      <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                        Email:{" "}
                        <ProtectedEmail
                          user={section.email.user}
                          domain={section.email.domain}
                        />
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 bg-cyan-400/10 border border-cyan-400/50 rounded-xl p-4 sm:p-5 md:p-6 lg:p-8"
          style={{ animation: "fadeInUp 0.6s ease-out 1.5s both" }}
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-cyan-400">
            Agreement Acknowledgment
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
            By using BitWisdom Ai Network's Software and Services, you
            acknowledge that you have read, understood, and agree to be bound by
            these Terms of Service.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default TermsContent;
