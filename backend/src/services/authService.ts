import prisma from '../config/database.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from './emailService.js';
import type { JWTPayload } from '../utils/jwt.js';
import { AuditAction } from '@prisma/client';
import { env } from '../config/env.js';

// Helper for audit logging
async function logAudit(
  userId: string | null,
  action: AuditAction,
  entityType: string | null,
  entityId: string | null,
  details: any = null,
  ipAddress?: string,
  userAgent?: string
) {
  await prisma.auditLog.create({
    data: {
      userId,
      action,
      entityType,
      entityId,
      details: details ? JSON.stringify(details) : null,
      ipAddress,
      userAgent,
    },
  });
}

// Register new user
export const registerUser = async (
  email: string,
  password: string,
  name: string,
  ipAddress?: string,
  userAgent?: string
) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const passwordHash = await hashPassword(password);
  const emailVerifyToken = uuidv4();
  const emailVerifyExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

  // ✅ AUTO-VERIFY in development
  const isDevelopment = process.env.NODE_ENV !== 'production';

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      emailVerifyToken: isDevelopment ? null : emailVerifyToken,
      emailVerifyExpiry: isDevelopment ? null : emailVerifyExpiry,
      emailVerified: isDevelopment, // ✅ Auto-verify in dev
      role: 'USER',
    },
  });

  // Send verification email only in production
  if (!isDevelopment) {
    const verificationUrl = `${env.BASE_URL}/api/auth/verify-email/${emailVerifyToken}`;
    
    try {
      await sendEmail(
        email,
        'Verify your email address',
        `Hello ${name},\n\nPlease verify your email by clicking this link:\n${verificationUrl}\n\nThis link expires in 24 hours.`
      );
    } catch (error) {
      console.error('Failed to send verification email:', error);
      // Don't fail registration if email fails
    }
  } else {
    console.log(`🔶 Development mode: Auto-verified user ${email}`);
  }

  // ✅ Generate tokens for registration (auto-login)
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Save refresh token
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
  });

  // Log registration
  await logAudit(user.id, AuditAction.REGISTER, 'User', user.id, { email, name }, ipAddress, userAgent);

  // ✅ Return same format as login
  return {
    accessToken,
    refreshToken,
    expiresIn: 3600,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
      createdAt: user.createdAt.toISOString(),
    },
  };
};

// Verify email
export const verifyEmail = async (token: string) => {
  const user = await prisma.user.findFirst({
    where: {
      emailVerifyToken: token,
      emailVerifyExpiry: { gt: new Date() },
    },
  });

  if (!user) {
    throw new Error('Invalid or expired verification token');
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      emailVerifyToken: null,
      emailVerifyExpiry: null,
    },
  });

  await logAudit(user.id, AuditAction.EMAIL_VERIFY, 'User', user.id);

  return true;
};

// Login user
export const loginUser = async (
  email: string,
  password: string,
  ipAddress?: string,
  userAgent?: string
) => {
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user || user.deletedAt) {
    throw new Error('Invalid email or password');
  }

  // ✅ Skip email verification check in development
  const isDevelopment = process.env.NODE_ENV !== 'production';
  if (!isDevelopment && !user.emailVerified) {
    throw new Error('Please verify your email before logging in');
  }

  const validPassword = await comparePassword(password, user.passwordHash);
  if (!validPassword) {
    throw new Error('Invalid email or password');
  }

  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Save refresh token
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
  });

  await logAudit(user.id, AuditAction.LOGIN, 'User', user.id, null, ipAddress, userAgent);

  return {
    accessToken,
    refreshToken,
    expiresIn: 3600,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
      createdAt: user.createdAt.toISOString(),
    },
  };
};

// Refresh access token
export const refreshAccessToken = async (refreshToken: string) => {
  const storedToken = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
    include: { user: true },
  });

  if (!storedToken || storedToken.expiresAt < new Date()) {
    throw new Error('Invalid or expired refresh token');
  }

  const payload: JWTPayload = {
    userId: storedToken.user.id,
    email: storedToken.user.email,
    role: storedToken.user.role,
  };

  const newAccessToken = generateAccessToken(payload);

  return { accessToken: newAccessToken };
};

// Logout user
export const logoutUser = async (
  refreshToken: string,
  userId: string,
  ipAddress?: string,
  userAgent?: string
) => {
  await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
  await logAudit(userId, AuditAction.LOGOUT, 'User', userId, null, ipAddress, userAgent);
};

// Request password reset
export const requestPasswordReset = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user || user.deletedAt) {
    return; // Don't reveal if user exists
  }

  const resetToken = uuidv4();
  const resetExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordResetToken: resetToken,
      passwordResetExpiry: resetExpiry,
    },
  });

  const resetUrl = `${env.BASE_URL}/api/auth/reset-password?token=${resetToken}`;

  try {
    await sendEmail(
      email,
      'Password Reset Request',
      `Hello ${user.name},\n\nYou requested a password reset. Click this link to reset your password:\n${resetUrl}\n\nThis link expires in 24 hours.\n\nIf you didn't request this, please ignore this email.`
    );
  } catch (error) {
    console.error('Failed to send password reset email:', error);
  }

  await logAudit(user.id, AuditAction.PASSWORD_RESET, 'User', user.id);
};

// Reset password
export const resetPassword = async (token: string, newPassword: string) => {
  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: token,
      passwordResetExpiry: { gt: new Date() },
    },
  });

  if (!user) {
    throw new Error('Invalid or expired reset token');
  }

  const passwordHash = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash,
      passwordResetToken: null,
      passwordResetExpiry: null,
    },
  });

  await logAudit(user.id, AuditAction.PASSWORD_RESET, 'User', user.id);

  return true;
};
