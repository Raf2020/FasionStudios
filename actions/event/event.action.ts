"use server";
import { Event } from "@/types/event.types";
import { deleteStorageFile } from "../firebase/storage";
import { addEvent, updateEvent, deleteEventById } from "./event.db";
import {handleOptionalImageUpload} from "@/actions/image/image.action";
import {sanitizeString} from "@/lib/util";

/**
 * Create a new event using FormData and upload cover image if provided.
 */

export const processEventCreation = async (formData: FormData) => {
  try {
    console.log("[CREATE] Starting event creation...");

    // Multilingual fields
    const name = {
      en: formData.get("name.en") as string,
      es: formData.get("name.es") as string,
    };

    const description = {
      en: formData.get("description.en") as string,
      es: formData.get("description.es") as string,
    };

    const date = new Date(formData.get("date") as string).getTime();
    const from = new Date(formData.get("from") as string).getTime();
    const to = new Date(formData.get("to") as string).getTime();
    const price = parseFloat(formData.get("price") as string);
    const url = formData.get("url") as string;
    const active = formData.get("active") === "true";
    const image = formData.get("image") as File | null;

    console.log("[CREATE] Parsed form data:", { name, description, date, price, url, active });

    let coverImageUrl = "";

    if (image && image.size > 0) {
      const folderPath = `events/${sanitizeString(name.en)}-${Date.now()}`;
      const uploadResult = await handleOptionalImageUpload(image, folderPath, "cover");

      if (uploadResult.error) {
        return {
          success: false,
          errorMessage: uploadResult.error || "Failed to upload cover image",
        };
      }

      coverImageUrl = uploadResult.url;
      console.log("[CREATE] Uploaded cover image:", coverImageUrl);
    } else {
      console.log("[CREATE] No image uploaded. Proceeding without cover image.");
    }

    const newEvent: Omit<Event, "id"> = {
      name,
      description,
      date,
      price,
      url,
      active,
      coverImageUrl,
      from,
      to
    };

    console.log("[CREATE] Saving event to Firestore:", newEvent);
    const result = await addEvent(newEvent);

    if (result.success) {
      console.log("[CREATE] Event successfully saved.");
    } else {
      console.error("[CREATE] Firestore save failed.");
    }

    return {
      ...result,
      errorMessage: result.success ? undefined : "Error saving event to Firestore",
    };
  } catch (error) {
    console.error("[CREATE] Unexpected error:", error);
    return { success: false, errorMessage: "Unexpected error during event creation" };
  }
};
/**
 * Update an existing event using FormData. Replaces cover image if a new one is uploaded.
 */
export const processEventUpdate = async (
    event: Event,
    formData: FormData,
    directoryName?: string
) => {
  try {
    console.log("[UPDATE] Starting update for event:", event.id);

    // ✅ Parse multilingual name and description
    const name = {
      en: formData.get("name.en") as string,
      es: formData.get("name.es") as string,
    };

    const description = {
      en: formData.get("description.en") as string,
      es: formData.get("description.es") as string,
    };

    const date = new Date(formData.get("date") as string).getTime();
    const from = new Date(formData.get("from") as string).getTime();
    const to = new Date(formData.get("to") as string).getTime();
    const price = parseFloat(formData.get("price") as string);
    const url = formData.get("url") as string;
    const active = formData.get("active") === "true";
    const image = formData.get("image") as File | null;

    let coverImageUrl = event.coverImageUrl;

    // ✅ Replace cover image if new image is uploaded
    if (image && image.size > 0) {
      console.log("[UPDATE] Replacing cover image...");
      if (coverImageUrl) {
        await deleteStorageFile(coverImageUrl);
      }

      const folderPath = `events/${directoryName ?? `${sanitizeString(name.en)}-${Date.now()}`}`;
      const uploadResult = await handleOptionalImageUpload(image, folderPath, "cover");

      if (uploadResult.error || !uploadResult.url) {
        return {
          success: false,
          errorMessage: uploadResult.error || "Failed to upload new cover image",
        };
      }

      coverImageUrl = uploadResult.url;
      console.log("[UPDATE] New cover image uploaded:", coverImageUrl);
    } else {
      console.log("[UPDATE] No new image uploaded. Keeping existing image.");
    }

    // ✅ Updated event object with i18n fields
    const updatedEvent: Event = {
      id: event.id,
      name,
      description,
      date,
      price,
      url,
      active,
      coverImageUrl,
      from,
      to,
    };

    console.log("[UPDATE] Saving updated event:", updatedEvent);
    const result = await updateEvent(updatedEvent);

    if (result.success) {
      console.log("[UPDATE] Event successfully updated.");
    } else {
      console.error("[UPDATE] Firestore update failed.");
    }

    return {
      success: result.success,
      updatedEvent,
      errorMessage: result.success ? undefined : "Error updating event in Firestore",
    };
  } catch (error) {
    console.error("[UPDATE] Unexpected error:", error);
    return { success: false, errorMessage: "Unexpected error during event update" };
  }
};
/**
 * Delete the event and its cover image from Firebase Storage and Firestore.
 */
export const processEventDeletion = async (event: Event) => {
  try {
    console.log("[DELETE] Deleting event:", event.id);

    if (event.coverImageUrl) {
      console.log("[DELETE] Deleting cover image...");
      await deleteStorageFile(event.coverImageUrl);
    }

    const result = await deleteEventById(event.id);

    if (result.success) {
      console.log("[DELETE] Event successfully deleted.");
    } else {
      console.error("[DELETE] Failed to delete event from Firestore.");
    }

    return result;
  } catch (error) {
    console.error("[DELETE] Unexpected error:", error);
    return { success: false };
  }
};