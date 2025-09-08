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



// src/components/Footer.jsx
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

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-blue-900 text-white mt-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-6">
        <div>
          © 2025 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}.{" "}
          {language === "te" ? "అన్ని హక్కులు రిజర్వు చేయబడ్డాయి." : "All rights reserved."}
        </div>
        <div className="flex items-center gap-4 text-xl">
          <a href="https://facebook.com/yourpage" target="_blank" rel="noreferrer" className="hover:opacity-80">
            <FaFacebook />
          </a>
          <a href="https://twitter.com/yourprofile" target="_blank" rel="noreferrer" className="hover:opacity-80">
            <FaTwitter />
          </a>
          <a href="https://instagram.com/yourprofile" target="_blank" rel="noreferrer" className="hover:opacity-80">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" className="hover:opacity-80">
            <FaLinkedin />
          </a>
          <a href="https://youtube.com/yourchannel" target="_blank" rel="noreferrer" className="hover:opacity-80">
            <FaYoutube />
          </a>
          <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="hover:opacity-80">
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </footer>
  );
}
