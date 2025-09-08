// // src/components/Header.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";

// export default function Header({ categories = [] }) {
//   const { language, setLanguage } = useLanguage();

//   return (
//     <header className="bg-blue-900 text-white shadow-md">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         <Link to="/" className="text-2xl font-bold hover:text-yellow-300">
//           📰 My News Site
//         </Link>

//         <div className="hidden md:flex items-center space-x-6">
//           {/* categories shown on right */}
//           {categories.map((c) => (
//             <Link
//               key={c.id}
//               to={`/category/${c.id}`}
//               className="hover:text-yellow-300 transition-colors"
//             >
//               {c.name}
//             </Link>
//           ))}

//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="ml-4 text-black px-2 py-1 rounded"
//             aria-label="Select language"
//           >
//             <option value="en">English</option>
//             <option value="te">తెలుగు</option>
//           </select>
//         </div>

//         {/* mobile menu: show language and hamburger (simple) */}
//         <div className="md:hidden flex items-center space-x-3">
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-black px-2 py-1 rounded"
//             aria-label="Select language"
//           >
//             <option value="en">EN</option>
//             <option value="te">TE</option>
//           </select>
//         </div>
//       </div>
//     </header>
//   );
// }

// src/components/Header.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes } from "react-icons/fa";

// export default function Header({ categories = [], trending = [] }) {
//   const { language, setLanguage } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="bg-blue-900 text-white shadow-md">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         <Link to="/" className="text-2xl font-bold hover:text-yellow-300">
//           📰 My News Site
//         </Link>

//         {/* Desktop menu */}
//         <div className="hidden md:flex items-center space-x-6">
//           {categories.map((c) => (
//             <Link
//               key={c.id}
//               to={`/category/${c.id}`}
//               className="hover:text-yellow-300 transition-colors"
//             >
//               {c.name}
//             </Link>
//           ))}

//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="ml-4 text-black px-2 py-1 rounded"
//           >
//             <option value="en">English</option>
//             <option value="te">తెలుగు</option>
//           </select>
//         </div>

//         {/* Mobile controls */}
//         <div className="md:hidden flex items-center space-x-3">
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-black px-2 py-1 rounded"
//           >
//             <option value="en">EN</option>
//             <option value="te">TE</option>
//           </select>
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="text-2xl focus:outline-none"
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile slide-down menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-blue-800 px-4 py-3 space-y-4">
//           <div>
//             <h3 className="font-bold text-yellow-300">Categories</h3>
//             <ul className="mt-2 space-y-2">
//               {categories.map((c) => (
//                 <li key={c.id}>
//                   <Link
//                     to={`/category/${c.id}`}
//                     className="block px-2 py-1 rounded hover:bg-blue-700"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     {c.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h3 className="font-bold text-yellow-300">Trending</h3>
//             <ul className="mt-2 space-y-2 text-sm">
//               {trending.map((t) => (
//                 <li key={t.id}>
//                   <Link
//                     to={`/articles/${t.id}`}
//                     className="block hover:text-yellow-300"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     {language === "en" ? t.title_en : t.title_te}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }


// src/components/Header.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes } from "react-icons/fa";

// export default function Header({ categories = [], trending = [] }) {
//   const { language, setLanguage } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="bg-blue-900 text-white shadow-md">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         <Link to="/" className="text-2xl font-bold hover:text-yellow-300 flex items-center gap-2">
//           📰 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}
//         </Link>

//         {/* Desktop menu */}
//         <div className="hidden md:flex items-center space-x-6">
//           {categories.map((c) => (
//             <Link
//               key={c.id}
//               to={`/category/${c.id}`}
//               className="hover:text-yellow-300 transition-colors"
//             >
//               {language === "te" ? c.name_te || c.name : c.name}
//             </Link>
//           ))}

//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="ml-4 text-black px-2 py-1 rounded"
//           >
//             <option value="en">English</option>
//             <option value="te">తెలుగు</option>
//           </select>
//         </div>

//         {/* Mobile controls */}
//         <div className="md:hidden flex items-center space-x-3">
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-black px-2 py-1 rounded"
//           >
//             <option value="en">EN</option>
//             <option value="te">TE</option>
//           </select>
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="text-2xl focus:outline-none"
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile slide-down menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-blue-800 px-4 py-3 space-y-4">
//           <div>
//             <h3 className="font-bold text-yellow-300">
//               {language === "te" ? "వర్గాలు" : "Categories"}
//             </h3>
//             <ul className="mt-2 space-y-2">
//               {categories.map((c) => (
//                 <li key={c.id}>
//                   <Link
//                     to={`/category/${c.id}`}
//                     className="block px-2 py-1 rounded hover:bg-blue-700"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     {language === "te" ? c.name_te || c.name : c.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h3 className="font-bold text-yellow-300">
//               {language === "te" ? "ట్రెండింగ్" : "Trending"}
//             </h3>
//             <ul className="mt-2 space-y-2 text-sm">
//               {trending.map((t) => (
//                 <li key={t.id}>
//                   <Link
//                     to={`/articles/${t.id}`}
//                     className="block hover:text-yellow-300"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     {language === "en" ? t.title_en : t.title_te}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }


// src/components/Header.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes } from "react-icons/fa";

// export default function Header({ categories = [], trending = [] }) {
//   const { language, setLanguage } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="bg-blue-900 text-white shadow-md">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         <Link
//           to="/"
//           className="text-2xl font-bold hover:text-yellow-300 flex items-center gap-2"
//         >
//           📰 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}
//         </Link>

//         {/* Desktop menu */}
//         <div className="hidden md:flex items-center space-x-6">
//           {categories.map((c) => (
//             <Link
//               key={c.id}
//               to={`/category/${c.id}`}
//               className="hover:text-yellow-300 transition-colors"
//             >
//               {language === "te" ? c.name_te : c.name_en}
//             </Link>
//           ))}

//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="ml-4 text-black px-2 py-1 rounded"
//           >
//             <option value="en">English</option>
//             <option value="te">తెలుగు</option>
//           </select>
//         </div>

//         {/* Mobile controls */}
//         <div className="md:hidden flex items-center space-x-3">
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-black px-2 py-1 rounded"
//           >
//             <option value="en">EN</option>
//             <option value="te">TE</option>
//           </select>
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="text-2xl focus:outline-none"
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile slide-down menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-blue-800 px-4 py-3 space-y-4">
//           {/* Categories */}
//           <div>
//             <h3 className="font-bold text-yellow-300">
//               {language === "te" ? "వర్గాలు" : "Categories"}
//             </h3>
//             <ul className="mt-2 space-y-2">
//               {categories.map((c) => (
//                 <li key={c.id}>
//                   <Link
//                     to={`/category/${c.id}`}
//                     className="block px-2 py-1 rounded hover:bg-blue-700"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     {language === "te" ? c.name_te : c.name_en}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Trending */}
//           <div>
//             <h3 className="font-bold text-yellow-300">
//               {language === "te" ? "ట్రెండింగ్" : "Trending"}
//             </h3>
//             <ul className="mt-2 space-y-2 text-sm">
//               {trending && trending.length > 0 ? (
//                 trending.map((t) => (
//                   <li key={t.id}>
//                     <Link
//                       to={`/articles/${t.id}`}
//                       className="block hover:text-yellow-300"
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       {language === "en" ? t.title_en : t.title_te}
//                     </Link>
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-gray-300 text-sm">
//                   {language === "te" ? "లభ్యం లేదు" : "No trending"}
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }


// src/components/Header.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes } from "react-icons/fa";

// export default function Header({ categories = [], trending = [] }) {
//   const { language, setLanguage } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="bg-blue-900 text-white shadow-md">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         <Link
//           to="/"
//           className="text-2xl font-bold hover:text-yellow-300 flex items-center gap-2"
//         >
//           📰 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}
//         </Link>

//         {/* Desktop menu */}
//         <div className="hidden md:flex items-center space-x-6">
//           {categories.map((c) => (
//             <Link
//               key={c.id}
//               to={`/category/${c.id}`}
//               className="hover:text-yellow-300 transition-colors"
//             >
//               {language === "te" ? c.name_te || c.name : c.name}
//             </Link>
//           ))}

//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="ml-4 text-black px-2 py-1 rounded"
//           >
//             <option value="en">English</option>
//             <option value="te">తెలుగు</option>
//           </select>
//         </div>

//         {/* Mobile controls */}
//         <div className="md:hidden flex items-center space-x-3">
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-black px-2 py-1 rounded"
//           >
//             <option value="en">EN</option>
//             <option value="te">TE</option>
//           </select>
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="text-2xl focus:outline-none"
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile slide-down menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-blue-800 px-4 py-3 space-y-4">
//           {/* Categories */}
//           <div>
//             <h3 className="font-bold text-yellow-300">
//               {language === "te" ? "వర్గాలు" : "Categories"}
//             </h3>
//             <ul className="mt-2 space-y-2">
//               {categories.map((c) => (
//                 <li key={c.id}>
//                   <Link
//                     to={`/category/${c.id}`}
//                     className="block px-2 py-1 rounded hover:bg-blue-700"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     {language === "te" ? c.name_te || c.name : c.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Trending */}
//           <div>
//             <h3 className="font-bold text-yellow-300">
//               {language === "te" ? "ట్రెండింగ్" : "Trending"}
//             </h3>
//             <ul className="mt-2 space-y-2 text-sm">
//               {trending && trending.length > 0 ? (
//                 trending.map((t) => (
//                   <li key={t.id}>
//                     <Link
//                       to={`/articles/${t.id}`}
//                       className="block hover:text-yellow-300"
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       {language === "te" ? t.title_te : t.title_en}
//                     </Link>
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-gray-300 text-sm">
//                   {language === "te" ? "లభ్యం లేదు" : "No trending"}
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }


// src/components/Header.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes } from "react-icons/fa";

// export default function Header({ categories = [], trending = [] }) {
//   const { language, setLanguage } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="bg-blue-900 text-white shadow-md">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         <Link
//           to="/"
//           className="text-2xl font-bold hover:text-yellow-300 flex items-center gap-2"
//         >
//           📰 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}
//         </Link>

//         {/* Desktop menu */}
//         <div className="hidden md:flex items-center space-x-6">
//           {categories.map((c) => (
//             <Link
//               key={c.id}
//               to={`/category/${c.id}`}
//               className="hover:text-yellow-300 transition-colors"
//             >
//               {language === "te" ? c.name_te || c.name : c.name}
//             </Link>
//           ))}

//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="ml-4 text-black px-2 py-1 rounded"
//           >
//             <option value="en">English</option>
//             <option value="te">తెలుగు</option>
//           </select>
//         </div>

//         {/* Mobile controls */}
//         <div className="md:hidden flex items-center space-x-3">
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-black px-2 py-1 rounded"
//           >
//             <option value="en">EN</option>
//             <option value="te">TE</option>
//           </select>
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="text-2xl focus:outline-none"
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile slide-down menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-blue-800 px-4 py-3 space-y-4">
//           {/* Categories */}
//           <div>
//             <h3 className="font-bold text-yellow-300">
//               {language === "te" ? "వర్గాలు" : "Categories"}
//             </h3>
//             <ul className="mt-2 space-y-2">
//               {categories.map((c) => (
//                 <li key={c.id}>
//                   <Link
//                     to={`/category/${c.id}`}
//                     className="block px-2 py-1 rounded hover:bg-blue-700"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     {language === "te" ? c.name_te || c.name : c.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Trending */}
//           <div>
//             <h3 className="font-bold text-yellow-300">
//               {language === "te" ? "ట్రెండింగ్" : "Trending"}
//             </h3>
//             <ul className="mt-2 space-y-2 text-sm">
//               {trending && trending.length > 0 ? (
//                 trending.map((t) => (
//                   <li key={t.id}>
//                     <Link
//                       to={`/articles/${t.id}`}
//                       className="block hover:text-yellow-300"
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       {language === "te" ? t.title_te : t.title_en}
//                     </Link>
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-gray-300 text-sm">
//                   {language === "te" ? "లభ్యం లేదు" : "No trending"}
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }


// src/components/Header.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes } from "react-icons/fa";

// export default function Header({ categories = [], trending = [] }) {
//   const { language, setLanguage } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="bg-blue-900 text-white shadow-md">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         <Link
//           to="/"
//           className="text-2xl font-bold hover:text-yellow-300 flex items-center gap-2"
//         >
//           📰 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}
//         </Link>

//         {/* Desktop menu */}
//         <div className="hidden md:flex items-center space-x-6">
//           {categories.map((c) => (
//             <Link
//               key={c.id}
//               to={`/category/${c.id}`}
//               className="hover:text-yellow-300 transition-colors"
//             >
//               {language === "te" ? c.name_te || c.name : c.name}
//             </Link>
//           ))}

//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="ml-4 text-black px-2 py-1 rounded"
//           >
//             <option value="en">English</option>
//             <option value="te">తెలుగు</option>
//           </select>
//         </div>

//         {/* Mobile controls */}
//         <div className="md:hidden flex items-center space-x-3">
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-black px-2 py-1 rounded"
//           >
//             <option value="en">EN</option>
//             <option value="te">TE</option>
//           </select>
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="text-2xl focus:outline-none"
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile slide-down menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-blue-800 px-4 py-3 space-y-4">
//           {/* Categories */}
//           <div>
//             <h3 className="font-bold text-yellow-300">
//               {language === "te" ? "వర్గాలు" : "Categories"}
//             </h3>
//             <ul className="mt-2 space-y-2">
//               {categories && categories.length > 0 ? (
//                 categories.map((c) => (
//                   <li key={c.id}>
//                     <Link
//                       to={`/category/${c.id}`}
//                       className="block px-2 py-1 rounded hover:bg-blue-700"
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       {language === "te" ? c.name_te || c.name : c.name}
//                     </Link>
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-gray-300 text-sm">
//                   {language === "te" ? "లభ్యం లేదు" : "No categories"}
//                 </li>
//               )}
//             </ul>
//           </div>

//           {/* Trending */}
//           <div>
//             <h3 className="font-bold text-yellow-300">
//               {language === "te" ? "ట్రెండింగ్" : "Trending"}
//             </h3>
//             <ul className="mt-2 space-y-2 text-sm">
//               {trending && trending.length > 0 ? (
//                 trending.map((t) => (
//                   <li key={t.id}>
//                     <Link
//                       to={`/articles/${t.id}`}
//                       className="block hover:text-yellow-300"
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       {language === "te"
//                         ? t.title_te || t.title_en
//                         : t.title_en || t.title_te}
//                     </Link>
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-gray-300 text-sm">
//                   {language === "te" ? "లభ్యం లేదు" : "No trending"}
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }


// src/components/Header.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes } from "react-icons/fa";

// export default function Header({ categories = [], trending = [] }) {
//   const { language, setLanguage } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="bg-blue-900 text-white shadow-md">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         <Link
//           to="/"
//           className="text-2xl font-bold hover:text-yellow-300 flex items-center gap-2"
//           title={language === "te" ? "హోమ్" : "Home"} // tooltip to indicate home
//         >
//           📰 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}
//         </Link>

//         {/* Desktop menu */}
//         <div className="hidden md:flex items-center space-x-6">
//           {categories.map((c) => (
//             <Link
//               key={c.id}
//               to={`/category/${c.id}`}
//               className="hover:text-yellow-300 transition-colors"
//             >
//               {language === "te" ? c.name_te || c.name : c.name}
//             </Link>
//           ))}

//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="ml-4 text-black px-2 py-1 rounded"
//           >
//             <option value="en">English</option>
//             <option value="te">తెలుగు</option>
//           </select>
//         </div>

//         {/* Mobile controls */}
//         <div className="md:hidden flex items-center space-x-3">
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-black px-2 py-1 rounded"
//           >
//             <option value="en">EN</option>
//             <option value="te">TE</option>
//           </select>
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="text-2xl focus:outline-none"
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile slide-down menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-blue-800 px-4 py-3 space-y-4">
//           {/* Categories */}
//           <div>
//             <h3 className="font-bold text-yellow-300">
//               {language === "te" ? "వర్గాలు" : "Categories"}
//             </h3>
//             <ul className="mt-2 space-y-2">
//               {categories && categories.length > 0 ? (
//                 categories.map((c) => (
//                   <li key={c.id}>
//                     <Link
//                       to={`/category/${c.id}`}
//                       className="block px-2 py-1 rounded hover:bg-blue-700"
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       {language === "te" ? c.name_te || c.name : c.name}
//                     </Link>
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-gray-300 text-sm">
//                   {language === "te" ? "లభ్యం లేదు" : "No categories"}
//                 </li>
//               )}
//             </ul>
//           </div>

//           {/* Trending */}
//           <div>
//             <h3 className="font-bold text-yellow-300">
//               {language === "te" ? "ట్రెండింగ్" : "Trending"}
//             </h3>
//             <ul className="mt-2 space-y-2 text-sm">
//               {trending && trending.length > 0 ? (
//                 trending.map((t) => (
//                   <li key={t.id}>
//                     <Link
//                       to={`/articles/${t.id}`}
//                       className="block hover:text-yellow-300"
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       {language === "te"
//                         ? t.title_te || t.title_en
//                         : t.title_en || t.title_te}
//                     </Link>
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-gray-300 text-sm">
//                   {language === "te" ? "లభ్యం లేదు" : "No trending"}
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }


// src/components/Header.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes } from "react-icons/fa";

// export default function Header({ categories = [], trending = [] }) {
//   const { language, setLanguage } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="bg-blue-900 text-white shadow-md">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         <Link
//           to="/"
//           className="text-2xl font-bold hover:text-yellow-300 flex items-center gap-2"
//           title={language === "te" ? "హోమ్" : "Home"} // tooltip
//         >
//           📰 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}
//           <span className="sr-only">{language === "te" ? "హోమ్" : "Home"}</span>
//         </Link>

//         {/* Desktop menu */}
//         <div className="hidden md:flex items-center space-x-6">
//           {categories.map((c) => (
//             <Link
//               key={c.id}
//               to={`/category/${c.id}`}
//               className="hover:text-yellow-300 transition-colors"
//             >
//               {language === "te" ? c.name_te || c.name : c.name}
//             </Link>
//           ))}

//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="ml-4 text-black px-2 py-1 rounded"
//           >
//             <option value="en">English</option>
//             <option value="te">తెలుగు</option>
//           </select>
//         </div>

//         {/* Mobile controls */}
//         <div className="md:hidden flex items-center space-x-3">
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-black px-2 py-1 rounded"
//           >
//             <option value="en">EN</option>
//             <option value="te">TE</option>
//           </select>
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="text-2xl focus:outline-none"
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile slide-down menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-blue-800 px-4 py-3 space-y-4">
//           {/* Categories */}
//           <div>
//             <h3 className="font-bold text-yellow-300">
//               {language === "te" ? "వర్గాలు" : "Categories"}
//             </h3>
//             <ul className="mt-2 space-y-2">
//               {categories.length > 0 ? (
//                 categories.map((c) => (
//                   <li key={c.id}>
//                     <Link
//                       to={`/category/${c.id}`}
//                       className="block px-2 py-1 rounded hover:bg-blue-700"
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       {language === "te" ? c.name_te || c.name : c.name}
//                     </Link>
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-gray-300 text-sm">
//                   {language === "te" ? "లభ్యం లేదు" : "No categories"}
//                 </li>
//               )}
//             </ul>
//           </div>

//           {/* Trending */}
//           <div>
//             <h3 className="font-bold text-yellow-300">
//               {language === "te" ? "ట్రెండింగ్" : "Trending"}
//             </h3>
//             <ul className="mt-2 space-y-2 text-sm">
//               {trending && trending.length > 0 ? (
//                 trending.map((t) => (
//                   <li key={t.id}>
//                     <Link
//                       to={`/articles/${t.id}`}
//                       className="block hover:text-yellow-300"
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       {language === "te"
//                         ? t.title_te || t.title_en
//                         : t.title_en || t.title_te}
//                     </Link>
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-gray-300 text-sm">
//                   {language === "te" ? "లభ్యం లేదు" : "No trending"}
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }


// src/components/Header.jsx
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { supabase } from "../lib/supabaseClient";

// export default function Header({ categories = [], trending = [] }) {
//   const { language, setLanguage } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [session, setSession] = useState(null);
//   const navigate = useNavigate();

//   // ✅ Get session & listen for login/logout
//   useEffect(() => {
//     async function getSession() {
//       const { data } = await supabase.auth.getSession();
//       setSession(data.session);
//     }
//     getSession();

//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setSession(session);
//       }
//     );

//     return () => {
//       listener.subscription.unsubscribe();
//     };
//   }, []);

//   // ✅ Logout
//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setSession(null);
//     navigate("/"); // redirect to home
//   };

//   return (
//     <header className="bg-blue-900 text-white shadow-md">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         <Link
//           to="/"
//           className="text-2xl font-bold hover:text-yellow-300 flex items-center gap-2"
//           title={language === "te" ? "హోమ్" : "Home"} // tooltip
//         >
//           📰 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}
//           <span className="sr-only">{language === "te" ? "హోమ్" : "Home"}</span>
//         </Link>

//         {/* Desktop menu */}
//         <div className="hidden md:flex items-center space-x-6">
//           {categories.map((c) => (
//             <Link
//               key={c.id}
//               to={`/category/${c.id}`}
//               className="hover:text-yellow-300 transition-colors"
//             >
//               {language === "te" ? c.name_te || c.name : c.name}
//             </Link>
//           ))}

//           {/* ✅ Show Admin when logged in */}
//           {session && (
//             <>
//               <Link
//                 to="/admin"
//                 className="hover:text-yellow-300 transition-colors"
//               >
//                 {language === "te" ? "అడ్మిన్" : "Admin"}
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-white text-sm"
//               >
//                 {language === "te" ? "లాగ్ అవుట్" : "Logout"}
//               </button>
//             </>
//           )}

//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="ml-4 text-black px-2 py-1 rounded"
//           >
//             <option value="en">English</option>
//             <option value="te">తెలుగు</option>
//           </select>
//         </div>

//         {/* Mobile controls */}
//         <div className="md:hidden flex items-center space-x-3">
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-black px-2 py-1 rounded"
//           >
//             <option value="en">EN</option>
//             <option value="te">TE</option>
//           </select>
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="text-2xl focus:outline-none"
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile slide-down menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-blue-800 px-4 py-3 space-y-4">
//           {/* Categories */}
//           <div>
//             <h3 className="font-bold text-yellow-300">
//               {language === "te" ? "వర్గాలు" : "Categories"}
//             </h3>
//             <ul className="mt-2 space-y-2">
//               {categories.length > 0 ? (
//                 categories.map((c) => (
//                   <li key={c.id}>
//                     <Link
//                       to={`/category/${c.id}`}
//                       className="block px-2 py-1 rounded hover:bg-blue-700"
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       {language === "te" ? c.name_te || c.name : c.name}
//                     </Link>
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-gray-300 text-sm">
//                   {language === "te" ? "లభ్యం లేదు" : "No categories"}
//                 </li>
//               )}
//             </ul>
//           </div>

//           {/* Trending */}
//           <div>
//             <h3 className="font-bold text-yellow-300">
//               {language === "te" ? "ట్రెండింగ్" : "Trending"}
//             </h3>
//             <ul className="mt-2 space-y-2 text-sm">
//               {trending && trending.length > 0 ? (
//                 trending.map((t) => (
//                   <li key={t.id}>
//                     <Link
//                       to={`/articles/${t.id}`}
//                       className="block hover:text-yellow-300"
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       {language === "te"
//                         ? t.title_te || t.title_en
//                         : t.title_en || t.title_te}
//                     </Link>
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-gray-300 text-sm">
//                   {language === "te" ? "లభ్యం లేదు" : "No trending"}
//                 </li>
//               )}
//             </ul>
//           </div>

//           {/* ✅ Mobile Admin + Logout */}
//           {session && (
//             <div className="pt-3 border-t border-blue-700">
//               <Link
//                 to="/admin"
//                 className="block px-2 py-1 rounded hover:bg-blue-700"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 {language === "te" ? "అడ్మిన్" : "Admin"}
//               </Link>
//               <button
//                 onClick={() => {
//                   handleLogout();
//                   setMenuOpen(false);
//                 }}
//                 className="mt-2 w-full bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-white text-sm"
//               >
//                 {language === "te" ? "లాగ్ అవుట్" : "Logout"}
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </header>
//   );
// }


// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { FaBars, FaTimes } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";

export default function Header({ categories = [], trending = [] }) {
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  // debug: inspect categories prop
  useEffect(() => {
    console.log("Header received categories:", categories);
  }, [categories]);

  // Get session & listen for login/logout
  useEffect(() => {
    async function getSession() {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session ?? null);
    }
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session ?? null);
      }
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    navigate("/");
  };

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="text-2xl font-bold hover:text-yellow-300 flex items-center gap-2"
          title={language === "te" ? "హోమ్" : "Home"}
        >
          📰 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}
          <span className="sr-only">{language === "te" ? "హోమ్" : "Home"}</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6">
          {categories && categories.length > 0 ? (
            categories.map((c) => (
              <Link
                key={c.id}
                to={`/category/${c.id}`}
                className="hover:text-yellow-300 transition-colors"
              >
                {language === "te" ? c.name_te || c.name : c.name}
              </Link>
            ))
          ) : (
            <div className="text-gray-200">No categories</div>
          )}

          {session && (
            <>
              <Link to="/admin" className="hover:text-yellow-300 transition-colors">
                {language === "te" ? "అడ్మిన్" : "Admin"}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-white text-sm"
              >
                {language === "te" ? "లాగ్ అవుట్" : "Logout"}
              </button>
            </>
          )}

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="ml-4 text-black px-2 py-1 rounded"
          >
            <option value="en">English</option>
            <option value="te">తెలుగు</option>
          </select>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center space-x-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-black px-2 py-1 rounded"
          >
            <option value="en">EN</option>
            <option value="te">TE</option>
          </select>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-800 px-4 py-3 space-y-4">
          <div>
            <h3 className="font-bold text-yellow-300">{language === "te" ? "వర్గాలు" : "Categories"}</h3>
            <ul className="mt-2 space-y-2">
              {categories && categories.length > 0 ? (
                categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      to={`/category/${c.id}`}
                      className="block px-2 py-1 rounded hover:bg-blue-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      {language === "te" ? c.name_te || c.name : c.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-300 text-sm">{language === "te" ? "లభ్యం లేదు" : "No categories"}</li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-yellow-300">{language === "te" ? "ట్రెండింగ్" : "Trending"}</h3>
            <ul className="mt-2 space-y-2 text-sm">
              {trending && trending.length > 0 ? (
                trending.map((t) => (
                  <li key={t.id}>
                    <Link to={`/articles/${t.id}`} className="block hover:text-yellow-300" onClick={() => setMenuOpen(false)}>
                      {language === "te" ? t.title_te || t.title_en : t.title_en || t.title_te}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-300 text-sm">{language === "te" ? "లభ్యం లేదు" : "No trending"}</li>
              )}
            </ul>
          </div>

          {session && (
            <div className="pt-3 border-t border-blue-700">
              <Link to="/admin" className="block px-2 py-1 rounded hover:bg-blue-700" onClick={() => setMenuOpen(false)}>
                {language === "te" ? "అడ్మిన్" : "Admin"}
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="mt-2 w-full bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-white text-sm"
              >
                {language === "te" ? "లాగ్ అవుట్" : "Logout"}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
