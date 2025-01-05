import { useState, useCallback } from "react";
import { db } from "../../../Config/Firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsersWithESPType = useCallback(() => {
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
            espLookup[data.UserID] = {
              ESPType: data.ESPType || "N/A",
              Availability: data.Availability || "Unavailable",
            };
          });

          const mergedUsers = users.map((user) => ({
            ...user,
            ESPType: espLookup[user.id]?.ESPType || "N/A",
            Availability: espLookup[user.id]?.Availability || "Unavailable",
          }));

          setUsers(mergedUsers);
        });

        return () => unsubscribeESPs();
      }
    );

    return () => unsubscribeUsers();
  }, []);

  return { users, fetchUsersWithESPType };
};
