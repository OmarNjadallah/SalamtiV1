import { db } from "../../../Config/Firebase";
import { doc, arrayUnion, Timestamp, runTransaction } from "firebase/firestore";

async function cancelCase(caseId, enqueueSnackbar) {
  try {
    await runTransaction(db, async (transaction) => {
      // Get the case document
      const casesRef = doc(db, "cases", caseId);
      const caseDoc = await transaction.get(casesRef);

      if (!caseDoc.exists()) {
        throw new Error("Case not found");
      }

      const caseData = caseDoc.data();
      const espIds = caseData.ESPIDs || [];
      const civilianId = caseData.CivilianID;

      // Current timestamp
      const currentTime = Timestamp.now();

      // Update ESPFinishTime and availability for each ESP
      for (const espId of espIds) {
        // Update ESPFinishTime in the case document
        transaction.update(casesRef, {
          ESPsFinishTime: arrayUnion({
            ESPID: espId,
            FinishTime: currentTime,
          }),
        });

        // Update availability in the ESPs collection
        const espRef = doc(db, "esps", espId);
        transaction.update(espRef, {
          Availability: "unavailable",
        });
      }

      // Update the civilian's InEmergency status
      if (civilianId) {
        const civilianRef = doc(db, "civilians", civilianId);
        transaction.update(civilianRef, { InEmergency: "no" });
      }

      // Update the case status to "cancelled"
      transaction.update(casesRef, {
        Status: "cancelled",
      });
    });

    // If the transaction succeeds
    enqueueSnackbar("Case Cancelled successfully!", { variant: "success" });
  } catch (error) {
    // If the transaction fails
    enqueueSnackbar("An error occurred while cancelling the case.", {
      variant: "error",
    });
    console.error("Error cancelling case:", error);
  }
}

export default cancelCase;
