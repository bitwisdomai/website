import React from "react";

const AmlKycContent = () => {
  const sections = [
    {
      title: "1. Introduction",
      content: [
        "BitWisdom Ai Network (\"the Company\") provides software solutions designed to facilitate the onboarding of merchants and the processing of financial transactions on platforms operated by our customers (\"the Customer\"). While our software enables the Customers to integrate financial transactions, it does not actively monitor or control these transactions.",
        "As a software and system provider, our role is limited to delivering the necessary tools to allow the Customers to manage merchant onboarding and transactions within their own systems. However, we acknowledge the possibility of introducing transaction monitoring features in the future. If such features are implemented, they would be designed to support the Customers' compliance efforts. In practice, transaction monitoring will not be the default functionality, and the Customers are solely responsible for their own compliance with relevant Anti-Money Laundering (AML) and Know Your Customer (KYC) regulations.",
        "This policy outlines the responsibilities of the Customers with respect to AML and KYC compliance and clarifies the scope of our company's involvement in monitoring activities."
      ]
    },
    {
      title: "2. Responsibility for AML/KYC Compliance",
      content: [
        "BitWisdom Ai Network provides the platform for the Customers to facilitate financial transactions, but the responsibility for ensuring compliance with applicable AML and KYC regulations lies with the Customer using our software. Specifically, the Customer is responsible for:",
        "Performing KYC Due Diligence: Verifying the identities of all merchants, users, and customers onboarded to their platform.",
        "Implementing AML Measures: Designing and maintaining transaction monitoring systems to detect and prevent suspicious activity.",
        "Ongoing Monitoring: Conducting periodic checks to ensure that customer and merchant data is accurate and up-to-date.",
        "Reporting Suspicious Activity: Reporting any suspicious transactions to the relevant authorities, as required by law.",
        "Our software does not actively monitor transactions by default, and the Customers are expected to implement their own systems to monitor and ensure the legitimacy of transactions conducted through their platforms."
      ]
    },
    {
      title: "3. Limitation of Liability",
      content: [
        "Given that BitWisdom Ai Network does not monitor the transactions facilitated through our software, we cannot be held liable for:",
        "Any illicit activities, such as money laundering, fraud, or terrorist financing, that occur on systems using our software.",
        "Failures or deficiencies in the Customer's transaction monitoring or KYC processes.",
        "Any penalties, fines, or legal consequences resulting from non-compliance with AML and KYC regulations.",
        "By using our software, the Customer acknowledges that they are solely responsible for ensuring that all activities conducted via their platform comply with relevant laws, including AML and KYC requirements."
      ]
    },
    {
      title: "4. Potential Future Transaction Monitoring Features",
      content: [
        "While BitWisdom Ai Network's software does not currently include active transaction monitoring as part of its standard functionality, we may explore and implement such features in the future. If such features are introduced:",
        "Opt-In Functionality: While it may be highly recommended, the Customers will be given the option to enable transaction monitoring features at their discretion.",
        "Purpose: These features, if implemented, would be designed to assist the Customers in their AML and KYC compliance efforts by providing tools for monitoring transactions.",
        "Customer Responsibility: Even if transaction monitoring features are introduced, the ultimate responsibility for ensuring compliance with all applicable laws and regulations will remain with the Customer. BitWisdom Ai Network will not assume liability for any illicit activity, even with monitoring tools enabled.",
        "In the event that such features are made available, we will provide adequate documentation and training materials to help the Customers integrate and use the monitoring tools appropriately."
      ]
    },
    {
      title: "5. Customer and Merchant Onboarding",
      content: [
        "The Customer agrees to take the following actions to comply with AML and KYC regulations:",
        "KYC Procedures: Perform appropriate KYC checks on all merchants and users onboarded to their platform to verify their identity and assess any associated risks.",
        "Ongoing Monitoring: Implement procedures to monitor transactions and identify unusual or suspicious activity in accordance with applicable regulations.",
        "Suspicious Activity Reporting: Report suspicious transactions to the relevant authorities in the jurisdiction(s) in which they operate.",
        "Risk Management: Apply a risk-based approach to merchant and customer onboarding, utilizing available tools to detect potential threats related to money laundering or fraud.",
        "BitWisdom Ai Network may request evidence of these compliance activities from time to time, but the Customer remains solely responsible for the execution and oversight of these processes."
      ]
    },
    {
      title: "6. Monitoring and Reporting Requirements",
      content: [
        "At present, BitWisdom Ai Network does not engage in transaction monitoring or conduct any direct oversight of financial transactions processed through the platforms using our software. Should transaction monitoring features be implemented in the future, the Customers using our software will still retain full responsibility for compliance with AML and KYC regulations, including:",
        "Transaction Monitoring: Identifying and flagging suspicious transactions using the available tools.",
        "Reporting: Ensuring compliance with mandatory reporting requirements, including submitting Suspicious Activity Reports (SARs) to the relevant authorities.",
        "Ongoing Due Diligence: Maintaining an up-to-date record of all merchants and users, performing periodic reviews, and ensuring that customer data remains accurate and complete."
      ]
    },
    {
      title: "7. Indemnification and Hold Harmless Clause",
      content: [
        "The Customers agree to indemnify, defend, and hold harmless BitWisdom Ai Network and its affiliates, officers, directors, employees, agents, and partners from any claims, losses, damages, liabilities, costs, and expenses (including legal fees) arising out of or related to:",
        "The Customer's failure to comply with AML and KYC regulations.",
        "The Customer's use of the software for illicit activities or the facilitation of money laundering, fraud, or other unlawful actions.",
        "The Customer's failure to implement adequate monitoring or reporting systems, even if transaction monitoring features are available.",
        "The Customers agree to bear all costs associated with the defense and settlement of any such claims."
      ]
    },
    {
      title: "8. Termination of Access to Software",
      content: [
        "BitWisdom Ai Network reserves the right to suspend or terminate access to the software if there is evidence or reasonable suspicion that any of the Customers is engaged in or facilitating unlawful activities, including money laundering or terrorist financing. Termination will occur in accordance with the terms of our Master Service Agreement (MSA) and other applicable contractual agreements."
      ]
    },
    {
      title: "9. Compliance with Applicable Laws",
      content: [
        "The Customer agrees to comply with all applicable laws and regulations related to AML, KYC, and financial crime prevention, including but not limited to:",
        "The USA PATRIOT Act (if operating in the U.S.)",
        "The European Union's Anti-Money Laundering Directives (AMLD) (if operating in the EU)",
        "Local financial regulations governing financial technologies and platforms",
        "In the event that new regulations or requirements are introduced that affect the software or the Customer's responsibilities, the Company will update this policy as needed."
      ]
    },
    {
      title: "10. Conclusion",
      content: [
        "While BitWisdom Ai Network provides the tools for financial transaction facilitation, the responsibility for compliance with AML and KYC regulations remains with the Customer. If transaction monitoring features are introduced in the future, these tools will be optional and will not alter the Customer's primary responsibility for compliance."
      ]
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">
              ANTI-MONEY LAUNDERING (AML) AND KNOW YOUR CUSTOMER (KYC) POLICY
            </span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base">
            Effective Date: 11/24/2025
          </p>
        </div>

        {/* AML/KYC Sections */}
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
                {section.content && section.content.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-line"
                  >
                    {paragraph}
                  </p>
                ))}
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
            Customer Responsibility
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
            BitWisdom Ai Network provides software tools to enable financial transaction processing, but the responsibility for AML and KYC compliance remains solely with the Customer using our software. Customers are expected to implement their own compliance systems and procedures. If you have questions about this policy, please contact us.
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

export default AmlKycContent;
