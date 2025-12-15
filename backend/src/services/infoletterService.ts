import prisma from '../config/database.js';
import { AuditAction } from '@prisma/client';
import type { CollaboratorRole } from '@prisma/client';

// Helper for audit logging
async function logAudit(
  userId: string | null,
  action: AuditAction,
  entityType: string | null,
  entityId: string | null,
  details: any = null,
  ipAddress?: string,
  userAgent?: string
) {
  await prisma.auditLog.create({
    data: {
      userId,
      action,
      entityType,
      entityId,
      details: details ? JSON.stringify(details) : null,
      ipAddress,
      userAgent,
    },
  });
}

// Get all infoletters for a user (owned or collaborated)
export const getUserInfolitters = async (userId: string) => {
  const infoletters = await prisma.infoletter.findMany({
    where: {
      OR: [
        { ownerId: userId },
        { collaborators: { some: { userId } } },
      ],
      deletedAt: null,
    },
    include: {
      owner: {
        select: { id: true, name: true, email: true, profileImageUrl: true },
      },
      collaborators: {
        include: {
          user: {
            select: { id: true, name: true, email: true, profileImageUrl: true },
          },
        },
      },
      images: true,
      versions: { orderBy: { createdAt: 'desc' }, take: 1 },
    },
    orderBy: { updatedAt: 'desc' },
  });

  return infoletters;
};

// Get single infoletter by ID
export const getInfoletter = async (infoletterId: string, userId: string) => {
  const infoletter = await prisma.infoletter.findUnique({
    where: { id: infoletterId, deletedAt: null },
    include: {
      owner: {
        select: { id: true, name: true, email: true, profileImageUrl: true },
      },
      collaborators: {
        include: {
          user: {
            select: { id: true, name: true, email: true, profileImageUrl: true },
          },
        },
      },
      images: true,  // Include images for gallery
      versions: { orderBy: { versionNumber: 'desc' } },
    },
  });

  if (!infoletter) {
    throw new Error('Infoletter not found');
  }

  // Check access
  const isOwner = infoletter.ownerId === userId;
  const isCollaborator = infoletter.collaborators.some(c => c.userId === userId);

  if (!isOwner && !isCollaborator) {
    throw new Error('Access denied');
  }

  return infoletter;
};

// Create new infoletter
export const createInfoletter = async (
  userId: string,
  title: string,
  content: string,
  ipAddress?: string,
  userAgent?: string
) => {
  const infoletter = await prisma.infoletter.create({
    data: {
      ownerId: userId,
      title,
      content,
      status: 'DRAFT',
    },
    include: {
      owner: {
        select: { id: true, name: true, email: true, profileImageUrl: true },
      },
      collaborators: true,
      images: true,
    },
  });

  // Create initial version
  await prisma.infoletterVersion.create({
    data: {
      infoletterId: infoletter.id,
      versionNumber: 1,
      title,
      content,
      authorId: userId,
    },
  });

  await logAudit(userId, AuditAction.CREATE, 'Infoletter', infoletter.id, { title }, ipAddress, userAgent);

  return infoletter;
};

// Update infoletter
export const updateInfoletter = async (
  infoletterId: string,
  userId: string,
  title: string,
  content: string,
  status?: string,
  ipAddress?: string,
  userAgent?: string
) => {
  const infoletter = await prisma.infoletter.findUnique({
    where: { id: infoletterId, deletedAt: null },
    include: { collaborators: true },
  });

  if (!infoletter) {
    throw new Error('Infoletter not found');
  }

  // Check access (owner or co-author/editor)
  const isOwner = infoletter.ownerId === userId;
  const collaborator = infoletter.collaborators.find(c => c.userId === userId);
  const isEditor = collaborator?.role === 'CO_AUTHOR' || collaborator?.role === 'EDITOR';

  if (!isOwner && !isEditor) {
    throw new Error('Access denied');
  }

  // Create new version (snapshot)
  const lastVersion = await prisma.infoletterVersion.findFirst({
    where: { infoletterId },
    orderBy: { versionNumber: 'desc' },
  });

  const newVersionNumber = (lastVersion?.versionNumber || 0) + 1;

  await prisma.infoletterVersion.create({
    data: {
      infoletterId,
      versionNumber: newVersionNumber,
      title,
      content,
      authorId: userId,
    },
  });

  // Update infoletter
  const updated = await prisma.infoletter.update({
    where: { id: infoletterId },
    data: {
      title,
      content,
      ...(status && { status }),
      ...(status === 'PUBLISHED' && { publishedAt: new Date() }),
    },
    include: {
      owner: {
        select: { id: true, name: true, email: true, profileImageUrl: true },
      },
      collaborators: {
        include: {
          user: {
            select: { id: true, name: true, email: true, profileImageUrl: true },
          },
        },
      },
      images: true,  // Include images
      versions: { orderBy: { versionNumber: 'desc' }, take: 1 },
    },
  });

  await logAudit(userId, AuditAction.UPDATE, 'Infoletter', infoletterId, { title }, ipAddress, userAgent);

  return updated;
};

// Soft delete infoletter
export const deleteInfoletter = async (
  infoletterId: string,
  userId: string,
  ipAddress?: string,
  userAgent?: string
) => {
  const infoletter = await prisma.infoletter.findUnique({
    where: { id: infoletterId },
  });

  if (!infoletter) {
    throw new Error('Infoletter not found');
  }

  if (infoletter.ownerId !== userId) {
    throw new Error('Only owner can delete infoletter');
  }

  const deleted = await prisma.infoletter.update({
    where: { id: infoletterId },
    data: { deletedAt: new Date() },
  });

  await logAudit(userId, AuditAction.DELETE, 'Infoletter', infoletterId, null, ipAddress, userAgent);

  return deleted;
};

// Add collaborator to infoletter
export const addCollaborator = async (
  infoletterId: string,
  userId: string,
  collaboratorUserId: string,
  role: CollaboratorRole,
  ipAddress?: string,
  userAgent?: string
) => {
  const infoletter = await prisma.infoletter.findUnique({
    where: { id: infoletterId },
  });

  if (!infoletter) {
    throw new Error('Infoletter not found');
  }

  if (infoletter.ownerId !== userId) {
    throw new Error('Only owner can add collaborators');
  }

  // Check if user exists
  const targetUser = await prisma.user.findUnique({
    where: { id: collaboratorUserId },
  });

  if (!targetUser) {
    throw new Error('User not found');
  }

  // Check if already collaborator
  const existing = await prisma.infoletterCollaborator.findUnique({
    where: {
      infoletterId_userId: {
        infoletterId,
        userId: collaboratorUserId,
      },
    },
  });

  if (existing) {
    throw new Error('User is already a collaborator');
  }

  const collaborator = await prisma.infoletterCollaborator.create({
    data: {
      infoletterId,
      userId: collaboratorUserId,
      role,
    },
    include: {
      user: {
        select: { id: true, name: true, email: true, profileImageUrl: true },
      },
    },
  });

  await logAudit(userId, AuditAction.INVITE_COLLABORATOR, 'Infoletter', infoletterId, { collaboratorUserId, role }, ipAddress, userAgent);

  return collaborator;
};

// Remove collaborator from infoletter
export const removeCollaborator = async (
  infoletterId: string,
  userId: string,
  collaboratorUserId: string,
  ipAddress?: string,
  userAgent?: string
) => {
  const infoletter = await prisma.infoletter.findUnique({
    where: { id: infoletterId },
  });

  if (!infoletter) {
    throw new Error('Infoletter not found');
  }

  if (infoletter.ownerId !== userId) {
    throw new Error('Only owner can remove collaborators');
  }

  const deleted = await prisma.infoletterCollaborator.deleteMany({
    where: {
      infoletterId,
      userId: collaboratorUserId,
    },
  });

  if (deleted.count === 0) {
    throw new Error('Collaborator not found');
  }

  await logAudit(userId, AuditAction.REMOVE_COLLABORATOR, 'Infoletter', infoletterId, { collaboratorUserId }, ipAddress, userAgent);

  return { success: true };
};

// Add image to infoletter
export const addImage = async (
  infoletterId: string,
  userId: string,
  filename: string,
  filepath: string,
  mimeType: string,
  size: number,
  width?: number,
  height?: number
) => {
  const infoletter = await prisma.infoletter.findUnique({
    where: { id: infoletterId, deletedAt: null },
    include: { collaborators: true },
  });

  if (!infoletter) {
    throw new Error('Infoletter not found');
  }

  // Check access
  const isOwner = infoletter.ownerId === userId;
  const collaborator = infoletter.collaborators.find(c => c.userId === userId);
  const isEditor = collaborator?.role === 'CO_AUTHOR' || collaborator?.role === 'EDITOR';

  if (!isOwner && !isEditor) {
    throw new Error('Access denied');
  }

  const image = await prisma.infoletterImage.create({
    data: {
      infoletterId,
      filename,
      filepath,
      mimeType,
      size,
      width,
      height,
    },
  });

  return image;
};

// Delete image from infoletter
export const deleteImage = async (
  imageId: string,
  userId: string,
  ipAddress?: string,
  userAgent?: string
) => {
  const image = await prisma.infoletterImage.findUnique({
    where: { id: imageId },
    include: { infoletter: true },
  });

  if (!image) {
    throw new Error('Image not found');
  }

  // Check access
  if (image.infoletter.ownerId !== userId) {
    const collaborator = await prisma.infoletterCollaborator.findUnique({
      where: {
        infoletterId_userId: {
          infoletterId: image.infoletterId,
          userId,
        },
      },
    });

    if (!collaborator || (collaborator.role !== 'CO_AUTHOR' && collaborator.role !== 'EDITOR')) {
      throw new Error('Access denied');
    }
  }

  const deleted = await prisma.infoletterImage.delete({
    where: { id: imageId },
  });

  return deleted;
};
