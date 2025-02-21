import db from "@/lib/firestore";
import { User } from "@/types/user.type";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import crypto from "crypto-js";

export const getUserByEmail = async (userEmail: string) => {
  try {
    const docRef = doc(db, "users", userEmail);
    const snapShot = await getDoc(docRef);
    if (snapShot.exists()) {
      return snapShot.data();
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
};

export const updateUserData = async (
  userEmail: string,
  userData: Partial<User>
) => {
  try {
    const docRef = doc(db, "users", userEmail);
    await updateDoc(docRef, userData);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

export const updatePassword = async (
  userEmail: string,
  oldPassword: string,
  newPassword: string
) => {
  try {
    const userRes = await getUserByEmail(userEmail);
    if (userRes) {
      const userData = userRes as User;
      if (userData.password === crypto.SHA256(oldPassword).toString()) {
        return {
          success: await updateUserData(userEmail, {
            password: crypto.SHA256(newPassword).toString(),
          }),
          errorMessage: "Network error occurred while updating database",
        };
      } else {
        return {
          success: false,
          errorMessage: "Please input correct old password",
        };
      }
    }
  } catch (error) {}

  return {
    success: false,
    errorMessage: "Network error occurred",
  };
};
