import mongoose from 'mongoose';

const chatHistorySchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    messages: [
      {
        role: {
          type: String,
          enum: ['user', 'assistant'],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    metadata: {
      userAgent: String,
      ipAddress: String,
      referrer: String,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-delete sessions older than 30 days
chatHistorySchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

export default mongoose.model('ChatHistory', chatHistorySchema);
