/**
 * Infoletter Service
 * Behandelt alle Infoletter-bezogenen API-Calls
 */

import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from './api'
import type { Infoletter } from '../models/infoletter'

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
   * Alle Infoletters abrufen (private - nur eigene + collaborations)
   */
  async getAll(params?: InfoletterQueryParams): Promise<Infoletter[]> {
    try {
      const response = await getRequest<Infoletter[]>('/infoletters', {
        params
      })
      return Array.isArray(response) ? response : []
    } catch (error) {
      console.error('Error fetching infoletters:', error)
      throw error
    }
  },

  /**
   * Alle Infoletters abrufen (Alias)
   */
  async fetchInfoletters(params?: InfoletterQueryParams): Promise<Infoletter[]> {
    return this.getAll(params)
  },

  /**
   * ✅ Alle PUBLISHED Infoletters abrufen (public - für Dashboard)
   */
  async getPublished(): Promise<Infoletter[]> {
    try {
      const response = await getRequest<Infoletter[]>('/infoletters/public/published')
      return Array.isArray(response) ? response : []
    } catch (error) {
      console.error('Error fetching published infoletters:', error)
      throw error
    }
  },

  /**
   * Einzelnen Infoletter abrufen
   */
  async getById(id: string): Promise<Infoletter> {
    try {
      const response = await getRequest<Infoletter>(`/infoletters/${id}`)
      return response as Infoletter
    } catch (error) {
      console.error('Error fetching infoletter:', error)
      throw error
    }
  },

  /**
   * Einzelnen Infoletter abrufen (Alias)
   */
  async fetchInfoletter(id: string): Promise<Infoletter> {
    return this.getById(id)
  },

  /**
   * Neuen Infoletter erstellen
   */
  async create(data: { title: string; content: string }): Promise<Infoletter> {
    try {
      const response = await postRequest<Infoletter>('/infoletters', data)
      return response as Infoletter
    } catch (error) {
      console.error('Error creating infoletter:', error)
      throw error
    }
  },

  /**
   * Neuen Infoletter erstellen (Alias)
   */
  async createInfoletter(data: { title: string; content: string }): Promise<Infoletter> {
    return this.create(data)
  },

  /**
   * Infoletter aktualisieren
   */
  async update(
    id: string,
    data: { title: string; content: string; status?: 'DRAFT' | 'PUBLISHED' }
  ): Promise<Infoletter> {
    try {
      const response = await putRequest<Infoletter>(`/infoletters/${id}`, data)
      return response as Infoletter
    } catch (error) {
      console.error('Error updating infoletter:', error)
      throw error
    }
  },

  /**
   * Infoletter aktualisieren (Alias)
   */
  async updateInfoletter(
    id: string,
    data: { title: string; content: string; status?: 'DRAFT' | 'PUBLISHED' }
  ): Promise<Infoletter> {
    return this.update(id, data)
  },

  /**
   * Infoletter löschen
   */
  async delete(id: string): Promise<any> {
    try {
      return await deleteRequest(`/infoletters/${id}`)
    } catch (error) {
      console.error('Error deleting infoletter:', error)
      throw error
    }
  },

  /**
   * Infoletter löschen (Alias)
   */
  async deleteInfoletter(id: string): Promise<any> {
    return this.delete(id)
  },

  /**
   * Collaborator hinzufügen
   */
  async addCollaborator(
    infoletterId: string,
    data: { userId: string; role: 'CO_AUTHOR' | 'EDITOR' | 'VIEWER' }
  ): Promise<any> {
    try {
      const response = await postRequest(
        `/infoletters/${infoletterId}/collaborators`,
        data
      )
      return response
    } catch (error) {
      console.error('Error adding collaborator:', error)
      throw error
    }
  },

  /**
   * Collaborator entfernen
   */
  async removeCollaborator(infoletterId: string, userId: string): Promise<any> {
    try {
      return await deleteRequest(`/infoletters/${infoletterId}/collaborators/${userId}`)
    } catch (error) {
      console.error('Error removing collaborator:', error)
      throw error
    }
  },

  /**
   * Bild zu Infoletter hochladen
   * WICHTIG: FormData wird verwendet, daher wird Content-Type automatisch gesetzt
   */
  async uploadImage(infoletterId: string, file: File): Promise<any> {
    try {
      const formData = new FormData()
      formData.append('image', file)
      
      console.log('Uploading image to /infoletters/' + infoletterId + '/images')
      
      // DON'T set Content-Type header - let browser set it with boundary
      // When sending FormData, axios will automatically set the correct Content-Type
      const response = await postRequest(
        `/infoletters/${infoletterId}/images`,
        formData,
        {
          headers: {
            // Remove Content-Type header - let browser/axios handle it
            'Content-Type': undefined
          }
        }
      )
      
      console.log('Upload response:', response)
      
      if (!response.url && response.filepath) {
        response.url = response.filepath
      }
      
      return response
    } catch (error: any) {
      console.error('Error uploading image:', error)
      // Provide better error message
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error)
      }
      throw new Error(error.message || 'Fehler beim Hochladen des Bildes')
    }
  },

  /**
   * Bild löschen
   */
  async deleteImage(imageId: string): Promise<any> {
    try {
      return await deleteRequest(`/infoletters/images/${imageId}`)
    } catch (error) {
      console.error('Error deleting image:', error)
      throw error
    }
  }
}
