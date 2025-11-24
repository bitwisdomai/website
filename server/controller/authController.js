import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { asyncHandler, successResponse, errorResponse } from '../utils/helpers.js';

// @desc    Register a new user (admin only can create)
// @route   POST /api/auth/register
// @access  Private (Admin only)
export const register = asyncHandler(async (req, res) => {
  const { email, password, name, role } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return errorResponse(res, 400, 'User with this email already exists');
  }

  // Create user
  const user = await User.create({
    email,
    password,
    name,
    role: role || 'editor'
  });

  // Generate token
  const token = generateToken(user._id);

  return successResponse(res, 201, 'User registered successfully', {
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    token
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return errorResponse(res, 400, 'Please provide email and password');
  }

  // Find user with password field
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return errorResponse(res, 401, 'Invalid credentials');
  }

  // Check if user is active
  if (!user.isActive) {
    return errorResponse(res, 401, 'Your account has been deactivated');
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return errorResponse(res, 401, 'Invalid credentials');
  }

  // Generate token
  const token = generateToken(user._id);

  return successResponse(res, 200, 'Login successful', {
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    token
  });
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  return successResponse(res, 200, 'User retrieved successfully', { user });
});

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    return errorResponse(res, 404, 'User not found');
  }

  // Update fields
  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();

  return successResponse(res, 200, 'Profile updated successfully', { user });
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return errorResponse(res, 400, 'Please provide current and new password');
  }

  // Get user with password
  const user = await User.findById(req.user.id).select('+password');

  // Verify current password
  const isPasswordValid = await user.comparePassword(currentPassword);

  if (!isPasswordValid) {
    return errorResponse(res, 401, 'Current password is incorrect');
  }

  // Update password
  user.password = newPassword;
  await user.save();

  // Generate new token
  const token = generateToken(user._id);

  return successResponse(res, 200, 'Password changed successfully', { token });
});

// @desc    Get all users (admin only)
// @route   GET /api/auth/users
// @access  Private (Admin only)
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  return successResponse(res, 200, 'Users retrieved successfully', {
    users,
    count: users.length
  });
});

// @desc    Delete user (admin only)
// @route   DELETE /api/auth/users/:id
// @access  Private (Admin only)
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return errorResponse(res, 404, 'User not found');
  }

  await user.deleteOne();

  return successResponse(res, 200, 'User deleted successfully');
});
