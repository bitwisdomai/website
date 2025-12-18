import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import FAQ from '../models/FAQ.js';

dotenv.config();

const faqs = [
  {
    question: 'What is BitWisdom?',
    answer: 'BitWisdom is a cryptocurrency and blockchain technology company that provides innovative solutions for node hosting, crypto payments, and blockchain integration services.',
    category: 'General',
    keywords: ['bitwisdom', 'about', 'company', 'cryptocurrency', 'blockchain'],
    priority: 10,
  },
  {
    question: 'What services does BitWisdom offer?',
    answer: 'We offer crypto node hosting (both laptop and mobile nodes), cryptocurrency payment integration for e-commerce platforms, blockchain consulting, and custom blockchain solutions.',
    category: 'Services',
    keywords: ['services', 'offerings', 'products', 'node hosting', 'crypto payments'],
    priority: 9,
  },
  {
    question: 'How do I get started with BitWisdom?',
    answer: 'You can get started by filling out our qualifying form on the website. Our team will review your application and get in touch with you to discuss your specific needs and requirements.',
    category: 'Getting Started',
    keywords: ['start', 'begin', 'signup', 'register', 'qualify'],
    priority: 8,
  },
  {
    question: 'What is a crypto node?',
    answer: 'A crypto node is a computer that participates in a blockchain network by validating and relaying transactions. Running a node helps secure the network and can earn you rewards.',
    category: 'Technical',
    keywords: ['node', 'crypto node', 'blockchain', 'mining', 'validator'],
    priority: 7,
  },
  {
    question: 'How much does it cost?',
    answer: 'Our pricing varies based on the specific service you need. Please contact our sales team or fill out the qualifying form for a personalized quote based on your requirements.',
    category: 'Pricing',
    keywords: ['price', 'cost', 'pricing', 'fee', 'payment'],
    priority: 8,
  },
  {
    question: 'What cryptocurrencies do you support?',
    answer: 'We support major cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), and various other altcoins. The specific cryptocurrencies available depend on the service you choose.',
    category: 'Technical',
    keywords: ['cryptocurrency', 'bitcoin', 'ethereum', 'altcoin', 'supported'],
    priority: 6,
  },
  {
    question: 'How secure is BitWisdom?',
    answer: 'Security is our top priority. We implement industry-standard security measures including encryption, multi-factor authentication, regular security audits, and compliance with AML/KYC regulations.',
    category: 'Security',
    keywords: ['security', 'safe', 'secure', 'protection', 'safety'],
    priority: 7,
  },
  {
    question: 'Can I integrate BitWisdom with my e-commerce platform?',
    answer: 'Yes! We offer seamless integration with major e-commerce platforms including Shopify, WooCommerce, Magento, and more. Our team can help with the integration process.',
    category: 'Integration',
    keywords: ['integration', 'ecommerce', 'shopify', 'woocommerce', 'platform'],
    priority: 6,
  },
  {
    question: 'How do I contact support?',
    answer: 'You can contact our support team through the contact form on our website, or email us at support@bitwisdom.com. We typically respond within 24 hours.',
    category: 'Support',
    keywords: ['support', 'contact', 'help', 'assistance', 'customer service'],
    priority: 9,
  },
  {
    question: 'What are your business hours?',
    answer: 'Our support team is available Monday through Friday, 9 AM to 6 PM EST. For urgent matters, we offer 24/7 emergency support for premium clients.',
    category: 'Support',
    keywords: ['hours', 'availability', 'time', 'schedule', 'open'],
    priority: 5,
  },
  {
    question: 'Do you offer training or documentation?',
    answer: 'Yes, we provide comprehensive documentation and training materials for all our services. Premium clients also get access to one-on-one training sessions with our experts.',
    category: 'Support',
    keywords: ['training', 'documentation', 'tutorial', 'guide', 'learn'],
    priority: 5,
  },
  {
    question: 'What is your refund policy?',
    answer: 'We offer a 30-day money-back guarantee for most services. If you\'re not satisfied, contact our support team to discuss refund options. Terms and conditions apply.',
    category: 'Billing',
    keywords: ['refund', 'money back', 'guarantee', 'return', 'policy'],
    priority: 6,
  },
  {
    question: 'How long does setup take?',
    answer: 'Setup time varies by service. Crypto node hosting typically takes 24-48 hours, while payment integration can take 3-5 business days depending on complexity.',
    category: 'Getting Started',
    keywords: ['setup', 'installation', 'time', 'duration', 'implementation'],
    priority: 6,
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can upgrade or downgrade your service plan at any time. Changes will be reflected in your next billing cycle. Contact support for assistance.',
    category: 'Billing',
    keywords: ['upgrade', 'downgrade', 'plan', 'change', 'modify'],
    priority: 5,
  },
  {
    question: 'Is there a minimum contract period?',
    answer: 'Most of our services are offered on a month-to-month basis with no long-term contracts required. However, annual plans are available at a discounted rate.',
    category: 'Billing',
    keywords: ['contract', 'commitment', 'term', 'period', 'duration'],
    priority: 5,
  },
];

async function seedFAQs() {
  try {
    console.log('🌱 Starting FAQ seeding...');

    await connectDB();

    // Clear existing FAQs (optional - comment out if you want to keep existing ones)
    await FAQ.deleteMany({});
    console.log('✓ Cleared existing FAQs');

    // Insert new FAQs
    const inserted = await FAQ.insertMany(faqs);
    console.log(`✓ Successfully seeded ${inserted.length} FAQs`);

    console.log('\n📊 FAQ Summary:');
    const categories = await FAQ.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    categories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} FAQs`);
    });

    console.log('\n✅ FAQ seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding FAQs:', error);
    process.exit(1);
  }
}

seedFAQs();
