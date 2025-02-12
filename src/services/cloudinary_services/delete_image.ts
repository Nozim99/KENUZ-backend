import cloudinary from '../../config/cloudinary';


export const delete_image = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('There was an error deleting the image!');
  }
};