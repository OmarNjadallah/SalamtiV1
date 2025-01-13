import { db } from "../../../Config/Firebase";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
  runTransaction,
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
  currentUsername, // Pass the original username for comparison
  enqueueSnackbar,
}) => {
  try {
    // Check if the username is empty
    if (
      userUpdates &&
      (!userUpdates.Username || userUpdates.Username.trim() === "")
    ) {
      enqueueSnackbar(
        "Username cannot be empty. Please provide a valid username.",
        { variant: "error" }
      );
      return; // Halt the function execution
    }

    // Check if the username has changed
    if (
      userUpdates &&
      userUpdates.Username &&
      userUpdates.Username !== currentUsername // Only check if the username is being changed
    ) {
      const usernameQuery = query(
        collection(db, "users"),
        where("Username", "==", userUpdates.Username)
      );
      const usernameSnapshot = await getDocs(usernameQuery);

      if (!usernameSnapshot.empty) {
        enqueueSnackbar("Username already exists. Please choose another one.", {
          variant: "error",
        });
        return; // Ensure the function stops execution
      }
    }

    // Ensure Password is only updated if it is provided and not empty
    if (userUpdates && userUpdates.Password !== undefined) {
      if (userUpdates.Password.trim()) {
        userUpdates.Password = hashPassword(userUpdates.Password); // Use the same hashing logic
      } else {
        delete userUpdates.Password; // Remove the field if it is empty
      }
    }

    // Run transaction for atomic updates
    await runTransaction(db, async (transaction) => {
      const userDocRef = doc(db, "users", userId);

      // Update user document
      if (userUpdates) {
        transaction.update(userDocRef, userUpdates);
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
          transaction.update(espDocRef, espUpdates);
        }
      }
    });

    enqueueSnackbar("ESP User data updated successfully!", {
      variant: "success",
    });
  } catch (error) {
    console.error("Error updating data:", error);
    enqueueSnackbar("Failed to update ESP User Data.", { variant: "error" });
  }
};
