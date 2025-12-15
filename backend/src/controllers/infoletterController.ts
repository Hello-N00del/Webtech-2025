import { Request, Response } from 'express';
import * as infoletterService from '../services/infoletterService.js';
import { infoletterSchema, updateInfoletterSchema, collaboratorSchema } from '../utils/validators.js';
import { sanitizeHTML, extractPlainText } from '../utils/htmlSanitizer.js';
import type { CollaboratorRole } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

export const getInfoletters = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const infoletters = await infoletterService.getUserInfolitters(req.user.userId);
    res.json(infoletters);
  } catch (err: any) {
    console.error('Error fetching infoletters:', err);
    res.status(400).json({ error: err.message || 'Failed to fetch infoletters' });
  }
};

export const getInfoletter = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { id } = req.params;
    const infoletter = await infoletterService.getInfoletter(id, req.user.userId);
    res.json(infoletter);
  } catch (err: any) {
    if (err.message === 'Access denied') {
      return res.status(403).json({ error: 'Access denied' });
    }
    console.error('Error fetching infoletter:', err);
    res.status(400).json({ error: err.message || 'Failed to fetch infoletter' });
  }
};

export const createInfoletter = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { title, content } = infoletterSchema.parse(req.body);
    
    // Sanitize HTML content for security
    const sanitizedContent = sanitizeHTML(content);

    const infoletter = await infoletterService.createInfoletter(
      req.user.userId,
      title,
      sanitizedContent,
      req.ip,
      req.get('user-agent')
    );

    res.status(201).json(infoletter);
  } catch (err: any) {
    console.error('Error creating infoletter:', err);
    res.status(400).json({ error: err.message || 'Failed to create infoletter' });
  }
};

export const updateInfoletter = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { id } = req.params;
    const { title, content, status } = updateInfoletterSchema.parse(req.body);

    // Sanitize HTML content for security
    const sanitizedContent = sanitizeHTML(content);

    const infoletter = await infoletterService.updateInfoletter(
      id,
      req.user.userId,
      title,
      sanitizedContent,
      status,
      req.ip,
      req.get('user-agent')
    );

    res.json(infoletter);
  } catch (err: any) {
    if (err.message === 'Access denied') {
      return res.status(403).json({ error: 'Access denied' });
    }
    console.error('Error updating infoletter:', err);
    res.status(400).json({ error: err.message || 'Failed to update infoletter' });
  }
};

export const deleteInfoletter = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { id } = req.params;
    const infoletter = await infoletterService.deleteInfoletter(
      id,
      req.user.userId,
      req.ip,
      req.get('user-agent')
    );

    res.json({ message: 'Infoletter deleted successfully', infoletter });
  } catch (err: any) {
    if (err.message === 'Access denied') {
      return res.status(403).json({ error: 'Only owner can delete' });
    }
    console.error('Error deleting infoletter:', err);
    res.status(400).json({ error: err.message || 'Failed to delete infoletter' });
  }
};

export const addCollaborator = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { infoletterId } = req.params;
    const { userId, role } = collaboratorSchema.parse(req.body);

    const collaborator = await infoletterService.addCollaborator(
      infoletterId,
      req.user.userId,
      userId,
      role as CollaboratorRole,
      req.ip,
      req.get('user-agent')
    );

    res.status(201).json(collaborator);
  } catch (err: any) {
    if (err.message === 'Access denied') {
      return res.status(403).json({ error: 'Only owner can add collaborators' });
    }
    console.error('Error adding collaborator:', err);
    res.status(400).json({ error: err.message || 'Failed to add collaborator' });
  }
};

export const removeCollaborator = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { infoletterId, userId } = req.params;

    const result = await infoletterService.removeCollaborator(
      infoletterId,
      req.user.userId,
      userId,
      req.ip,
      req.get('user-agent')
    );

    res.json({ message: 'Collaborator removed successfully', ...result });
  } catch (err: any) {
    if (err.message === 'Access denied') {
      return res.status(403).json({ error: 'Only owner can remove collaborators' });
    }
    console.error('Error removing collaborator:', err);
    res.status(400).json({ error: err.message || 'Failed to remove collaborator' });
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const { infoletterId } = req.params;
    const { filename, mimetype, size } = req.file;

    console.log('Upload details:', { filename, mimetype, size, path: req.file.path });

    // Extract just the filename from the path (Multer already saved it with UUID name)
    const savedFilename = path.basename(req.file.path);
    // Store relative path for database
    const relativePath = `/uploads/infoletter-images/${savedFilename}`;

    console.log('Storing image with path:', relativePath);

    const image = await infoletterService.addImage(
      infoletterId,
      req.user.userId,
      filename,
      relativePath,
      mimetype,
      size
    );

    res.status(201).json({
      ...image,
      url: relativePath, // Frontend kann damit direkt auf Bild zugreifen
    });
  } catch (err: any) {
    // Clean up uploaded file if error occurs
    if (req.file?.path) {
      try {
        console.log('Cleaning up file:', req.file.path);
        await fs.unlink(req.file.path);
      } catch (e) {
        console.error('Error deleting uploaded file:', e);
      }
    }

    if (err.message === 'Access denied') {
      return res.status(403).json({ error: 'Access denied' });
    }
    console.error('Error uploading image:', err);
    res.status(400).json({ error: err.message || 'Failed to upload image' });
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { imageId } = req.params;

    const image = await infoletterService.deleteImage(
      imageId,
      req.user.userId,
      req.ip,
      req.get('user-agent')
    );

    // Try to delete file from disk
    if (image.filepath) {
      try {
        // The filepath is relative (e.g., /uploads/infoletter-images/uuid.png)
        // We need to construct the full path
        const fullPath = path.join(process.cwd(), 'public', image.filepath);
        console.log('Deleting image file:', fullPath);
        await fs.unlink(fullPath);
      } catch (e) {
        console.warn('Could not delete file from disk:', e);
      }
    }

    res.json({ message: 'Image deleted successfully', image });
  } catch (err: any) {
    if (err.message === 'Access denied') {
      return res.status(403).json({ error: 'Access denied' });
    }
    console.error('Error deleting image:', err);
    res.status(400).json({ error: err.message || 'Failed to delete image' });
  }
};
