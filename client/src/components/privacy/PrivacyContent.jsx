import React from "react";
import ProtectedEmail from "../common/ProtectedEmail";

const PrivacyContent = () => {
  const sections = [
    {
      title: "1. INFORMATION WE COLLECT",
      content: [
        "We collect personal and business information from users, including Licensees, Merchants, and Consumers, as necessary for the provision of our Software and services. The information we collect includes:"
      ],
      subsections: [
        {
          subtitle: "1.1. Personal Information",
          content: "Identification Information: Name, email address, phone number, and government-issued identification (e.g., passport, driver's license).\n\nAccount Information: Usernames, passwords, and other credentials necessary for accessing and using our Software.\n\nContact Information: Mailing address, phone number, and email address.\n\nFinancial Information: Cryptocurrency wallet addresses, transaction history, and banking details (where applicable for payment processing).\n\nVerification Documents: Documents used for Know Your Customer (KYC) compliance, including government-issued IDs, utility bills, tax identification numbers, etc."
        },
        {
          subtitle: "1.2. Business Information (for Merchants)",
          content: "Business Name: Legal name of the business or entity using our Software.\n\nBusiness Address: Physical and mailing addresses.\n\nBusiness Registration Documents: Documents verifying the legitimacy and registration of the business.\n\nTax Identification Number: For tax and financial reporting purposes."
        },
        {
          subtitle: "1.3. Transaction Information",
          content: "Transaction Details: Information related to cryptocurrency transactions, including amounts, dates, addresses, and merchants involved.\n\nResidual Information: Data related to residual payments and associated fee structures based on transactions processed by merchants."
        },
        {
          subtitle: "1.4. Technical Data",
          content: "Usage Data: Information about how you interact with our Software, including system logs, device information, IP addresses, browser type, and other diagnostic data.\n\nCookies and Tracking Technologies: We use cookies, web beacons, and similar technologies to collect usage data, track user preferences, and enhance the user experience."
        }
      ]
    },
    {
      title: "2. HOW WE USE YOUR INFORMATION",
      content: [
        "We use the information we collect for various purposes, including:"
      ],
      subsections: [
        {
          subtitle: "2.1. To Provide Our Services",
          content: "To process cryptocurrency transactions and enable residual payments to Licensees based on transactions facilitated through our Software.\n\nTo onboard Merchants and Consumers, verify their identities, and facilitate their use of our Software.\n\nTo provide customer support, respond to inquiries, and troubleshoot issues with the Software."
        },
        {
          subtitle: "2.2. To Comply with Legal and Regulatory Obligations",
          content: "To comply with Anti-Money Laundering (AML) and Know Your Customer (KYC) requirements, including verifying user identities and monitoring transactions for suspicious activity.\n\nTo comply with applicable laws, regulations, and governmental or legal requests."
        },
        {
          subtitle: "2.3. To Improve Our Services",
          content: "To analyze usage patterns and trends in order to improve our Software and services.\n\nTo conduct research and development to enhance functionality and user experience."
        },
        {
          subtitle: "2.4. For Security and Fraud Prevention",
          content: "To detect, prevent, and respond to fraud, unauthorized access, or any activity that violates our Terms of Service or applicable laws.\n\nTo monitor and ensure the security of our Software and protect user data."
        },
        {
          subtitle: "2.5. For Marketing and Communications",
          content: "To send you updates, newsletters, promotional materials, or other communications related to our Software and services (with your consent, where required).\n\nTo inform you of changes to our services, policies, or Software features."
        }
      ]
    },
    {
      title: "3. HOW WE SHARE YOUR INFORMATION",
      content: [
        "We do not sell, rent, or trade your personal information to third parties. However, we may share your information in the following circumstances:"
      ],
      subsections: [
        {
          subtitle: "3.1. With Service Providers",
          content: "We may share your information with trusted third-party service providers who assist us in operating our Software, conducting our business, or servicing you, such as payment processors, hosting services, and security providers. These providers are required to keep your information confidential and use it only for the purposes for which we disclose it to them."
        },
        {
          subtitle: "3.2. With Legal Authorities",
          content: "We may disclose your information to governmental authorities, law enforcement, or regulatory bodies if required by law or if we believe that such disclosure is necessary to:\n\n• Comply with legal obligations, including AML/KYC regulations.\n• Protect and defend our rights or property.\n• Prevent or investigate potential fraud or security breaches.\n• Respond to lawful requests or court orders."
        },
        {
          subtitle: "3.3. Business Transfers",
          content: "In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred to the acquiring entity as part of the transaction. We will notify you of any such transfer and provide you with the opportunity to opt-out if applicable."
        },
        {
          subtitle: "3.4. With Your Consent",
          content: "We may share your information with third parties if you have provided explicit consent to do so."
        }
      ]
    },
    {
      title: "4. DATA RETENTION",
      content: [
        "We will retain your personal information only as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. After this period, we will securely delete or anonymize your data, unless we are required by law to retain it for a longer period.",
        "Transaction data and related records may be retained for a longer period to comply with regulatory requirements, including AML/KYC laws."
      ]
    },
    {
      title: "5. SECURITY OF YOUR INFORMATION",
      content: [
        "We take the security of your personal information seriously and use industry-standard measures to protect it, including:",
        "• Encryption: We use encryption technologies to secure data during transmission and storage.\n• Access Controls: We implement strict access controls to ensure that only authorized personnel can access your personal information.\n• Regular Security Audits: We regularly assess our security practices to identify and mitigate potential vulnerabilities.",
        "However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security."
      ]
    },
    {
      title: "6. YOUR RIGHTS AND CHOICES",
      content: [
        "Depending on your location and applicable laws, you may have the following rights regarding your personal information:"
      ],
      subsections: [
        {
          subtitle: "6.1. Access and Correction",
          content: "You have the right to access and update your personal information at any time. You can do so by contacting us directly."
        },
        {
          subtitle: "6.2. Data Portability",
          content: "You have the right to request a copy of your personal information in a structured, commonly used, and machine-readable format."
        },
        {
          subtitle: "6.3. Deletion",
          content: "You have the right to request the deletion of your personal information, subject to certain legal obligations (such as AML/KYC requirements) that may require us to retain certain data."
        },
        {
          subtitle: "6.4. Opt-Out of Marketing Communications",
          content: "You may opt-out of receiving marketing communications from us at any time by following the unsubscribe instructions in the emails we send or by contacting us directly."
        },
        {
          subtitle: "6.5. Withdraw Consent",
          content: "If you have provided consent for us to process your personal information, you may withdraw that consent at any time. However, this will not affect the lawfulness of processing based on consent before its withdrawal."
        }
      ]
    },
    {
      title: "7. COOKIES AND TRACKING TECHNOLOGIES",
      content: [
        "We use cookies and similar tracking technologies to collect information about your interactions with our Software. Cookies are small data files stored on your device that help us enhance your experience, analyze usage, and provide personalized content.",
        "You can manage or disable cookies through your browser settings. However, disabling cookies may affect the functionality of our Software."
      ]
    },
    {
      title: "8. CHILDREN'S PRIVACY",
      content: [
        "Our Software and services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal information from a child, we will take steps to delete such information promptly."
      ]
    },
    {
      title: "9. INTERNATIONAL DATA TRANSFERS",
      content: [
        "Your personal information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. By using our Software, you consent to the transfer of your information to countries outside of your jurisdiction, including the United States.",
        "We will take appropriate measures to ensure that your personal information is treated securely and in accordance with this Privacy Policy and applicable data protection laws."
      ]
    },
    {
      title: "10. CHANGES TO THIS PRIVACY POLICY",
      content: [
        "We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or other factors. When we make changes, we will update the \"Effective Date\" at the top of this Privacy Policy and notify you through our Software or via email.",
        "Your continued use of our Software after any changes to this Privacy Policy constitutes your acceptance of the updated terms."
      ]
    },
    {
      title: "11. CONTACT US",
      content: [
        "If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal information, please contact us at:",
        "BitWisdom Ai Network",
        "Address: [To be provided upon request]"
      ],
      email: { user: "info", domain: "bitwisdom.ai" }
    }
  ];

  return (
    <section className="relative bg-[#0E0E0E] text-white py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Introduction */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
            <span className="font-semibold text-cyan-400">BitWisdom Ai Network<sup>TM</sup></span> ("we," "our," or "us") is committed to protecting the privacy of our customers, merchants, and users ("you" or "your") who use our cryptocurrency transaction facilitation software ("Software") and related services. This Privacy Policy outlines the types of personal information we collect, how we use it, and how we safeguard your privacy.
          </p>
          <p className="text-red-400 text-sm sm:text-base md:text-lg leading-relaxed mt-4 font-semibold">
            By accessing or using our Software and services, you agree to the terms of this Privacy Policy.
          </p>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-4">
            Effective Date: 11/24/2025
          </p>
        </div>

        {/* Privacy Sections */}
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
                    Email: <ProtectedEmail user={section.email.user} domain={section.email.domain} />
                  </p>
                )}
                {section.subsections && section.subsections.map((subsection, sIndex) => (
                  <div key={sIndex} className="pl-2 sm:pl-3 md:pl-4 mt-3 sm:mt-4">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-cyan-300 mb-2 sm:mb-3">
                      {subsection.subtitle}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-line">
                      {subsection.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div
          className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 bg-cyan-400/10 border border-cyan-400/50 rounded-xl p-4 sm:p-5 md:p-6 lg:p-8"
          style={{
            animation: "fadeInUp 0.6s ease-out 1.2s both",
          }}
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-cyan-400">
            Your Privacy Matters
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
            BitWisdom Ai Network is committed to protecting your privacy and
            maintaining the security of your personal information. We encourage
            you to review this Privacy Policy regularly to stay informed about
            our data practices. If you have any questions or concerns, please do
            not hesitate to contact us using the information provided above.
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

export default PrivacyContent;
