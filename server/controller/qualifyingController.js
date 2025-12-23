import QualifyingApplication from '../models/QualifyingApplication.js';
import { sendQualifyingApplicationEmail, sendQualifyingConfirmationEmail } from '../utils/emailService.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Generate unique submission ID if not already set
    if (!req.submissionId) {
      req.submissionId = crypto.randomBytes(16).toString('hex');
    }

    // Store in server/uploads/forms/submissions/<submissionId> (private, admin-only)
    const uploadDir = path.join(__dirname, '../uploads/forms/submissions', req.submissionId);

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Use original filename with sanitization
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = file.fieldname + '-' + sanitizedName;

    // Store URL paths for each file (without /api prefix - frontend adds it)
    if (!req.fileUrlPaths) {
      req.fileUrlPaths = {};
    }
    req.fileUrlPaths[file.fieldname] = `/uploads/forms/submissions/${req.submissionId}/${filename}`;

    cb(null, filename);
  }
});

// File filter to accept only images and PDFs
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images (JPEG, JPG, PNG) and PDF files are allowed'));
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: fileFilter
});

// Create a new qualifying application
export const createQualifyingApplication = async (req, res) => {
  try {
    const {
      businessName,
      businessAddress,
      phoneNumber,
      emailAddress,
      businessType,
      registrationNumber,
      registrationJurisdiction,
      taxId,
      beneficialOwners,
      nationality,
      corporateStructure,
      sourceOfFunds,
      intendedUse,
      acceptedTerms
    } = req.body;

    // Check if all required files are uploaded
    if (!req.files || Object.keys(req.files).length < 4) {
      return res.status(400).json({
        success: false,
        message: 'All required documents must be uploaded'
      });
    }

    // Create new application with submissionId from multer
    const application = new QualifyingApplication({
      submissionId: req.submissionId,
      businessName,
      businessAddress,
      phoneNumber,
      emailAddress,
      businessType,
      registrationNumber,
      registrationJurisdiction,
      taxId,
      beneficialOwners,
      nationality,
      corporateStructure,
      sourceOfFunds,
      intendedUse,
      photoId: req.fileUrlPaths?.photoId || '',
      articlesOfIncorporation: req.fileUrlPaths?.articlesOfIncorporation || '',
      certificateOfIncorporation: req.fileUrlPaths?.certificateOfIncorporation || '',
      proofOfAddress: req.fileUrlPaths?.proofOfAddress || '',
      acceptedTerms: acceptedTerms === 'true' || acceptedTerms === true
    });

    await application.save();

    // Send email notifications (fire and forget - don't wait for them)
    const applicationData = {
      businessName,
      businessAddress,
      phoneNumber,
      emailAddress,
      businessType,
      registrationNumber,
      registrationJurisdiction,
      taxId,
      beneficialOwners,
      nationality,
      corporateStructure,
      sourceOfFunds,
      intendedUse
    };

    // Send notification to owner
    sendQualifyingApplicationEmail(applicationData).then(() => {
      console.log('✅ Owner notification email sent successfully');
    }).catch((emailError) => {
      console.error('❌ Failed to send owner notification email:', emailError.message);
    });

    // Send confirmation to user
    sendQualifyingConfirmationEmail(applicationData).then(() => {
      console.log('✅ User confirmation email sent successfully');
    }).catch((emailError) => {
      console.error('❌ Failed to send user confirmation email:', emailError.message);
    });

    // Respond immediately to user
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application
    });
  } catch (error) {
    console.error('Error creating qualifying application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: error.message
    });
  }
};

// Get all qualifying applications (admin)
export const getAllQualifyingApplications = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = status ? { status } : {};

    const applications = await QualifyingApplication.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await QualifyingApplication.countDocuments(query);

    res.status(200).json({
      success: true,
      data: applications,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Error fetching qualifying applications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: error.message
    });
  }
};

// Get single qualifying application by ID (admin)
export const getQualifyingApplicationById = async (req, res) => {
  try {
    const application = await QualifyingApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    console.error('Error fetching qualifying application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application',
      error: error.message
    });
  }
};

// Update application status (admin)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const application = await QualifyingApplication.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      data: application
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update application status',
      error: error.message
    });
  }
};

// Delete application (admin)
export const deleteQualifyingApplication = async (req, res) => {
  try {
    const application = await QualifyingApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Delete entire submission folder
    const submissionDir = path.join(__dirname, '../uploads/forms/submissions', application.submissionId);

    if (fs.existsSync(submissionDir)) {
      // Delete all files in the directory
      fs.rmSync(submissionDir, { recursive: true, force: true });
    }

    await QualifyingApplication.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete application',
      error: error.message
    });
  }
};
