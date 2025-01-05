import { signOut } from "firebase/auth";
import { auth } from "../../../Config/Firebase";

export const logOut = async (navigate) => {
  try {
    await signOut(auth);
    navigate("/"); // Redirect to login page after logout
  } catch (error) {
    console.error("Logout Error: ", error); // Log out any error
  }
};
