import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SnackbarProvider } from "notistack";
import { GoogleMapsProvider } from "../Config/GoogleMapsProvider.jsx";

createRoot(document.getElementById("root")).render(
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    autoHideDuration={3000}
  >
    <GoogleMapsProvider>
      <App />
    </GoogleMapsProvider>
  </SnackbarProvider>
);
