// import React from "react";


// export default function SelfAd() {
//   return (
//     <div className="bg-yellow-200 text-black text-center p-4 rounded my-4">
//       <p className="font-bold">Advertise With Us</p>
//       <p className="text-sm">Contact us for promotions and ad space!</p>
//     </div>
//   );
// }

// src/components/SelfAd.jsx
import React from "react";

export default function SelfAd() {
  // Toggle ads on/off (use env variable or just change to false)
  const ENABLE_SELF_ADS = false; // 👈 set to false to hide everywhere

  if (!ENABLE_SELF_ADS) return null; // ✅ hides the ad

  return (
    <div className="my-4 p-4 bg-yellow-100 text-center border border-yellow-300 rounded">
      <p className="text-sm font-bold">Your Ad Here</p>
      <p className="text-xs">Contact us for advertising opportunities.</p>
    </div>
  );
}