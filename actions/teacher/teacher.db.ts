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
import { Teacher } from "@/types/teacher.types";

// Add Teacher
export const addTeacher = async (teacherData: Omit<Teacher, "id">) => {
  try {
    console.log("[DB][ADD] Creating new teacher:", teacherData.name);
    const docRef = await addDoc(collection(db, "teachers"), teacherData);
    console.log("[DB][ADD] Teacher created with ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("[DB][ADD] Error creating teacher:", error);
    return { success: false };
  }
};

// Update Teacher
export const updateTeacher = async (teacherData: Teacher) => {
  try {
    console.log("[DB][UPDATE] Updating teacher:", teacherData.id);
    const docRef = doc(db, "teachers", teacherData.id);
    const { id, ...data } = teacherData;
    await updateDoc(docRef, data);
    console.log("[DB][UPDATE] Teacher updated successfully:", teacherData.id);
    return { success: true };
  } catch (error) {
    console.error("[DB][UPDATE] Error updating teacher:", teacherData.id, error);
    return { success: false };
  }
};

// Delete Teacher
export const deleteTeacherById = async (teacherId: string) => {
  try {
    console.log("[DB][DELETE] Deleting teacher:", teacherId);
    await deleteDoc(doc(db, "teachers", teacherId));
    console.log("[DB][DELETE] Teacher deleted successfully:", teacherId);
    return { success: true };
  } catch (error) {
    console.error("[DB][DELETE] Error deleting teacher:", teacherId, error);
    return { success: false };
  }
};

// Get Single Teacher
export const getTeacherById = async (teacherId: string): Promise<Teacher | undefined> => {
  try {
    console.log("[DB][GET] Fetching teacher by ID:", teacherId);
    const snap = await getDoc(doc(db, "teachers", teacherId));
    if (snap.exists()) {
      console.log("[DB][GET] Teacher found:", teacherId);
      return { ...(snap.data() as Teacher), id: teacherId };
    } else {
      console.warn("[DB][GET] Teacher not found:", teacherId);
      return undefined;
    }
  } catch (error) {
    console.error("[DB][GET] Error fetching teacher:", teacherId, error);
    return undefined;
  }
};

// Get All Teachers
export const getAllTeachers = async (): Promise<Teacher[]> => {
  try {
    const snapshot = await getDocs(
      query(collection(db, "teachers"), orderBy("position", "asc"))
    );
    return snapshot.docs.map((doc) => ({
      ...(doc.data() as Teacher),
      id: doc.id,
    }));
  } catch (error) {
    console.error("[DB][LIST] Error fetching teachers:", error);
    return [];
  }
};
