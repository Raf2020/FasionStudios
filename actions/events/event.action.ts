import { Event, Food, FoodWithFile, GalleryImage } from "@/types/event.types";
import { deleteStorageFile, uploadStorageImage } from "../firebase/storage";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "@/lib/firestore";
import { Reservation } from "@/types/reserve.types";

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
    galleryImages.map(
      async (galleryImage) =>
        await uploadStorageImage(
          galleryImage.file!,
          `${folderPath}/gallery-${galleryImage.file!.name}`
        )
    )
  );
  if (imageUrls.find((imageUrl) => imageUrl === "")) {
    return {
      success: false,
      errorMessage: "Error occurred while uploading gallery images",
    };
  }

  const foods = await Promise.all(
    foodRaws.map(
      async (foodRaw) =>
        ({
          imageUrl: await uploadStorageImage(
            foodRaw.imageFile!,
            `${folderPath}/food-${foodRaw.imageFile!.name}`
          ),
          name: foodRaw.name,
        } as Food)
    )
  );
  if (foods.find((food) => food.imageUrl === "")) {
    return {
      success: false,
      errorMessage: "Error occurred while uploading food images",
    };
  }

  const resEvent = {
    ...event,
    coverImageUrl,
    foods,
    imageUrls,
  };
  const savedResult = await addEvent(resEvent);

  return {
    ...savedResult,
    errorMessage: "Error occurred while saving data into firestore",
  };
};

export const processEventUpdate = async (
  event: Event,
  coverImage: File | undefined,
  foodRaws: FoodWithFile[],
  galleryImages: GalleryImage[],
  directoryName: string | undefined
) => {
  const folderPath = `events/${directoryName ?? `${event.name}-${Date.now()}`}`;

  // Remove cover image deleted by user from storage
  if (coverImage && event.coverImageUrl) {
    await deleteStorageFile(event.coverImageUrl);
  }
  const coverImageUrl = coverImage
    ? await uploadStorageImage(
        coverImage,
        `${folderPath}/cover-${coverImage.name}`
      )
    : event.coverImageUrl;

  // Remove original images deleted by user from storage
  await Promise.all(
    event.imageUrls.map(async (imageUrl) => {
      if (
        galleryImages.find((galleryImage) => galleryImage.url === imageUrl) ===
        undefined
      ) {
        await deleteStorageFile(imageUrl);
      }
    })
  );
  const imageUrls = await Promise.all(
    galleryImages.map(async (galleryImage) =>
      galleryImage.file
        ? await uploadStorageImage(
            galleryImage.file!,
            `${folderPath}/gallery-${galleryImage.file.name}`
          )
        : galleryImage.url
    )
  );
  if (imageUrls.find((imageUrl) => imageUrl === "")) {
    return {
      success: false,
      errorMessage: "Error occurred while uploading gallery images",
    };
  }

  // Remove original food images deleted by user from storage
  await Promise.all(
    event.foods.map(async (food) => {
      if (
        foodRaws.find((foodRaw) => foodRaw.imageUrl === food.imageUrl) ===
        undefined
      ) {
        await deleteStorageFile(food.imageUrl);
      }
    })
  );
  const foods = await Promise.all(
    foodRaws.map(
      async (foodRaw) =>
        ({
          imageUrl: foodRaw.imageFile
            ? await uploadStorageImage(
                foodRaw.imageFile,
                `${folderPath}/food-${foodRaw.imageFile!.name}`
              )
            : foodRaw.imageUrl,
          name: foodRaw.name,
        } as Food)
    )
  );
  if (foods.find((food) => food.imageUrl === "")) {
    return {
      success: false,
      errorMessage: "Error occurred while uploading food images",
    };
  }

  const { reservations, ...resEvent } = {
    ...event,
    coverImageUrl,
    foods,
    imageUrls,
  };
  const savedResult = await updateEvent(resEvent);

  return {
    success: savedResult.success,
    updatedEvent: resEvent,
    errorMessage: "Error occurred while saving data into firestore",
  };
};

export const processEventDeletion = async (event: Event) => {
  if (event.coverImageUrl) {
    await deleteStorageFile(event.coverImageUrl);
  }
  await Promise.all(
    event.imageUrls.map(async (imageUrl) => {
      await deleteStorageFile(imageUrl);
    })
  );
  await Promise.all(
    event.foods.map(async (food) => {
      await deleteStorageFile(food.imageUrl);
    })
  );
  const deletionResult = await deleteEventById(event.id);
  return {
    success: deletionResult.success,
  };
};

const addEvent = async (event: Event) => {
  try {
    const collectionRef = collection(db, "events");
    await addDoc(collectionRef, event);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

export const updateEvent = async (eventData: Omit<Event, "reservations">) => {
  try {
    const docRef = doc(db, "events", eventData.id);
    await updateDoc(docRef, eventData);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

export const addEventReservation = async (
  eventId: string,
  reservation: Reservation
) => {
  try {
    const docRef = doc(db, "events", eventId);
    await updateDoc(docRef, {
      reservations: arrayUnion(reservation),
    });
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

export const getAllEvents = async (
  type?: "past" | "upcoming"
): Promise<any[]> => {
  try {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    const collectionRef = collection(db, "events");

    let eventQuery;

    if (type === "past") {
      // Event date + 1 day is less than now
      eventQuery = query(
        collectionRef,
        where("date", "<", now - oneDay),
        orderBy("date", "asc")
      );
    } else if (type === "upcoming") {
      // Event date + 1 day is greater than or equal to now
      eventQuery = query(
        collectionRef,
        where("date", ">=", now - oneDay),
        orderBy("date", "asc")
      );
    } else {
      // All events
      eventQuery = query(collectionRef, orderBy("date", "asc"));
    }

    const snapshot = await getDocs(eventQuery);

    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const getEventById = async (eventId: string) => {
  try {
    const docRef = doc(db, "events", eventId);
    const snapShot = await getDoc(docRef);
    if (snapShot.exists()) {
      return {
        ...snapShot.data(),
        id: eventId,
      };
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
};

export const deleteEventById = async (eventId: string) => {
  try {
    const docRef = doc(db, "events", eventId);
    await deleteDoc(docRef);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

export const getTotalAmount = (reservations: Reservation[]) => {
  return reservations.reduce(
    (totalAmount, reservation) =>
      totalAmount + reservation.paymentInfo.totalPrice,
    0
  );
};
