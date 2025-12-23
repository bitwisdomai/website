import mongoose from 'mongoose';

const qualifyingApplicationSchema = new mongoose.Schema({
  // Business Information
  businessName: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true
  },
  businessAddress: {
    type: String,
    required: [true, 'Business address is required'],
    trim: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  emailAddress: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  businessType: {
    type: String,
    required: [true, 'Business type is required'],
    trim: true
  },
  registrationNumber: {
    type: String,
    required: [true, 'Registration number is required'],
    trim: true
  },
  registrationJurisdiction: {
    type: String,
    required: [true, 'Registration jurisdiction is required'],
    trim: true
  },
  taxId: {
    type: String,
    required: [true, 'Tax ID is required'],
    trim: true
  },

  // Ownership Information
  beneficialOwners: {
    type: String,
    required: [true, 'Beneficial owners information is required'],
    trim: true
  },
  nationality: {
    type: String,
    required: [true, 'Nationality is required'],
    trim: true
  },
  corporateStructure: {
    type: String,
    required: [true, 'Corporate structure is required'],
    trim: true
  },

  // Financial Information
  sourceOfFunds: {
    type: String,
    required: [true, 'Source of funds is required'],
    trim: true
  },
  intendedUse: {
    type: String,
    required: [true, 'Intended use is required'],
    trim: true
  },

  // Submission ID (unique folder identifier for file uploads)
  submissionId: {
    type: String,
    required: true,
    unique: true
  },

  // File Uploads (store file paths)
  photoId: {
    type: String,
    required: [true, 'Photo ID is required']
  },
  articlesOfIncorporation: {
    type: String,
    required: [true, 'Articles of incorporation is required']
  },
  certificateOfIncorporation: {
    type: String,
    required: [true, 'Certificate of incorporation is required']
  },
  proofOfAddress: {
    type: String,
    required: [true, 'Proof of address is required']
  },

  // Terms
  acceptedTerms: {
    type: Boolean,
    required: [true, 'Terms must be accepted'],
    validate: {
      validator: function(value) {
        return value === true;
      },
      message: 'Terms and conditions must be accepted'
    }
  },

  // Application Status
  status: {
    type: String,
    enum: ['pending', 'under_review', 'approved', 'rejected'],
    default: 'pending'
  },

  // Admin notes
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const QualifyingApplication = mongoose.model('QualifyingApplication', qualifyingApplicationSchema);

export default QualifyingApplication;
