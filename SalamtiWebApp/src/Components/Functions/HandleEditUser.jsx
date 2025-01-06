import { db } from "../../../Config/Firebase";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { hashPassword } from "./HashPassword";

export const fetchEspData = async ({ userId }) => {
  try {
    const result = { user: null, esp: null };

    // Fetch user data
    const userSnapshot = await getDoc(doc(db, "users", userId));
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      result.user = {
        Username: userData.Username || null,
        Password: userData.Password || null,
        UserType: userData.UserType || null,
      };
    }

    // Fetch associated ESP data
    const espQuery = query(
      collection(db, "esps"),
      where("UserID", "==", userId)
    );
    const espQuerySnapshot = await getDocs(espQuery);
    if (!espQuerySnapshot.empty) {
      const espData = espQuerySnapshot.docs[0].data(); // Assuming one match
      result.esp = {
        ESPType: espData.ESPType || null,
        Availability: espData.Availability || null,
        Location: espData.Location || null,
      };
    }

    return result;
  } catch (error) {
    console.error("Error fetching ESP data:", error);
    throw new Error("Failed to fetch user or ESP data.");
  }
};

export const editUser = async ({
  userId,
  userUpdates,
  espUpdates,
  enqueueSnackbar,
}) => {
  try {
    // Ensure Password is only updated if it is provided and not empty
    if (userUpdates && userUpdates.Password !== undefined) {
      if (userUpdates.Password.trim()) {
        userUpdates.Password = hashPassword(userUpdates.Password); // Use the same hashing logic
      } else {
        delete userUpdates.Password; // Remove the field if it is empty
      }
    }

    console.log("Final userUpdates:", userUpdates); // Debugging: Check the object before updating

    // Update user document
    if (userUpdates) {
      await updateDoc(doc(db, "users", userId), userUpdates);
    }

    // Update ESP document
    if (espUpdates) {
      const espQuery = query(
        collection(db, "esps"),
        where("UserID", "==", userId)
      );
      const espQuerySnapshot = await getDocs(espQuery);

      if (!espQuerySnapshot.empty) {
        const espDocRef = espQuerySnapshot.docs[0].ref;
        await updateDoc(espDocRef, espUpdates);
      }
    }

    enqueueSnackbar("User and ESP data updated successfully!", {
      variant: "success",
    });
  } catch (error) {
    console.error("Error updating data:", error);
    enqueueSnackbar("Failed to update user or ESP data.", { variant: "error" });
  }
};
