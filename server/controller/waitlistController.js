import Waitlist from '../models/Waitlist.js';
import { sendWaitlistEmail, sendWaitlistConfirmationEmail } from '../utils/emailService.js';

// Add user to waitlist
export const addToWaitlist = async (req, res) => {
  try {
    const { name, email, waitlistType } = req.body;

    // Validate required fields
    if (!name || !email || !waitlistType) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and waitlist type are required'
      });
    }

    // Check if user is already on this waitlist
    const existingEntry = await Waitlist.findOne({ email, waitlistType });

    if (existingEntry) {
      return res.status(409).json({
        success: false,
        message: `You're already on the ${waitlistType} waitlist!`
      });
    }

    // Create new waitlist entry
    const waitlistEntry = new Waitlist({
      name,
      email,
      waitlistType
    });

    await waitlistEntry.save();

    // Send email notifications (fire and forget)
    const waitlistData = {
      name,
      email,
      waitlistType
    };

    // Send notification to owner
    sendWaitlistEmail(waitlistData).then(() => {
      console.log('✅ Owner notification email sent successfully');
    }).catch((emailError) => {
      console.error('❌ Failed to send owner notification email:', emailError.message);
    });

    // Send confirmation to user
    sendWaitlistConfirmationEmail(waitlistData).then(() => {
      console.log('✅ User confirmation email sent successfully');
    }).catch((emailError) => {
      console.error('❌ Failed to send user confirmation email:', emailError.message);
    });

    res.status(201).json({
      success: true,
      message: `Successfully added to ${waitlistType} waitlist!`,
      data: waitlistEntry
    });
  } catch (error) {
    console.error('Error adding to waitlist:', error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'You are already on this waitlist'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to add to waitlist',
      error: error.message
    });
  }
};

// Get all waitlist entries (admin)
export const getAllWaitlistEntries = async (req, res) => {
  try {
    const { waitlistType, status, page = 1, limit = 20 } = req.query;

    const query = {};
    if (waitlistType) query.waitlistType = waitlistType;
    if (status) query.status = status;

    const entries = await Waitlist.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Waitlist.countDocuments(query);

    res.status(200).json({
      success: true,
      data: entries,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Error fetching waitlist entries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch waitlist entries',
      error: error.message
    });
  }
};

// Get waitlist statistics (admin)
export const getWaitlistStats = async (req, res) => {
  try {
    const stats = await Waitlist.aggregate([
      {
        $group: {
          _id: '$waitlistType',
          count: { $sum: 1 },
          active: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          },
          notified: {
            $sum: { $cond: [{ $eq: ['$status', 'notified'] }, 1, 0] }
          },
          converted: {
            $sum: { $cond: [{ $eq: ['$status', 'converted'] }, 1, 0] }
          }
        }
      }
    ]);

    const totalCount = await Waitlist.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        byType: stats,
        total: totalCount
      }
    });
  } catch (error) {
    console.error('Error fetching waitlist stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch waitlist statistics',
      error: error.message
    });
  }
};

// Update waitlist entry status (admin)
export const updateWaitlistStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const { id } = req.params;

    const updateData = { status, notes };

    // If marking as notified, add timestamp
    if (status === 'notified') {
      updateData.notifiedAt = new Date();
    }

    const entry = await Waitlist.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Waitlist entry not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Waitlist entry updated successfully',
      data: entry
    });
  } catch (error) {
    console.error('Error updating waitlist entry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update waitlist entry',
      error: error.message
    });
  }
};

// Delete waitlist entry (admin)
export const deleteWaitlistEntry = async (req, res) => {
  try {
    const entry = await Waitlist.findByIdAndDelete(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Waitlist entry not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Waitlist entry deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting waitlist entry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete waitlist entry',
      error: error.message
    });
  }
};

// Export single entry by ID (admin)
export const getWaitlistEntryById = async (req, res) => {
  try {
    const entry = await Waitlist.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Waitlist entry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: entry
    });
  } catch (error) {
    console.error('Error fetching waitlist entry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch waitlist entry',
      error: error.message
    });
  }
};
