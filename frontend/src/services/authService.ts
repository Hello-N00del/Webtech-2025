/**
 * Auth Service
 * Behandelt alle authentifizierungsbezogenen API-Calls
 */

import { postRequest, getRequest } from './api'
import { tokenManager } from '../utils/tokenManager'

export interface UserInfo {
  id: string
  email: string
  name: string
  role: 'USER' | 'ADMIN'
  createdAt: string
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

export interface LoginResponse {
  user: UserInfo
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface RegisterResponse {
  user: UserInfo
  accessToken: string
  refreshToken: string
  expiresIn: number
}

/**
 * Auth Service Object
 */
export const authService = {
  /**
   * User anmelden
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await postRequest<LoginResponse>('/auth/login', credentials)
      
      // Speichere Tokens
      if (response.accessToken && response.refreshToken) {
        tokenManager.setTokens(
          response.accessToken,
          response.refreshToken,
          response.expiresIn
        )
      }
      
      return response as LoginResponse
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  },

  /**
   * User registrieren
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await postRequest<RegisterResponse>('/auth/register', data)
      
      // Speichere Tokens
      if (response.accessToken && response.refreshToken) {
        tokenManager.setTokens(
          response.accessToken,
          response.refreshToken,
          response.expiresIn
        )
      }
      
      return response as RegisterResponse
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    }
  },

  /**
   * User abmelden
   */
  async logout(): Promise<void> {
    try {
      await postRequest('/auth/logout', {})
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      // Immer lokale Tokens löschen
      tokenManager.clearTokens()
    }
  },

  /**
   * Hole aktuelle User-Informationen
   */
  async getCurrentUser(): Promise<UserInfo> {
    try {
      const response = await getRequest<UserInfo>('/auth/me')
      return response as UserInfo
    } catch (error) {
      console.error('Get current user failed:', error)
      throw error
    }
  },

  /**
   * Update User-Profil
   */
  async updateProfile(data: Partial<UserInfo>): Promise<UserInfo> {
    try {
      const response = await postRequest<UserInfo>('/auth/profile', data)
      return response as UserInfo
    } catch (error) {
      console.error('Update profile failed:', error)
      throw error
    }
  },

  /**
   * Prüfe ob User authentifiziert ist
   */
  isAuthenticated(): boolean {
    return tokenManager.hasValidAccessToken()
  },

  /**
   * Hole Access Token
   */
  getAccessToken(): string | null {
    return tokenManager.getAccessToken()
  },

  /**
   * Hole Refresh Token
   */
  getRefreshToken(): string | null {
    return tokenManager.getRefreshToken()
  }
}

// Default Export (falls irgendwo import authService from '...' verwendet wird)
export default authService
