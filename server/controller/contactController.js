import Contact from '../models/Contact.js';
import { sendContactFormEmail, sendContactConfirmationEmail } from '../utils/emailService.js';

// Create a new contact submission
export const createContact = async (req, res) => {
  console.log('📧 Contact form submission received');
  console.log('Request body:', req.body);

  try {
    const { name, email, organization, subject, message } = req.body;

    // Validate required fields
    if (!name || !email) {
      console.log('❌ Validation failed: missing name or email');
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    console.log('✅ Validation passed, creating contact...');

    // Create new contact
    const contact = new Contact({
      name,
      email,
      organization: organization || '',
      subject: subject || '',
      message: message || ''
    });

    console.log('💾 Saving to database...');
    await contact.save();
    console.log('✅ Saved to database successfully');

    // Send email notifications (fire and forget - don't wait for them)
    console.log('📨 Triggering email send (background)...');

    // Send notification to owner
    sendContactFormEmail({
      name,
      email,
      organization,
      subject,
      message
    }).then(() => {
      console.log('✅ Owner notification email sent successfully');
    }).catch((emailError) => {
      console.error('❌ Failed to send owner notification email:', emailError.message);
    });

    // Send confirmation to user
    sendContactConfirmationEmail({
      name,
      email,
      organization,
      subject,
      message
    }).then(() => {
      console.log('✅ User confirmation email sent successfully');
    }).catch((emailError) => {
      console.error('❌ Failed to send user confirmation email:', emailError.message);
    });

    // Respond immediately to user
    console.log('✅ Sending success response to client');
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact
    });
  } catch (error) {
    console.error('❌ Error creating contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form',
      error: error.message
    });
  }
};

// Get all contacts (admin)
export const getAllContacts = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = status ? { status } : {};

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      data: contacts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: error.message
    });
  }
};

// Get single contact by ID (admin)
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact',
      error: error.message
    });
  }
};

// Update contact status (admin)
export const updateContactStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status',
      error: error.message
    });
  }
};

// Delete contact (admin)
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact',
      error: error.message
    });
  }
};
