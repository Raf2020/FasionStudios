import { uploadStorageImage, uploadStorageImageAndGetUrl } from "../firebase/storage";
import {sanitizeString} from "@/lib/util";


export const handleOptionalImageUpload = async (
    image: File | null,
    folderPath: string,
    filePrefix: string
): Promise<{ url: string; error?: string }> => {
    if (!image) {
        console.log("[UPLOAD] No image file provided.");
        return { url: "" };
    }

    const cleanedFileName = sanitizeString(image.name);
    const cleanedPrefix = sanitizeString(filePrefix);
    const storagePath = `${folderPath}/${cleanedPrefix}-${cleanedFileName}`;

    console.log("[UPLOAD] Uploading image to path:", storagePath);

    const uploadedPath = await uploadStorageImage(image, storagePath);

    if (!uploadedPath) {
        console.error("[UPLOAD] Image upload failed.");
        return { url: "", error: "Image upload failed" };
    }

    console.log("[UPLOAD] Image uploaded successfully:", uploadedPath);
    return { url: uploadedPath };
};

export const handleImageUploadAndGetUrl = async (
    image: File | null,
    folderPath: string,
    filePrefix: string
): Promise<{ url: string; error?: string }> => {
    if (!image) {
        console.log("[UPLOAD] No image file provided.");
        return { url: "" };
    }

    const cleanedFileName = sanitizeString(image.name);
    const cleanedPrefix = sanitizeString(filePrefix);
    const storagePath = `${folderPath}/${cleanedPrefix}-${cleanedFileName}`;

    console.log("[UPLOAD] Uploading image to path:", storagePath);

    const publicUrl = await uploadStorageImageAndGetUrl(image, storagePath);

    if (!publicUrl) {
        console.error("[UPLOAD] Image upload failed.");
        return { url: "", error: "Image upload failed" };
    }

    console.log("[UPLOAD] Image uploaded, public URL:", publicUrl);
    return { url: publicUrl };
};