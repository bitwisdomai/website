import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const FAQContent = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question:
        "How do consumers pay merchants with crypto and how private and secure are the transactions?",
      answer:
        "When consumers are ready to checkout in-person with total goods/services/taxes calculated, merchant enters amount in a mobile crypto POS terminal app. The consumer scans the uniquely-generated QR-code with their mobile crypto wallet, or taps to pay after they verify the amount at Point of Sale. Merchant and consumer are notified in ~0.1 second settlement. E-commerce transactions are similar but the consumer can use either mobile, hardware and computer wallet types to pay for goods or services. Securely-encrypted Bitcoin transactions are virtually as private as cash transactions and using our system, this information is never shared with other businesses – ever.",
      category: "Security & Privacy",
    },
    {
      question:
        "What is and why run a crypto node, how difficult is it to run, including updating, what is the incentive and what are the costs involved?",
      answer:
        "We define a crypto node as an automated cryptocurrency transactional facilitation server. For the first time ever, we've created an every-transaction-residual, financial incentive for Qualifying BW Customers to facilitate super-fast, lightning crypto transactions for their merchants. Leave the initial setup to us. We strive to make it as uncomplicated as possible for you to run a crypto node, onboard merchants, allowing your merchants to provide a simple merchant-consumer experience. We even offer a maintenance package for updates. Relatively modest startup costs include domain name purchase, equipment and various web service subscriptions plus funding of lightning channels. Build your business a Bitcoin Strategic Reserve!",
      category: "Crypto Nodes",
    },
    {
      question:
        "What is a mobile phone crypto node and a laptop crypto node and what supported crypto node options exist?",
      answer:
        "nodeFÔN (patent-pending) is our mobile phone crypto node that facilitates transactions similarly to our powerful-spec'd business-class notebook node and both run our customized software. You can run your node of choice ranging in compute power from a Raspberry Pi to an obscenely powerful workstation/server (rack-mount or tower) or cloud-based (VPS not recommended due to service dependency), however our two offerings are power-sipping options. All of the above support our AI-powered tech (patent-pending).",
      category: "Crypto Nodes",
      hasJSX: true,
    },
    {
      question:
        "How much profit can be made running a crypto node in the BW Network and what's the commitment policy?",
      answer:
        "It depends on how many merchants are onboarded with the Qualifying BW Customer and the total transactional volume of those merchants less your operational expenses. You'll see the sky's the limit when you try out our TPE (Total Profit Estimator) and the beauty is there's no commitment – ever.",
      category: "Profitability",
    },
    {
      question:
        "Is BW competitive to traditional crypto payment gateway services and why would merchants prefer our system?",
      answer:
        "You as the customer have multiple options, however, compare our total merchant processing fees, privacy, features and full support for POS transactions. You, the customer already established relationships and earned your merchant's trust and in turn, our hopes are you will be able to offer this unique value-added service. Why give revenue to crypto payment gateway providers with complicated merchant setup requirements when the profit can be yours!",
      category: "Competitive Advantage",
    },
    {
      question:
        "What are the benefits and how quick is the settlement time for a merchant/customer transaction on the Lightning network?",
      answer:
        "Base-layer blockchain Bitcoin transactions are slow at 3.3 to 7 transactions-per-second (TPS) worldwide and cost between around 0.50% and 31.00%, while Bitcoin transactions on the Lightning network are millions of transactions-per-second and cost typically less than .01%. Initial merchant/customer settlement via Lightning on our system is ~0.1 seconds. We need coffee now!",
      category: "Transactions",
    },
    {
      question:
        "If traditional merchant transaction processing settlement takes 30+ days, what is the final settlement time and fairness level for all merchants on BW's system?",
      answer:
        "Your merchants can expect their wallet final settlement between 1 minute and 9 days, depending on amount thresholds met and network traffic. Merchant higher transactional volumes are prioritized over lower ones; however lower amounts are bumped to the front of the line if their time threshold is running out. The aim is fairness for all.",
      category: "Settlement",
    },
    {
      question:
        "What cryptocurrencies does BW support now and what will be supported in the near future?",
      answer:
        "Bitcoin and Lightning Bitcoin transactions are supported currently and when USDt Tether moves to the Lightning network, support on our system is planned to shortly follow.",
      category: "Cryptocurrencies",
    },
    {
      question:
        "Why does this system only support final transaction settlement to the merchant's wallet versus to currency?",
      answer:
        "We are fans of fund self-sovereignty, privacy and security that a crypto wallet can provide over currency. Certain hot wallets supported on our system have support for easily converting to currency.",
      category: "Settlement",
    },
    {
      question:
        "How many merchant stores can be set up on one node and how many crypto nodes can a business run?",
      answer:
        "Short answer – unlimited, however, we recommend no more than 200 merchants per node, but that also depends on the transactional volume of each merchant. Qualifying BW Customers can run as many nodes as desired.",
      category: "Scalability",
    },
    {
      question:
        "Does BW perform KYC on Qualifying BW Customers and who's responsible for KYC with onboarded merchants?",
      answer:
        "We perform KYC on our Qualifying BW Customers. Information can include verifying the identity of our customers and understanding the nature of their business relationships. This also often involves collecting documents such as identification, proof of address, and information about beneficial owners for compliance with anti-money-laundering regulations. With our system, it is your responsibility to perform KYC, and to conduct ongoing monitoring of transactions on your on-boarded merchants.",
      category: "Compliance",
    },
    {
      question:
        "What accounting/metrics are provided and does BW's system have support for merchant's proprietary POS terminal integration?",
      answer:
        "In full transparency, merchants will see their transactions, know their monthly total crypto received and their average merchant processing fees, represented as a percentage. Popular proprietary POS terminal integration is planned for end of second quarter of 2026.",
      category: "Integration",
    },
    {
      question:
        "What are the advantages of running on-premises, a powerful workstation/server for the decentralized AI System and what happens if the crypto nodes cannot reach it?",
      answer:
        "Running your own AI system server gives your node(s) high availability to the AI system and allows you to take full advantage of our Self-Healing Node Technology, simultaneously enhancing the decentralized AI systems's lowest fee effectiveness, while increasing the redundancy of our entire worldwide network of cooperative crypto nodes. We've modeled our system after the infrastructure of the Bitcoin blockchain.",
      category: "Infrastructure",
    },
    {
      question:
        "Why did BW include AI and automation in its 12 patent-pending technologies and business model?",
      answer:
        "The speed of business demands automation and we are embracing today's technology. The use of AI to allow all nodes to work in a cooperative way to settle crypto transactions at the lowest fees possible allows our system to scale. All nodes on our system already have a fallback position function to settle fees at a low fee if the AI system is not reachable and this provides for redundancy.",
      category: "Technology",
    },
    {
      question:
        "Why would someone 'Help Fund Developing Country Businesses' and who does this really help?",
      answer:
        "We welcome generosity from Bitcoiners wanting to expand worldwide adoption of Bitcoin. This crowdfunding campaign is kept separately and goes directly to developing country businesses' initial setup costs.",
      category: "Social Impact",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-[#0E0E0E] text-white py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* FAQ Accordion */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-cyan-400/30 rounded-xl overflow-hidden hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,191,255,0.2)]"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
                }}
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-start justify-between gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 text-left hover:bg-cyan-400/5 transition-all duration-300"
                >
                  <div className="flex-1 min-w-0">
                    <div className="inline-block bg-cyan-400/10 border border-cyan-400/30 rounded px-2 py-1 text-xs font-semibold text-cyan-400 mb-2">
                      {faq.category}
                    </div>
                    <h3 className="text-white text-sm sm:text-base md:text-lg font-medium leading-relaxed pr-2">
                      {faq.question}
                    </h3>
                  </div>
                  <FaChevronDown
                    className={`flex-shrink-0 text-cyan-400 text-base sm:text-lg md:text-xl transition-transform duration-300 mt-1 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer Section */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 border-t border-cyan-400/20">
                    <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed mt-3 sm:mt-4">
                      {faq.hasJSX ? (
                        <>
                          nodeFÔN<sup className="text-[0.6em]">TM</sup>{" "}
                          (patent-pending) is our mobile phone crypto node that
                          facilitates transactions similarly to our
                          powerful-spec'd business-class notebook node and both
                          run our customized software. You can run your node of
                          choice ranging in compute power from a Raspberry Pi to
                          an obscenely powerful workstation/server (rack-mount
                          or tower) or cloud-based (VPS not recommended due to
                          service dependency), however our two offerings are
                          power-sipping options. All of the above support our
                          AI-powered tech (patent-pending).
                        </>
                      ) : (
                        faq.answer
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center bg-cyan-400/10 border border-cyan-400/50 rounded-xl p-5 sm:p-6 md:p-8">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">
            Still have questions?
          </h3>
          <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-5 md:mb-6 px-2">
            Can't find the answer you're looking for? Please get in touch with
            our team.
          </p>
          <Link
            to="/contact"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-block bg-cyan-400 text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-cyan-300 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(0,191,255,0.6)] hover:scale-105 active:scale-95"
          >
            Contact Support
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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

export default FAQContent;
