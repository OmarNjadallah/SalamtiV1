import {
  doc,
  collection,
  query,
  where,
  getDocs,
  runTransaction,
} from "firebase/firestore";
import { db } from "../../../Config/Firebase";

export const deleteUser = async (userId, enqueueSnackbar) => {
  try {
    await runTransaction(db, async (transaction) => {
      // Delete the user document
      const userRef = doc(db, "users", userId);
      transaction.delete(userRef);

      // Find and delete related ESP documents
      const espsRef = collection(db, "esps");
      const q = query(espsRef, where("UserID", "==", userId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((espDoc) => {
        const espRef = doc(db, "esps", espDoc.id);
        transaction.delete(espRef);
      });
    });

    // If the transaction succeeds
    enqueueSnackbar("User deleted successfully!", { variant: "success" });
  } catch (error) {
    // If the transaction fails
    enqueueSnackbar("An error occurred while deleting the user.", {
      variant: "error",
    });
    console.error("Error deleting user:", error);
  }
};
