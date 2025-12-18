import express from 'express';
import * as chatbotController from '../controller/chatbotController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/health', chatbotController.healthCheck);
router.post('/message', chatbotController.sendMessage);
router.get('/quick-replies', chatbotController.getQuickReplies);
router.get('/faqs', chatbotController.getFAQs);

// Admin routes
router.post('/faqs', protect, adminOnly, chatbotController.createFAQ);
router.put('/faqs/:id', protect, adminOnly, chatbotController.updateFAQ);
router.delete('/faqs/:id', protect, adminOnly, chatbotController.deleteFAQ);
router.get('/admin/faqs', protect, adminOnly, chatbotController.getAllFAQs);
router.post('/scrape', protect, adminOnly, chatbotController.scrapeWebsite);
router.get('/history', protect, adminOnly, chatbotController.getChatHistory);

export default router;
