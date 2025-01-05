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
import bcrypt from "bcryptjs";

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
    // Hash password if provided in userUpdates
    if (userUpdates && userUpdates.Password) {
      const saltRounds = 10;
      userUpdates.Password = bcrypt.hashSync(
        userUpdates.Password,
        bcrypt.genSaltSync(saltRounds)
      );
    }
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
        const espDocRef = espQuerySnapshot.docs[0].ref; // Assuming one match
        await updateDoc(espDocRef, espUpdates);
      }
    }

    // Show success notification
    enqueueSnackbar("User and ESP data updated successfully!", {
      variant: "success",
    });
  } catch (error) {
    console.error("Error updating data:", error);

    // Show error notification
    enqueueSnackbar("Failed to update user or ESP data.", { variant: "error" });
  }
};
