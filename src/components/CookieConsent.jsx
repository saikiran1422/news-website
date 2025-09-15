// import React, { useState, useEffect } from "react";
// import { useLanguage } from "../context/LanguageContext";

// export default function CookieConsent() {
//   const [visible, setVisible] = useState(false);
//   const { language } = useLanguage();

//   useEffect(() => {
//     const accepted = localStorage.getItem("cookie_consent");
//     if (!accepted) {
//       setVisible(true);
//     }
//   }, []);

//   const handleAccept = () => {
//     localStorage.setItem("cookie_consent", "true");
//     setVisible(false);
//   };

//   if (!visible) return null;

//   return (
//     <div className="fixed bottom-0 inset-x-0 bg-gray-900 text-white p-4 z-50 flex flex-col md:flex-row items-center justify-between shadow-lg">
//       <p className="text-sm mb-2 md:mb-0">
//         {language === "te"
//           ? "మేము మీ అనుభవాన్ని మెరుగుపరచడానికి కుకీలను ఉపయోగిస్తున్నాము. మా సైట్‌ను ఉపయోగించడం ద్వారా, మీరు మా "
//           : "We use cookies to improve your experience. By using our site, you agree to our "}
//         <a href="/privacy-policy" className="underline">
//           {language === "te" ? "గోప్యతా విధానం" : "Privacy Policy"}
//         </a>
//         .
//       </p>
//       <button
//         onClick={handleAccept}
//         className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 text-sm font-medium"
//       >
//         {language === "te" ? "అంగీకరించండి" : "Accept"}
//       </button>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    const timestamp = localStorage.getItem("cookie_timestamp");

    if (!consent) {
      setVisible(true);
    } else if (consent === "false" && timestamp) {
      const diff = Date.now() - parseInt(timestamp, 10);
      const sevenDays = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
      if (diff > sevenDays) {
        setVisible(true);
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    localStorage.setItem("cookie_timestamp", Date.now().toString());
    setVisible(false);
  };

  const handleDeny = () => {
    localStorage.setItem("cookie_consent", "false");
    localStorage.setItem("cookie_timestamp", Date.now().toString());
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-gray-900 text-white p-4 z-50 flex flex-col md:flex-row items-center justify-between shadow-lg">
      <p className="text-sm mb-2 md:mb-0">
        {language === "te"
          ? "మేము మీ అనుభవాన్ని మెరుగుపరచడానికి కుకీలను ఉపయోగిస్తున్నాము. మా సైట్‌ను ఉపయోగించడం ద్వారా, మీరు మా "
          : "We use cookies to improve your experience. By using our site, you agree to our "}
        <a href="/privacy-policy" className="underline">
          {language === "te" ? "గోప్యతా విధానం" : "Privacy Policy"}
        </a>
        .
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleAccept}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 text-sm font-medium"
        >
          {language === "te" ? "అంగీకరించండి" : "Accept"}
        </button>
        <button
          onClick={handleDeny}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 text-sm font-medium"
        >
          {language === "te" ? "తిరస్కరించండి" : "Deny"}
        </button>
      </div>
    </div>
  );
}
