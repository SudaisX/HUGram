import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_secret: process.env.CLOUDINARY_SECRET,
//     api_key: process.env.CLOUDINARY_KEY,
//     secure: true,
// });

cloudinary.config({
    cloud_name: 'hugram',
    api_key: '497438942254757',
    api_secret: 'QB-SyfMwIBHy73QhEZe3Y3thkws',
    secure: true,
});

const storage = new CloudinaryStorage({
    cloudinary,
    folder: 'HUGram',
    allowedFormats: ['jpeg', 'png', 'jpg'],
});

export { cloudinary, storage };
