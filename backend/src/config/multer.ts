import multer from 'multer';
import path from 'path';
import { env } from './env.js';
import { v4 as uuidv4 } from 'uuid';
import { mkdir } from 'fs/promises';

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const uploadType = req.path.includes('profile-image')
        ? 'profile-images'
        : 'infoletter-images';
      
      const uploadDir = path.join(env.UPLOAD_DIR, uploadType);
      
      // Create directory if it doesn't exist
      await mkdir(uploadDir, { recursive: true });
      console.log(`✅ Upload directory ready: ${uploadDir}`);
      
      cb(null, uploadDir);
    } catch (err: any) {
      console.error('❌ Error creating upload directory:', err);
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Only JPEG, PNG, GIF, WEBP, and SVG are allowed. Got: ${file.mimetype}`));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: env.MAX_FILE_SIZE,
  },
});
