import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

const upload = multer({
  storage: new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'memories',
    params: {
      allowed_formats: ['jpg', 'jpeg', 'png', 'JPG'],
    },
  }),
});

export default upload;
