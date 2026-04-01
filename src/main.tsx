import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { captureUtmParams } from "./lib/utm";

// Capture UTM params from URL before rendering (persists in sessionStorage)
captureUtmParams();

createRoot(document.getElementById("root")!).render(<App />);
