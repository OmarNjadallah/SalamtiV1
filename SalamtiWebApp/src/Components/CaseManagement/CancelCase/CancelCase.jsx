import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSnackbar } from "notistack";
import cancelCase from "../../Functions/handleCancelCase";
import Button from "../../Common/Button";

const CancelCase = ({ caseId }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handeCancel = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div style={styles.dialog}>
          <h1 style={styles.title}>Confirm Cancelation</h1>
          <p style={styles.message}>
            Are you sure you want to Cancel this case?
          </p>
          <div style={styles.buttonGroup}>
            <button
              style={styles.confirmButton}
              onClick={async () => {
                try {
                  await cancelCase(caseId, enqueueSnackbar);
                  onClose();
                } catch (error) {
                  console.error(error);
                  onClose();
                }
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#e60000")} // Hover effect
              onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4d4d")} // Restore on mouse out
            >
              Yes, Cancel
            </button>
            <button
              style={styles.cancelButton}
              onClick={() => {
                enqueueSnackbar("Action canceled.", { variant: "info" });
                onClose();
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#4d4d4d")} // Hover effect
              onMouseOut={(e) => (e.target.style.backgroundColor = "#666666")} // Restore on mouse out
            >
              Cancel
            </button>
          </div>
        </div>
      ),
    });
  };

  return (
    <Button
      onClick={handeCancel}
      className="bg-red-500 text-center text-custom-white hover:bg-red-700 px-2 py-1 rounded transition-all duration-300 ease-in-out transform font-semibold"
    >
      Cancel
    </Button>
  );
};

const styles = {
  dialog: {
    backgroundColor: "#1e1e1e", // Dark background
    color: "white", // White text
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.9)",
  },
  title: {
    fontSize: "22px",
    margin: "0 0 15px",
    color: "#ff4d4d", // Highlighted title color
  },
  message: {
    fontSize: "16px",
    margin: "0 0 20px",
    color: "white", // Ensure readable text
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  confirmButton: {
    backgroundColor: "#ff4d4d", // Red for delete
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
  cancelButton: {
    backgroundColor: "#666666", // Gray for cancel
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
};

export default CancelCase;
