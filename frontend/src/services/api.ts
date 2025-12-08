/**
 * Axios API Client
 * Konfigurierte Axios-Instanz mit Request/Response Interceptors
 * für JWT-basierte Authentifizierung und Error Handling
 */

import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { tokenManager } from '@/utils/tokenManager'
import { handleApiError, isAuthError } from '@/utils/apiErrorHandler'
import type { ApiResponse, RefreshTokenRequest } from '@/types/api'

/**
 * Basis-URL für API-Requests
 * Wird über environment variable oder auf Entwicklungs-Default gesetzt
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

/**
 * Erstelle Axios-Instanz
 */
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * Flag um Refresh-Loop zu verhindern
 */
let isRefreshing = false
let refreshSubscribers: Array<(token: string) => void> = []

/**
 * Abonnenten informieren wenn neuer Token verfügbar ist
 */
function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token))
  refreshSubscribers = []
}

/**
 * Subscriber hinzufügen
 */
function subscribeTokenRefresh(callback: (token: string) => void) {
  refreshSubscribers.push(callback)
}

/**
 * REQUEST INTERCEPTOR
 * Füt Authorization Header mit Access Token hinzu
 */
api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * RESPONSE INTERCEPTOR
 * Behandelt 401 Errors und führt Token Refresh durch
 * Verarbeitet Fehler zentralisiert
 */
api.interceptors.response.use(
  (response) => {
    // Success Response - gebe nur data zurück wenn es ein ApiResponse ist
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data.data
    }
    return response.data
  },
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

    // Behandele 401 Unauthorized (Token abgelaufen)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Token wird gerade refreshed - warte auf neuen Token
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            resolve(api(originalRequest))
          })
        })
      }

      // Starte Token Refresh
      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = tokenManager.getRefreshToken()
        if (!refreshToken) {
          throw new Error('Kein Refresh Token verfügbar')
        }

        const refreshPayload: RefreshTokenRequest = { refreshToken }
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, refreshPayload)
        const { accessToken, refreshToken: newRefreshToken, expiresIn } = response.data.data

        // Speichere neue Tokens
        tokenManager.setTokens(accessToken, newRefreshToken, expiresIn)

        // Informiere andere Requests über neuen Token
        onRefreshed(accessToken)

        // Wiederhohle Original-Request mit neuem Token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
        }
        return api(originalRequest)
      } catch (refreshError) {
        // Refresh fehlgeschlagen - lösche Tokens und redirect zu Login
        tokenManager.clearTokens()
        // Hier könnte ein Router Push zu /login erfolgen
        // router.push('/login')
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // Alle anderen Fehler
    const apiError = handleApiError(error)
    return Promise.reject(apiError)
  }
)

/**
 * HTTP GET Request
 */
export function getRequest<T = any>(url: string, config?: AxiosRequestConfig) {
  return api.get<T>(url, config)
}

/**
 * HTTP POST Request
 */
export function postRequest<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
  return api.post<T>(url, data, config)
}

/**
 * HTTP PUT Request
 */
export function putRequest<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
  return api.put<T>(url, data, config)
}

/**
 * HTTP PATCH Request
 */
export function patchRequest<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
  return api.patch<T>(url, data, config)
}

/**
 * HTTP DELETE Request
 */
export function deleteRequest<T = any>(url: string, config?: AxiosRequestConfig) {
  return api.delete<T>(url, config)
}

/**
 * Exportiere die Axios-Instanz für erweiterte Konfiguration
 */
export default api
