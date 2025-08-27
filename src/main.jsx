import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

AOS.init();

const CLIENT_ID = "643080652983-q16fke16jm9ij7l6dg2bpdigutci1qlt.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <Router future={{ v7_startTransition: true }}>
      <App />
    </Router>
  </GoogleOAuthProvider>
);
