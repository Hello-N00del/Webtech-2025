import { Request, Response } from 'express';
import * as authService from '../services/authService.js';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../utils/validators.js';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body);
    const user = await authService.registerUser(
      email,
      password,
      name,
      req.ip,
      req.get('user-agent')
    );
    res.status(201).json({
      message: 'Registration successful. Please check your email to verify your account.',
      user,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Registration failed' });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    await authService.verifyEmail(token);
    res.json({ message: 'Email verified successfully. You can now log in.' });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Email verification failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const result = await authService.loginUser(
      email,
      password,
      req.ip,
      req.get('user-agent')
    );
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Login failed' });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is required' });
    }
    const result = await authService.refreshAccessToken(refreshToken);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ error: err.message || 'Token refresh failed' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken || !req.user) {
      return res.status(400).json({ error: 'Refresh token is required' });
    }
    await authService.logoutUser(
      refreshToken,
      req.user.userId,
      req.ip,
      req.get('user-agent')
    );
    res.json({ message: 'Logged out successfully' });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Logout failed' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = forgotPasswordSchema.parse(req.body);
    await authService.requestPasswordReset(email);
    res.json({ message: 'If an account exists with this email, a reset link has been sent.' });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Request failed' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = resetPasswordSchema.parse(req.body);
    await authService.resetPassword(token, newPassword);
    res.json({ message: 'Password reset successful. You can now log in with your new password.' });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Password reset failed' });
  }
};