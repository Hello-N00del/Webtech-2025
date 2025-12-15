/**
 * Axios API Client
 * Konfigurierte Axios-Instanz mit Request/Response Interceptors
 * für JWT-basierte Authentifizierung und Error Handling
 */

import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { tokenManager } from '../utils/tokenManager'
import { handleApiError } from '../utils/apiErrorHandler'
import type { ApiResponse, RefreshTokenRequest } from '../types/api'

/**
 * Basis-URL für API-Requests
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

/**
 * Erstelle Axios-Instanz mit Auth
 */
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000  // 10 second timeout
})

/**
 * ✅ Erstelle Public Axios-Instanz OHNE Auth Interceptors
 */
const publicApi: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

/**
 * Flag um Refresh-Loop zu verhindern
 */
let isRefreshing = false
let refreshSubscribers: Array<(token: string) => void> = []

function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token))
  refreshSubscribers = []
}

function subscribeTokenRefresh(callback: (token: string) => void) {
  refreshSubscribers.push(callback)
}

/**
 * REQUEST INTERCEPTOR
 * Fügt Authorization Header mit Access Token hinzu
 */
api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

/**
 * RESPONSE INTERCEPTOR
 * Behandelt 401 Errors und führt Token Refresh durch
 */
api.interceptors.response.use(
  (response) => {
    // Success Response
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data.data
    }
    return response.data
  },
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

    // 401 Unauthorized - Try token refresh
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

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = tokenManager.getRefreshToken()
        if (!refreshToken) {
          tokenManager.clearTokens()
          throw new Error('No refresh token available')
        }

        const refreshPayload: RefreshTokenRequest = { refreshToken }
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, refreshPayload)
        const { accessToken, refreshToken: newRefreshToken, expiresIn } = response.data.data

        // Store new tokens
        tokenManager.setTokens(accessToken, newRefreshToken, expiresIn)
        onRefreshed(accessToken)

        // Retry original request
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
        }
        return api(originalRequest)
      } catch (refreshError) {
        tokenManager.clearTokens()
        console.error('❌ Token refresh failed')
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // All other errors
    const apiError = handleApiError(error)
    return Promise.reject(apiError)
  }
)

/**
 * PUBLIC API RESPONSE INTERCEPTOR
 */
publicApi.interceptors.response.use(
  (response) => {
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data.data
    }
    return response.data
  },
  (error) => {
    const apiError = handleApiError(error)
    return Promise.reject(apiError)
  }
)

/**
 * HTTP Requests
 */
export function getRequest<T = any>(url: string, config?: AxiosRequestConfig) {
  return api.get<T>(url, config)
}

export function getPublicRequest<T = any>(url: string, config?: AxiosRequestConfig) {
  return publicApi.get<T>(url, config)
}

export function postRequest<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
  return api.post<T>(url, data, config)
}

export function putRequest<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
  return api.put<T>(url, data, config)
}

export function patchRequest<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
  return api.patch<T>(url, data, config)
}

export function deleteRequest<T = any>(url: string, config?: AxiosRequestConfig) {
  return api.delete<T>(url, config)
}

export default api
export { publicApi }
