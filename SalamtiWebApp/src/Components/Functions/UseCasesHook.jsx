import { useState, useCallback } from "react";
import { db } from "../../../Config/Firebase";
import { onSnapshot, doc, getDoc, collection } from "firebase/firestore";
import axios from "axios";
import { googleApiKey } from "../../../Config/GoogleAPIkey";
const cache = new Map(); // Cache to store fetched area names

const fetchAreaName = async (lat, lng) => {
  const cacheKey = `${lat},${lng}`;

  if (cache.has(cacheKey)) {
    // Return cached value if available
    return cache.get(cacheKey);
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          latlng: `${lat},${lng}`,
          key: googleApiKey,
        },
      }
    );

    const results = response.data.results;
    if (results.length > 0) {
      const area = results[0].address_components.find((component) =>
        component.types.some((type) =>
          [
            "sublocality",
            "locality",
            "administrative_area_level_2",
            "neighborhood",
          ].includes(type)
        )
      );
      const areaName = area
        ? area.long_name
        : results[0].formatted_address || "Unknown Area";

      // Cache the result
      cache.set(cacheKey, areaName);

      return areaName;
    }

    return "Unknown Area";
  } catch (error) {
    console.error("Error fetching area name:", error);
    return "Error";
  }
};
const parseTimestamp = (timestamp) => {
  if (timestamp?.toDate) {
    return timestamp.toDate();
  } else if (typeof timestamp === "string") {
    return new Date(timestamp);
  }
  return null;
};

export const useCases = () => {
  const [cases, setCases] = useState([]);

  const fetchCases = useCallback(() => {
    try {
      const casesRef = collection(db, "cases");

      const unsubscribeCases = onSnapshot(
        casesRef,
        async (casesSnapshot) => {
          const fetchedCases = await Promise.all(
            casesSnapshot.docs.map(async (caseDoc) => {
              const data = caseDoc.data();

              // Calculate ESP counts by type
              const ESPCounts = {
                policeCount: 0,
                ambulanceCount: 0,
                firetruckCount: 0,
                hazmatUnitCount: 0,
                tacticalUnitCount: 0,
                engineeringUnitCount: 0,
                transportUnitCount: 0,
              };

              if (Array.isArray(data.ESPIDs)) {
                for (const espID of data.ESPIDs) {
                  const espData = await fetchUserData({
                    userID: espID,
                    type: "e",
                  });
                  const espType =
                    espData?.associatedData?.ESPType?.toLowerCase() ||
                    "unknown";

                  // Increment the respective ESP type count
                  if (espType.includes("police")) ESPCounts.policeCount++;
                  if (espType.includes("ambulance")) ESPCounts.ambulanceCount++;
                  if (espType.includes("firetruck")) ESPCounts.firetruckCount++;
                  if (espType.includes("hazmat")) ESPCounts.hazmatUnitCount++;
                  if (espType.includes("tactical"))
                    ESPCounts.tacticalUnitCount++;
                  if (espType.includes("engineering"))
                    ESPCounts.engineeringUnitCount++;
                  if (espType.includes("transport"))
                    ESPCounts.transportUnitCount++;
                }
              }

              // Calculate average response time

              // Calculate average handling time
              const avgHandlingTime = (() => {
                if (!data.ESPsArrivalTime || !data.ESPsFinishTime) return 0;

                const handlingTimes = data.ESPsFinishTime.map(
                  (entry, index) => {
                    try {
                      const arrivalTime = parseTimestamp(
                        data.ESPsArrivalTime[index]?.ArrivalTime
                      ); // Match arrival and finish times by index
                      const finishTime = parseTimestamp(entry?.FinishTime);

                      // Ensure valid timestamps
                      if (!arrivalTime || !finishTime) {
                        throw new Error("Invalid timestamp encountered.");
                      }

                      const handlingTime =
                        (finishTime - arrivalTime) / 1000 / 60; // Time in minutes
                      return handlingTime > 0 ? handlingTime : null; // Exclude invalid or negative times
                    } catch (error) {
                      console.error(
                        `Error calculating handling time for ESP at index ${index}: ${error.message}`,
                        entry
                      );
                      return null;
                    }
                  }
                ).filter((time) => time !== null); // Exclude null values

                return handlingTimes.length
                  ? handlingTimes.reduce((sum, time) => sum + time, 0) /
                      handlingTimes.length // Average handling time in minutes
                  : 0;
              })();

              const avgResponseTime = (() => {
                if (!data.RequestTime || !data.ESPsArrivalTime) return 0;

                const requestTime = parseTimestamp(data.RequestTime);

                const responseTimes = data.ESPsArrivalTime.map(
                  (entry, index) => {
                    try {
                      const arrivalTime = parseTimestamp(entry?.ArrivalTime);

                      // Ensure valid timestamps
                      if (!requestTime || !arrivalTime) {
                        throw new Error("Invalid timestamp encountered.");
                      }

                      const responseTime =
                        (arrivalTime - requestTime) / 1000 / 60; // Time in minutes
                      return responseTime > 0 ? responseTime : null; // Exclude invalid or negative times
                    } catch (error) {
                      console.error(
                        `Error calculating response time for ESP at index ${index}: ${error.message}`,
                        entry
                      );
                      return null;
                    }
                  }
                ).filter((time) => time !== null); // Exclude null values

                return responseTimes.length
                  ? responseTimes.reduce((sum, time) => sum + time, 0) /
                      responseTimes.length // Average response time in minutes
                  : 0;
              })();

              const CivilianLocation =
                Array.isArray(data.CivilianLocation) &&
                data.CivilianLocation.length === 2
                  ? data.CivilianLocation
                  : data.CivilianLocation?.latitude !== undefined &&
                    data.CivilianLocation?.longitude !== undefined
                  ? [
                      data.CivilianLocation.latitude,
                      data.CivilianLocation.longitude,
                    ]
                  : null;

              const areaName = CivilianLocation
                ? await fetchAreaName(CivilianLocation[0], CivilianLocation[1])
                : "Unknown Location";

              return {
                id: caseDoc.id,
                CivilianID: data.CivilianID || "Unknown",
                CivilianLocation,
                AreaName: areaName,
                EmergencyType: data.EmergencyType || "Unknown",
                RequestTime: data.RequestTime || "Unknown",
                FinishTime:
                  Array.isArray(data.ESPsFinishTime) &&
                  data.ESPsFinishTime.length > 0
                    ? (() => {
                        const validDates = data.ESPsFinishTime.map((entry) =>
                          entry.FinishTime?.toDate
                            ? entry.FinishTime.toDate().getTime()
                            : entry.FinishTime
                            ? new Date(entry.FinishTime).getTime()
                            : NaN
                        ).filter((timestamp) => !isNaN(timestamp));
                        return validDates.length > 0
                          ? new Date(Math.max(...validDates))
                          : null;
                      })()
                    : null,
                Status: data.Status || "Unknown",
                ESPIDs: data.ESPIDs || "Unknown",
                ESPCounts,
                avgResponseTime: avgResponseTime, // Convert to seconds
                avgHandlingTime: avgHandlingTime, // Convert to seconds
              };
            })
          );

          setCases(fetchedCases);
        },
        (error) => {
          console.error("Error listening to cases collection:", error);
        }
      );

      return () => unsubscribeCases();
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  }, []);

  return { cases, fetchCases };
};

export const fetchCaseById = async ({ caseId }) => {
  if (!caseId) {
    console.error("Error: caseId is undefined in fetchCaseById.");
    return null;
  }

  try {
    const caseDocRef = doc(db, "cases", caseId); // Reference to the specific document
    const caseDocSnap = await getDoc(caseDocRef); // Fetch the document snapshot

    if (!caseDocSnap.exists()) {
      console.error(`Case with ID "${caseId}" does not exist.`);
      return null;
    }

    const caseData = caseDocSnap.data();

    // Fetch Civilian Data
    const civilianData = await fetchUserData({
      userID: caseData.CivilianID,
      type: "c",
    });

    // Fetch ESP Details for Arrival and Finish Times
    const espArrivalDetails = await Promise.all(
      (caseData.ESPsArrivalTime || []).map(async (entry) => {
        try {
          const espData = await fetchUserData({
            userID: entry.ESPID,
            type: "e",
          });

          if (!espData) {
            console.warn(`ESP with ID "${entry.ESPID}" not found.`);
            return {
              ESPID: entry.ESPID,
              ArrivalTime: entry.ArrivalTime,
              Username: "Unknown",
              Type: "Unknown",
            };
          }

          return {
            ESPID: entry.ESPID,
            ArrivalTime: entry.ArrivalTime,
            Username: espData.user?.Username || "Unknown",
            Type: espData.associatedData?.ESPType || "Unknown",
          };
        } catch (error) {
          console.error(`Error fetching ESP with ID "${entry.ESPID}":`, error);
          return {
            ESPID: entry.ESPID,
            ArrivalTime: entry.ArrivalTime,
            Username: "Unknown",
            Type: "Unknown",
          };
        }
      })
    );

    const espFinishDetails = await Promise.all(
      (caseData.ESPsFinishTime || []).map(async (entry) => {
        try {
          const espData = await fetchUserData({
            userID: entry.ESPID,
            type: "e",
          });

          if (!espData) {
            console.warn(`ESP with ID "${entry.ESPID}" not found.`);
            return {
              ESPID: entry.ESPID,
              FinishTime: entry.FinishTime,
              Username: "Unknown",
              Type: "Unknown",
            };
          }

          return {
            ESPID: entry.ESPID,
            FinishTime: entry.FinishTime,
            Username: espData.user?.Username || "Unknown",
            Type: espData.associatedData?.ESPType || "Unknown",
          };
        } catch (error) {
          console.error(`Error fetching ESP with ID "${entry.ESPID}":`, error);
          return {
            ESPID: entry.ESPID,
            FinishTime: entry.FinishTime,
            Username: "Unknown",
            Type: "Unknown",
          };
        }
      })
    );

    // Format and return combined data
    return {
      id: caseDocSnap.id,
      CivilianID: caseData.CivilianID || "Unknown",
      CivilianLocation:
        Array.isArray(caseData.CivilianLocation) &&
        caseData.CivilianLocation.length === 2
          ? caseData.CivilianLocation
          : caseData.CivilianLocation?.latitude !== undefined &&
            caseData.CivilianLocation?.longitude !== undefined
          ? [
              caseData.CivilianLocation.latitude,
              caseData.CivilianLocation.longitude,
            ]
          : null, // Set to null if invalid
      ESPIDs: caseData.ESPIDs || [],
      ESPsArrivalDetails: espArrivalDetails, // Updated arrival details with username and type
      ESPsFinishDetails: espFinishDetails, // Updated finish details with username and type
      EmergencyDetails: caseData.EmergencyDetails || [],
      EmergencyType: caseData.EmergencyType || "Unknown",
      RequestTime: caseData.RequestTime?.toDate().toLocaleString() || "Unknown",
      FinishTime:
        Array.isArray(caseData.ESPsFinishTime) &&
        caseData.ESPsFinishTime.length > 0
          ? (() => {
              const validDates = caseData.ESPsFinishTime.map((entry) =>
                entry.FinishTime?.toDate
                  ? entry.FinishTime.toDate().getTime()
                  : entry.FinishTime
                  ? new Date(entry.FinishTime).getTime()
                  : NaN
              ).filter((timestamp) => !isNaN(timestamp)); // Filter out invalid timestamps
              return validDates.length > 0
                ? new Date(Math.max(...validDates))
                : null;
            })()
          : null,
      Status: caseData.Status || "Unknown",
      CivilianDetails: civilianData,
    };
  } catch (error) {
    console.error("Error fetching case by ID:", error);
    return null;
  }
};

export const fetchUserData = async ({ userID, type }) => {
  if (!userID) {
    console.error("Error: userID is undefined in fetchUserData.");
    return null;
  }

  try {
    // Determine the collection name based on the user type
    const collectionName =
      type === "c" ? "civilians" : type === "e" ? "esps" : null;
    if (!collectionName) {
      console.error("Error: Invalid user type specified. Expected 'c' or 'e'.");
      return null;
    }

    // Fetch data from the specified collection
    const docRef = doc(db, collectionName, userID);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error(
        `Error: User with ID "${userID}" not found in '${collectionName}' collection.`
      );
      return null; // Stop further execution if user is not found
    }

    const associatedData = docSnap.data();

    // Fetch associated data from "users" collection
    const userDocRef = doc(db, "users", associatedData.UserID);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      console.error(
        `Error: Associated user not found in 'users' collection for UserID "${associatedData.UserID}".`
      );
      return null; // Stop further execution if user is not found
    }

    const userData = userDocSnap.data();

    // Return combined data
    return {
      user: userData,
      associatedData,
    };
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return null;
  }
};
