import {
  collection,
  doc,
  setDoc,
  GeoPoint,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import bcrypt from "bcryptjs";
import { db } from "../../../Config/Firebase";

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

    // Generate unique IDs for users and civilians
    const userId = doc(usersCollection).id;
    const espId = doc(espsCollection).id;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(
      password,
      bcrypt.genSaltSync(saltRounds)
    );

    // Create the user document
    const userDoc = {
      Username: licensePlate,
      UserType: "e", // Assuming 'e' indicates ESP user type
      Password: hashedPassword,
      LoginAttempts: 0,
      SuspensionDate: Timestamp.now(),
    };
    await setDoc(doc(usersCollection, userId), userDoc);

    // Create the ESP document
    const espDoc = {
      UserID: userId,
      Availability: "unavailable",
      ESPType: type,
      Location: new GeoPoint(1, 1),
    };
    await setDoc(doc(espsCollection, espId), espDoc);

    return { success: true, userId, espId };
  } catch (error) {
    console.error("Error adding user and ESP: ", error.message);
    throw new Error(`Failed to add user: ${error.message}`);
  }
};
