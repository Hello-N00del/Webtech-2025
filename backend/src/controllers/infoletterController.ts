import { Request, Response } from 'express';
import * as infoletterService from '../services/infoletterService.js';
import { infoletterSchema, updateInfoletterSchema, collaboratorSchema } from '../utils/validators.js';
import type { CollaboratorRole } from '@prisma/client';

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
    res.status(400).json({ error: err.message || 'Failed to fetch infoletter' });
  }
};

export const createInfoletter = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { title, content } = infoletterSchema.parse(req.body);
    const infoletter = await infoletterService.createInfoletter(
      req.user.userId,
      title,
      content,
      req.ip,
      req.get('user-agent')
    );

    res.status(201).json(infoletter);
  } catch (err: any) {
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

    const infoletter = await infoletterService.updateInfoletter(
      id,
      req.user.userId,
      title,
      content,
      status,
      req.ip,
      req.get('user-agent')
    );

    res.json(infoletter);
  } catch (err: any) {
    if (err.message === 'Access denied') {
      return res.status(403).json({ error: 'Access denied' });
    }
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

    // Get image dimensions (if available)
    let width: number | undefined;
    let height: number | undefined;

    // For now, store basic info. Image dimension extraction would require additional library
    const image = await infoletterService.addImage(
      infoletterId,
      req.user.userId,
      filename,
      req.file.path || `/uploads/${filename}`,
      mimetype,
      size,
      width,
      height
    );

    res.status(201).json(image);
  } catch (err: any) {
    if (err.message === 'Access denied') {
      return res.status(403).json({ error: 'Access denied' });
    }
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

    res.json({ message: 'Image deleted successfully', image });
  } catch (err: any) {
    if (err.message === 'Access denied') {
      return res.status(403).json({ error: 'Access denied' });
    }
    res.status(400).json({ error: err.message || 'Failed to delete image' });
  }
};
