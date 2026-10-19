import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import sharp from 'sharp';
import fs from 'fs/promises';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.Cloud_name,
    api_key: process.env.Api_key,
    api_secret: process.env.Api_secret
});

export const signle_img_url = async (path) => {
    try {
        const compressedPath = `./uploads/compressed-${Date.now()}.webp`;

        await sharp(path).resize({ width: 1200, withoutEnlargement: true })
            .webp({ quality: 60 }).toFile(compressedPath);

        const uploadResult = await cloudinary.uploader.upload(compressedPath, { resource_type: "image" });

        await fs.unlink(compressedPath);

        console.log("Original:", path);
        console.log("Uploaded:", uploadResult.secure_url);

        return uploadResult;

    }
    catch (err) {
        console.log(err.message);
        throw err;
    }
};

export const multiple_img_url = async (paths) => {
    try {
        const uploadResults = await Promise.all(paths.map(async (path) => {
            const compressedPath = `./uploads/compressed-${Date.now()}-${Math.random().toString(36).substring(2, 15)}.webp`;

        }));
        return uploadResults;
    }
    catch (err) {
        console.log(err.message);
        throw err;
    }
}

export const delete_img_url = async (publicId) => {
    try {
        const deleteResult = await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
        return deleteResult;
    }
    catch (err) {
        console.log(err.message);
        throw err;
    }
};