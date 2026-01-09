import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FAQ from '../models/FAQ.js';

// Load environment variables
dotenv.config();

// FAQs from the website
const websiteFAQs = [
  {
    question: "How do consumers pay merchants with crypto and how private and secure are the transactions?",
    answer: "When consumers are ready to checkout in-person with total goods/services/taxes calculated, merchant enters amount in a mobile crypto POS terminal app. The consumer scans the uniquely-generated QR-code with their mobile crypto wallet, or taps to pay after they verify the amount at Point of Sale. Merchant and consumer are notified in ~0.1 second settlement. E-commerce transactions are similar but the consumer can use either mobile, hardware and computer wallet types to pay for goods or services. Securely-encrypted Bitcoin transactions are virtually as private as cash transactions and using our system, this information is never shared with other businesses – ever.",
    category: "Security & Privacy",
    keywords: ["payment", "merchant", "consumer", "security", "privacy", "transaction", "crypto", "wallet", "qr-code"],
  },
  {
    question: "What is and why run a crypto node, how difficult is it to run, including updating, what is the incentive and what are the costs involved?",
    answer: "We define a crypto node as an automated cryptocurrency transactional facilitation server. For the first time ever, we've created an every-transaction-residual, financial incentive for Qualifying BW Customers to facilitate super-fast, lightning crypto transactions for their merchants. Leave the initial setup to us. We strive to make it as uncomplicated as possible for you to run a crypto node, onboard merchants, allowing your merchants to provide a simple merchant-consumer experience. We even offer a maintenance package for updates. Relatively modest startup costs include domain name purchase, equipment and various web service subscriptions plus funding of lightning channels. Build your business a Bitcoin Strategic Reserve!",
    category: "Crypto Nodes",
    keywords: ["node", "crypto", "setup", "cost", "incentive", "update", "merchant", "lightning"],
  },
  {
    question: "What is a mobile phone crypto node and a laptop crypto node and what supported crypto node options exist?",
    answer: "nodeFON™ (patent-pending) is our mobile phone crypto node that facilitates transactions similarly to our powerful-spec'd business-class notebook node and both run our customized software. You can run your node of choice ranging in compute power from a Raspberry Pi to an obscenely powerful workstation/server (rack-mount or tower) or cloud-based (VPS not recommended due to service dependency), however our two offerings are power-sipping options. All of the above support our AI-powered tech (patent-pending).",
    category: "Crypto Nodes",
    keywords: ["nodefon", "mobile", "laptop", "node", "options", "raspberry", "server", "cloud"],
  },
  {
    question: "How much profit can be made running a crypto node in the BW Network and what's the commitment policy?",
    answer: "It depends on how many merchants are onboarded with the Qualifying BW Customer and the total transactional volume of those merchants less your operational expenses. You'll see the sky's the limit when you try out our TPE (Total Profit Estimator) and the beauty is there's no commitment – ever.",
    category: "Profitability",
    keywords: ["profit", "revenue", "commitment", "merchant", "volume", "tpe"],
  },
  {
    question: "Is BW competitive to traditional crypto payment gateway services and why would merchants prefer our system?",
    answer: "You as the customer have multiple options, however, compare our total merchant processing fees, privacy, features and full support for POS transactions. You, the customer already established relationships and earned your merchant's trust and in turn, our hopes are you will be able to offer this unique value-added service. Why give revenue to crypto payment gateway providers with complicated merchant setup requirements when the profit can be yours!",
    category: "Competitive Advantage",
    keywords: ["competitive", "gateway", "merchant", "fees", "privacy", "pos", "service"],
  },
  {
    question: "What are the benefits and how quick is the settlement time for a merchant/customer transaction on the Lightning network?",
    answer: "Base-layer blockchain Bitcoin transactions are slow at 3.3 to 7 transactions-per-second (TPS) worldwide and cost between around 0.50% and 31.00%, while Bitcoin transactions on the Lightning network are millions of transactions-per-second and cost typically less than .01%. Initial merchant/customer settlement via Lightning on our system is ~0.1 seconds. We need coffee now!",
    category: "Transactions",
    keywords: ["lightning", "settlement", "speed", "transaction", "bitcoin", "tps"],
  },
  {
    question: "If traditional merchant transaction processing settlement takes 30+ days, what is the final settlement time and fairness level for all merchants on BW's system?",
    answer: "Your merchants can expect their wallet final settlement between 1 minute and 9 days, depending on amount thresholds met and network traffic. Merchant higher transactional volumes are prioritized over lower ones; however lower amounts are bumped to the front of the line if their time threshold is running out. The aim is fairness for all.",
    category: "Settlement",
    keywords: ["settlement", "time", "fairness", "merchant", "wallet", "processing"],
  },
  {
    question: "What cryptocurrencies does BW support now and what will be supported in the near future?",
    answer: "Bitcoin and Lightning Bitcoin transactions are supported currently and when USDt Tether moves to the Lightning network, support on our system is planned to shortly follow.",
    category: "Cryptocurrencies",
    keywords: ["bitcoin", "lightning", "tether", "usdt", "cryptocurrency", "support"],
  },
  {
    question: "Why does this system only support final transaction settlement to the merchant's wallet versus to currency?",
    answer: "We are fans of fund self-sovereignty, privacy and security that a crypto wallet can provide over currency. Certain hot wallets supported on our system have support for easily converting to currency.",
    category: "Settlement",
    keywords: ["wallet", "settlement", "currency", "conversion", "privacy", "security"],
  },
  {
    question: "How many merchant stores can be set up on one node and how many crypto nodes can a business run?",
    answer: "Short answer – unlimited, however, we recommend no more than 200 merchants per node, but that also depends on the transactional volume of each merchant. Qualifying BW Customers can run as many nodes as desired.",
    category: "Scalability",
    keywords: ["merchant", "node", "scalability", "limit", "business", "stores"],
  },
  {
    question: "Does BW perform KYC on Qualifying BW Customers and who's responsible for KYC with onboarded merchants?",
    answer: "We perform KYC on our Qualifying BW Customers. Information can include verifying the identity of our customers and understanding the nature of their business relationships. This also often involves collecting documents such as identification, proof of address, and information about beneficial owners for compliance with anti-money-laundering regulations. With our system, it is your responsibility to perform KYC, and to conduct ongoing monitoring of transactions on your on-boarded merchants.",
    category: "Compliance",
    keywords: ["kyc", "compliance", "verification", "identity", "aml", "merchants"],
  },
  {
    question: "What accounting/metrics are provided and does BW's system have support for merchant's proprietary POS terminal integration?",
    answer: "In full transparency, merchants will see their transactions, know their monthly total crypto received and their average merchant processing fees, represented as a percentage. Popular proprietary POS terminal integration is planned for end of second quarter of 2026.",
    category: "Integration",
    keywords: ["accounting", "metrics", "pos", "integration", "terminal", "transparency"],
  },
  {
    question: "What are the advantages of running on-premises, a powerful workstation/server for the decentralized AI System and what happens if the crypto nodes cannot reach it?",
    answer: "Running your own AI system server gives your node(s) high availability to the AI system and allows you to take full advantage of our Self-Healing Node Technology, simultaneously enhancing the decentralized AI systems's lowest fee effectiveness, while increasing the redundancy of our entire worldwide network of cooperative crypto nodes. We've modeled our system after the infrastructure of the Bitcoin blockchain.",
    category: "Infrastructure",
    keywords: ["ai", "server", "on-premises", "workstation", "node", "availability", "redundancy"],
  },
  {
    question: "Why did BW include AI and automation in its 12 patent-pending technologies and business model?",
    answer: "The speed of business demands automation and we are embracing today's technology. The use of AI to allow all nodes to work in a cooperative way to settle crypto transactions at the lowest fees possible allows our system to scale. All nodes on our system already have a fallback position function to settle fees at a low fee if the AI system is not reachable and this provides for redundancy.",
    category: "Technology",
    keywords: ["ai", "automation", "patent", "technology", "node", "cooperation", "scaling"],
  },
  {
    question: "Why would someone 'Help Fund Developing Country Businesses' and who does this really help?",
    answer: "We welcome generosity from Bitcoiners wanting to expand worldwide adoption of Bitcoin. This crowdfunding campaign is kept separately and goes directly to developing country businesses' initial setup costs.",
    category: "Social Impact",
    keywords: ["funding", "developing", "country", "crowdfunding", "bitcoin", "adoption"],
  },
];

async function syncFAQs() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing FAQs (optional - comment out if you want to keep existing ones)
    // await FAQ.deleteMany({});
    // console.log('🗑️  Cleared existing FAQs');

    // Insert or update FAQs
    let insertedCount = 0;
    let updatedCount = 0;

    for (const faqData of websiteFAQs) {
      const existing = await FAQ.findOne({ question: faqData.question });

      if (existing) {
        // Update existing FAQ
        await FAQ.findByIdAndUpdate(existing._id, {
          answer: faqData.answer,
          category: faqData.category,
          keywords: faqData.keywords,
          isActive: true,
        });
        updatedCount++;
        console.log(`📝 Updated: ${faqData.question.substring(0, 50)}...`);
      } else {
        // Create new FAQ
        const faq = new FAQ({
          question: faqData.question,
          answer: faqData.answer,
          category: faqData.category,
          keywords: faqData.keywords,
          priority: 5, // Give website FAQs higher priority
          isActive: true,
        });
        await faq.save();
        insertedCount++;
        console.log(`✨ Created: ${faqData.question.substring(0, 50)}...`);
      }
    }

    console.log('\n🎉 FAQ Sync Complete!');
    console.log(`📊 Statistics:`);
    console.log(`   - Total FAQs processed: ${websiteFAQs.length}`);
    console.log(`   - New FAQs inserted: ${insertedCount}`);
    console.log(`   - Existing FAQs updated: ${updatedCount}`);
    console.log(`\n✅ The chatbot can now use these FAQs to answer questions!`);

  } catch (error) {
    console.error('❌ Error syncing FAQs:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
  }
}

// Run the sync
syncFAQs();
