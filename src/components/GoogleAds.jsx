// import React, { useEffect } from "react";

// export default function GoogleAds({ slot }) {
//   useEffect(() => {
//     try {
//       if (window.adsbygoogle && process.env.NODE_ENV === "production") {
//         window.adsbygoogle.push({});
//       }
//     } catch (e) {
//       console.warn("Adsense load failed", e);
//     }
//   }, []);

//   const adClient = import.meta.env.VITE_ADSENSE_ID || "ca-pub-0000000000000000"; // placeholder

//   return (
//     <ins
//       className="adsbygoogle block"
//       style={{ display: "block", textAlign: "center" }}
//       data-ad-client={adClient}
//       data-ad-slot={slot}
//       data-ad-format="auto"
//       data-full-width-responsive="true"
//     />
//   );
// }

// src/components/GoogleAds.jsx
import React, { useEffect } from "react";

export default function GoogleAds({ slot }) {
  // Toggle ads ON/OFF globally
  const ENABLE_GOOGLE_ADS = false; // 👈 set true after AdSense approval

  useEffect(() => {
    if (!ENABLE_GOOGLE_ADS) return;
    try {
      if (window.adsbygoogle && process.env.NODE_ENV === "production") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.warn("Adsense load failed", e);
    }
  }, [ENABLE_GOOGLE_ADS]);

  if (!ENABLE_GOOGLE_ADS) return null; // ✅ hide when disabled

  const adClient = import.meta.env.VITE_ADSENSE_ID || "ca-pub-0000000000000000"; // placeholder

  return (
    <ins
      className="adsbygoogle block"
      style={{ display: "block", textAlign: "center" }}
      data-ad-client={adClient}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}