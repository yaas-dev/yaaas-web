import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export default cloudinary;

/**
 * Uploads a file to Cloudinary from a base64 string or buffer
 */
export async function uploadImage(fileStr: string, folder: string = 'yaaas') {
    try {
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: folder,
            resource_type: 'auto',
        });
        return uploadResponse.secure_url;
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        throw new Error('Failed to upload image');
    }
}
