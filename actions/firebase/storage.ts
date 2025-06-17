import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "@firebase/storage";
import storage from "@/lib/storage";

/**
 * Upload an image to Firebase Storage
 */
export const uploadStorageImage = async (file: File, path: string) => {
  try {
    console.log("[STORAGE][UPLOAD] Uploading file to:", path);
    const pathRef = ref(storage, path);
    const { metadata } = await uploadBytes(pathRef, file);

    if (!metadata.fullPath) {
      console.warn("[STORAGE][UPLOAD] Upload succeeded but no path returned.");
      return "";
    }

    console.log("[STORAGE][UPLOAD] Upload successful:", metadata.fullPath);
    return pathRef.fullPath;
  } catch (error) {
    console.error("[STORAGE][UPLOAD] Failed to upload file:", path, JSON.stringify(error));
    return "";
  }
};

/**
 * Delete a file from Firebase Storage
 */
export const deleteStorageFile = async (path: string) => {
  try {
    console.log("[STORAGE][DELETE] Deleting file at path:", path);
    const pathRef = ref(storage, path);
    await deleteObject(pathRef);
    console.log("[STORAGE][DELETE] File deleted:", path);
    return { success: true };
  } catch (error) {
    console.error("[STORAGE][DELETE] Failed to delete file:", path, error);
    return { success: false };
  }
};

/**
 * Get public download URL from Firebase Storage
 */
export const getStorageImageUrl = async (path: string) => {
  try {
    const pathRef = ref(storage, path);
    const publicUrl = await getDownloadURL(pathRef);
    return publicUrl;
  } catch (error) {
    console.error("[STORAGE][GET_URL] Failed to get download URL for:", path, error);
    return "";
  }
};