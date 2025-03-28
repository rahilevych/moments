import { v2 as cloudinary } from 'cloudinary';
const deleteImageFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return;

    const publicId = imageUrl.split('/').pop()?.split('.')[0];
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
      console.log(`Deleted image: ${publicId}`);
    }
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
  }
};
export default deleteImageFromCloudinary;
