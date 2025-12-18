import { GoogleGenAI } from '@google/genai';
import FAQ from '../models/FAQ.js';
import ScrapingService from './scrapingService.js';

class ChatbotService {
  constructor() {
    // Initialize with the new SDK - automatically uses GEMINI_API_KEY env var
    this.ai = new GoogleGenAI({});
    this.modelName = 'gemini-2.5-flash'; // Using Gemini 2.5 Flash
  }

  // Search FAQs for relevant answers
  async searchFAQs(query) {
    try {
      // First try text search
      const faqs = await FAQ.find(
        {
          $text: { $search: query },
          isActive: true,
        },
        {
          score: { $meta: 'textScore' },
        }
      )
        .sort({ score: { $meta: 'textScore' } })
        .limit(3);

      // If no results, try keyword matching
      if (faqs.length === 0) {
        const keywords = query.toLowerCase().split(' ').filter(word => word.length > 3);
        const keywordFaqs = await FAQ.find({
          isActive: true,
          keywords: { $in: keywords },
        })
          .sort({ priority: -1 })
          .limit(3);

        return keywordFaqs;
      }

      return faqs;
    } catch (error) {
      console.error('Error searching FAQs:', error);
      return [];
    }
  }

  // Get relevant website content
  async getRelevantContent(query) {
    try {
      const results = await ScrapingService.searchContent(query);
      return results;
    } catch (error) {
      console.error('Error getting relevant content:', error);
      return [];
    }
  }

  // Build context from website content and FAQs
  async buildContext(query) {
    const [faqs, websiteContent] = await Promise.all([
      this.searchFAQs(query),
      this.getRelevantContent(query),
    ]);

    let context = '';

    // Add FAQ context
    if (faqs.length > 0) {
      context += 'Frequently Asked Questions:\n\n';
      faqs.forEach((faq, index) => {
        context += `Q${index + 1}: ${faq.question}\nA${index + 1}: ${faq.answer}\n\n`;
        // Update FAQ views
        faq.views += 1;
        faq.save().catch(err => console.error('Error updating FAQ views:', err));
      });
    }

    // Add website content context
    if (websiteContent.length > 0) {
      context += 'Website Information:\n\n';
      websiteContent.forEach((content, index) => {
        const snippet = content.content.substring(0, 500);
        context += `${index + 1}. ${content.title}\n${snippet}...\n\n`;
      });
    }

    return { context, hasFAQ: faqs.length > 0, hasWebContent: websiteContent.length > 0 };
  }

  // Generate AI response using Gemini
  async generateResponse(userMessage, conversationHistory = []) {
    try {
      // Build context from website and FAQs
      const { context, hasFAQ, hasWebContent } = await this.buildContext(userMessage);

      // Try AI response first if API key is configured
      if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your-gemini-api-key-here') {
        try {
          // Build the prompt
          let prompt = `You are a helpful customer support assistant for BitWisdom, a cryptocurrency and blockchain technology company.

IMPORTANT INSTRUCTIONS:
1. Be friendly, professional, and helpful
2. Keep responses concise but informative
3. Use the provided context to answer questions accurately
4. If you don't know something, admit it and offer to connect the user with human support
5. Never make up information
6. Focus on BitWisdom's products and services

${context ? `CONTEXT INFORMATION:\n${context}\n` : ''}

CONVERSATION HISTORY:
${conversationHistory.map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join('\n')}

USER QUESTION: ${userMessage}

Please provide a helpful response:`;

          // Generate response with new SDK
          const response = await this.ai.models.generateContent({
            model: this.modelName,
            contents: prompt,
          });

          return {
            success: true,
            message: response.text,
            sources: {
              faqs: hasFAQ,
              website: hasWebContent,
            },
          };
        } catch (aiError) {
          console.error('AI generation failed, falling back to FAQ matching:', aiError.message);
          // Fall through to FAQ-based response
        }
      }

      // FALLBACK: Use FAQ and keyword-based responses
      return await this.generateFallbackResponse(userMessage, context, hasFAQ, hasWebContent);

    } catch (error) {
      console.error('Error generating response:', error);
      return {
        success: false,
        message: "I'm sorry, I'm having trouble processing your request right now. Please try again or contact our support team.",
        error: error.message,
      };
    }
  }

  // Fallback response when AI is not available
  async generateFallbackResponse(userMessage, context, hasFAQ, hasWebContent) {
    const lowerMessage = userMessage.toLowerCase();

    // Check if we found matching FAQs in context
    if (hasFAQ && context) {
      // Extract FAQ answers from context
      const faqMatch = context.match(/A\d+: ([^\n]+)/);
      if (faqMatch) {
        return {
          success: true,
          message: faqMatch[1],
          sources: { faqs: true, website: false },
        };
      }
    }

    // Keyword-based responses
    const keywords = {
      greeting: ['hi', 'hello', 'hey', 'good morning', 'good afternoon'],
      services: ['service', 'offer', 'provide', 'do you'],
      pricing: ['price', 'cost', 'fee', 'how much', 'payment'],
      start: ['start', 'begin', 'get started', 'sign up', 'register'],
      contact: ['contact', 'email', 'phone', 'reach', 'support'],
      node: ['node', 'mining', 'validator', 'hosting'],
      crypto: ['crypto', 'bitcoin', 'ethereum', 'blockchain'],
      integration: ['integrate', 'plugin', 'shopify', 'woocommerce'],
    };

    // Predefined responses
    const responses = {
      greeting: "Hello! 👋 Welcome to BitWisdom. I'm here to help you with information about our cryptocurrency and blockchain services. What can I help you with today?",
      services: "BitWisdom offers several key services:\n\n• Crypto Node Hosting (Laptop & Mobile)\n• Cryptocurrency Payment Integration\n• Blockchain Consulting\n• Custom Blockchain Solutions\n\nWould you like to know more about any of these?",
      pricing: "Our pricing varies based on your specific needs. I'd recommend:\n\n1. Fill out our qualifying form to get a personalized quote\n2. Contact our sales team directly\n3. Visit our Products page for more details\n\nWould you like me to help you with anything else?",
      start: "Getting started with BitWisdom is easy! Here's what to do:\n\n1. Fill out our qualifying form on the website\n2. Our team will review your application\n3. We'll contact you to discuss your needs\n4. Choose the service that fits your requirements\n\nSetup typically takes 24-48 hours for node hosting and 3-5 days for payment integration.",
      contact: "You can reach our support team:\n\n📧 Email: support@bitwisdom.com\n📝 Contact Form: Available on our website\n⏰ Hours: Mon-Fri, 9 AM - 6 PM EST\n\nWe typically respond within 24 hours. How else can I help you?",
      node: "Crypto nodes are computers that participate in blockchain networks by validating and relaying transactions. BitWisdom offers:\n\n• Laptop Node Hosting\n• Mobile Node Hosting\n• 24/7 Monitoring\n• Secure Infrastructure\n\nRunning a node helps secure the network and can earn you rewards. Would you like more details?",
      crypto: "We support major cryptocurrencies including:\n\n• Bitcoin (BTC)\n• Ethereum (ETH)\n• Various altcoins\n\nThe specific cryptocurrencies available depend on the service you choose. What would you like to know about crypto?",
      integration: "Yes! We integrate with major e-commerce platforms:\n\n✅ Shopify\n✅ WooCommerce\n✅ Magento\n✅ Drupal\n✅ And more!\n\nOur team assists with the entire integration process. Would you like to discuss integration for your platform?",
    };

    // Match keywords
    for (const [category, words] of Object.entries(keywords)) {
      if (words.some(word => lowerMessage.includes(word))) {
        return {
          success: true,
          message: responses[category],
          sources: { faqs: false, website: false },
        };
      }
    }

    // Default response if no match
    return {
      success: true,
      message: "I'd be happy to help! Here are some things I can assist you with:\n\n• Our services and offerings\n• Pricing information\n• Getting started\n• Technical questions about crypto nodes\n• Integration with e-commerce platforms\n• Contact information\n\nYou can also browse our FAQs below for quick answers. What would you like to know?",
      sources: { faqs: false, website: false },
    };
  }

  // Get quick reply suggestions
  async getQuickReplies() {
    try {
      const topFAQs = await FAQ.find({ isActive: true })
        .sort({ priority: -1, views: -1 })
        .limit(5)
        .select('question');

      return topFAQs.map(faq => faq.question);
    } catch (error) {
      console.error('Error getting quick replies:', error);
      return [
        'What services does BitWisdom offer?',
        'How do I get started?',
        'What are your pricing plans?',
        'How can I contact support?',
      ];
    }
  }

  // Get all FAQs by category
  async getFAQsByCategory() {
    try {
      const faqs = await FAQ.find({ isActive: true })
        .sort({ category: 1, priority: -1 })
        .lean();

      // Group by category
      const grouped = faqs.reduce((acc, faq) => {
        if (!acc[faq.category]) {
          acc[faq.category] = [];
        }
        acc[faq.category].push({
          question: faq.question,
          answer: faq.answer,
        });
        return acc;
      }, {});

      return grouped;
    } catch (error) {
      console.error('Error getting FAQs:', error);
      return {};
    }
  }
}

export default ChatbotService;
