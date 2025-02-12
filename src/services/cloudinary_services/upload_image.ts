import fs from 'fs';
import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../../config/cloudinary';

interface UploadResult {
  url: string;
  cloudId: string;
}

export const upload_image = async (filePath: string): Promise<UploadResult> => {
  try {
    const result: UploadApiResponse = await cloudinary.uploader.upload(filePath, {
      folder: 'Movie',
    });

    fs.unlinkSync(filePath);

    return {
      url: result.secure_url,
      cloudId: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('There was an error loading the image!');
  }
};