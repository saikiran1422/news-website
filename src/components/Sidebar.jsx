// // src/components/Sidebar.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";

// export default function Sidebar({ categories = [], trending = [], articles = [] }) {
//   const { language } = useLanguage();

//   // ✅ Popular = highest view_count
//   const popular = [...articles]
//     .filter((a) => typeof a.view_count === "number")
//     .sort((a, b) => b.view_count - a.view_count)
//     .slice(0, 5);

//   // ✅ Trending = last 5 newest
//   const latestTrending = [...trending].slice(0, 5);

//   return (
//     <aside className="hidden md:block md:w-64 space-y-6">
//       {/* Trending */}
//       <div className="bg-white p-4 rounded-lg shadow">
//         <h3 className="font-bold mb-2">
//           {language === "te" ? "ట్రెండింగ్" : "Trending"}
//         </h3>
//         <ul className="space-y-2 text-sm">
//           {latestTrending.length > 0 ? (
//             latestTrending.map((t) => (
//               <li key={t.id}>
//                 <Link
//                   to={`/articles/${t.id}`}
//                   className="block hover:text-red-600"
//                 >
//                   {language === "te"
//                     ? t.title_te || t.title_en
//                     : t.title_en || t.title_te}
//                 </Link>
//               </li>
//             ))
//           ) : (
//             <li className="text-gray-500 text-sm">
//               {language === "te" ? "లభ్యం లేదు" : "No trending"}
//             </li>
//           )}
//         </ul>
//       </div>

//       {/* Popular */}
//       <div className="bg-white p-4 rounded-lg shadow">
//         <h3 className="font-bold mb-2">
//           {language === "te" ? "ప్రచారంలో ఉన్నవి" : "Popular"}
//         </h3>
//         <ul className="space-y-2 text-sm">
//           {popular.length > 0 ? (
//             popular.map((p) => (
//               <li key={p.id}>
//                 <Link
//                   to={`/articles/${p.id}`}
//                   className="block hover:text-blue-600"
//                 >
//                   {language === "te"
//                     ? p.title_te || p.title_en
//                     : p.title_en || p.title_te}
//                   <span className="ml-2 text-xs text-gray-400">
//                     👁 {p.view_count}
//                   </span>
//                 </Link>
//               </li>
//             ))
//           ) : (
//             <li className="text-gray-500 text-sm">
//               {language === "te" ? "లభ్యం లేదు" : "No popular"}
//             </li>
//           )}
//         </ul>
//       </div>
//     </aside>
//   );
// }

// import React from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";

// export default function Sidebar({ articles = [] }) {
//   const { language } = useLanguage();

//   const popular = [...articles]
//     .filter((a) => typeof a.view_count === "number")
//     .sort((a, b) => b.view_count - a.view_count)
//     .slice(0, 5);

//   const trending = [...articles]
//     .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//     .slice(0, 5);

//   return (
//     <aside className="hidden md:block md:w-64 space-y-6">
//       <div className="bg-white p-4 rounded-lg shadow">
//         <h3 className="font-bold mb-2">{language === "te" ? "ట్రెండింగ్" : "Trending"}</h3>
//         <ul className="space-y-2 text-sm">
//           {trending.length > 0 ? (
//             trending.map((t) => (
//               <li key={t.id}>
//                 <Link to={`/articles/${t.id}`} className="block hover:text-red-600">
//                   {language === "te" ? t.title_te || t.title_en : t.title_en || t.title_te}
//                 </Link>
//               </li>
//             ))
//           ) : (
//             <li className="text-gray-500">{language === "te" ? "లభ్యం లేదు" : "No trending"}</li>
//           )}
//         </ul>
//       </div>

//       <div className="bg-white p-4 rounded-lg shadow">
//         <h3 className="font-bold mb-2">{language === "te" ? "ప్రచారంలో ఉన్నవి" : "Popular"}</h3>
//         <ul className="space-y-2 text-sm">
//           {popular.length > 0 ? (
//             popular.map((p) => (
//               <li key={p.id}>
//                 <Link to={`/articles/${p.id}`} className="block hover:text-blue-600">
//                   {language === "te" ? p.title_te || p.title_en : p.title_en || p.title_te}
//                   <span className="ml-2 text-xs text-gray-400">👁 {p.view_count}</span>
//                 </Link>
//               </li>
//             ))
//           ) : (
//             <li className="text-gray-500">{language === "te" ? "లభ్యం లేదు" : "No popular"}</li>
//           )}
//         </ul>
//       </div>
//     </aside>
//   );
// }

// // src/components/Sidebar.jsx
// import React, { useMemo } from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";

// export default function Sidebar({ articles = [] }) {
//   const { language } = useLanguage();

//   // 🔥 Trending = last 5 uploaded
//   const trending = useMemo(() => {
//     return [...articles]
//       .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//       .slice(0, 5);
//   }, [articles]);

//   // ⭐ Popular = highest views (assuming `views` field)
//   const popular = useMemo(() => {
//     return [...articles]
//       .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
//       .slice(0, 5);
//   }, [articles]);

//   const renderList = (items) => (
//     <div className="space-y-4">
//       {items.map((a) => (
//         <Link
//           key={a.id}
//           to={`/articles/${a.id}`}
//           className="flex items-start gap-3 hover:bg-gray-100 rounded p-2 transition"
//         >
//           {/* Left: text */}
//           <div className="flex-1">
//             <h4 className="text-sm font-semibold text-gray-800">
//               {language === "en" ? a.title_en : a.title_te}
//             </h4>
//             <p className="text-xs text-gray-600 line-clamp-2">
//               {language === "en" ? a.summary_en : a.summary_te}
//             </p>
//           </div>

//           {/* Right: image */}
//           {a.image_url ? (
//             <img
//               src={a.image_url}
//               alt={a.title_en}
//               className="w-16 h-16 object-cover rounded"
//             />
//           ) : (
//             <div className="w-16 h-16 bg-gray-300 flex items-center justify-center text-xs text-gray-600 rounded">
//               No Img
//             </div>
//           )}
//         </Link>
//       ))}
//     </div>
//   );

//   return (
//     <aside className="mt-8 md:mt-0 md:w-80 space-y-8">
//       {/* Trending */}
//       <section>
//         <h3 className="text-lg font-bold mb-3">
//           {language === "te" ? "ట్రెండింగ్" : "Trending"}
//         </h3>
//         {trending.length > 0 ? renderList(trending) : <p>No trending</p>}
//       </section>

//       {/* Popular */}
//       <section>
//         <h3 className="text-lg font-bold mb-3">
//           {language === "te" ? "ప్రసిద్ధమైన" : "Popular"}
//         </h3>
//         {popular.length > 0 ? renderList(popular) : <p>No popular</p>}
//       </section>
//     </aside>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { supabase } from "../lib/supabaseClient";

// export default function Sidebar() {
//   const { language } = useLanguage();
//   const [trending, setTrending] = useState([]);
//   const [popular, setPopular] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       // 🔥 Trending = 5 latest
//       const { data: latest } = await supabase
//         .from("articles")
//         .select("id, title_en, title_te, summary_en, summary_te, image_url, created_at")
//         .order("created_at", { ascending: false })
//         .limit(5);

//       // ⭐ Popular = top 5 by views
//       const { data: topViews } = await supabase
//         .from("articles")
//         .select("id, title_en, title_te, summary_en, summary_te, image_url, view_count")
//         .order("view_count", { ascending: false })
//         .limit(5);

//       setTrending(latest || []);
//       setPopular(topViews || []);
//     }

//     fetchData();
//   }, []);

//   const renderList = (items) => (
//     <div className="space-y-4">
//       {items.map((a) => (
//         <Link
//           key={a.id}
//           to={`/articles/${a.id}`}
//           className="flex items-start gap-3 hover:bg-gray-100 rounded p-2 transition"
//         >
//           {/* Left: text */}
//           <div className="flex-1">
//             <h4 className="text-sm font-semibold text-gray-800">
//               {language === "en" ? a.title_en : a.title_te}
//             </h4>
//             <p className="text-xs text-gray-600 line-clamp-2">
//               {language === "en" ? a.summary_en : a.summary_te}
//             </p>
//           </div>

//           {/* Right: image */}
//           {a.image_url ? (
//             <img
//               src={a.image_url}
//               alt={a.title_en}
//               className="w-16 h-16 object-cover rounded"
//             />
//           ) : (
//             <div className="w-16 h-16 bg-gray-300 flex items-center justify-center text-xs text-gray-600 rounded">
//               No Img
//             </div>
//           )}
//         </Link>
//       ))}
//     </div>
//   );

//   return (
//     <aside className="mt-8 md:mt-0 md:w-80 space-y-8">
//       {/* Trending */}
//       <section>
//         <h3 className="text-lg font-bold mb-3">
//           {language === "te" ? "ట్రెండింగ్" : "Trending"}
//         </h3>
//         {trending.length > 0 ? renderList(trending) : <p>No trending</p>}
//       </section>

//       {/* Popular */}
//       <section>
//         <h3 className="text-lg font-bold mb-3">
//           {language === "te" ? "ప్రసిద్ధమైన" : "Popular"}
//         </h3>
//         {popular.length > 0 ? renderList(popular) : <p>No popular</p>}
//       </section>
//     </aside>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { supabase } from "../lib/supabaseClient";

// export default function Sidebar() {
//   const { language } = useLanguage();
//   const [trending, setTrending] = useState([]);
//   const [popular, setPopular] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const { data: latest } = await supabase
//         .from("articles")
//         .select("id, title_en, title_te, summary_en, summary_te, image_url, created_at")
//         .order("created_at", { ascending: false })
//         .limit(5);

//       const { data: topViews } = await supabase
//         .from("articles")
//         .select("id, title_en, title_te, summary_en, summary_te, image_url, created_at, view_count")
//         .order("view_count", { ascending: false })
//         .limit(5);

//       setTrending(latest || []);
//       setPopular(topViews || []);
//     }

//     fetchData();
//   }, []);

//   const renderList = (items) => (
//     <div className="space-y-4">
//       {items.map((a) => {
//         const published = a.created_at
//           ? new Date(a.created_at).toLocaleString("en-US", {
//               day: "numeric",
//               month: "long",
//               year: "numeric",
//               hour: "2-digit",
//               minute: "2-digit",
//             })
//           : "";
//         return (
//           <Link
//             key={a.id}
//             to={`/articles/${a.id}`}
//             className="flex items-start gap-3 hover:bg-gray-100 rounded p-2 transition"
//           >
//             <div className="flex-1">
//               <h4 className="text-sm font-semibold text-gray-800">
//                 {language === "en" ? a.title_en : a.title_te}
//               </h4>
//               <p className="text-xs text-gray-600 line-clamp-2">
//                 {language === "en" ? a.summary_en : a.summary_te}
//               </p>
//               {published && (
//                 <p className="text-[10px] text-gray-400 mt-1">{published}</p>
//               )}
//             </div>

//             {a.image_url ? (
//               <img
//                 src={a.image_url}
//                 alt={a.title_en}
//                 className="w-16 h-16 object-cover rounded"
//               />
//             ) : (
//               <div className="w-16 h-16 bg-gray-300 flex items-center justify-center text-xs text-gray-600 rounded">
//                 No Img
//               </div>
//             )}
//           </Link>
//         );
//       })}
//     </div>
//   );

//   return (
//     <aside className="mt-8 md:mt-0 md:w-80 space-y-8">
//       <section>
//         <h3 className="text-lg font-bold mb-3">
//           {language === "te" ? "ట్రెండింగ్" : "Trending"}
//         </h3>
//         {trending.length > 0 ? renderList(trending) : <p>No trending</p>}
//       </section>

//       <section>
//         <h3 className="text-lg font-bold mb-3">
//           {language === "te" ? "ప్రసిద్ధమైన" : "Popular"}
//         </h3>
//         {popular.length > 0 ? renderList(popular) : <p>No popular</p>}
//       </section>
//     </aside>
//   );
// }
// //sidebar
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { supabase } from "../lib/supabaseClient";

// export default function Sidebar() {
//   const { language } = useLanguage();
//   const [trending, setTrending] = useState([]);
//   const [popular, setPopular] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const { data: latest } = await supabase
//         .from("articles")
//         .select("id, title_en, title_te, summary_en, summary_te, image_url, created_at, updated_at")
//         .order("created_at", { ascending: false })
//         .limit(5);

//       const { data: topViews } = await supabase
//         .from("articles")
//         .select("id, title_en, title_te, summary_en, summary_te, image_url, view_count, created_at, updated_at")
//         .order("view_count", { ascending: false })
//         .limit(5);

//       setTrending(latest || []);
//       setPopular(topViews || []);
//     }

//     fetchData();
//   }, []);

//   const renderList = (items) => (
//     <div className="space-y-4">
//       {items.map((a) => {
//         const published = a.updated_at || a.created_at
//           ? new Date(a.updated_at || a.created_at).toLocaleString("en-US", {
//               day: "numeric",
//               month: "long",
//               year: "numeric",
//               hour: "2-digit",
//               minute: "2-digit",
//             })
//           : "";

//         return (
//           <Link
//             key={a.id}
//             to={`/articles/${a.id}`}
//             className="flex items-start gap-3 hover:bg-gray-100 rounded p-2 transition"
//           >
//             <div className="flex-1">
//               <h4 className="text-sm font-semibold text-gray-800">
//                 {language === "en" ? a.title_en : a.title_te}
//               </h4>
//               <p className="text-xs text-gray-600 line-clamp-2">
//                 {language === "en" ? a.summary_en : a.summary_te}
//               </p>
//               <span className="text-xs text-gray-500">{published}</span>
//             </div>
//             {a.image_url ? (
//               <img
//                 src={a.image_url}
//                 alt={a.title_en}
//                 className="w-16 h-16 object-cover rounded"
//               />
//             ) : (
//               <div className="w-16 h-16 bg-gray-300 flex items-center justify-center text-xs text-gray-600 rounded">
//                 No Img
//               </div>
//             )}
//           </Link>
//         );
//       })}
//     </div>
//   );

//   return (
//     <aside className="mt-8 md:mt-0 md:w-80 space-y-8">
//       <section>
//         <h3 className="text-lg font-bold mb-3">
//           {language === "te" ? "ట్రెండింగ్" : "Trending"}
//         </h3>
//         {trending.length > 0 ? renderList(trending) : <p>No trending</p>}
//       </section>

//       <section>
//         <h3 className="text-lg font-bold mb-3">
//           {language === "te" ? "ప్రసిద్ధమైన" : "Popular"}
//         </h3>
//         {popular.length > 0 ? renderList(popular) : <p>No popular</p>}
//       </section>
//     </aside>
//   );
// }
// //sidebar
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { supabase } from "../lib/supabaseClient";

// export default function Sidebar() {
//   const { language } = useLanguage();
//   const [trending, setTrending] = useState([]);
//   const [popular, setPopular] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const { data: latest } = await supabase
//         .from("articles")
//         .select("id, title_en, title_te, summary_en, summary_te, image_url, created_at, updated_at")
//         .order("created_at", { ascending: false })
//         .limit(5);

//       const { data: topViews } = await supabase
//         .from("articles")
//         .select("id, title_en, title_te, summary_en, summary_te, image_url, view_count, created_at, updated_at")
//         .order("view_count", { ascending: false })
//         .limit(5);

//       setTrending(latest || []);
//       setPopular(topViews || []);
//     }
//     fetchData();
//   }, []);

//   const renderList = (items) => (
//     <div className="space-y-4">
//       {items.map((a) => {
//         const published = a.updated_at || a.created_at
//           ? new Date(a.updated_at || a.created_at).toLocaleString("en-US", {
//               day: "numeric",
//               month: "long",
//               year: "numeric",
//               hour: "2-digit",
//               minute: "2-digit",
//             })
//           : "";

//         return (
//           <Link
//             key={a.id}
//             to={`/articles/${a.id}`}
//             className="flex items-start gap-3 hover:bg-gray-100 rounded p-2 transition"
//           >
//             <div className="flex-1">
//               <h4 className="text-sm font-semibold text-gray-800">
//                 {language === "en" ? a.title_en : a.title_te}
//               </h4>
//               <p className="text-xs text-gray-600 line-clamp-2">
//                 {language === "en" ? a.summary_en : a.summary_te}
//               </p>
//               <span className="text-xs text-gray-500">{published}</span>
//             </div>
//             {a.image_url ? (
//               <img
//                 src={a.image_url}
//                 alt={a.title_en}
//                 className="w-16 h-16 object-cover rounded"
//               />
//             ) : (
//               <div className="w-16 h-16 bg-gray-300 flex items-center justify-center text-xs text-gray-600 rounded">
//                 No Img
//               </div>
//             )}
//           </Link>
//         );
//       })}
//     </div>
//   );

//   return (
//     <aside className="mt-8 md:mt-0 md:w-80 space-y-8">
//       <section>
//         <h3 className="text-lg font-bold mb-3">
//           {language === "te" ? "ట్రెండింగ్" : "Trending"}
//         </h3>
//         {trending.length > 0 ? renderList(trending) : <p>No trending</p>}
//       </section>
//       <section>
//         <h3 className="text-lg font-bold mb-3">
//           {language === "te" ? "ప్రసిద్ధమైన" : "Popular"}
//         </h3>
//         {popular.length > 0 ? renderList(popular) : <p>No popular</p>}
//       </section>
//     </aside>
//   );
// }

// // src/components/Sidebar.jsx
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { supabase } from "../lib/supabaseClient";

// export default function Sidebar() {
//   const { language } = useLanguage();
//   const [trending, setTrending] = useState([]);
//   const [popular, setPopular] = useState([]);

//   async function fetchData() {
//     const { data: latest } = await supabase
//       .from("articles")
//       .select("id, title_en, title_te, summary_en, summary_te, image_url, created_at, updated_at")
//       .order("created_at", { ascending: false })
//       .limit(5);

//     const { data: topViews } = await supabase
//       .from("articles")
//       .select("id, title_en, title_te, summary_en, summary_te, image_url, view_count, created_at, updated_at")
//       .order("view_count", { ascending: false })
//       .limit(5);

//     setTrending(latest || []);
//     setPopular(topViews || []);
//   }

//   useEffect(() => {
//     fetchData();
//     const channel = supabase
//       .channel("articles-sidebar")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "articles" },
//         () => fetchData()
//       )
//       .subscribe();
//     return () => supabase.removeChannel(channel);
//   }, []);

//   const renderList = (items) => (
//     <div className="space-y-4">
//       {items.map((a) => {
//         const published = a.updated_at || a.created_at
//           ? new Date(a.updated_at || a.created_at).toLocaleString("en-US", {
//               day: "numeric",
//               month: "long",
//               year: "numeric",
//               hour: "2-digit",
//               minute: "2-digit",
//             })
//           : "";

//         return (
//           <Link
//             key={a.id}
//             to={`/articles/${a.id}`}
//             className="flex items-start gap-3 hover:bg-gray-100 rounded p-2 transition"
//           >
//             <div className="flex-1">
//               <h4 className="text-sm font-semibold text-gray-800">
//                 {language === "en" ? a.title_en : a.title_te}
//               </h4>
//               <p className="text-xs text-gray-600 line-clamp-2">
//                 {language === "en" ? a.summary_en : a.summary_te}
//               </p>
//               <span className="text-xs text-gray-500">{published}</span>
//             </div>
//             {a.image_url ? (
//               <img
//                 src={a.image_url}
//                 alt={a.title_en}
//                 className="w-16 h-16 object-cover rounded"
//               />
//             ) : (
//               <div className="w-16 h-16 bg-gray-300 flex items-center justify-center text-xs text-gray-600 rounded">
//                 No Img
//               </div>
//             )}
//           </Link>
//         );
//       })}
//     </div>
//   );

//   return (
//     <aside className="mt-8 md:mt-0 md:w-80 space-y-8">
//       <section>
//         <h3 className="text-lg font-bold mb-3">
//           {language === "te" ? "ట్రెండింగ్" : "Trending"}
//         </h3>
//         {trending.length > 0 ? renderList(trending) : <p>No trending</p>}
//       </section>
//       <section>
//         <h3 className="text-lg font-bold mb-3">
//           {language === "te" ? "ప్రసిద్ధమైన" : "Popular"}
//         </h3>
//         {popular.length > 0 ? renderList(popular) : <p>No popular</p>}
//       </section>
//     </aside>
//   );
// }

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { supabase } from "../lib/supabaseClient";

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Sidebar() {
  const { language } = useLanguage();
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);

  async function fetchData() {
    const { data: latest } = await supabase
      .from("articles")
      .select("id, title_en, title_te, summary_en, summary_te, image_url, created_at, updated_at")
      .order("created_at", { ascending: false })
      .limit(5);

    const { data: topViews } = await supabase
      .from("articles")
      .select("id, title_en, title_te, summary_en, summary_te, image_url, view_count, created_at, updated_at")
      .order("view_count", { ascending: false })
      .limit(5);

    setTrending(latest || []);
    setPopular(topViews || []);
  }

  useEffect(() => {
    fetchData();
    const channel = supabase
      .channel("articles-sidebar")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "articles" },
        () => fetchData()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const renderList = (items) => (
    <div className="space-y-4">
      {items.map((a) => {
        const published = formatDate(a.updated_at || a.created_at);
        return (
          <Link
            key={a.id}
            to={`/articles/${a.id}`}
            className="flex items-start gap-3 hover:bg-gray-100 rounded p-2 transition"
          >
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-800">
                {language === "en" ? a.title_en : a.title_te}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2">
                {language === "en" ? a.summary_en : a.summary_te}
              </p>
              <span className="text-xs text-gray-500">{published}</span>
            </div>
            {a.image_url ? (
              <img
                src={a.image_url}
                alt={a.title_en}
                className="w-16 h-16 object-cover rounded"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-300 flex items-center justify-center text-xs text-gray-600 rounded">
                No Img
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );

  return (
    <aside className="mt-8 md:mt-0 md:w-80 space-y-8">
      <section>
        <h3 className="text-lg font-bold mb-3">
          {language === "te" ? "ట్రెండింగ్" : "Trending"}
        </h3>
        {trending.length > 0 ? renderList(trending) : <p>No trending</p>}
      </section>
      <section>
        <h3 className="text-lg font-bold mb-3">
          {language === "te" ? "ప్రసిద్ధమైన" : "Popular"}
        </h3>
        {popular.length > 0 ? renderList(popular) : <p>No popular</p>}
      </section>
    </aside>
  );
}
