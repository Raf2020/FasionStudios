"use server";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import db from "@/lib/firestore";
import { Class } from "@/types/class.types";

// Add Class
export const addClass = async (classData: Omit<Class, "id">) => {
  try {
    const docRef = await addDoc(collection(db, "classes"), classData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("[DB][ADD] Error creating class:", error);
    return { success: false };
  }
};

// Update Class
export const updateClass = async (classData: Class) => {
  try {
    const docRef = doc(db, "classes", classData.id);
    const { id, ...data } = classData;
    await updateDoc(docRef, data);
    return { success: true };
  } catch (error) {
    console.error("[DB][UPDATE] Error updating class:", classData.id, error);
    return { success: false };
  }
};

// Delete Class
export const deleteClassById = async (classId: string) => {
  try {
    await deleteDoc(doc(db, "classes", classId));
    return { success: true };
  } catch (error) {
    console.error("[DB][DELETE] Error deleting class:", classId, error);
    return { success: false };
  }
};

// Get All Classes (sorted by position)
export const getAllClasses = async (): Promise<Class[]> => {
  try {
    const snapshot = await getDocs(
      query(collection(db, "classes"), orderBy("position", "asc"))
    );
    return snapshot.docs.map((doc) => ({
      ...(doc.data() as Class),
      id: doc.id,
    }));
  } catch (error) {
    console.error("[DB][LIST] Error fetching classes:", error);
    return [];
  }
};

// Get Single Class
export const getClassById = async (classId: string): Promise<Class | undefined> => {
  try {
    const snap = await getDoc(doc(db, "classes", classId));
    if (snap.exists()) {
      return { ...(snap.data() as Class), id: classId };
    }
    return undefined;
  } catch (error) {
    console.error("[DB][GET] Error fetching class:", classId, error);
    return undefined;
  }
};
