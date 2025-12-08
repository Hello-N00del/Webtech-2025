/**
 * API Error Handler
 * Zentrales Error Handling für alle API-Fehler
 */

import type { AxiosError } from 'axios'
import type { ApiErrorResponse } from '../types/api'

export class ApiError extends Error {
  public statusCode: number
  public errors?: Record<string, string[]>

  constructor(
    message: string,
    statusCode: number = 500,
    errors?: Record<string, string[]>
  ) {
    super(message)
    this.statusCode = statusCode
    this.errors = errors
    this.name = 'ApiError'
  }
}

/**
 * Fehlerbehandlung für API-Responses
 */
export function handleApiError(error: unknown): ApiError {
  // Axios Error
  if (isAxiosError(error)) {
    const status = error.response?.status || 500
    const data = error.response?.data as ApiErrorResponse | undefined
    const message = data?.message || error.message || 'Ein Fehler ist aufgetreten'
    const errors = data?.errors
    return new ApiError(message, status, errors)
  }

  // Standard JavaScript Error
  if (error instanceof Error) {
    return new ApiError(error.message)
  }

  // Unknown Error
  return new ApiError('Ein unbekannter Fehler ist aufgetreten')
}

/**
 * Prüft ob ein Fehler ein Axios Error ist
 */
function isAxiosError(error: unknown): error is AxiosError<ApiErrorResponse> {
  return (
    error !== null &&
    typeof error === 'object' &&
    'response' in error &&
    'message' in error &&
    'code' in error
  )
}

/**
 * Gibt eine leserfreundliche Fehlermeldung basierend auf Status Code zurück
 */
export function getErrorMessage(error: ApiError): string {
  const statusMessages: Record<number, string> = {
    400: 'Ungültige Eingabe. Bitte prüfe deine Daten.',
    401: 'Authentifizierung erforderlich. Bitte melde dich an.',
    403: 'Du hast keine Berechtigung für diese Aktion.',
    404: 'Die angeforderte Ressource wurde nicht gefunden.',
    409: 'Ein Konflikt ist aufgetreten. Eventuell existiert die Ressource bereits.',
    422: 'Validierungsfehler bei deiner Eingabe.',
    500: 'Ein interner Fehler ist aufgetreten. Bitte versuche es später erneut.',
    503: 'Der Dienst ist derzeit nicht verfügbar. Bitte versuche es später erneut.'
  }

  return statusMessages[error.statusCode] || error.message
}

/**
 * Prüft ob ein Fehler ein Authentifizierungsfehler ist
 */
export function isAuthError(error: ApiError): boolean {
  return error.statusCode === 401 || error.statusCode === 403
}

/**
 * Prüft ob ein Fehler ein Validierungsfehler ist
 */
export function isValidationError(error: ApiError): boolean {
  return error.statusCode === 400 || error.statusCode === 422
}

/**
 * Gibt die Validierungsfehler strukturiert zurück
 */
export function getValidationErrors(error: ApiError): Record<string, string[]> {
  return error.errors || {}
}
