import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "@firebase/storage";
import storage from "@/lib/storage";

export const uploadStorageImage = async (file: File, path: string) => {
  try {
    const pathRef = ref(storage, path);
    const { metadata } = await uploadBytes(pathRef, file);
    if (!metadata.fullPath) {
      return "";
    } else {
      return pathRef.fullPath;
    }
  } catch (error) {
    return "";
  }
};

export const deleteStorageFile = async (path: string) => {
  try {
    const pathRef = ref(storage, path);
    await deleteObject(pathRef);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

export const getStorageImageUrl = async (path: string) => {
  try {
    const pathRef = ref(storage, path);
    const publicUrl = await getDownloadURL(pathRef);
    return publicUrl;
  } catch (error) {
    return "";
  }
};
