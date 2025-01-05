import {
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../Config/Firebase";

export const deleteUser = async (userId, enqueueSnackbar) => {
  try {
    // Delete user from Firestore
    const userRef = doc(db, "users", userId);
    await deleteDoc(userRef);

    // Delete related ESPs
    const espsRef = collection(db, "esps");
    const q = query(espsRef, where("UserID", "==", userId));
    const querySnapshot = await getDocs(q);

    const deletePromises = querySnapshot.docs.map((espDoc) =>
      deleteDoc(doc(db, "esps", espDoc.id))
    );

    await Promise.all(deletePromises);

    enqueueSnackbar("User deleted successfully!", { variant: "success" });
  } catch (error) {
    enqueueSnackbar("An error occurred while deleting the user.", {
      variant: "error",
    });
    console.error("Error deleting user:", error);
  }
};
