import ChatbotService from '../services/chatbotService.js';
import ChatHistory from '../models/ChatHistory.js';
import FAQ from '../models/FAQ.js';
import ScrapingService from '../services/scrapingService.js';

// Lazy initialization of chatbot service
let chatbotService = null;

const getChatbotService = () => {
  if (!chatbotService) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured in environment variables');
    }
    chatbotService = new ChatbotService();
  }
  return chatbotService;
};

// Send a message and get AI response
export const sendMessage = async (req, res) => {
  try {
    const { message, sessionId, conversationHistory = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message is required',
      });
    }

    // Generate AI response
    const service = getChatbotService();
    const response = await service.generateResponse(
      message.trim(),
      conversationHistory
    );

    // Save to chat history
    if (sessionId) {
      try {
        await ChatHistory.findOneAndUpdate(
          { sessionId },
          {
            $push: {
              messages: [
                { role: 'user', content: message.trim() },
                { role: 'assistant', content: response.message },
              ],
            },
            $set: {
              metadata: {
                userAgent: req.headers['user-agent'],
                ipAddress: req.ip,
                referrer: req.headers['referer'],
              },
            },
          },
          { upsert: true, new: true }
        );
      } catch (historyError) {
        console.error('Error saving chat history:', historyError);
        // Don't fail the request if history save fails
      }
    }

    res.json({
      success: true,
      data: {
        message: response.message,
        sources: response.sources,
      },
    });
  } catch (error) {
    console.error('Error in sendMessage:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to process message',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// Get quick reply suggestions
export const getQuickReplies = async (req, res) => {
  try {
    const service = getChatbotService();
    const quickReplies = await service.getQuickReplies();

    res.json({
      success: true,
      data: quickReplies,
    });
  } catch (error) {
    console.error('Error in getQuickReplies:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get quick replies',
      error: error.message,
    });
  }
};

// Get all FAQs grouped by category
export const getFAQs = async (req, res) => {
  try {
    const service = getChatbotService();
    const faqs = await service.getFAQsByCategory();

    res.json({
      success: true,
      data: faqs,
    });
  } catch (error) {
    console.error('Error in getFAQs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get FAQs',
      error: error.message,
    });
  }
};

// Health check endpoint
export const healthCheck = async (req, res) => {
  try {
    const service = getChatbotService();
    const faqCount = await FAQ.countDocuments({ isActive: true });

    res.json({
      success: true,
      data: {
        status: 'healthy',
        geminiConfigured: !!process.env.GEMINI_API_KEY,
        activeFAQs: faqCount,
        message: 'Chatbot service is operational'
      }
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      success: false,
      message: 'Service unhealthy',
      error: error.message
    });
  }
};

// Admin: Create FAQ
export const createFAQ = async (req, res) => {
  try {
    const { question, answer, category, keywords, priority } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: 'Question and answer are required',
      });
    }

    const faq = new FAQ({
      question: question.trim(),
      answer: answer.trim(),
      category: category || 'General',
      keywords: keywords || [],
      priority: priority || 0,
    });

    await faq.save();

    res.status(201).json({
      success: true,
      data: faq,
      message: 'FAQ created successfully',
    });
  } catch (error) {
    console.error('Error in createFAQ:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create FAQ',
      error: error.message,
    });
  }
};

// Admin: Update FAQ
export const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const faq = await FAQ.findByIdAndUpdate(id, updates, { new: true });

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found',
      });
    }

    res.json({
      success: true,
      data: faq,
      message: 'FAQ updated successfully',
    });
  } catch (error) {
    console.error('Error in updateFAQ:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update FAQ',
      error: error.message,
    });
  }
};

// Admin: Delete FAQ
export const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;

    const faq = await FAQ.findByIdAndDelete(id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found',
      });
    }

    res.json({
      success: true,
      message: 'FAQ deleted successfully',
    });
  } catch (error) {
    console.error('Error in deleteFAQ:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete FAQ',
      error: error.message,
    });
  }
};

// Admin: Get all FAQs (including inactive)
export const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ category: 1, priority: -1 });

    res.json({
      success: true,
      data: faqs,
    });
  } catch (error) {
    console.error('Error in getAllFAQs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get FAQs',
      error: error.message,
    });
  }
};

// Admin: Trigger website scraping
export const scrapeWebsite = async (req, res) => {
  try {
    const { baseUrl, maxPages } = req.body;

    if (!baseUrl) {
      return res.status(400).json({
        success: false,
        message: 'Base URL is required',
      });
    }

    const scraper = new ScrapingService(baseUrl);
    const results = await scraper.crawlWebsite(maxPages || 50);

    res.json({
      success: true,
      data: results,
      message: `Successfully scraped ${results.totalScraped} pages`,
    });
  } catch (error) {
    console.error('Error in scrapeWebsite:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to scrape website',
      error: error.message,
    });
  }
};

// Admin: Get chat history
export const getChatHistory = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const chats = await ChatHistory.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await ChatHistory.countDocuments();

    res.json({
      success: true,
      data: {
        chats,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Error in getChatHistory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get chat history',
      error: error.message,
    });
  }
};
