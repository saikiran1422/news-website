
// //sidebar
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { supabase } from "../lib/supabaseClient";

// function formatDate(dateString) {
//   if (!dateString) return "";
//   return new Date(dateString).toLocaleString("en-US", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

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
//         const published = formatDate(a.updated_at || a.created_at);
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

// // //sidebar
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { supabase } from "../lib/supabaseClient";
// import { formatDate } from "../utils/date"; // ✅ added

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
//         const published = formatDate(a.updated_at || a.created_at);
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
//   src={a.image_url}
//   alt={a.title_en}
//   className="w-16 h-16 object-contain bg-gray-100 rounded"
// />
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
import { formatDate } from "../utils/date";
import SelfAd from "../components/SelfAd";
import GoogleAds from "../components/GoogleAds";

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
      .on("postgres_changes", { event: "*", schema: "public", table: "articles" }, () => fetchData())
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
              <img src={a.image_url} alt={a.title_en} className="w-16 h-16 object-contain bg-gray-100 rounded" />
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
        <h3 className="text-lg font-bold mb-3">{language === "te" ? "ట్రెండింగ్" : "Trending"}</h3>
        {trending.length > 0 ? renderList(trending) : <p>No trending</p>}
      </section>
      <section>
        <h3 className="text-lg font-bold mb-3">{language === "te" ? "ప్రసిద్ధమైన" : "Popular"}</h3>
        {popular.length > 0 ? renderList(popular) : <p>No popular</p>}
      </section>

      {/* ✅ Ads at bottom of sidebar */}
      <div className="my-4">
        <SelfAd />
        <GoogleAds slot="sidebar_bottom" />
      </div>
    </aside>
  );
}
