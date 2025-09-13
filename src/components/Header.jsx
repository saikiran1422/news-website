// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes, FaSearch, FaBell, FaGlobe } from "react-icons/fa";
// import { supabase } from "../lib/supabaseClient";

// export default function Header({ categories = [], articles = [] }) {
//   const { language } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [session, setSession] = useState(null);
//   const [search, setSearch] = useState("");
//   const [results, setResults] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getSession() {
//       const { data } = await supabase.auth.getSession();
//       setSession(data?.session ?? null);
//     }
//     getSession();
//     const { data: listener } = supabase.auth.onAuthStateChange((_event, s) =>
//       setSession(s ?? null)
//     );
//     return () => listener.subscription.unsubscribe();
//   }, []);

//   // live search
//   useEffect(() => {
//     if (!search.trim()) {
//       setResults([]);
//       return;
//     }
//     const lower = search.toLowerCase();
//     const matches = articles.filter((a) =>
//       (language === "en" ? a.title_en : a.title_te)
//         ?.toLowerCase()
//         .includes(lower)
//     );
//     setResults(matches.slice(0, 5));
//   }, [search, articles, language]);

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (results.length > 0) {
//       navigate(`/articles/${results[0].id}`);
//       setSearch("");
//       setResults([]);
//       setMenuOpen(false);
//     }
//   };

//   return (
//     <header className="bg-blue-900 text-white shadow-md relative">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
//           📰 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}
//         </Link>

//         {/* Desktop Categories */}
//         <nav className="hidden md:flex items-center space-x-6">
//           {categories.map((c) => (
//             <Link
//               key={c.id}
//               to={`/category/${c.id}`}
//               className="hover:text-yellow-300"
//             >
//               {language === "te" ? c.name_te || c.name : c.name}
//             </Link>
//           ))}
//         </nav>



//         {/* Desktop controls */}
//         <div className="hidden md:flex items-center gap-4">
//           {/* Search */}
//           <form
//             onSubmit={handleSearchSubmit}
//             className="flex items-center bg-white rounded overflow-hidden"
//           >
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder={
//                 language === "te" ? "వార్తలు శోధించండి..." : "Search..."
//               }
//               className="px-2 py-1 text-black outline-none"
//             />
//             <button type="submit" className="px-3 bg-yellow-400 text-black">
//               <FaSearch />
//             </button>
//           </form>

//           {/* Subscribe button */}
//           <button
//             onClick={() => window.OneSignal && OneSignal.showSlidedownPrompt()}
//             className="flex items-center gap-1 bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300"
//           >
//             <FaBell /> {language === "te" ? "చందా" : "Subscribe"}
//           </button>

//           {/* Google Translate trigger */}
//           <div
//             id="google_translate_element"
//             className="text-black bg-white rounded px-2 py-1"
//           >
//             <div id="google_translate_element" className="ml-4"></div>
//             <FaGlobe className="inline mr-1" /> Translate
//           </div>
//         </div>

//         {/* Mobile hamburger */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="md:hidden text-2xl"
//         >
//           {menuOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* Mobile menu */}
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
//                     onClick={() => setMenuOpen(false)}
//                     className="block px-2 py-1 rounded hover:bg-blue-700"
//                   >
//                     {language === "te" ? c.name_te || c.name : c.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Search */}
//           <form
//             onSubmit={handleSearchSubmit}
//             className="flex items-center bg-white rounded overflow-hidden"
//           >
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder={
//                 language === "te" ? "వార్తలు శోధించండి..." : "Search..."
//               }
//               className="px-2 py-1 text-black w-full outline-none"
//             />
//             <button type="submit" className="px-2 bg-yellow-400 text-black">
//               <FaSearch />
//             </button>
//           </form>

//           {/* Subscribe */}
//           <button
//             onClick={() => window.OneSignal && OneSignal.showSlidedownPrompt()}
//             className="flex items-center gap-1 bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300"
//           >
//             <FaBell /> {language === "te" ? "చందా" : "Subscribe"}
//           </button>
//         </div>
//       )}

//       {/* Dropdown results */}
//       {results.length > 0 && (
//         <div className="absolute bg-white text-black w-full max-w-md left-1/2 transform -translate-x-1/2 rounded shadow z-20">
//           {results.map((r) => (
//             <Link
//               key={r.id}
//               to={`/articles/${r.id}`}
//               onClick={() => {
//                 setSearch("");
//                 setResults([]);
//               }}
//               className="block px-3 py-2 hover:bg-gray-100"
//             >
//               {language === "en" ? r.title_en : r.title_te}
//             </Link>
//           ))}
//         </div>
//       )}
//     </header>
//   );
// }

  // import React, { useState, useEffect } from "react";
  // import { Link, useNavigate } from "react-router-dom";
  // import { useLanguage } from "../context/LanguageContext";
  // import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
  // import { supabase } from "../lib/supabaseClient";

  // export default function Header({ categories = [], articles = [] }) {
  //   const { language } = useLanguage();
  //   const [menuOpen, setMenuOpen] = useState(false);
  //   const [session, setSession] = useState(null);
  //   const [search, setSearch] = useState("");
  //   const [suggestions, setSuggestions] = useState([]);
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     async function getSession() {
  //       const { data } = await supabase.auth.getSession();
  //       setSession(data?.session ?? null);
  //     }
  //     getSession();
  //     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
  //       setSession(session ?? null);
  //     });
  //     return () => listener.subscription.unsubscribe();
  //   }, []);

  //   const handleLogout = async () => {
  //     await supabase.auth.signOut();
  //     setSession(null);
  //     navigate("/");
  //   };

  //   const handleSearch = (e) => {
  //     e.preventDefault();
  //     if (!search.trim()) return;
  //     const lower = search.toLowerCase();
  //     const found = articles.find((a) =>
  //       (language === "en" ? a.title_en : a.title_te)?.toLowerCase().includes(lower)
  //     );
  //     if (found) {
  //       navigate(`/articles/${found.id}`);
  //       setSearch("");
  //       setSuggestions([]);
  //       setMenuOpen(false);
  //     } else {
  //       alert(language === "te" ? "ఫలితాలు లేవు" : "No results found");
  //     }
  //   };

  //   const handleInputChange = (e) => {
  //     const val = e.target.value;
  //     setSearch(val);
  //     if (val.length > 1) {
  //       const lower = val.toLowerCase();
  //       setSuggestions(
  //         articles.filter((a) =>
  //           (language === "en" ? a.title_en : a.title_te)?.toLowerCase().includes(lower)
  //         )
  //       );
  //     } else {
  //       setSuggestions([]);
  //     }
  //   };

  //   return (
  //     <header className="bg-blue-900 text-white shadow-md relative">
  //       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
  //         {/* Logo */}
  //         <Link to="/" className="flex items-center gap-2 text-xl font-bold hover:text-yellow-300">
  //           📰 <span>My News Site</span>
  //         </Link>

  //         {/* Search center */}
  //         <form
  //           onSubmit={handleSearch}
  //           className="hidden md:flex items-center bg-white rounded overflow-hidden w-1/3 relative"
  //         >
  //           <input
  //             type="text"
  //             value={search}
  //             onChange={handleInputChange}
  //             placeholder={language === "te" ? "వార్తలు శోధించండి..." : "Search articles..."}
  //             className="px-2 py-1 text-black w-full outline-none"
  //           />
  //           <button type="submit" className="px-2 bg-yellow-400 text-black">
  //             <FaSearch />
  //           </button>

  //           {/* Suggestions dropdown */}
  //           {suggestions.length > 0 && (
  //             <ul className="absolute top-full left-0 right-0 bg-white text-black shadow rounded z-50">
  //               {suggestions.slice(0, 5).map((s) => (
  //                 <li
  //                   key={s.id}
  //                   className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
  //                   onClick={() => {
  //                     navigate(`/articles/${s.id}`);
  //                     setSearch("");
  //                     setSuggestions([]);
  //                   }}
  //                 >
  //                   {language === "en" ? s.title_en : s.title_te}
  //                 </li>
  //               ))}
  //             </ul>
  //           )}
  //         </form>

  //         {/* Right side */}
  // <div className="hidden md:flex items-center space-x-4">
  //   {categories.map((c) => (
  //     <Link key={c.id} to={`/category/${c.id}`} className="hover:text-yellow-300">
  //       {language === "te" ? c.name_te || c.name : c.name}
  //     </Link>
  //   ))}

  //   {/* Translator */}
  //   <div id="google_translate_element"></div>

  //   {/* Subscribe */}
  //   <button className="bg-yellow-400 text-black px-3 py-1 rounded font-medium hover:bg-yellow-300">
  //     {language === "te" ? "చందా" : "Subscribe"}
  //   </button>
  // </div>


  //         {/* Mobile hamburger */}
  //         <div className="md:hidden">
  //           <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
  //             {menuOpen ? <FaTimes /> : <FaBars />}
  //           </button>
  //         </div>
  //       </div>

  //       {/* Mobile menu */}
  //       {menuOpen && (
  //         <div className="md:hidden bg-blue-800 px-4 py-3 space-y-4">
  //           {/* Search */}
  //           <form onSubmit={handleSearch} className="flex items-center bg-white rounded overflow-hidden">
  //             <input
  //               type="text"
  //               value={search}
  //               onChange={handleInputChange}
  //               placeholder={language === "te" ? "శోధన..." : "Search..."}
  //               className="px-2 py-1 text-black w-full outline-none"
  //             />
  //             <button type="submit" className="px-2 bg-yellow-400 text-black">
  //               <FaSearch />
  //             </button>
  //           </form>

  //           {/* Categories */}
  //           <ul className="space-y-2">
  //             {categories.map((c) => (
  //               <li key={c.id}>
  //                 <Link
  //                   to={`/category/${c.id}`}
  //                   onClick={() => setMenuOpen(false)}
  //                   className="block px-2 py-1 rounded hover:bg-blue-700"
  //                 >
  //                   {language === "te" ? c.name_te || c.name : c.name}
  //                 </Link>
  //               </li>
  //             ))}
  //           </ul>

  //           {/* Translator & Subscribe */}
  //           <div id="google_translate_element" className="translate-dropdown"></div>
  //           <button className="w-full bg-yellow-400 text-black px-3 py-2 rounded font-medium hover:bg-yellow-300">
  //             {language === "te" ? "చందా" : "Subscribe"}
  //           </button>
  //         </div>
  //       )}
  //     </header>
  //   );
  // }

//   import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
// import { supabase } from "../lib/supabaseClient";

// export default function Header({ categories = [], articles = [] }) {
//   const { language } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [session, setSession] = useState(null);
//   const [search, setSearch] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getSession() {
//       const { data } = await supabase.auth.getSession();
//       setSession(data?.session ?? null);
//     }
//     getSession();
//     const { data: listener } = supabase.auth.onAuthStateChange((_e, s) =>
//       setSession(s ?? null)
//     );
//     return () => listener.subscription.unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setSession(null);
//     navigate("/");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!search.trim()) return;
//     const lower = search.toLowerCase();
//     const found = articles.find((a) =>
//       (language === "en" ? a.title_en : a.title_te)
//         ?.toLowerCase()
//         .includes(lower)
//     );
//     if (found) {
//       navigate(`/articles/${found.id}`);
//       setSearch("");
//       setSuggestions([]);
//       setMenuOpen(false);
//     } else {
//       alert(language === "te" ? "ఫలితాలు లేవు" : "No results found");
//     }
//   };

//   const handleInputChange = (e) => {
//     const val = e.target.value;
//     setSearch(val);
//     if (val.length > 1) {
//       const lower = val.toLowerCase();
//       setSuggestions(
//         articles.filter((a) =>
//           (language === "en" ? a.title_en : a.title_te)
//             ?.toLowerCase()
//             .includes(lower)
//         )
//       );
//     } else {
//       setSuggestions([]);
//     }
//   };

//   return (
//     <header className="bg-blue-900 text-white shadow-md relative">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
//         <Link to="/" className="flex items-center gap-2 text-xl font-bold">
//           📰 <span>My News Site</span>
//         </Link>

//         {/* Search bar center */}
//         <form
//           onSubmit={handleSearch}
//           className="hidden md:flex items-center bg-white rounded overflow-hidden w-1/3 relative"
//         >
//           <input
//             type="text"
//             value={search}
//             onChange={handleInputChange}
//             placeholder={language === "te" ? "వార్తలు శోధించండి..." : "Search articles..."}
//             className="px-2 py-1 text-black w-full outline-none"
//           />
//           <button type="submit" className="px-2 bg-yellow-400 text-black">
//             <FaSearch />
//           </button>
//           {suggestions.length > 0 && (
//             <ul className="absolute top-full left-0 right-0 bg-white text-black shadow rounded z-50">
//               {suggestions.slice(0, 5).map((s) => (
//                 <li
//                   key={s.id}
//                   className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => {
//                     navigate(`/articles/${s.id}`);
//                     setSearch("");
//                     setSuggestions([]);
//                   }}
//                 >
//                   {language === "en" ? s.title_en : s.title_te}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </form>

//         <div className="hidden md:flex items-center space-x-4">
//           {categories.map((c) => (
//             <Link key={c.id} to={`/category/${c.id}`} className="hover:text-yellow-300">
//               {language === "te" ? c.name_te || c.name : c.name}
//             </Link>
//           ))}
//           <div id="google_translate_element" className="text-black"></div>
//           <button className="bg-yellow-400 text-black px-3 py-1 rounded font-medium hover:bg-yellow-300">
//             {language === "te" ? "చందా" : "Subscribe"}
//           </button>
//         </div>

//         <div className="md:hidden">
//           <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>

//       {menuOpen && (
//         <div className="md:hidden bg-blue-800 px-4 py-3 space-y-4">
//           <form onSubmit={handleSearch} className="flex items-center bg-white rounded overflow-hidden">
//             <input
//               type="text"
//               value={search}
//               onChange={handleInputChange}
//               placeholder="Search..."
//               className="px-2 py-1 text-black w-full outline-none"
//             />
//             <button type="submit" className="px-2 bg-yellow-400 text-black">
//               <FaSearch />
//             </button>
//           </form>
//           <ul className="space-y-2">
//             {categories.map((c) => (
//               <li key={c.id}>
//                 <Link
//                   to={`/category/${c.id}`}
//                   onClick={() => setMenuOpen(false)}
//                   className="block px-2 py-1 rounded hover:bg-blue-700"
//                 >
//                   {language === "te" ? c.name_te || c.name : c.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//           <div id="google_translate_element" className="text-black"></div>
//           <button className="w-full bg-yellow-400 text-black px-3 py-2 rounded font-medium hover:bg-yellow-300">
//             {language === "te" ? "చందా" : "Subscribe"}
//           </button>
//         </div>
//       )}
//     </header>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
// import { supabase } from "../lib/supabaseClient";

// export default function Header({ categories = [], articles = [] }) {
//   const { language } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [session, setSession] = useState(null);
//   const [search, setSearch] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getSession() {
//       const { data } = await supabase.auth.getSession();
//       setSession(data?.session ?? null);
//     }
//     getSession();
//     const { data: listener } = supabase.auth.onAuthStateChange((_e, s) =>
//       setSession(s ?? null)
//     );
//     return () => listener.subscription.unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setSession(null);
//     navigate("/");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!search.trim()) return;
//     const lower = search.toLowerCase();
//     const found = articles.find((a) =>
//       (language === "en" ? a.title_en : a.title_te)
//         ?.toLowerCase()
//         .includes(lower)
//     );
//     if (found) {
//       navigate(`/articles/${found.id}`);
//       setSearch("");
//       setSuggestions([]);
//       setMenuOpen(false);
//     } else {
//       alert(language === "te" ? "ఫలితాలు లేవు" : "No results found");
//     }
//   };

//   const handleInputChange = (e) => {
//     const val = e.target.value;
//     setSearch(val);
//     if (val.length > 1) {
//       const lower = val.toLowerCase();
//       setSuggestions(
//         articles.filter((a) =>
//           (language === "en" ? a.title_en : a.title_te)
//             ?.toLowerCase()
//             .includes(lower)
//         )
//       );
//     } else {
//       setSuggestions([]);
//     }
//   };

//   return (
//     <header className="bg-blue-900 text-white shadow-md relative">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
//         <Link to="/" className="flex items-center gap-2 text-xl font-bold">
//           📰 <span>My News Site</span>
//         </Link>

//         {/* Search center */}
//         <form
//           onSubmit={handleSearch}
//           className="hidden md:flex items-center bg-white rounded overflow-hidden w-1/3 relative"
//         >
//           <input
//             type="text"
//             value={search}
//             onChange={handleInputChange}
//             placeholder={language === "te" ? "వార్తలు శోధించండి..." : "Search articles..."}
//             className="px-2 py-1 text-black w-full outline-none"
//           />
//           <button type="submit" className="px-2 bg-yellow-400 text-black">
//             <FaSearch />
//           </button>
//           {suggestions.length > 0 && (
//             <ul className="absolute top-full left-0 right-0 bg-white text-black shadow rounded z-50">
//               {suggestions.slice(0, 5).map((s) => (
//                 <li
//                   key={s.id}
//                   className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => {
//                     navigate(`/articles/${s.id}`);
//                     setSearch("");
//                     setSuggestions([]);
//                   }}
//                 >
//                   {language === "en" ? s.title_en : s.title_te}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </form>

//         {/* Right */}
//         <div className="hidden md:flex items-center space-x-4">
//           {categories.map((c) => (
//             <Link key={c.id} to={`/category/${c.id}`} className="hover:text-yellow-300">
//               {language === "te" ? c.name_te || c.name : c.name}
//             </Link>
//           ))}
//           <div id="google_translate_element" className="text-black text-sm"></div>
//           <button className="bg-yellow-400 text-black px-3 py-1 rounded font-medium hover:bg-yellow-300">
//             {language === "te" ? "చందా" : "Subscribe"}
//           </button>
//         </div>

//         <div className="md:hidden">
//           <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>

//       {menuOpen && (
//         <div className="md:hidden bg-blue-800 px-4 py-3 space-y-4">
//           <form onSubmit={handleSearch} className="flex items-center bg-white rounded overflow-hidden">
//             <input
//               type="text"
//               value={search}
//               onChange={handleInputChange}
//               placeholder="Search..."
//               className="px-2 py-1 text-black w-full outline-none"
//             />
//             <button type="submit" className="px-2 bg-yellow-400 text-black">
//               <FaSearch />
//             </button>
//           </form>
//           <ul className="space-y-2">
//             {categories.map((c) => (
//               <li key={c.id}>
//                 <Link
//                   to={`/category/${c.id}`}
//                   onClick={() => setMenuOpen(false)}
//                   className="block px-2 py-1 rounded hover:bg-blue-700"
//                 >
//                   {language === "te" ? c.name_te || c.name : c.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//           <div id="google_translate_element" className="text-black text-sm"></div>
//           <button className="w-full bg-yellow-400 text-black px-3 py-2 rounded font-medium hover:bg-yellow-300">
//             {language === "te" ? "చందా" : "Subscribe"}
//           </button>
//         </div>
//       )}
//     </header>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
// import { supabase } from "../lib/supabaseClient";

// export default function Header({ categories = [], articles = [], trending = [] }) {
//   const { language } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [session, setSession] = useState(null);
//   const [search, setSearch] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getSession() {
//       const { data } = await supabase.auth.getSession();
//       setSession(data?.session ?? null);
//     }
//     getSession();
//     const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => setSession(s ?? null));
//     return () => listener.subscription.unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setSession(null);
//     navigate("/");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!search.trim()) return;
//     const lower = search.toLowerCase();
//     const found = articles.find((a) =>
//       (language === "en" ? a.title_en : a.title_te)?.toLowerCase().includes(lower)
//     );
//     if (found) {
//       navigate(`/articles/${found.id}`);
//       setSearch("");
//       setSuggestions([]);
//       setMenuOpen(false);
//     } else {
//       alert(language === "te" ? "ఫలితాలు లేవు" : "No results found");
//     }
//   };

//   const handleInputChange = (e) => {
//     const val = e.target.value;
//     setSearch(val);
//     if (val.length > 1) {
//       const lower = val.toLowerCase();
//       setSuggestions(
//         (articles || []).filter((a) =>
//           (language === "en" ? a.title_en : a.title_te)?.toLowerCase().includes(lower)
//         )
//       );
//     } else {
//       setSuggestions([]);
//     }
//   };

//   return (
//     <header className="bg-blue-900 text-white shadow-md relative">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
//         <Link to="/" className="flex items-center gap-2 text-xl font-bold">
//           📰 <span>My News Site</span>
//         </Link>

//         {/* Search center */}
//         <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white rounded overflow-hidden w-1/3 relative">
//           <input
//             type="text"
//             value={search}
//             onChange={handleInputChange}
//             placeholder={language === "te" ? "వార్తలు శోధించండి..." : "Search articles..."}
//             className="px-2 py-1 text-black w-full outline-none"
//           />
//           <button type="submit" className="px-2 bg-yellow-400 text-black"><FaSearch /></button>

//           {suggestions.length > 0 && (
//             <ul className="absolute top-full left-0 right-0 bg-white text-black shadow rounded z-50 max-h-56 overflow-auto">
//               {suggestions.slice(0, 8).map((s) => (
//                 <li key={s.id} className="px-3 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate(`/articles/${s.id}`); setSearch(""); setSuggestions([]); }}>
//                   {language === "en" ? s.title_en : s.title_te}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </form>

//         <div className="hidden md:flex items-center space-x-4">
//           {categories.map((c) => (
//             <Link key={c.id} to={`/category/${c.id}`} className="hover:text-yellow-300">
//               {language === "te" ? c.name_te || c.name : c.name}
//             </Link>
//           ))}
//           <div id="google_translate_element" className="text-black text-sm"></div>
//           <button className="bg-yellow-400 text-black px-3 py-1 rounded font-medium hover:bg-yellow-300">
//             {language === "te" ? "చందా" : "Subscribe"}
//           </button>
//         </div>

//         <div className="md:hidden">
//           <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">{menuOpen ? <FaTimes /> : <FaBars />}</button>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-blue-800 px-4 py-3 space-y-4">
//           <form onSubmit={handleSearch} className="flex items-center bg-white rounded overflow-hidden">
//             <input type="text" value={search} onChange={handleInputChange} placeholder={language === "te" ? "శోధన..." : "Search..."} className="px-2 py-1 text-black w-full outline-none" />
//             <button type="submit" className="px-2 bg-yellow-400 text-black"><FaSearch /></button>
//           </form>

//           <ul className="space-y-2">
//             {categories.map((c) => (
//               <li key={c.id}>
//                 <Link to={`/category/${c.id}`} onClick={() => setMenuOpen(false)} className="block px-2 py-1 rounded hover:bg-blue-700">
//                   {language === "te" ? c.name_te || c.name : c.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           {/* show trending & popular on mobile */}
//           <div className="bg-white text-black p-3 rounded">
//             <div className="font-semibold mb-2">{language === "te" ? "ట్రెండింగ్" : "Trending"}</div>
//             <ul className="text-sm space-y-1">
//               {(trending || []).slice(0,5).map(t => (
//                 <li key={t.id}><Link to={`/articles/${t.id}`} onClick={() => setMenuOpen(false)} className="hover:text-red-600 block">{language === "en" ? t.title_en : t.title_te}</Link></li>
//               ))}
//             </ul>
//           </div>

//           <div id="google_translate_element" className="text-black text-sm"></div>
//           <button className="w-full bg-yellow-400 text-black px-3 py-2 rounded font-medium hover:bg-yellow-300">{language === "te" ? "చందా" : "Subscribe"}</button>
//         </div>
//       )}
//     </header>
//   );
// }


// src/components/Header.jsx
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
// import { supabase } from "../lib/supabaseClient";

// export default function Header({ categories = [], articles = [] }) {
//   const { language } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [session, setSession] = useState(null);
//   const [search, setSearch] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getSession() {
//       const { data } = await supabase.auth.getSession();
//       setSession(data?.session ?? null);
//     }
//     getSession();
//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session ?? null);
//     });
//     return () => listener.subscription.unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setSession(null);
//     navigate("/");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!search.trim()) return;
//     const lower = search.toLowerCase();
//     const found = articles.find((a) =>
//       (language === "en" ? a.title_en : a.title_te)?.toLowerCase().includes(lower)
//     );
//     if (found) {
//       navigate(`/articles/${found.id}`);
//       setSearch("");
//       setSuggestions([]);
//       setMenuOpen(false);
//     } else {
//       alert(language === "te" ? "ఫలితాలు లేవు" : "No results found");
//     }
//   };

//   const handleInputChange = (e) => {
//     const val = e.target.value;
//     setSearch(val);
//     if (val.length > 1) {
//       const lower = val.toLowerCase();
//       setSuggestions(
//         articles.filter((a) =>
//           (language === "en" ? a.title_en : a.title_te)?.toLowerCase().includes(lower)
//         )
//       );
//     } else {
//       setSuggestions([]);
//     }
//   };

//   return (
//     <header className="bg-blue-900 text-white shadow-md relative">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         {/* Logo / Home */}
//         <Link
//           to="/"
//           className="flex items-center gap-2 text-xl font-bold hover:text-yellow-300"
//         >
//           📰 <span>My News Site</span>
//         </Link>

//         {/* Search center */}
//         <form
//           onSubmit={handleSearch}
//           className="hidden md:flex items-center bg-white rounded overflow-hidden w-1/3 relative"
//         >
//           <input
//             type="text"
//             value={search}
//             onChange={handleInputChange}
//             placeholder={language === "te" ? "వార్తలు శోధించండి..." : "Search articles..."}
//             className="px-2 py-1 text-black w-full outline-none"
//           />
//           <button type="submit" className="px-2 bg-yellow-400 text-black">
//             <FaSearch />
//           </button>

//           {/* Suggestions */}
//           {suggestions.length > 0 && (
//             <ul className="absolute top-full left-0 right-0 bg-white text-black shadow rounded z-50">
//               {suggestions.slice(0, 5).map((s) => (
//                 <li
//                   key={s.id}
//                   className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => {
//                     navigate(`/articles/${s.id}`);
//                     setSearch("");
//                     setSuggestions([]);
//                   }}
//                 >
//                   {language === "en" ? s.title_en : s.title_te}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </form>

//         {/* Right side desktop */}
//         <div className="hidden md:flex items-center space-x-4">
//           {categories.map((c) => (
//             <Link key={c.id} to={`/category/${c.id}`} className="hover:text-yellow-300">
//               {language === "te" ? c.name_te || c.name : c.name}
//             </Link>
//           ))}

//           {/* Translator */}
//           <div id="google_translate_element" className="google-translate h-8 overflow-hidden"></div>

//           {/* Subscribe */}
//           <button className="bg-yellow-400 text-black px-3 py-1 rounded font-medium hover:bg-yellow-300">
//             {language === "te" ? "చందా" : "Subscribe"}
//           </button>

//           {session && (
//             <>
//               <Link to="/admin" className="hover:text-yellow-300">Admin</Link>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-white text-sm"
//               >
//                 {language === "te" ? "లాగ్ అవుట్" : "Logout"}
//               </button>
//             </>
//           )}
//         </div>

//         {/* Mobile hamburger */}
//         <div className="md:hidden flex items-center gap-2">
//           <span className="text-sm font-bold">My News Site</span>
//           <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile dropdown */}
//       {menuOpen && (
//         <div className="md:hidden bg-blue-800 px-4 py-3 space-y-4">
//           {/* Search */}
//           <form onSubmit={handleSearch} className="flex items-center bg-white rounded overflow-hidden relative">
//             <input
//               type="text"
//               value={search}
//               onChange={handleInputChange}
//               placeholder={language === "te" ? "శోధన..." : "Search..."}
//               className="px-2 py-1 text-black w-full outline-none"
//             />
//             <button type="submit" className="px-2 bg-yellow-400 text-black">
//               <FaSearch />
//             </button>
//             {suggestions.length > 0 && (
//               <ul className="absolute top-full left-0 right-0 bg-white text-black shadow rounded z-50">
//                 {suggestions.slice(0, 5).map((s) => (
//                   <li
//                     key={s.id}
//                     className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => {
//                       navigate(`/articles/${s.id}`);
//                       setSearch("");
//                       setSuggestions([]);
//                       setMenuOpen(false);
//                     }}
//                   >
//                     {language === "en" ? s.title_en : s.title_te}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </form>

//           {/* Categories */}
//           <ul className="space-y-2">
//             {categories.map((c) => (
//               <li key={c.id}>
//                 <Link
//                   to={`/category/${c.id}`}
//                   onClick={() => setMenuOpen(false)}
//                   className="block px-2 py-1 rounded hover:bg-blue-700"
//                 >
//                   {language === "te" ? c.name_te || c.name : c.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           {/* Translator + Subscribe */}
//           <div id="google_translate_element" className="google-translate h-8 overflow-hidden"></div>
//           <button className="w-full bg-yellow-400 text-black px-3 py-2 rounded font-medium hover:bg-yellow-300">
//             {language === "te" ? "చందా" : "Subscribe"}
//           </button>
//         </div>
//       )}
//     </header>
//   );
// }

// // src/components/Header.jsx
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
// import { supabase } from "../lib/supabaseClient";

// export default function Header({ categories = [], articles = [] }) {
//   const { language, setLanguage } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [session, setSession] = useState(null);
//   const [search, setSearch] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getSession() {
//       const { data } = await supabase.auth.getSession();
//       setSession(data?.session ?? null);
//     }
//     getSession();
//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session ?? null);
//     });
//     return () => listener.subscription.unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setSession(null);
//     navigate("/");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!search.trim()) return;
//     const lower = search.toLowerCase();
//     const found = articles.find((a) =>
//       (language === "en" ? a.title_en : a.title_te)?.toLowerCase().includes(lower)
//     );
//     if (found) {
//       navigate(`/articles/${found.id}`);
//       setSearch("");
//       setSuggestions([]);
//       setMenuOpen(false);
//     } else {
//       alert(language === "te" ? "ఫలితాలు లేవు" : "No results found");
//     }
//   };

//   const handleInputChange = (e) => {
//     const val = e.target.value;
//     setSearch(val);
//     if (val.length > 1) {
//       const lower = val.toLowerCase();
//       setSuggestions(
//         articles.filter((a) =>
//           (language === "en" ? a.title_en : a.title_te)?.toLowerCase().includes(lower)
//         )
//       );
//     } else {
//       setSuggestions([]);
//     }
//   };

//   return (
//     <header className="bg-blue-900 text-white shadow-md relative">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
        
//         {/* LEFT: Hamburger + Search */}
//         <div className="flex items-center gap-4 flex-1">
//           {/* Hamburger always visible */}
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="text-2xl focus:outline-none"
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>

//           {/* Search */}
//           <form
//             onSubmit={handleSearch}
//             className="flex items-center bg-white rounded overflow-hidden w-full max-w-xs relative"
//           >
//             <input
//               type="text"
//               value={search}
//               onChange={handleInputChange}
//               placeholder={language === "te" ? "వార్తలు శోధించండి..." : "Search articles..."}
//               className="px-2 py-1 text-black w-full outline-none"
//             />
//             <button type="submit" className="px-2 bg-yellow-400 text-black">
//               <FaSearch />
//             </button>
//             {suggestions.length > 0 && (
//               <ul className="absolute top-full left-0 right-0 bg-white text-black shadow rounded z-50">
//                 {suggestions.slice(0, 5).map((s) => (
//                   <li
//                     key={s.id}
//                     className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => {
//                       navigate(`/articles/${s.id}`);
//                       setSearch("");
//                       setSuggestions([]);
//                     }}
//                   >
//                     {language === "en" ? s.title_en : s.title_te}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </form>
//         </div>

//         {/* CENTER: Logo */}
//         <Link
//           to="/"
//           className="flex-1 text-center text-xl font-bold hover:text-yellow-300"
//         >
//           📰 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}
//         </Link>

//         {/* RIGHT: Language + Subscribe + Admin */}
//         <div className="flex items-center gap-3 flex-1 justify-end">
//           {/* Language dropdown */}
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-black px-2 py-1 rounded"
//           >
//             <option value="en">English</option>
//             <option value="te">తెలుగు</option>
//           </select>

//           {/* Subscribe */}
//           <button className="bg-yellow-400 text-black px-3 py-1 rounded font-medium hover:bg-yellow-300">
//             {language === "te" ? "చందా" : "Subscribe"}
//           </button>

//           {/* Admin session */}
//           {session && (
//             <>
//               <Link to="/admin" className="hover:text-yellow-300">Admin</Link>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-white text-sm"
//               >
//                 {language === "te" ? "లాగ్ అవుట్" : "Logout"}
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Dropdown Categories Menu */}
//       {menuOpen && (
//         <div className="bg-blue-800 px-4 py-3 space-y-2">
//           {categories.map((c) => (
//             <Link
//               key={c.id}
//               to={`/category/${c.id}`}
//               onClick={() => setMenuOpen(false)}
//               className="block px-2 py-1 rounded hover:bg-blue-700"
//             >
//               {language === "te" ? c.name_te || c.name : c.name}
//             </Link>
//           ))}
//         </div>
//       )}
//     </header>
//   );
// }

// // src/components/Header.jsx
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
// import { supabase } from "../lib/supabaseClient";

// export default function Header({ categories = [], articles = [] }) {
//   const { language, setLanguage } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [session, setSession] = useState(null);
//   const [search, setSearch] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSearch, setShowSearch] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getSession() {
//       const { data } = await supabase.auth.getSession();
//       setSession(data?.session ?? null);
//     }
//     getSession();
//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session ?? null);
//     });
//     return () => listener.subscription.unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setSession(null);
//     navigate("/");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!search.trim()) return;
//     const lower = search.toLowerCase();
//     const found = articles.find((a) =>
//       (language === "en" ? a.title_en : a.title_te)?.toLowerCase().includes(lower)
//     );
//     if (found) {
//       navigate(`/articles/${found.id}`);
//       setSearch("");
//       setSuggestions([]);
//       setShowSearch(false);
//     } else {
//       alert(language === "te" ? "ఫలితాలు లేవు" : "No results found");
//     }
//   };

//   const handleInputChange = (e) => {
//     const val = e.target.value;
//     setSearch(val);
//     if (val.length > 1) {
//       const lower = val.toLowerCase();
//       setSuggestions(
//         articles.filter((a) =>
//           (language === "en" ? a.title_en : a.title_te)?.toLowerCase().includes(lower)
//         )
//       );
//     } else {
//       setSuggestions([]);
//     }
//   };

//   return (
//     <header className="bg-blue-900 text-white shadow-md relative">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
        
//         {/* LEFT: Hamburger */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="text-2xl focus:outline-none"
//         >
//           {menuOpen ? <FaTimes /> : <FaBars />}
//         </button>

//         {/* CENTER: Logo */}
//         <Link
//           to="/"
//           className="flex-1 text-center text-xl font-bold hover:text-yellow-300"
//         >
//           📰 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}
//         </Link>

//         {/* RIGHT: Search icon + Language + Subscribe */}
//         <div className="flex items-center gap-3">
//           {/* Search icon */}
//           <button
//             onClick={() => setShowSearch(!showSearch)}
//             className="text-xl hover:text-yellow-300"
//             aria-label="Search"
//           >
//             <FaSearch />
//           </button>

//           {/* Language dropdown */}
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-black px-2 py-1 rounded"
//           >
//             <option value="en">English</option>
//             <option value="te">తెలుగు</option>
//           </select>

//           {/* Subscribe */}
//           <button className="bg-yellow-400 text-black px-3 py-1 rounded font-medium hover:bg-yellow-300">
//             {language === "te" ? "చందా" : "Subscribe"}
//           </button>
//         </div>
//       </div>

//       {/* Dropdown Categories Menu */}
//       {menuOpen && (
//         <div className="bg-blue-800 px-4 py-3 space-y-2">
//           {categories.map((c) => (
//             <Link
//               key={c.id}
//               to={`/category/${c.id}`}
//               onClick={() => setMenuOpen(false)}
//               className="block px-2 py-1 rounded hover:bg-blue-700"
//             >
//               {language === "te" ? c.name_te || c.name : c.name}
//             </Link>
//           ))}
//         </div>
//       )}

//       {/* Search bar dropdown */}
//       {showSearch && (
//         <div className="absolute top-full left-0 right-0 bg-white text-black shadow p-3 z-50">
//           <form onSubmit={handleSearch} className="flex items-center gap-2 relative">
//             <input
//               type="text"
//               value={search}
//               onChange={handleInputChange}
//               placeholder={language === "te" ? "శోధన..." : "Search articles..."}
//               className="flex-1 px-2 py-1 border rounded outline-none"
//             />
//             <button type="submit" className="px-3 py-1 bg-blue-900 text-white rounded">
//               <FaSearch />
//             </button>

//             {suggestions.length > 0 && (
//               <ul className="absolute top-full left-0 right-0 bg-white border rounded mt-1 z-50">
//                 {suggestions.slice(0, 5).map((s) => (
//                   <li
//                     key={s.id}
//                     className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => {
//                       navigate(`/articles/${s.id}`);
//                       setSearch("");
//                       setSuggestions([]);
//                       setShowSearch(false);
//                     }}
//                   >
//                     {language === "en" ? s.title_en : s.title_te}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </form>
//         </div>
//       )}
//     </header>
//   );
// }


// // src/components/Header.jsx
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
// import { supabase } from "../lib/supabaseClient";

// export default function Header({ categories = [], articles = [] }) {
//   const { language, setLanguage } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [session, setSession] = useState(null);
//   const [search, setSearch] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getSession() {
//       const { data } = await supabase.auth.getSession();
//       setSession(data?.session ?? null);
//     }
//     getSession();
//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session ?? null);
//     });
//     return () => listener.subscription.unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setSession(null);
//     navigate("/");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!search.trim()) return;
//     const lower = search.toLowerCase();
//     const found = articles.find((a) =>
//       (language === "en" ? a.title_en : a.title_te)?.toLowerCase().includes(lower)
//     );
//     if (found) {
//       navigate(`/articles/${found.id}`);
//       setSearch("");
//       setSuggestions([]);
//       setShowModal(false);
//     } else {
//       alert(language === "te" ? "ఫలితాలు లేవు" : "No results found");
//     }
//   };

//   const handleInputChange = (e) => {
//     const val = e.target.value;
//     setSearch(val);
//     if (val.length > 1) {
//       const lower = val.toLowerCase();
//       setSuggestions(
//         articles.filter((a) =>
//           (language === "en" ? a.title_en : a.title_te)?.toLowerCase().includes(lower)
//         )
//       );
//     } else {
//       setSuggestions([]);
//     }
//   };

//   return (
//     <header className="bg-blue-900 text-white shadow-md relative">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
        
//         {/* LEFT: Hamburger */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="text-2xl focus:outline-none"
//         >
//           {menuOpen ? <FaTimes /> : <FaBars />}
//         </button>

//         {/* CENTER: Logo */}
//         <Link
//           to="/"
//           className="flex-1 text-center text-xl font-bold hover:text-yellow-300"
//         >
//           📰 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}
//         </Link>

//         {/* RIGHT: Search icon + Language + Subscribe */}
//         <div className="flex items-center gap-3">
//           {/* Search icon */}
//           <button
//             onClick={() => setShowModal(true)}
//             className="text-xl hover:text-yellow-300"
//             aria-label="Search"
//           >
//             <FaSearch />
//           </button>

//           {/* Language dropdown */}
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-black px-2 py-1 rounded"
//           >
//             <option value="en">English</option>
//             <option value="te">తెలుగు</option>
//           </select>

//           {/* Subscribe */}
//           <button className="bg-yellow-400 text-black px-3 py-1 rounded font-medium hover:bg-yellow-300">
//             {language === "te" ? "చందా" : "Subscribe"}
//           </button>
//         </div>
//       </div>

//       {/* Dropdown Categories Menu */}
//       {menuOpen && (
//         <div className="bg-blue-800 px-4 py-3 space-y-2">
//           {categories.map((c) => (
//             <Link
//               key={c.id}
//               to={`/category/${c.id}`}
//               onClick={() => setMenuOpen(false)}
//               className="block px-2 py-1 rounded hover:bg-blue-700"
//             >
//               {language === "te" ? c.name_te || c.name : c.name}
//             </Link>
//           ))}
//         </div>
//       )}

//       {/* 🔍 Modal Search */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
//             {/* Close button */}
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-black"
//             >
//               <FaTimes size={20} />
//             </button>

//             <form onSubmit={handleSearch} className="flex items-center gap-2 relative">
//               <input
//                 type="text"
//                 value={search}
//                 onChange={handleInputChange}
//                 placeholder={language === "te" ? "శోధన..." : "Search articles..."}
//                 className="flex-1 px-3 py-2 border rounded outline-none"
//                 autoFocus
//               />
//               <button type="submit" className="px-3 py-2 bg-blue-900 text-white rounded">
//                 <FaSearch />
//               </button>
//             </form>

//             {/* Suggestions dropdown */}
//             {suggestions.length > 0 && (
//               <ul className="mt-3 bg-white border rounded shadow max-h-48 overflow-y-auto">
//                 {suggestions.slice(0, 5).map((s) => (
//                   <li
//                     key={s.id}
//                     className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => {
//                       navigate(`/articles/${s.id}`);
//                       setSearch("");
//                       setSuggestions([]);
//                       setShowModal(false);
//                     }}
//                   >
//                     {language === "en" ? s.title_en : s.title_te}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// // src/components/Header.jsx
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
// import { supabase } from "../lib/supabaseClient";

// export default function Header({ categories = [], articles = [] }) {
//   const { language, setLanguage } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [session, setSession] = useState(null);
//   const [search, setSearch] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getSession() {
//       const { data } = await supabase.auth.getSession();
//       setSession(data?.session ?? null);
//     }
//     getSession();
//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session ?? null);
//     });
//     return () => listener.subscription.unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setSession(null);
//     navigate("/");
//   };

//   const handleInputChange = (e) => {
//     const val = e.target.value;
//     setSearch(val);

//     if (val.length > 1) {
//       const lower = val.toLowerCase();
//       const results = articles.filter((a) =>
//         (language === "en" ? a.title_en : a.title_te)?.toLowerCase().includes(lower)
//       );
//       setSuggestions(results);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleSelectArticle = (id) => {
//     navigate(`/articles/${id}`);
//     setSearch("");
//     setSuggestions([]);
//     setShowModal(false);
//   };

//   return (
//     <header className="bg-blue-900 text-white shadow-md relative z-40">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
//         {/* LEFT: Hamburger */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="text-2xl focus:outline-none"
//         >
//           {menuOpen ? <FaTimes /> : <FaBars />}
//         </button>

//         {/* CENTER: Logo */}
//         <Link
//           to="/"
//           className="flex-1 text-center text-xl font-bold hover:text-yellow-300"
//         >
//           📰 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}
//         </Link>

//         {/* RIGHT: Search + Language + Subscribe */}
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setShowModal(true)}
//             className="text-xl hover:text-yellow-300"
//             aria-label="Search"
//           >
//             <FaSearch />
//           </button>

//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-black px-2 py-1 rounded"
//           >
//             <option value="en">English</option>
//             <option value="te">తెలుగు</option>
//           </select>

//           <button className="bg-yellow-400 text-black px-3 py-1 rounded font-medium hover:bg-yellow-300">
//             {language === "te" ? "చందా" : "Subscribe"}
//           </button>
//         </div>
//       </div>

//       {/* Dropdown Categories */}
//       {menuOpen && (
//         <div className="bg-blue-800 px-4 py-3 space-y-2">
//           {categories.map((c) => (
//             <Link
//               key={c.id}
//               to={`/category/${c.id}`}
//               onClick={() => setMenuOpen(false)}
//               className="block px-2 py-1 rounded hover:bg-blue-700"
//             >
//               {language === "te" ? c.name_te || c.name : c.name}
//             </Link>
//           ))}
//         </div>
//       )}

//       {/* 🔍 Modal Search */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-lg relative z-60">
//             {/* Close button */}
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-black"
//             >
//               <FaTimes size={20} />
//             </button>

//             <input
//               type="text"
//               value={search}
//               onChange={handleInputChange}
//               placeholder={language === "te" ? "శోధన..." : "Search articles..."}
//               className="w-full px-3 py-2 border rounded outline-none"
//               autoFocus
//             />

//             {/* Suggestions */}
//             <div className="mt-3">
//               {suggestions.length > 0 ? (
//                 <ul className="bg-white border rounded shadow max-h-48 overflow-y-auto">
//                   {suggestions.slice(0, 6).map((s) => (
//                     <li
//                       key={s.id}
//                       className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
//                       onClick={() => handleSelectArticle(s.id)}
//                     >
//                       {language === "en" ? s.title_en : s.title_te}
//                     </li>
//                   ))}
//                 </ul>
//               ) : search.length > 1 ? (
//                 <div className="px-3 py-2 text-gray-500">
//                   {language === "te" ? "ఫలితాలు లేవు" : "No results found"}
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// // src/components/Header.jsx
// import React, { useState, useEffect, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
// import { supabase } from "../lib/supabaseClient";

// export default function Header({ categories = [], articles = [] }) {
//   const { language, setLanguage } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [session, setSession] = useState(null);

//   // Search state
//   const [search, setSearch] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const navigate = useNavigate();

//   // Session handling
//   useEffect(() => {
//     async function getSession() {
//       const { data } = await supabase.auth.getSession();
//       setSession(data?.session ?? null);
//     }
//     getSession();
//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session ?? null);
//     });
//     return () => listener.subscription.unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setSession(null);
//     navigate("/");
//   };

//   // Debounced search suggestions
//   const updateSuggestions = useCallback(
//     (val) => {
//       if (val.length > 1) {
//         const lower = val.toLowerCase();
//         const results = articles.filter((a) =>
//           (language === "en" ? a.title_en : a.title_te)?.toLowerCase().includes(lower)
//         );
//         setSuggestions(results);
//       } else {
//         setSuggestions([]);
//       }
//     },
//     [articles, language]
//   );

//   useEffect(() => {
//     const id = setTimeout(() => updateSuggestions(search), 300);
//     return () => clearTimeout(id);
//   }, [search, updateSuggestions]);

//   const handleSelectArticle = (id) => {
//     navigate(`/articles/${id}`);
//     setSearch("");
//     setSuggestions([]);
//     setShowModal(false);
//   };

//   return (
//     <header className="bg-blue-900 text-white shadow-md relative z-40">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
//         {/* LEFT: Hamburger */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="text-2xl focus:outline-none"
//         >
//           {menuOpen ? <FaTimes /> : <FaBars />}
//         </button>

//         {/* CENTER: Logo */}
//         <Link
//           to="/"
//           className="flex-1 text-center text-xl font-bold hover:text-yellow-300"
//         >
//           📰 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}
//         </Link>

//         {/* RIGHT: Search + Language + Subscribe */}
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setShowModal(true)}
//             className="text-xl hover:text-yellow-300"
//             aria-label="Search"
//           >
//             <FaSearch />
//           </button>

//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-black px-2 py-1 rounded"
//           >
//             <option value="en">English</option>
//             <option value="te">తెలుగు</option>
//           </select>

//           <button className="bg-yellow-400 text-black px-3 py-1 rounded font-medium hover:bg-yellow-300">
//             {language === "te" ? "చందా" : "Subscribe"}
//           </button>
//         </div>
//       </div>

//       {/* Dropdown Categories */}
//       {menuOpen && (
//         <div className="bg-blue-800 px-4 py-3 space-y-2">
//           {categories.map((c) => (
//             <Link
//               key={c.id}
//               to={`/category/${c.id}`}
//               onClick={() => setMenuOpen(false)}
//               className="block px-2 py-1 rounded hover:bg-blue-700"
//             >
//               {language === "te" ? c.name_te || c.name : c.name}
//             </Link>
//           ))}
//         </div>
//       )}

//       {/* 🔍 Modal Search */}
//       {showModal && (
//         <div
//           className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
//           onClick={() => setShowModal(false)} // close when clicking overlay
//         >
//           <div
//             className="bg-white p-6 rounded-lg w-full max-w-lg relative z-60"
//             onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
//           >
//             {/* Close button */}
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-black"
//             >
//               <FaTimes size={20} />
//             </button>

//             {/* Input */}
//             <input
//   type="text"
//   value={search}
//   onChange={(e) => setSearch(e.target.value)}
//   placeholder={language === "te" ? "శోధన..." : "Search articles..."}
//   className="w-full px-3 py-2 border rounded outline-none text-black placeholder-gray-500 bg-white"
//   autoFocus
// />

//             {/* Suggestions */}
//             <div className="mt-3">
//               {suggestions.length > 0 ? (
//                 <ul className="bg-white border rounded shadow max-h-48 overflow-y-auto">
//                   {suggestions.slice(0, 6).map((s) => (
//                     <li
//                       key={s.id}
//                       className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
//                       onClick={() => handleSelectArticle(s.id)}
//                     >
//                       {language === "en" ? s.title_en : s.title_te}
//                     </li>
//                   ))}
//                 </ul>
//               ) : search.length > 1 ? (
//                 <div className="px-3 py-2 text-gray-500">
//                   {language === "te" ? "ఫలితాలు లేవు" : "No results found"}
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// // src/components/Header.jsx
// import React, { useState, useEffect, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
// import { supabase } from "../lib/supabaseClient";

// export default function Header({ categories = [], articles = [] }) {
//   const { language, setLanguage } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [session, setSession] = useState(null);

//   // Search state
//   const [search, setSearch] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const navigate = useNavigate();

//   // 🔑 Session handling
//   useEffect(() => {
//     async function getSession() {
//       const { data } = await supabase.auth.getSession();
//       setSession(data?.session ?? null);
//     }
//     getSession();
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setSession(session ?? null);
//       }
//     );
//     return () => listener.subscription.unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setSession(null);
//     navigate("/");
//   };

//   // 🔍 Debounced search suggestions
//   const updateSuggestions = useCallback(
//     (val) => {
//       if (val.length > 1) {
//         const lower = val.toLowerCase();
//         const results = articles.filter((a) =>
//           (language === "en" ? a.title_en : a.title_te)
//             ?.toLowerCase()
//             .includes(lower)
//         );
//         setSuggestions(results);
//       } else {
//         setSuggestions([]);
//       }
//     },
//     [articles, language]
//   );

//   useEffect(() => {
//     const id = setTimeout(() => updateSuggestions(search), 250);
//     return () => clearTimeout(id);
//   }, [search, updateSuggestions]);

//   const handleSelectArticle = (id) => {
//     navigate(`/articles/${id}`);
//     setSearch("");
//     setSuggestions([]);
//     setShowModal(false);
//   };

//   return (
//     <header className="bg-blue-900 text-white shadow-md relative z-40">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
//         {/* LEFT: Hamburger */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="text-2xl focus:outline-none"
//         >
//           {menuOpen ? <FaTimes /> : <FaBars />}
//         </button>

//         {/* CENTER: Logo */}
//         <Link
//           to="/"
//           className="flex-1 text-center text-xl font-bold hover:text-yellow-300"
//         >
//           📰 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}
//         </Link>

//         {/* RIGHT: Search + Language + Subscribe */}
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setShowModal(true)}
//             className="text-xl hover:text-yellow-300"
//             aria-label="Search"
//           >
//             <FaSearch />
//           </button>

//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-black px-2 py-1 rounded"
//           >
//             <option value="en">EN</option>
//             <option value="te">TE</option>
//           </select>

//           <button className="bg-yellow-400 text-black px-3 py-1 rounded font-medium hover:bg-yellow-300">
//             {language === "te" ? "చందా" : "Subscribe"}
//           </button>
//         </div>
//       </div>

//       {/* Dropdown Categories */}
//       {menuOpen && (
//         <div className="bg-blue-800 px-4 py-3 space-y-2">
//           {categories.map((c) => (
//             <Link
//               key={c.id}
//               to={`/category/${c.id}`}
//               onClick={() => setMenuOpen(false)}
//               className="block px-2 py-1 rounded hover:bg-blue-700"
//             >
//               {language === "te" ? c.name_te || c.name : c.name}
//             </Link>
//           ))}
//         </div>
//       )}

//       {/* 🔍 Modal Search */}
//       {showModal && (
//         <div
//           className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
//           onClick={() => setShowModal(false)} // close overlay
//         >
//           <div
//             className="bg-white p-6 rounded-lg w-full max-w-lg relative"
//             onClick={(e) => e.stopPropagation()} // stop close inside
//           >
//             {/* Close button */}
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-black"
//             >
//               <FaTimes size={20} />
//             </button>

//             {/* Input */}
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder={
//                 language === "te" ? "శోధన..." : "Search articles..."
//               }
//               className="w-full px-3 py-2 border rounded outline-none text-black placeholder-gray-500 bg-white"
//               autoFocus
//             />

//             {/* Suggestions */}
//             <div className="mt-3">
//               {suggestions.length > 0 ? (
//                 <ul className="bg-white border rounded shadow max-h-48 overflow-y-auto">
//                   {suggestions.slice(0, 6).map((s) => (
//                     <li
//                       key={s.id}
//                       className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-black"
//                       onClick={() => handleSelectArticle(s.id)}
//                     >
//                       {language === "en" ? s.title_en : s.title_te}
//                     </li>
//                   ))}
//                 </ul>
//               ) : search.length > 1 ? (
//                 <div className="px-3 py-2 text-gray-500">
//                   {language === "te" ? "ఫలితాలు లేవు" : "No results found"}
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// // src/components/Header.jsx
// import React, { useState, useEffect, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
// import { supabase } from "../lib/supabaseClient";

// export default function Header({ categories = [], articles = [] }) {
//   const { language, setLanguage } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [session, setSession] = useState(null);

//   // Search state
//   const [search, setSearch] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const navigate = useNavigate();

//   // 🔑 Session handling
//   useEffect(() => {
//     async function getSession() {
//       const { data } = await supabase.auth.getSession();
//       setSession(data?.session ?? null);
//     }
//     getSession();
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setSession(session ?? null);
//       }
//     );
//     return () => listener.subscription.unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setSession(null);
//     navigate("/");
//   };

//   // 🔍 Debounced search suggestions
//   const updateSuggestions = useCallback(
//     (val) => {
//       if (val.length > 1) {
//         const lower = val.toLowerCase();
//         const results = articles.filter((a) =>
//           (language === "en" ? a.title_en : a.title_te)
//             ?.toLowerCase()
//             .includes(lower)
//         );
//         setSuggestions(results);
//       } else {
//         setSuggestions([]);
//       }
//     },
//     [articles, language]
//   );

//   useEffect(() => {
//     const id = setTimeout(() => updateSuggestions(search), 250);
//     return () => clearTimeout(id);
//   }, [search, updateSuggestions]);

//   const handleSelectArticle = (id) => {
//     navigate(`/articles/${id}`);
//     setSearch("");
//     setSuggestions([]);
//     setShowModal(false);
//   };

//   return (
//     <header className="bg-blue-900 text-white shadow-md relative z-40">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
//         {/* LEFT: Hamburger */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="text-2xl focus:outline-none"
//         >
//           {menuOpen ? <FaTimes /> : <FaBars />}
//         </button>

//         {/* CENTER: Logo */}
//         <Link
//           to="/"
//           className="flex-1 text-center text-xl font-bold hover:text-yellow-300"
//         >
//           📰 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}
//         </Link>

//         {/* RIGHT: Search + Language + Subscribe */}
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setShowModal(true)}
//             className="text-xl hover:text-yellow-300"
//             aria-label="Search"
//           >
//             <FaSearch />
//           </button>

//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-black px-2 py-1 rounded"
//           >
//             <option value="en">EN</option>
//             <option value="te">TE</option>
//           </select>

//           <button className="bg-yellow-400 text-black px-3 py-1 rounded font-medium hover:bg-yellow-300">
//             {language === "te" ? "చందా" : "Subscribe"}
//           </button>
//         </div>
//       </div>

//       {/* ✅ Dropdown Categories (fixed styling) */}
//       {menuOpen && (
//         <div className="absolute left-0 w-full bg-white shadow-md border-t border-gray-200 z-50">
//           <h3 className="px-4 py-2 font-bold text-gray-700">
//             {language === "te" ? "వర్గాలు" : "Categories"}
//           </h3>
//           <ul className="divide-y divide-gray-200">
//             {categories.map((c) => (
//               <li key={c.id}>
//                 <Link
//                   to={`/category/${c.id}`}
//                   onClick={() => setMenuOpen(false)}
//                   className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-900"
//                 >
//                   {language === "te" ? c.name_te || c.name : c.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* 🔍 Modal Search */}
//       {showModal && (
//         <div
//           className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
//           onClick={() => setShowModal(false)} // close overlay
//         >
//           <div
//             className="bg-white p-6 rounded-lg w-full max-w-lg relative"
//             onClick={(e) => e.stopPropagation()} // stop close inside
//           >
//             {/* Close button */}
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-black"
//             >
//               <FaTimes size={20} />
//             </button>

//             {/* Input */}
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder={
//                 language === "te" ? "శోధన..." : "Search articles..."
//               }
//               className="w-full px-3 py-2 border rounded outline-none text-black placeholder-gray-500 bg-white"
//               autoFocus
//             />

//             {/* Suggestions */}
//             <div className="mt-3">
//               {suggestions.length > 0 ? (
//                 <ul className="bg-white border rounded shadow max-h-48 overflow-y-auto">
//                   {suggestions.slice(0, 6).map((s) => (
//                     <li
//                       key={s.id}
//                       className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-black"
//                       onClick={() => handleSelectArticle(s.id)}
//                     >
//                       {language === "en" ? s.title_en : s.title_te}
//                     </li>
//                   ))}
//                 </ul>
//               ) : search.length > 1 ? (
//                 <div className="px-3 py-2 text-gray-500">
//                   {language === "te" ? "ఫలితాలు లేవు" : "No results found"}
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }


// // src/components/Header.jsx
// import React, { useState, useEffect, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
// import { supabase } from "../lib/supabaseClient";

// export default function Header({ categories = [], articles = [] }) {
//   const { language, setLanguage } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [session, setSession] = useState(null);

//   // Search state
//   const [search, setSearch] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const navigate = useNavigate();

//   // 🔑 Session handling
//   useEffect(() => {
//     async function getSession() {
//       const { data } = await supabase.auth.getSession();
//       setSession(data?.session ?? null);
//     }
//     getSession();
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setSession(session ?? null);
//       }
//     );
//     return () => listener.subscription.unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setSession(null);
//     navigate("/");
//   };

//   // 🔍 Debounced search suggestions
//   const updateSuggestions = useCallback(
//     (val) => {
//       if (val.length > 1) {
//         const lower = val.toLowerCase();
//         const results = articles.filter((a) =>
//           (language === "en" ? a.title_en : a.title_te)
//             ?.toLowerCase()
//             .includes(lower)
//         );
//         setSuggestions(results);
//       } else {
//         setSuggestions([]);
//       }
//     },
//     [articles, language]
//   );

//   useEffect(() => {
//     const id = setTimeout(() => updateSuggestions(search), 250);
//     return () => clearTimeout(id);
//   }, [search, updateSuggestions]);

//   const handleSelectArticle = (id) => {
//     navigate(`/articles/${id}`);
//     setSearch("");
//     setSuggestions([]);
//     setShowModal(false);
//   };

//   return (
//     <header className="bg-blue-900 text-white shadow-md relative z-40">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
//         {/* LEFT: Hamburger */}
//         <button
//           onClick={() => setMenuOpen(true)}
//           className="text-2xl focus:outline-none"
//         >
//           <FaBars />
//         </button>

//         {/* CENTER: Logo */}
//         <Link
//           to="/"
//           className="flex-1 text-center text-xl font-bold hover:text-yellow-300"
//         >
//           📰 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}
//         </Link>

//         {/* RIGHT: Search + Language + Subscribe */}
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setShowModal(true)}
//             className="text-xl hover:text-yellow-300"
//             aria-label="Search"
//           >
//             <FaSearch />
//           </button>

//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-black px-2 py-1 rounded"
//           >
//             <option value="en">EN</option>
//             <option value="te">TE</option>
//           </select>

//           <button className="bg-yellow-400 text-black px-3 py-1 rounded font-medium hover:bg-yellow-300">
//             {language === "te" ? "చందా" : "Subscribe"}
//           </button>
//         </div>
//       </div>

//       {/* ✅ SLIDE-IN Categories Drawer */}
//       {menuOpen && (
//         <div className="fixed inset-0 z-50 flex">
//           {/* Overlay */}
//           <div
//             className="flex-1 bg-black/50"
//             onClick={() => setMenuOpen(false)}
//           ></div>

//           {/* Drawer */}
//           <div className="w-64 bg-white text-black shadow-lg h-full overflow-y-auto">
//             <div className="flex justify-between items-center p-4 border-b">
//               <h3 className="font-bold text-gray-700">
//                 {language === "te" ? "వర్గాలు" : "Categories"}
//               </h3>
//               <button
//                 onClick={() => setMenuOpen(false)}
//                 className="text-gray-600 hover:text-black"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>

//             <ul className="divide-y divide-gray-200">
//               {categories.map((c) => (
//                 <li key={c.id}>
//                   <Link
//                     to={`/category/${c.id}`}
//                     onClick={() => setMenuOpen(false)}
//                     className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-900"
//                   >
//                     {language === "te" ? c.name_te || c.name : c.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}

//       {/* 🔍 Modal Search */}
//       {showModal && (
//         <div
//           className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
//           onClick={() => setShowModal(false)} // close overlay
//         >
//           <div
//             className="bg-white p-6 rounded-lg w-full max-w-lg relative"
//             onClick={(e) => e.stopPropagation()} // stop close inside
//           >
//             {/* Close button */}
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-black"
//             >
//               <FaTimes size={20} />
//             </button>

//             {/* Input */}
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder={
//                 language === "te" ? "శోధన..." : "Search articles..."
//               }
//               className="w-full px-3 py-2 border rounded outline-none text-black placeholder-gray-500 bg-white"
//               autoFocus
//             />

//             {/* Suggestions */}
//             <div className="mt-3">
//               {suggestions.length > 0 ? (
//                 <ul className="bg-white border rounded shadow max-h-48 overflow-y-auto">
//                   {suggestions.slice(0, 6).map((s) => (
//                     <li
//                       key={s.id}
//                       className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-black"
//                       onClick={() => handleSelectArticle(s.id)}
//                     >
//                       {language === "en" ? s.title_en : s.title_te}
//                     </li>
//                   ))}
//                 </ul>
//               ) : search.length > 1 ? (
//                 <div className="px-3 py-2 text-gray-500">
//                   {language === "te" ? "ఫలితాలు లేవు" : "No results found"}
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }


// // src/components/Header.jsx
// import React, { useState, useEffect, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
// import { supabase } from "../lib/supabaseClient";

// export default function Header({ categories = [], articles = [] }) {
//   const { language, setLanguage } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [session, setSession] = useState(null);

//   // Search state
//   const [search, setSearch] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const navigate = useNavigate();

//   // 🔑 Session handling
//   useEffect(() => {
//     async function getSession() {
//       const { data } = await supabase.auth.getSession();
//       setSession(data?.session ?? null);
//     }
//     getSession();
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setSession(session ?? null);
//       }
//     );
//     return () => listener.subscription.unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setSession(null);
//     navigate("/");
//   };

//   // 🔍 Debounced search suggestions
//   const updateSuggestions = useCallback(
//     (val) => {
//       if (val.length > 1) {
//         const lower = val.toLowerCase();
//         const results = articles.filter((a) =>
//           (language === "en" ? a.title_en : a.title_te)
//             ?.toLowerCase()
//             .includes(lower)
//         );
//         setSuggestions(results);
//       } else {
//         setSuggestions([]);
//       }
//     },
//     [articles, language]
//   );

//   useEffect(() => {
//     const id = setTimeout(() => updateSuggestions(search), 250);
//     return () => clearTimeout(id);
//   }, [search, updateSuggestions]);

//   const handleSelectArticle = (id) => {
//     navigate(`/articles/${id}`);
//     setSearch("");
//     setSuggestions([]);
//     setShowModal(false);
//   };

//   return (
//     <header className="bg-blue-900 text-white shadow-md relative z-40">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
//         {/* LEFT: Hamburger */}
//         <button
//           onClick={() => setMenuOpen(true)}
//           className="text-2xl focus:outline-none"
//         >
//           <FaBars />
//         </button>

//         {/* CENTER: Logo */}
//         <Link
//           to="/"
//           className="flex-1 text-center text-xl font-bold hover:text-yellow-300"
//         >
//           📰 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}
//         </Link>

//         {/* RIGHT: Search + Language + Subscribe */}
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setShowModal(true)}
//             className="text-xl hover:text-yellow-300"
//             aria-label="Search"
//           >
//             <FaSearch />
//           </button>

//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-black px-2 py-1 rounded"
//           >
//             <option value="en">EN</option>
//             <option value="te">TE</option>
//           </select>

//           <button className="bg-yellow-400 text-black px-3 py-1 rounded font-medium hover:bg-yellow-300">
//             {language === "te" ? "చందా" : "Subscribe"}
//           </button>
//         </div>
//       </div>

//       {/* ✅ SLIDE-IN Categories Drawer (from left with animation) */}
//       {menuOpen && (
//         <div className="fixed inset-0 z-50 flex">
//           {/* Drawer */}
//           <div
//             className={`w-64 bg-white text-black shadow-lg h-full overflow-y-auto transform transition-transform duration-300 ${
//               menuOpen ? "translate-x-0" : "-translate-x-full"
//             }`}
//           >
//             <div className="flex justify-between items-center p-4 border-b">
//               <h3 className="font-bold text-gray-700">
//                 {language === "te" ? "వర్గాలు" : "Categories"}
//               </h3>
//               <button
//                 onClick={() => setMenuOpen(false)}
//                 className="text-gray-600 hover:text-black"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>

//             <ul className="divide-y divide-gray-200">
//               {categories.map((c) => (
//                 <li key={c.id}>
//                   <Link
//                     to={`/category/${c.id}`}
//                     onClick={() => setMenuOpen(false)}
//                     className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-900"
//                   >
//                     {language === "te" ? c.name_te || c.name : c.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Overlay */}
//           <div
//             className="flex-1 bg-black/50"
//             onClick={() => setMenuOpen(false)}
//           ></div>
//         </div>
//       )}

//       {/* 🔍 Modal Search */}
//       {showModal && (
//         <div
//           className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
//           onClick={() => setShowModal(false)} // close overlay
//         >
//           <div
//             className="bg-white p-6 rounded-lg w-full max-w-lg relative"
//             onClick={(e) => e.stopPropagation()} // stop close inside
//           >
//             {/* Close button */}
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-black"
//             >
//               <FaTimes size={20} />
//             </button>

//             {/* Input */}
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder={
//                 language === "te" ? "శోధన..." : "Search articles..."
//               }
//               className="w-full px-3 py-2 border rounded outline-none text-black placeholder-gray-500 bg-white"
//               autoFocus
//             />

//             {/* Suggestions */}
//             <div className="mt-3">
//               {suggestions.length > 0 ? (
//                 <ul className="bg-white border rounded shadow max-h-48 overflow-y-auto">
//                   {suggestions.slice(0, 6).map((s) => (
//                     <li
//                       key={s.id}
//                       className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-black"
//                       onClick={() => handleSelectArticle(s.id)}
//                     >
//                       {language === "en" ? s.title_en : s.title_te}
//                     </li>
//                   ))}
//                 </ul>
//               ) : search.length > 1 ? (
//                 <div className="px-3 py-2 text-gray-500">
//                   {language === "te" ? "ఫలితాలు లేవు" : "No results found"}
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }


// // src/components/Header.jsx
// import React, { useState, useEffect, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
// import { supabase } from "../lib/supabaseClient";

// export default function Header({ categories = [], articles = [] }) {
//   const { language, setLanguage } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [session, setSession] = useState(null);

//   // Accordion control
//   const [activeSection, setActiveSection] = useState(null);

//   // Search state
//   const [search, setSearch] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const navigate = useNavigate();

//   // 🔑 Session handling
//   useEffect(() => {
//     async function getSession() {
//       const { data } = await supabase.auth.getSession();
//       setSession(data?.session ?? null);
//     }
//     getSession();
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setSession(session ?? null);
//       }
//     );
//     return () => listener.subscription.unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setSession(null);
//     navigate("/");
//   };

//   // 🔍 Debounced search suggestions
//   const updateSuggestions = useCallback(
//     (val) => {
//       if (val.length > 1) {
//         const lower = val.toLowerCase();
//         const results = articles.filter((a) =>
//           (language === "en" ? a.title_en : a.title_te)
//             ?.toLowerCase()
//             .includes(lower)
//         );
//         setSuggestions(results);
//       } else {
//         setSuggestions([]);
//       }
//     },
//     [articles, language]
//   );

//   useEffect(() => {
//     const id = setTimeout(() => updateSuggestions(search), 250);
//     return () => clearTimeout(id);
//   }, [search, updateSuggestions]);

//   const handleSelectArticle = (id) => {
//     navigate(`/articles/${id}`);
//     setSearch("");
//     setSuggestions([]);
//     setShowModal(false);
//     setMenuOpen(false);
//   };

//   // Sort Popular and Trending
//   const popular = [...articles]
//     .filter((a) => typeof a.view_count === "number")
//     .sort((a, b) => b.view_count - a.view_count)
//     .slice(0, 5);

//   const trending = [...articles]
//     .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//     .slice(0, 5);

//   return (
//     <header className="bg-blue-900 text-white shadow-md relative z-40">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
//         {/* LEFT: Hamburger */}
//         <button
//           onClick={() => setMenuOpen(true)}
//           className="text-2xl focus:outline-none"
//         >
//           <FaBars />
//         </button>

//         {/* CENTER: Logo */}
//         <Link
//           to="/"
//           className="flex-1 text-center text-xl font-bold hover:text-yellow-300"
//         >
//           📰 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}
//         </Link>

//         {/* RIGHT: Search + Language + Subscribe */}
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setShowModal(true)}
//             className="text-xl hover:text-yellow-300"
//             aria-label="Search"
//           >
//             <FaSearch />
//           </button>

//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-black px-2 py-1 rounded"
//           >
//             <option value="en">EN</option>
//             <option value="te">TE</option>
//           </select>

//           <button className="bg-yellow-400 text-black px-3 py-1 rounded font-medium hover:bg-yellow-300">
//             {language === "te" ? "చందా" : "Subscribe"}
//           </button>
//         </div>
//       </div>

//       {/* ✅ SLIDE-IN Drawer with Accordion */}
//       {menuOpen && (
//         <div className="fixed inset-0 z-50 flex">
//           {/* Drawer */}
//           <div className="w-72 bg-white text-black shadow-lg h-full overflow-y-auto transform transition-transform duration-300">
//             <div className="flex justify-between items-center p-4 border-b">
//               <h3 className="font-bold text-gray-700">
//                 {language === "te" ? "మెనూ" : "Menu"}
//               </h3>
//               <button
//                 onClick={() => setMenuOpen(false)}
//                 className="text-gray-600 hover:text-black"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>

//             {/* Accordion Sections */}
//             <div>
//               {/* Categories */}
//               <button
//                 onClick={() =>
//                   setActiveSection(activeSection === "categories" ? null : "categories")
//                 }
//                 className="w-full px-4 py-2 text-left font-medium border-b hover:bg-gray-100"
//               >
//                 {language === "te" ? "వర్గాలు" : "Categories"}
//               </button>
//               {activeSection === "categories" && (
//                 <ul className="pl-6 pr-4 py-2 space-y-2">
//                   {categories.map((c) => (
//                     <li key={c.id}>
//                       <Link
//                         to={`/category/${c.id}`}
//                         onClick={() => setMenuOpen(false)}
//                         className="block hover:text-blue-600"
//                       >
//                         {language === "te" ? c.name_te || c.name : c.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               )}

//               {/* Trending */}
//               <button
//                 onClick={() =>
//                   setActiveSection(activeSection === "trending" ? null : "trending")
//                 }
//                 className="w-full px-4 py-2 text-left font-medium border-b hover:bg-gray-100"
//               >
//                 {language === "te" ? "ట్రెండింగ్" : "Trending"}
//               </button>
//               {activeSection === "trending" && (
//                 <ul className="pl-6 pr-4 py-2 space-y-2">
//                   {trending.map((t) => (
//                     <li key={t.id}>
//                       <Link
//                         to={`/articles/${t.id}`}
//                         onClick={() => setMenuOpen(false)}
//                         className="block hover:text-blue-600"
//                       >
//                         {language === "en" ? t.title_en : t.title_te}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               )}

//               {/* Popular */}
//               <button
//                 onClick={() =>
//                   setActiveSection(activeSection === "popular" ? null : "popular")
//                 }
//                 className="w-full px-4 py-2 text-left font-medium border-b hover:bg-gray-100"
//               >
//                 {language === "te" ? "ప్రచారంలో ఉన్నవి" : "Popular"}
//               </button>
//               {activeSection === "popular" && (
//                 <ul className="pl-6 pr-4 py-2 space-y-2">
//                   {popular.map((p) => (
//                     <li key={p.id}>
//                       <Link
//                         to={`/articles/${p.id}`}
//                         onClick={() => setMenuOpen(false)}
//                         className="block hover:text-blue-600"
//                       >
//                         {language === "en" ? p.title_en : p.title_te}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>

//           {/* Overlay */}
//           <div
//             className="flex-1 bg-black/50"
//             onClick={() => setMenuOpen(false)}
//           ></div>
//         </div>
//       )}

//       {/* 🔍 Modal Search */}
//       {showModal && (
//         <div
//           className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
//           onClick={() => setShowModal(false)}
//         >
//           <div
//             className="bg-white p-6 rounded-lg w-full max-w-lg relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-black"
//             >
//               <FaTimes size={20} />
//             </button>

//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder={
//                 language === "te" ? "శోధన..." : "Search articles..."
//               }
//               className="w-full px-3 py-2 border rounded outline-none text-black placeholder-gray-500 bg-white"
//               autoFocus
//             />

//             <div className="mt-3">
//               {suggestions.length > 0 ? (
//                 <ul className="bg-white border rounded shadow max-h-48 overflow-y-auto">
//                   {suggestions.slice(0, 6).map((s) => (
//                     <li
//                       key={s.id}
//                       className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-black"
//                       onClick={() => handleSelectArticle(s.id)}
//                     >
//                       {language === "en" ? s.title_en : s.title_te}
//                     </li>
//                   ))}
//                 </ul>
//               ) : search.length > 1 ? (
//                 <div className="px-3 py-2 text-gray-500">
//                   {language === "te" ? "ఫలితాలు లేవు" : "No results found"}
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// src/components/Header.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";

export default function Header({ categories = [], articles = [] }) {
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState(null);

  // Accordion state
  const [activeSection, setActiveSection] = useState(null);

  // Search state
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  // 🔑 Session handling
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

  // Search Suggestions
  const updateSuggestions = useCallback(
    (val) => {
      if (val.length > 1) {
        const lower = val.toLowerCase();
        const results = articles.filter((a) =>
          (language === "en" ? a.title_en : a.title_te)
            ?.toLowerCase()
            .includes(lower)
        );
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    },
    [articles, language]
  );

  useEffect(() => {
    const id = setTimeout(() => updateSuggestions(search), 250);
    return () => clearTimeout(id);
  }, [search, updateSuggestions]);

  const handleSelectArticle = (id) => {
    navigate(`/articles/${id}`);
    setSearch("");
    setSuggestions([]);
    setShowModal(false);
    setMenuOpen(false);
  };

  // Data for Popular & Trending
  // const popular = [...articles]
  //   .filter((a) => typeof a.view_count === "number")
  //   .sort((a, b) => b.view_count - a.view_count)
  //   .slice(0, 5);
  const [popular, setPopular] = useState([]);

useEffect(() => {
  async function fetchPopular() {
    const { data, error } = await supabase
      .from("articles")
      .select("id, title_en, title_te, view_count")
      .order("view_count", { ascending: false })
      .limit(5);

    if (error) {
      console.error("Error fetching popular:", error.message);
    } else {
      setPopular(data || []);
    }
  }
  fetchPopular();
}, []);

  const trending = [...articles]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return (
    <header className="bg-blue-900 text-white shadow-md relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
        {/* LEFT: Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="text-2xl focus:outline-none"
        >
          <FaBars />
        </button>

        {/* CENTER: Logo */}
        <Link
          to="/"
          className="flex-1 text-center text-xl font-bold hover:text-yellow-300"
        >
          📰 {language === "te" ? "నా వార్తా సైట్" : "My News Site"}
        </Link>

        {/* RIGHT: Search + Language + Subscribe */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="text-xl hover:text-yellow-300"
            aria-label="Search"
          >
            <FaSearch />
          </button>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-black px-2 py-1 rounded"
          >
            <option value="en">EN</option>
            <option value="te">TE</option>
          </select>

          <button className="bg-yellow-400 text-black px-3 py-1 rounded font-medium hover:bg-yellow-300">
            {language === "te" ? "చందా" : "Subscribe"}
          </button>
        </div>
      </div>

      {/* ✅ SLIDE-IN Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Drawer */}
          <div className="w-72 bg-white text-black shadow-lg h-full overflow-y-auto transform transition-transform duration-300">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-gray-700">
                {language === "te" ? "మెనూ" : "Menu"}
              </h3>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-gray-600 hover:text-black"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Accordion Sections */}
            <div>
              {/* Categories */}
              <button
                onClick={() =>
                  setActiveSection(activeSection === "categories" ? null : "categories")
                }
                className="w-full px-4 py-2 flex justify-between items-center text-left font-medium border-b hover:bg-gray-100"
              >
                {language === "te" ? "వర్గాలు" : "Categories"}
                <span>{activeSection === "categories" ? "▼" : "▶"}</span>
              </button>
              {activeSection === "categories" && (
                <ul className="pl-6 pr-4 py-2 space-y-2">
                  {categories.map((c) => (
                    <li key={c.id}>
                      <Link
                        to={`/category/${c.id}`}
                        onClick={() => setMenuOpen(false)}
                        className="block hover:text-blue-600"
                      >
                        {language === "te" ? c.name_te || c.name : c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {/* Trending */}
              <button
                onClick={() =>
                  setActiveSection(activeSection === "trending" ? null : "trending")
                }
                className="w-full px-4 py-2 flex justify-between items-center text-left font-medium border-b hover:bg-gray-100"
              >
                {language === "te" ? "ట్రెండింగ్" : "Trending"}
                <span>{activeSection === "trending" ? "▼" : "▶"}</span>
              </button>
              {activeSection === "trending" && (
                <ul className="pl-6 pr-4 py-2 space-y-2">
                  {trending.map((t) => (
                    <li key={t.id}>
                      <Link
                        to={`/articles/${t.id}`}
                        onClick={() => setMenuOpen(false)}
                        className="block hover:text-blue-600"
                      >
                        {language === "en" ? t.title_en : t.title_te}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

           
              {/* Popular */}
<button
  onClick={() =>
    setActiveSection(activeSection === "popular" ? null : "popular")
  }
  className="w-full px-4 py-2 flex justify-between items-center text-left font-medium border-b hover:bg-gray-100"
>
  {language === "te" ? "ప్రసిద్ధమైనవి" : "Popular"}
  <span>{activeSection === "popular" ? "▼" : "▶"}</span>
</button>
{activeSection === "popular" && (
  <ul className="pl-6 pr-4 py-2 space-y-2">
    {popular.map((p) => (
      <li key={p.id}>
        <Link
          to={`/articles/${p.id}`}
          onClick={() => setMenuOpen(false)}
          className="block hover:text-blue-600"
        >
          {language === "en" ? p.title_en : p.title_te}
        </Link>
      </li>
      
      
    ))}
    {(
      <li className="text-sm text-gray-500">
        {language === "te" ? "పాపులర్ లేదు" : "No popular articles"}
      </li>
    )}
    
  </ul>
)}

            </div>
          </div>

          {/* Overlay */}
          <div
            className="flex-1 bg-black/50"
            onClick={() => setMenuOpen(false)}
          ></div>
        </div>
      )}

      {/* 🔍 Modal Search */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <FaTimes size={20} />
            </button>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                language === "te" ? "శోధన..." : "Search articles..."
              }
              className="w-full px-3 py-2 border rounded outline-none text-black placeholder-gray-500 bg-white"
              autoFocus
            />

            <div className="mt-3">
              {suggestions.length > 0 ? (
                <ul className="bg-white border rounded shadow max-h-48 overflow-y-auto">
                  {suggestions.slice(0, 6).map((s) => (
                    <li
                      key={s.id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-black"
                      onClick={() => handleSelectArticle(s.id)}
                    >
                      {language === "en" ? s.title_en : s.title_te}
                    </li>
                  ))}
                </ul>
              ) : search.length > 1 ? (
                <div className="px-3 py-2 text-gray-500">
                  {language === "te" ? "ఫలితాలు లేవు" : "No results found"}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
