export const formatTimestamp = (timestamp) => {
  if (timestamp && timestamp.toDate) {
    return timestamp.toDate().toLocaleString(); // Convert Firestore Timestamp to readable date
  }
  return "Unknown";
};
