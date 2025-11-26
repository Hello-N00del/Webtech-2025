import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

export interface ImageProcessResult {
  filepath: string;
  filename: string;
  width: number;
  height: number;
  size: number;
}

export const processImage = async (
  inputPath: string,
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 85
): Promise<ImageProcessResult> => {
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  // Resize if larger than max dimensions
  if (metadata.width! > maxWidth || metadata.height! > maxHeight) {
    await image.resize(maxWidth, maxHeight, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  // Optimize and save
  await image
    .jpeg({ quality, progressive: true })
    .png({ compressionLevel: 9 })
    .webp({ quality })
    .toFile(inputPath + '.optimized');

  // Replace original
  await fs.rename(inputPath + '.optimized', inputPath);

  // Get final metadata
  const finalMetadata = await sharp(inputPath).metadata();
  const stats = await fs.stat(inputPath);

  return {
    filepath: inputPath,
    filename: path.basename(inputPath),
    width: finalMetadata.width!,
    height: finalMetadata.height!,
    size: stats.size,
  };
};