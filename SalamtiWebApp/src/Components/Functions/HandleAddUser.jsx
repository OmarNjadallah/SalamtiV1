import {
  collection,
  doc,
  runTransaction,
  GeoPoint,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../Config/Firebase";
import { hashPassword } from "./HashPassword";

export const addUser = async ({ licensePlate, password, type }) => {
  try {
    // Input validation
    if (!licensePlate || !password || !type) {
      throw new Error(
        "All fields (licensePlate, password, and type) are required."
      );
    }

    // Collections
    const usersCollection = collection(db, "users");
    const espsCollection = collection(db, "esps");

    // Check if the license plate already exists
    const q = query(usersCollection, where("Username", "==", licensePlate));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error("License plate already exists.");
    }

    // Generate unique IDs for users and ESPs
    const userId = doc(usersCollection).id;
    const espId = doc(espsCollection).id;

    // Hash the password
    const hashedPassword = hashPassword(password);

    // Run transaction
    await runTransaction(db, async (transaction) => {
      // Create the user document
      const userDoc = {
        Username: licensePlate,
        UserType: "e", // Assuming 'e' indicates ESP user type
        Password: hashedPassword,
        LoginAttempts: 0,
        SuspensionDate: Timestamp.now(),
      };
      transaction.set(doc(usersCollection, userId), userDoc);

      // Create the ESP document
      const espDoc = {
        UserID: userId,
        Availability: "unavailable",
        ESPType: type,
        Location: new GeoPoint(1, 1),
      };
      transaction.set(doc(espsCollection, espId), espDoc);
    });

    return { success: true, userId, espId };
  } catch (error) {
    console.error("Error adding user and ESP: ", error.message);
    throw new Error(`Failed to add user: ${error.message}`);
  }
};
