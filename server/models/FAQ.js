import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'General',
      trim: true,
    },
    keywords: [{
      type: String,
      lowercase: true,
      trim: true,
    }],
    priority: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for text search
faqSchema.index({ question: 'text', answer: 'text', keywords: 'text' });

export default mongoose.model('FAQ', faqSchema);
