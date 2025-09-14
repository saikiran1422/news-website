// // src/components/Footer.jsx
// import React from "react";
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <footer className="bg-blue-900 text-white mt-8">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-6">
//         <div>© 2025 My News Site. All rights reserved.</div>
//         <div className="flex items-center gap-4 text-xl">
//           <a href="#" className="text-blue-600 hover:opacity-80"><FaFacebook /></a>
//           <a href="#" className="text-sky-400 hover:opacity-80"><FaTwitter /></a>
//           <a href="#" className="text-pink-500 hover:opacity-80"><FaInstagram /></a>
//           <a href="#" className="text-blue-700 hover:opacity-80"><FaLinkedin /></a>
//           <a href="#" className="text-red-600 hover:opacity-80"><FaYoutube /></a>
//           <a href="#" className="text-green-500 hover:opacity-80"><FaWhatsapp /></a>
//         </div>
//       </div>
//     </footer>
//   );
// }


// src/components/Footer.jsx
// import React from "react";
// import {
//   FaFacebook,
//   FaTwitter,
//   FaInstagram,
//   FaLinkedin,
//   FaYoutube,
//   FaWhatsapp,
// } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <footer className="bg-blue-900 text-white mt-8">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-6">
//         <div>© 2025 My News Site. All rights reserved.</div>
//         <div className="flex items-center gap-4 text-xl">
//           <a
//             href="https://facebook.com/yourpage"
//             target="_blank"
//             rel="noreferrer"
//             className="hover:opacity-80"
//           >
//             <FaFacebook />
//           </a>
//           <a
//             href="https://twitter.com/yourprofile"
//             target="_blank"
//             rel="noreferrer"
//             className="hover:opacity-80"
//           >
//             <FaTwitter />
//           </a>
//           <a
//             href="https://instagram.com/yourprofile"
//             target="_blank"
//             rel="noreferrer"
//             className="hover:opacity-80"
//           >
//             <FaInstagram />
//           </a>
//           <a
//             href="https://linkedin.com/in/yourprofile"
//             target="_blank"
//             rel="noreferrer"
//             className="hover:opacity-80"
//           >
//             <FaLinkedin />
//           </a>
//           <a
//             href="https://youtube.com/yourchannel"
//             target="_blank"
//             rel="noreferrer"
//             className="hover:opacity-80"
//           >
//             <FaYoutube />
//           </a>
//           <a
//             href="https://wa.me/1234567890"
//             target="_blank"
//             rel="noreferrer"
//             className="hover:opacity-80"
//           >
//             <FaWhatsapp />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// }



// // src/components/Footer.jsx
// import React from "react";
// import {
//   FaFacebook,
//   FaTwitter,
//   FaInstagram,
//   FaLinkedin,
//   FaYoutube,
//   FaWhatsapp,
// } from "react-icons/fa";
// import { useLanguage } from "../context/LanguageContext";

// export default function Footer() {
//   const { language } = useLanguage();

//   return (
//     <footer className="bg-blue-900 text-white mt-8">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-6">
//         <div>
//           © 2025 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}.{" "}
//           {language === "te" ? "అన్ని హక్కులు రిజర్వు చేయబడ్డాయి." : "All rights reserved."}
//         </div>
//         <div className="flex items-center gap-4 text-xl">
//           <a href="https://facebook.com/yourpage" target="_blank" rel="noreferrer" className="hover:opacity-80">
//             <FaFacebook />
//           </a>
//           <a href="https://twitter.com/yourprofile" target="_blank" rel="noreferrer" className="hover:opacity-80">
//             <FaTwitter />
//           </a>
//           <a href="https://instagram.com/yourprofile" target="_blank" rel="noreferrer" className="hover:opacity-80">
//             <FaInstagram />
//           </a>
//           <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" className="hover:opacity-80">
//             <FaLinkedin />
//           </a>
//           <a href="https://youtube.com/yourchannel" target="_blank" rel="noreferrer" className="hover:opacity-80">
//             <FaYoutube />
//           </a>
//           <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="hover:opacity-80">
//             <FaWhatsapp />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// }

// import React from "react";
// import { useLanguage } from "../context/LanguageContext";

// export default function Footer() {
//   const { language } = useLanguage();

//   const handleSubscribe = () => {
//     if (window.OneSignal) {
//       window.OneSignal.push(() => {
//         window.OneSignal.showSlidedownPrompt();
//       });
//     } else {
//       alert("Notifications not available. Try later.");
//     }
//   };

//   return (
//     <footer className="bg-blue-900 text-white mt-8">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-6">
//         <div>
//           © 2025 {language === "te" ? "నా వార్తా సైట్" : "My News Site"} ·{" "}
//           {language === "te" ? "అన్ని హక్కులు రిజర్వు చేయబడ్డాయి." : "All rights reserved."}
//         </div>
//         <button
//           onClick={handleSubscribe}
//           className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
//         >
//           {language === "te" ? "నోటిఫికేషన్ పొందండి" : "Subscribe to Notifications"}
//         </button>
//       </div>
//     </footer>
//   );
// }


// import React from "react";
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp } from "react-icons/fa";
// import { useLanguage } from "../context/LanguageContext";

// export default function Footer() {
//   const { language } = useLanguage();

//   const handleSubscribe = () => {
//     if (window.OneSignal) {
//       window.OneSignal.push(() => {
//         window.OneSignal.showSlidedownPrompt().catch(() => window.OneSignal.registerForPushNotifications());
//       });
//     } else {
//       alert(language === "te" ? "నోటిఫికేషన్ అందుబాటులో లేదు" : "Notifications not available");
//     }
//   };

//   return (
//     <footer className="bg-blue-900 text-white mt-8">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-6">
//         <div>© 2025 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}. {language === "te" ? "అన్ని హక్కులు రిజర్వు చేయబడ్డాయి." : "All rights reserved."}</div>

//         <div className="flex items-center gap-4">
//           <a href="https://facebook.com/yourpage" target="_blank" rel="noreferrer" className="hover:opacity-80"><FaFacebook/></a>
//           <a href="https://twitter.com/yourprofile" target="_blank" rel="noreferrer" className="hover:opacity-80"><FaTwitter/></a>
//           <a href="https://instagram.com/yourprofile" target="_blank" rel="noreferrer" className="hover:opacity-80"><FaInstagram/></a>
//           <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" className="hover:opacity-80"><FaLinkedin/></a>
//           <a href="https://youtube.com/yourchannel" target="_blank" rel="noreferrer" className="hover:opacity-80"><FaYoutube/></a>
//           <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="hover:opacity-80"><FaWhatsapp/></a>

//           <button onClick={handleSubscribe} className="ml-4 bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500">
//             {language === "te" ? "సబ్SCRIBE" : "Subscribe"}
//           </button>
//         </div>
//       </div>
//     </footer>
//   );
// }

// import React from "react";
// import {
//   FaFacebook,
//   FaTwitter,
//   FaInstagram,
//   FaLinkedin,
//   FaYoutube,
//   FaWhatsapp,
// } from "react-icons/fa";
// import { useLanguage } from "../context/LanguageContext";

// export default function Footer() {
//   const { language } = useLanguage();

//   return (
//     <footer className="bg-blue-900 text-white mt-8">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-6">
//         <div>
//           © {new Date().getFullYear()} {language === "te" ? "నా వార్తా సైట్" : "My News Site"}.{" "}
//           {language === "te" ? "అన్ని హక్కులు రిజర్వు చేయబడ్డాయి." : "All rights reserved."}
//         </div>
//         <div className="flex items-center gap-4 text-xl">
//           <a href="https://facebook.com/yourpage" target="_blank" rel="noreferrer" className="hover:opacity-80">
//             <FaFacebook />
//           </a>
//           <a href="https://twitter.com/yourprofile" target="_blank" rel="noreferrer" className="hover:opacity-80">
//             <FaTwitter />
//           </a>
//           <a href="https://instagram.com/yourprofile" target="_blank" rel="noreferrer" className="hover:opacity-80">
//             <FaInstagram />
//           </a>
//           <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" className="hover:opacity-80">
//             <FaLinkedin />
//           </a>
//           <a href="https://youtube.com/yourchannel" target="_blank" rel="noreferrer" className="hover:opacity-80">
//             <FaYoutube />
//           </a>
//           <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="hover:opacity-80">
//             <FaWhatsapp />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// }

import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-blue-900 text-white mt-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-6">
        
        {/* Left section with privacy + terms and copyright */}
        <div className="text-center md:text-left">
          {/* Privacy Policy & Terms links */}
          <div className="mb-2">
            <Link to="/privacy-policy" className="hover:underline">
              {language === "te" ? "గోప్యతా విధానం" : "Privacy Policy"}
            </Link>
            <span className="mx-2">|</span>
            <Link to="/terms" className="hover:underline">
              {language === "te" ? "నియమాలు & షరతులు" : "Terms & Conditions"}
            </Link>
          </div>

          {/* Copyright */}
          <div>
            © {new Date().getFullYear()}{" "}
            {language === "te" ? "నా వార్తా సైట్" : "My News Site"}.{" "}
            {language === "te"
              ? "అన్ని హక్కులు రిజర్వు చేయబడ్డాయి."
              : "All rights reserved."}
          </div>
        </div>

        {/* Right section with social icons */}
        <div className="flex items-center gap-4 text-xl">
          <a
            href="https://facebook.com/yourpage"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://youtube.com/yourchannel"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80"
          >
            <FaYoutube />
          </a>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </footer>
  );
}