import { Event, Food, FoodWithFile, GalleryImage } from "@/types/event.types";
import { Reservation } from "@/types/reserve.types";
import { uploadStorageImage, deleteStorageFile } from "../firebase/storage";
import { addEvent, updateEvent, deleteEventById } from "./event.db";

// CREATE
export const processEventCreation = async (
  event: Event,
  coverImage: File | undefined,
  foodRaws: FoodWithFile[],
  galleryImages: GalleryImage[]
) => {
  const folderPath = `events/${event.name}-${Date.now()}`;

  const coverImageUrl = coverImage
    ? await uploadStorageImage(
        coverImage,
        `${folderPath}/cover-${coverImage.name}`
      )
    : event.coverImageUrl;

  const imageUrls = await Promise.all(
    galleryImages.map((g) =>
      uploadStorageImage(g.file!, `${folderPath}/gallery-${g.file!.name}`)
    )
  );

  if (imageUrls.includes("")) {
    return { success: false, errorMessage: "Error uploading gallery images" };
  }

  const foods: Food[] = await Promise.all(
    foodRaws.map(async (f) => ({
      name: f.name,
      imageUrl: await uploadStorageImage(
        f.imageFile!,
        `${folderPath}/food-${f.imageFile!.name}`
      ),
    }))
  );

  if (foods.some((f) => f.imageUrl === "")) {
    return { success: false, errorMessage: "Error uploading food images" };
  }

  const result = await addEvent({ ...event, coverImageUrl, imageUrls, foods });

  return {
    ...result,
    errorMessage: result.success
      ? undefined
      : "Error saving event to Firestore",
  };
};

// UPDATE
export const processEventUpdate = async (
  event: Event,
  coverImage: File | undefined,
  foodRaws: FoodWithFile[],
  galleryImages: GalleryImage[],
  directoryName?: string
) => {
  const folderPath = `events/${directoryName ?? `${event.name}-${Date.now()}`}`;

  if (coverImage && event.coverImageUrl)
    await deleteStorageFile(event.coverImageUrl);
  const coverImageUrl = coverImage
    ? await uploadStorageImage(
        coverImage,
        `${folderPath}/cover-${coverImage.name}`
      )
    : event.coverImageUrl;

  await Promise.all(
    event.imageUrls.map(async (url) => {
      if (!galleryImages.find((g) => g.url === url))
        await deleteStorageFile(url);
    })
  );
  const imageUrls = await Promise.all(
    galleryImages.map((g) =>
      g.file
        ? uploadStorageImage(g.file, `${folderPath}/gallery-${g.file.name}`)
        : g.url
    )
  );

  await Promise.all(
    event.foods.map(async (f) => {
      if (!foodRaws.find((r) => r.imageUrl === f.imageUrl))
        await deleteStorageFile(f.imageUrl);
    })
  );
  const foods: Food[] = await Promise.all(
    foodRaws.map(async (f) => ({
      name: f.name,
      imageUrl: f.imageFile
        ? await uploadStorageImage(
            f.imageFile,
            `${folderPath}/food-${f.imageFile!.name}`
          )
        : f.imageUrl,
    }))
  );

  const { reservations, ...cleanEvent } = {
    ...event,
    coverImageUrl,
    foods,
    imageUrls,
  };

  const result = await updateEvent(cleanEvent);

  return {
    success: result.success,
    updatedEvent: cleanEvent,
    errorMessage: result.success
      ? undefined
      : "Error updating event in Firestore",
  };
};

// DELETE
export const processEventDeletion = async (event: Event) => {
  if (event.coverImageUrl) await deleteStorageFile(event.coverImageUrl);
  await Promise.all(event.imageUrls.map(deleteStorageFile));
  await Promise.all(event.foods.map((f) => deleteStorageFile(f.imageUrl)));
  return await deleteEventById(event.id);
};

// TOTAL
export const getTotalAmount = (reservations: Reservation[]) =>
  reservations.reduce((sum, r) => sum + r.paymentInfo.totalPrice, 0);
