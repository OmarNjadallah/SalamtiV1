import { useState, useCallback } from "react";
import { db } from "../../../Config/Firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsersForMap = useCallback(() => {
    const usersRef = collection(db, "users");
    const espsRef = collection(db, "esps");

    const unsubscribeUsers = onSnapshot(
      query(usersRef, where("UserType", "==", "e")),
      (userSnapshot) => {
        const users = userSnapshot.docs.map((userDoc) => ({
          id: userDoc.id,
          ...userDoc.data(),
        }));

        const unsubscribeESPs = onSnapshot(espsRef, (espSnapshot) => {
          const espLookup = {};
          espSnapshot.forEach((doc) => {
            const data = doc.data();
            if (
              data.Availability === "available" ||
              data.Availability === "occupied"
            ) {
              espLookup[data.UserID] = {
                ESPType: data.ESPType || "N/A",
                Availability: data.Availability || "Unavailable",
                Location: data.Location || [0, 0], // Default location
              };
            }
          });

          const filteredUsers = users
            .filter((user) => espLookup[user.id]) // Include only users with matching ESP data
            .map((user) => ({
              ...user,
              ...espLookup[user.id], // Merge ESP data into user
            }));

          setUsers(filteredUsers);
        });

        return () => unsubscribeESPs();
      }
    );

    return () => unsubscribeUsers();
  }, []);

  return { users, fetchUsersForMap };
};
