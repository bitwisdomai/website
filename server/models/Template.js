import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Template name is required'],
    trim: true
  },
  identifier: {
    type: String,
    required: [true, 'Template identifier is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9-]+$/, 'Identifier can only contain lowercase letters, numbers, and hyphens']
  },
  description: {
    type: String,
    trim: true
  },

  // JSON Schema defining the structure of content for this template
  schema: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    default: {}
  },

  // Configuration for admin form generation
  formConfig: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },

  // Preview image or thumbnail
  thumbnail: {
    type: String,
    trim: true
  },

  // Template status
  isActive: {
    type: Boolean,
    default: true
  },

  // Category for organization
  category: {
    type: String,
    enum: ['landing', 'content', 'legal', 'custom'],
    default: 'custom'
  }
}, {
  timestamps: true
});

// Index for better query performance
templateSchema.index({ identifier: 1, isActive: 1 });
templateSchema.index({ category: 1, isActive: 1 });

const Template = mongoose.model('Template', templateSchema);

export default Template;
