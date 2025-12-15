<<<<<<< HEAD
import type { LoginCredentials, User } from "../models/types"

export const authService = {
  login: async (credentials: LoginCredentials): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (credentials.username && credentials.password) {
          resolve({
            id: Date.now().toString(),
            username: credentials.username,
            email: `${credentials.username}@example.com`,
          })
        } else {
          resolve(null)
        }
      }, 500)
    })
  },

  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 200)
    })
  },

  validateCredentials: (username: string, password: string): boolean => {
    return username.length >= 3 && password.length >= 3
  },
=======
/**
 * Authentication Service
 * Behandelt alle authentifizierungsbezogenen API-Calls
 */

import { getRequest, postRequest, deleteRequest } from './api'
import { tokenManager } from '../utils/tokenManager'
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ApiResponse
} from '../types/api'

/**
 * User Info Response Type
 */
export interface UserInfo {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'USER'
  profileImageUrl?: string
  createdAt: string
  updatedAt: string
}

/**
 * Authentication Service
 */
export const authService = {
  /**
   * Benutzer registrieren
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await postRequest<ApiResponse<AuthResponse>>('/auth/register', data)
      if (response && 'accessToken' in response) {
        const authData = response as AuthResponse
        // Speichere Tokens
        tokenManager.setTokens(authData.accessToken, authData.refreshToken, authData.expiresIn)
        return authData
      }
      throw new Error('Ungültige Response-Struktur')
    } catch (error) {
      throw error
    }
  },

  /**
   * Benutzer anmelden
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await postRequest<ApiResponse<AuthResponse>>('/auth/login', credentials)
      if (response && 'accessToken' in response) {
        const authData = response as AuthResponse
        // Speichere Tokens
        tokenManager.setTokens(authData.accessToken, authData.refreshToken, authData.expiresIn)
        return authData
      }
      throw new Error('Ungültige Response-Struktur')
    } catch (error) {
      throw error
    }
  },

  /**
   * E-Mail verifizieren
   */
  async verifyEmail(token: string): Promise<ApiResponse> {
    try {
      return await postRequest<ApiResponse>(`/auth/verify-email/${token}`)
    } catch (error) {
      throw error
    }
  },

  /**
   * Passwort-Reset anfordern
   */
  async forgotPassword(email: string): Promise<ApiResponse> {
    try {
      return await postRequest<ApiResponse>('/auth/forgot-password', { email })
    } catch (error) {
      throw error
    }
  },

  /**
   * Passwort zurücksetzen
   */
  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<ApiResponse> {
    try {
      return await postRequest<ApiResponse>('/auth/reset-password', {
        token,
        password: newPassword
      })
    } catch (error) {
      throw error
    }
  },

  /**
   * Abmelden
   */
  async logout(): Promise<void> {
    try {
      // Versuche den Logout am Backend durchzuführen
      await deleteRequest('/auth/logout')
    } catch (error) {
      // Auch wenn Backend-Logout fehlschlägt, lösche lokal die Tokens
      console.error('Logout Error:', error)
    } finally {
      // Lösche Tokens lokal
      tokenManager.clearTokens()
    }
  },

  /**
   * Aktuelle User-Informationen abrufen
   */
  async getCurrentUser(): Promise<UserInfo> {
    try {
      const response = await getRequest<ApiResponse<UserInfo>>('/users/me')
      if (response && typeof response === 'object' && 'id' in response) {
        return response as UserInfo
      }
      throw new Error('Ungültige Response-Struktur')
    } catch (error) {
      throw error
    }
  },

  /**
   * Benutzer-Profil aktualisieren
   */
  async updateProfile(data: Partial<UserInfo>): Promise<UserInfo> {
    try {
      const response = await postRequest<ApiResponse<UserInfo>>('/users/me', data)
      if (response && typeof response === 'object' && 'id' in response) {
        return response as UserInfo
      }
      throw new Error('Ungültige Response-Struktur')
    } catch (error) {
      throw error
    }
  },

  /**
   * Profilbild hochladen
   */
  async uploadProfileImage(file: File): Promise<UserInfo> {
    try {
      const formData = new FormData()
      formData.append('image', file)
      const response = await postRequest<ApiResponse<UserInfo>>('/users/me/profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (response && typeof response === 'object' && 'id' in response) {
        return response as UserInfo
      }
      throw new Error('Ungültige Response-Struktur')
    } catch (error) {
      throw error
    }
  },

  /**
   * Prüft ob Benutzer angemeldet ist
   */
  isAuthenticated(): boolean {
    return tokenManager.hasTokens() && !tokenManager.isTokenExpired()
  },

  /**
   * Gibt Access Token zurück
   */
  getAccessToken(): string | null {
    return tokenManager.getAccessToken()
  }
>>>>>>> d0112fdb486b291f21df2f7420be7646195b4ea5
}
