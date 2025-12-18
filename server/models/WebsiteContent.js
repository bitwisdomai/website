import mongoose from 'mongoose';

const websiteContentSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    metaDescription: {
      type: String,
    },
    headings: [{
      level: Number,
      text: String,
    }],
    lastScraped: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Text index for search
websiteContentSchema.index({ title: 'text', content: 'text' });

export default mongoose.model('WebsiteContent', websiteContentSchema);
