import React from "react";
import ProtectedEmail from "../common/ProtectedEmail";

const CookiesContent = () => {
  const sections = [
    {
      title: "1. WHAT ARE COOKIES?",
      content: [
        "Cookies are small text files placed on your device when you visit a website. They are used to store information that can help improve your experience and make interactions with the website more efficient. Cookies can also provide us with data to analyze how users interact with our Site, ensuring that we provide the most relevant content and features.",
        "There are different types of cookies used for different purposes, which we describe below.",
      ],
    },
    {
      title: "2. TYPES OF COOKIES WE USE",
      content: ["We use the following categories of cookies on our Site:"],
      subsections: [
        {
          subtitle: "2.1. Essential Cookies",
          content:
            "These cookies are necessary for the operation of our Site and to enable the basic functions of the website, such as logging in to your account or completing transactions. Without these cookies, services you have requested, such as customer sign-ups, cannot be provided.\n\nExamples: Authentication cookies to remember your login session, or cookies that store your preferences while filling out the KYC forms.",
        },
        {
          subtitle: "2.2. Performance Cookies",
          content:
            "These cookies collect information about how visitors use our Site. For example, they help us understand how users navigate between pages, which pages they visit the most, and if they receive error messages from certain pages. These cookies do not collect personal data that could identify you. All information these cookies collect is aggregated and therefore anonymous.\n\nExamples: Google Analytics, Mixpanel, and similar tools.",
        },
        {
          subtitle: "2.3. Functionality Cookies",
          content:
            "Functionality cookies allow the Site to remember your preferences and choices (such as language selection or region) and provide enhanced, personalized features. These cookies enable us to customize your experience on our Site, providing features such as remembering your progress through the KYC forms or your previous interactions with our embedded eBay store.\n\nExamples: Language or currency preferences, personalization features.",
        },
        {
          subtitle: "2.4. Targeting or Advertising Cookies",
          content:
            "These cookies are used to deliver content that is more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns. These cookies may be set by third-party advertisers or social media platforms when you interact with their content.\n\nExamples: Cookies from advertising networks or social media platforms such as Facebook/Meta, Twitter/X, LinkedIn, or Google Ads.",
        },
        {
          subtitle: "2.5. Third-Party Cookies",
          content:
            "In addition to our own cookies, we may also use various third-party services that may set cookies on your device. These third-party cookies can be used to collect data for analytics, advertising, and social media integration. For example, if you interact with our eBay store embedded within the Site, eBay may place cookies on your device to track your usage of their platform.\n\nExamples: eBay cookies, Google Ads, Facebook Pixel.",
        },
      ],
    },
    {
      title: "3. HOW TO MANAGE COOKIES",
      content: [],
      subsections: [
        {
          subtitle: "3.1. Cookie Preferences",
          content:
            "When you first visit our Site, you will be asked to consent to the use of cookies. You can control which types of cookies are placed on your device by adjusting the settings in the Cookie Consent Banner. You may choose to accept or reject non-essential cookies by making your preferences known at that time.",
        },
        {
          subtitle: "3.2. Managing Cookies in Your Browser",
          content:
            "You can also manage cookies through your web browser settings. Most browsers allow you to refuse or accept cookies and provide options to delete cookies that have been placed on your device. The methods for doing this vary from browser to browser, so we recommend checking your browser's help section or visiting the following pages for more information on how to control and delete cookies:\n\n• Google Chrome: Google Chrome Cookie Settings\n• Mozilla Firefox: Mozilla Firefox Cookie Settings\n• Safari: Apple Safari Cookie Settings\n• Microsoft Edge: Microsoft Edge Cookie Settings\n\nIf you block or delete cookies, please note that some features of the Site may not function properly.",
        },
        {
          subtitle: "3.3. Opting Out of Third-Party Cookies",
          content:
            "If you prefer not to have your online activities tracked for advertising purposes, you can opt-out of third-party cookies through the following methods:\n\n• Google Ads: Google Ads Opt-Out\n• Facebook/Meta: Facebook Ad Settings\n• Network Advertising Initiative (NAI): NAI Opt-Out",
        },
      ],
    },
    {
      title: "4. WHY WE USE COOKIES",
      content: [
        "We use cookies for the following reasons:",
        "• To provide essential functionality and enhance your experience while using our Site.",
        "• To improve the performance, content, and functionality of our website.",
        "• To personalize your experience based on your preferences.",
        "• To gather data for analytics and improve the services we offer to our users.",
        "• To ensure that our marketing efforts, including the eBay store, are relevant to your interests.",
      ],
    },
    {
      title: "5. COOKIES AND THIRD PARTIES",
      content: [
        "Our Site may include links to third-party services such as eBay, social media platforms, and advertising networks. These third parties may place cookies on your device when you interact with their content on our Site. We do not have control over these third-party cookies, and we encourage you to review their privacy and cookie policies to learn how they use cookies and how to manage them.",
        "eBay Store: If you interact with the embedded eBay store, eBay may place cookies on your device to track your activity on their platform. We are not responsible for their cookies or privacy practices.",
      ],
    },
    {
      title: "6. CHANGES TO THIS COOKIE POLICY",
      content: [
        'We may update this Cookie Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we update this policy, we will post the revised version on our Site and indicate the "Effective Date" at the top of this policy. We encourage you to review this policy periodically to stay informed about how we use cookies and other tracking technologies.',
      ],
    },
    {
      title: "7. CONTACT US",
      content: [
        "If you have any questions or concerns about this Cookie Policy or how we handle your data, please contact us at:",
        "BitWisdom Ai Network",
      ],
      email: { user: "info", domain: "bitwisdom.ai" },
    },
    {
      title: "8. ADDITIONAL INFORMATION",
      content: [
        "For more detailed information about how we collect, use, and protect your personal data, please refer to our Privacy Policy and Terms of Service.",
      ],
    },
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
            This Cookie Policy explains how BitWisdom Ai Network ("we," "our,"
            or "us") uses cookies and similar technologies on our website
            ([Insert Website URL]) ("Site"). By using our Site, including
            signing up, submitting customer information, filling out KYC (“Know
            Your Customer”) forms, reviewing the Licensing Agreement, or
            interacting with any other feature, you consent to the use of
            cookies as described in this policy.
          </p>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-4">
            Effective Date: 11/24/2025
          </p>
        </div>

        {/* Cookies Sections */}
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
                    Email:{" "}
                    <ProtectedEmail
                      user={section.email.user}
                      domain={section.email.domain}
                    />
                  </p>
                )}

                {section.subsections &&
                  section.subsections.map((subsection, sIndex) => (
                    <div
                      key={sIndex}
                      className="pl-2 sm:pl-3 md:pl-4 mt-3 sm:mt-4"
                    >
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
            animation: "fadeInUp 0.6s ease-out 0.9s both",
          }}
        >
          <h3 className="text-lg sm:text-xl md:2xl font-bold mb-3 sm:mb-4 text-cyan-400">
            Your Consent
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
            By continuing to use the BitWisdom Ai Network website, you
            acknowledge that you have read and understood this Cookie Policy and
            consent to our use of cookies as described. You may manage your
            cookie preferences at any time through your browser settings.
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

export default CookiesContent;
