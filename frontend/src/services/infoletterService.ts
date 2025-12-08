/**
 * Infoletter Service
 * Behandelt alle Infoletter-bezogenen API-Calls
 */

import {
  getRequest,
  postRequest,
  putRequest,
  patchRequest,
  deleteRequest
} from './api'
import type { Infoletter } from '../models/infoletter'
import type { ApiResponse, PaginatedResponse } from '../types/api'

/**
 * Infoletter Query Parameters für Pagination und Filter
 */
export interface InfoletterQueryParams {
  page?: number
  pageSize?: number
  status?: 'DRAFT' | 'PUBLISHED'
  search?: string
  sortBy?: 'createdAt' | 'updatedAt' | 'title'
  sortOrder?: 'asc' | 'desc'
}

/**
 * Infoletter Service
 */
export const infoletterService = {
  /**
   * Alle Infoletters abrufen (paginiert)
   */
  async fetchInfoletters(params?: InfoletterQueryParams): Promise<PaginatedResponse<Infoletter>> {
    try {
      return await getRequest<PaginatedResponse<Infoletter>>('/infoletters', {
        params
      })
    } catch (error) {
      throw error
    }
  },

  /**
   * Einzelnen Infoletter abrufen
   */
  async fetchInfoletter(id: string): Promise<Infoletter> {
    try {
      const response = await getRequest<ApiResponse<Infoletter>>(`/infoletters/${id}`)
      if (response && typeof response === 'object') {
        return response as Infoletter
      }
      throw new Error('Ungültige Response-Struktur')
    } catch (error) {
      throw error
    }
  },

  /**
   * Neuen Infoletter erstellen
   */
  async createInfoletter(data: Partial<Infoletter>): Promise<Infoletter> {
    try {
      const response = await postRequest<ApiResponse<Infoletter>>('/infoletters', data)
      if (response && typeof response === 'object') {
        return response as Infoletter
      }
      throw new Error('Ungültige Response-Struktur')
    } catch (error) {
      throw error
    }
  },

  /**
   * Infoletter aktualisieren
   */
  async updateInfoletter(id: string, data: Partial<Infoletter>): Promise<Infoletter> {
    try {
      const response = await putRequest<ApiResponse<Infoletter>>(
        `/infoletters/${id}`,
        data
      )
      if (response && typeof response === 'object') {
        return response as Infoletter
      }
      throw new Error('Ungültige Response-Struktur')
    } catch (error) {
      throw error
    }
  },

  /**
   * Infoletter löschen
   */
  async deleteInfoletter(id: string): Promise<ApiResponse> {
    try {
      return await deleteRequest<ApiResponse>(`/infoletters/${id}`)
    } catch (error) {
      throw error
    }
  },

  /**
   * Infoletter veröffentlichen
   */
  async publishInfoletter(id: string): Promise<Infoletter> {
    try {
      const response = await patchRequest<ApiResponse<Infoletter>>(
        `/infoletters/${id}/publish`,
        {}
      )
      if (response && typeof response === 'object') {
        return response as Infoletter
      }
      throw new Error('Ungültige Response-Struktur')
    } catch (error) {
      throw error
    }
  },

  /**
   * Bild zu Infoletter hochladen
   */
  async uploadImage(infoletterId: string, file: File): Promise<ApiResponse> {
    try {
      const formData = new FormData()
      formData.append('image', file)
      return await postRequest<ApiResponse>(
        `/infoletters/${infoletterId}/images`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
    } catch (error) {
      throw error
    }
  },

  /**
   * Alle Bilder eines Infoletters abrufen
   */
  async fetchImages(infoletterId: string): Promise<ApiResponse> {
    try {
      return await getRequest<ApiResponse>(`/infoletters/${infoletterId}/images`)
    } catch (error) {
      throw error
    }
  },

  /**
   * Bild löschen
   */
  async deleteImage(infoletterId: string, imageId: string): Promise<ApiResponse> {
    try {
      return await deleteRequest<ApiResponse>(
        `/infoletters/${infoletterId}/images/${imageId}`
      )
    } catch (error) {
      throw error
    }
  }
}
