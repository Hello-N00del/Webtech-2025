/**
 * API Response Types
 * Standardisierte Response-Strukturen für Backend-Kommunikation
 */

//Standard API Response Format
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

//Standard API Error Response
export interface ApiErrorResponse {
  success: false
  message: string
  errors?: Record<string, string[]>
  statusCode: number
}

//Authentication Response (Login/Register)
export interface AuthResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
  user: {
    id: string
    email: string
    name: string
    role: 'ADMIN' | 'USER'
  }
}

//Login Request
export interface LoginRequest {
  email: string
  password: string
}

//Register Request
export interface RegisterRequest {
  email: string
  password: string
  name: string
}

//Refresh Token Request
export interface RefreshTokenRequest {
  refreshToken: string
}

//Pagination Info
export interface PaginationInfo {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

//Paginated Response
export interface PaginatedResponse<T = any> {
  data: T[]
  pagination: PaginationInfo
}

//Axios Error with API structure
export interface AxiosApiError {
  response?: {
    status: number
    data: ApiErrorResponse
  }
  message: string
  code?: string
}
