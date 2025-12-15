/**
 * Auth Service
 * Behandelt Authentifizierung und Benutzer-Management
 */

import { postRequest, getRequest } from './api'
import { tokenManager } from '../utils/tokenManager'

export interface UserInfo {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'USER'
  profileImageUrl?: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: UserInfo
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export const authService = {
  /**
   * Benutzer registrieren
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await postRequest<AuthResponse>('/auth/register', data)
      if (response && response.accessToken && response.refreshToken) {
        tokenManager.setTokens(response.accessToken, response.refreshToken)
      }
      return response as AuthResponse
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  },

  /**
   * Benutzer anmelden
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await postRequest<AuthResponse>('/auth/login', data)
      if (response && response.accessToken && response.refreshToken) {
        tokenManager.setTokens(response.accessToken, response.refreshToken)
      }
      return response as AuthResponse
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  },

  /**
   * Benutzer abmelden
   */
  async logout(): Promise<void> {
    try {
      const refreshToken = tokenManager.getRefreshToken()
      if (refreshToken) {
        await postRequest('/auth/logout', { refreshToken })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      tokenManager.clearTokens()
    }
  },

  /**
   * Prüfe ob Benutzer authentifiziert ist
   */
  isAuthenticated(): boolean {
    return !!tokenManager.getAccessToken()
  },

  /**
   * Aktuelle Benutzerinformationen abrufen
   */
  async getCurrentUser(): Promise<UserInfo> {
    try {
      const response = await getRequest<UserInfo>('/auth/me')
      return response as UserInfo
    } catch (error) {
      console.error('Error fetching current user:', error)
      throw error
    }
  },

  /**
   * Email-Verifikation
   */
  async verifyEmail(token: string): Promise<void> {
    try {
      await postRequest(`/auth/verify-email/${token}`, {})
    } catch (error) {
      console.error('Email verification error:', error)
      throw error
    }
  },

  /**
   * Passwort-Reset anfordern
   */
  async requestPasswordReset(email: string): Promise<void> {
    try {
      await postRequest('/auth/forgot-password', { email })
    } catch (error) {
      console.error('Password reset request error:', error)
      throw error
    }
  },

  /**
   * Passwort zurücksetzen
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await postRequest('/auth/reset-password', { token, newPassword })
    } catch (error) {
      console.error('Password reset error:', error)
      throw error
    }
  },

  /**
   * Benutzerprofil aktualisieren
   */
  async updateProfile(data: Partial<UserInfo>): Promise<UserInfo> {
    try {
      const response = await postRequest<UserInfo>('/auth/profile', data)
      return response as UserInfo
    } catch (error) {
      console.error('Profile update error:', error)
      throw error
    }
  }
}
