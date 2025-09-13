// // src/main.jsx
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { LanguageProvider } from "./context/LanguageContext";
// import "./index.css"; // your Tailwind / global css

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <LanguageProvider>
//       <App />
//     </LanguageProvider>
//   </React.StrictMode>
// );

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { LanguageProvider } from "./context/LanguageContext";
import "./index.css";

function loadGoogleTranslate() {
  window.googleTranslateElementInit = function () {
    if (!window.google || !window.google.translate) return;
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,te,hi,ta,ml,kn",
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };
  const s = document.createElement("script");
  s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  s.async = true;
  document.head.appendChild(s);
}

function initOneSignal() {
  try {
    const appId = import.meta.env.VITE_ONESIGNAL_APP_ID;
    if (!appId || !window.OneSignal) return;
    window.OneSignal = window.OneSignal || [];
    window.OneSignal.push(() => {
      window.OneSignal.init({
        appId,
        notifyButton: { enable: true },
      });
    });
  } catch (e) {
    console.warn("OneSignal init failed", e);
  }
}

// load helpers
loadGoogleTranslate();
initOneSignal();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
