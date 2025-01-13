import { useState, useCallback, useEffect } from "react";
import { db } from "../../../Config/Firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchESPUsers = useCallback(() => {
    const espsRef = collection(db, "esps");
    const usersRef = collection(db, "users");

    // Subscribe to ESPs
    const unsubscribeESPs = onSnapshot(espsRef, (espSnapshot) => {
      const espLookup = {};
      const userIds = [];

      espSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.UserID) {
          userIds.push(data.UserID);
          espLookup[data.UserID] = {
            ESPType: data.ESPType || "N/A",
            Availability: data.Availability || "Unavailable",
          };
        }
      });

      // Fetch associated users
      const unsubscribeUsers = onSnapshot(
        query(usersRef, where("__name__", "in", userIds)),
        (userSnapshot) => {
          const mergedUsers = userSnapshot.docs.map((userDoc) => {
            const userData = userDoc.data();
            return {
              id: userDoc.id,
              ...userData,
              ESPType: espLookup[userDoc.id]?.ESPType || "N/A",
              Availability:
                espLookup[userDoc.id]?.Availability || "Unavailable",
            };
          });

          setUsers(mergedUsers);
        }
      );

      // Cleanup for users subscription
      return () => unsubscribeUsers();
    });

    // Cleanup for ESPs subscription
    return () => unsubscribeESPs();
  }, []);

  useEffect(() => {
    const unsubscribe = fetchESPUsers();
    return () => unsubscribe();
  }, [fetchESPUsers]);

  return { users, fetchESPUsers };
};
