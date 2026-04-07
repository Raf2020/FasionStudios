"use server";
import { Teacher } from "@/types/teacher.types";
import { deleteStorageFile } from "../firebase/storage";
import { addTeacher, updateTeacher, deleteTeacherById } from "./teacher.db";
import { handleImageUploadAndGetUrl } from "@/actions/image/image.action";
import { sanitizeString } from "@/lib/util";

// Create Teacher
export const processTeacherCreation = async (formData: FormData) => {
  try {
    const name = {
      en: formData.get("name.en") as string,
      es: formData.get("name.es") as string,
    };

    const profession = {
      en: formData.get("profession.en") as string,
      es: formData.get("profession.es") as string,
    };

    const description = {
      en: formData.get("description.en") as string,
      es: formData.get("description.es") as string,
    };

    const position = parseInt(formData.get("position") as string) || 0;
    const image = formData.get("image") as File | null;

    let imageUrl = "";

    if (image && image.size > 0) {
      const folderPath = `teachers/${sanitizeString(name.en)}-${Date.now()}`;
      const uploadResult = await handleImageUploadAndGetUrl(image, folderPath, "cover");

      if (uploadResult.error) {
        return { success: false, errorMessage: uploadResult.error || "Failed to upload image" };
      }

      imageUrl = uploadResult.url;
    }

    const newTeacher: Omit<Teacher, "id"> = {
      name,
      profession,
      description,
      image: imageUrl,
      position,
    };

    const result = await addTeacher(newTeacher);

    return {
      ...result,
      errorMessage: result.success ? undefined : "Error saving teacher to Firestore",
    };
  } catch (error) {
    console.error("[CREATE] Unexpected error:", error);
    return { success: false, errorMessage: "Unexpected error during teacher creation" };
  }
};

// Update Teacher
export const processTeacherUpdate = async (teacherData: Teacher, formData: FormData) => {
  try {
    const name = {
      en: formData.get("name.en") as string,
      es: formData.get("name.es") as string,
    };

    const profession = {
      en: formData.get("profession.en") as string,
      es: formData.get("profession.es") as string,
    };

    const description = {
      en: formData.get("description.en") as string,
      es: formData.get("description.es") as string,
    };

    const position = parseInt(formData.get("position") as string) || teacherData.position;
    const image = formData.get("image") as File | null;

    let imageUrl = teacherData.image;

    if (image && image.size > 0) {
      if (imageUrl && imageUrl.startsWith("https://")) {
        await deleteStorageFile(imageUrl);
      }

      const folderPath = `teachers/${sanitizeString(name.en)}-${Date.now()}`;
      const uploadResult = await handleImageUploadAndGetUrl(image, folderPath, "cover");

      if (uploadResult.error || !uploadResult.url) {
        return { success: false, errorMessage: uploadResult.error || "Failed to upload new image" };
      }

      imageUrl = uploadResult.url;
    }

    const updatedTeacher: Teacher = {
      id: teacherData.id,
      name,
      profession,
      description,
      image: imageUrl,
      position,
    };

    const result = await updateTeacher(updatedTeacher);

    return {
      success: result.success,
      errorMessage: result.success ? undefined : "Error updating teacher in Firestore",
    };
  } catch (error) {
    console.error("[UPDATE] Unexpected error:", error);
    return { success: false, errorMessage: "Unexpected error during teacher update" };
  }
};

// Delete Teacher
export const processTeacherDeletion = async (teacherData: Teacher) => {
  try {
    if (teacherData.image && teacherData.image.startsWith("https://")) {
      await deleteStorageFile(teacherData.image);
    }

    const result = await deleteTeacherById(teacherData.id);

    return result;
  } catch (error) {
    console.error("[DELETE] Unexpected error:", error);
    return { success: false };
  }
};
