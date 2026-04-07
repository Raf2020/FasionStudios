"use server";
import { Class } from "@/types/class.types";
import { deleteStorageFile } from "../firebase/storage";
import { addClass, updateClass, deleteClassById } from "./class.db";
import { handleImageUploadAndGetUrl } from "@/actions/image/image.action";
import { sanitizeString } from "@/lib/util";

// Create Class
export const processClassCreation = async (formData: FormData) => {
  try {
    const name = {
      en: formData.get("name.en") as string,
      es: formData.get("name.es") as string,
    };

    const description = {
      en: formData.get("description.en") as string,
      es: formData.get("description.es") as string,
    };

    const position = parseInt(formData.get("position") as string) || 0;
    const image = formData.get("image") as File | null;

    let imageUrl = "";

    if (image && image.size > 0) {
      const folderPath = `classes/${sanitizeString(name.en)}-${Date.now()}`;
      const uploadResult = await handleImageUploadAndGetUrl(image, folderPath, "cover");

      if (uploadResult.error) {
        return { success: false, errorMessage: uploadResult.error || "Failed to upload image" };
      }

      imageUrl = uploadResult.url;
    }

    const newClass: Omit<Class, "id"> = {
      name,
      description,
      image: imageUrl,
      position,
    };

    const result = await addClass(newClass);

    return {
      ...result,
      errorMessage: result.success ? undefined : "Error saving class to Firestore",
    };
  } catch (error) {
    console.error("[CREATE] Unexpected error:", error);
    return { success: false, errorMessage: "Unexpected error during class creation" };
  }
};

// Update Class
export const processClassUpdate = async (classData: Class, formData: FormData) => {
  try {
    const name = {
      en: formData.get("name.en") as string,
      es: formData.get("name.es") as string,
    };

    const description = {
      en: formData.get("description.en") as string,
      es: formData.get("description.es") as string,
    };

    const position = parseInt(formData.get("position") as string) || classData.position;
    const image = formData.get("image") as File | null;

    let imageUrl = classData.image;

    if (image && image.size > 0) {
      if (imageUrl && imageUrl.startsWith("https://")) {
        await deleteStorageFile(imageUrl);
      }

      const folderPath = `classes/${sanitizeString(name.en)}-${Date.now()}`;
      const uploadResult = await handleImageUploadAndGetUrl(image, folderPath, "cover");

      if (uploadResult.error || !uploadResult.url) {
        return { success: false, errorMessage: uploadResult.error || "Failed to upload new image" };
      }

      imageUrl = uploadResult.url;
    }

    const updatedClass: Class = {
      id: classData.id,
      name,
      description,
      image: imageUrl,
      position,
    };

    const result = await updateClass(updatedClass);

    return {
      success: result.success,
      errorMessage: result.success ? undefined : "Error updating class in Firestore",
    };
  } catch (error) {
    console.error("[UPDATE] Unexpected error:", error);
    return { success: false, errorMessage: "Unexpected error during class update" };
  }
};

// Delete Class
export const processClassDeletion = async (classData: Class) => {
  try {
    if (classData.image && classData.image.startsWith("https://")) {
      await deleteStorageFile(classData.image);
    }

    const result = await deleteClassById(classData.id);

    return result;
  } catch (error) {
    console.error("[DELETE] Unexpected error:", error);
    return { success: false };
  }
};
