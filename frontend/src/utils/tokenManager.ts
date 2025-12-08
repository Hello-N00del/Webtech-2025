/**
 * Token Manager
 * Verwaltet Access und Refresh Tokens im localStorage
 */

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'
const TOKEN_EXPIRY_KEY = 'tokenExpiry'

/**
 * Token Manager Utilities
 */
export const tokenManager = {
  /**
   * Speichert Tokens im localStorage
   */
  setTokens(accessToken: string, refreshToken: string, expiresIn: number): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    // Speichere Ablaufzeit: aktuelle Zeit + expiresIn (in Sekunden)
    const expiryTime = Date.now() + expiresIn * 1000
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString())
  },

  /**
   * Holt den Access Token aus localStorage
   */
  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  },

  /**
   * Holt den Refresh Token aus localStorage
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  },

  /**
   * Prüft ob ein Token gespeichert ist
   */
  hasTokens(): boolean {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY) && !!localStorage.getItem(REFRESH_TOKEN_KEY)
  },

  /**
   * Prüft ob der Access Token abgelaufen ist
   */
  isTokenExpired(): boolean {
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY)
    if (!expiry) return true
    return Date.now() >= parseInt(expiry, 10)
  },

  /**
   * Löscht alle Tokens aus localStorage
   */
  clearTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(TOKEN_EXPIRY_KEY)
  },

  /**
   * Gibt die restliche Gültigkeitsdauer des Access Tokens zurück (in Sekunden)
   */
  getTokenTimeRemaining(): number {
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY)
    if (!expiry) return 0
    const remaining = parseInt(expiry, 10) - Date.now()
    return Math.max(0, Math.floor(remaining / 1000))
  }
}
