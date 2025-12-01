import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  templateType: {
    type: String,
    required: [true, 'Template type is required'],
    trim: true
  },

  // SEO Fields - Primary SEO configuration (backward compatible)
  seo: {
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [60, 'Meta title should not exceed 60 characters']
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description should not exceed 160 characters']
    },
    metaKeywords: [{
      type: String,
      trim: true
    }],
    ogTitle: {
      type: String,
      trim: true
    },
    ogDescription: {
      type: String,
      trim: true
    },
    ogImage: {
      type: String,
      trim: true
    },
    canonicalUrl: {
      type: String,
      trim: true
    },
    noindex: {
      type: Boolean,
      default: false
    },
    nofollow: {
      type: Boolean,
      default: false
    }
  },

  // SEO Variants - Multiple SEO configurations for A/B testing
  seoVariants: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    weight: {
      type: Number,
      default: 1,
      min: 0,
      max: 100
    },
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [60, 'Meta title should not exceed 60 characters']
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description should not exceed 160 characters']
    },
    metaKeywords: [{
      type: String,
      trim: true
    }],
    ogTitle: {
      type: String,
      trim: true
    },
    ogDescription: {
      type: String,
      trim: true
    },
    ogImage: {
      type: String,
      trim: true
    },
    impressions: {
      type: Number,
      default: 0
    },
    clicks: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],

  // SEO Variant Settings
  seoVariantSettings: {
    enabled: {
      type: Boolean,
      default: false
    },
    strategy: {
      type: String,
      enum: ['random', 'weighted', 'sequential', 'time-based'],
      default: 'random'
    },
    defaultVariantId: {
      type: mongoose.Schema.Types.ObjectId
    }
  },

  // Flexible content structure - JSON object that varies by template
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    default: {}
  },

  // Meta fields
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  publishedAt: {
    type: Date
  },

  // Version control
  version: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

// Index for better query performance
pageSchema.index({ slug: 1, status: 1 });
pageSchema.index({ templateType: 1, status: 1 });

// Auto-set publishedAt when status changes to published
pageSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

// Populate author on find
pageSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'author',
    select: 'name email role'
  });
  next();
});

const Page = mongoose.model('Page', pageSchema);

export default Page;
