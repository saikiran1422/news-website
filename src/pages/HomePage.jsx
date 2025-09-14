
// //homepage
// import React, { useState, useEffect } from "react";
// import ArticleCard from "../components/ArticleCard";
// import Sidebar from "../components/Sidebar";
// import { useLanguage } from "../context/LanguageContext";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../lib/supabaseClient";

// /**
//  * Format date like: "13 September 2025, 10:05"
//  */
// function formatDate(dateString) {
//   const date = new Date(dateString);
//   return date.toLocaleString("en-US", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

// /**
//  * Slider
//  */
// // function Slider({ items = [], language = "en" }) {
// //   const [index, setIndex] = useState(0);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (!items || items.length <= 1) return;
// //     const id = setInterval(
// //       () => setIndex((i) => (i + 1) % items.length),
// //       4500
// //     );
// //     return () => clearInterval(id);
// //   }, [items]);

// //   if (!items || items.length === 0) return null;
// //   const current = items[index];

// //   return (
// //     <div
// //       className="w-full mb-6 relative rounded-lg overflow-hidden cursor-pointer"
// //       onClick={() => navigate(`/articles/${current.id}`)}
// //     >
// //       {/* Image */}
// //       {current.image_url ? (
// //         <img
// //           src={current.image_url}
// //           alt={language === "en" ? current.title_en : current.title_te}
// //           className="w-full h-64 object-cover"
// //         />
// //       ) : (
// //         <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
// //           No image
// //         </div>
// //       )}

// //       {/* Overlay */}
// //       <div className="absolute left-4 bottom-4 right-4 bg-gradient-to-t from-black/70 to-transparent p-4 rounded">
// //         <div className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-bold rounded">
// //           {language === "en" ? "FEATURE" : "హైలైట్"}
// //         </div>
// //         <h2 className="text-xl md:text-2xl font-bold text-white mt-2">
// //           {language === "en" ? current.title_en : current.title_te}
// //         </h2>

// //         {current.updated_at || current.created_at ? (
// //           <p className="text-gray-300 text-xs mt-1">
// //             {formatDate(current.updated_at || current.created_at)}
// //           </p>
// //         ) : null}

// //         <p className="text-sm text-gray-200 mt-2 line-clamp-2">
// //           {language === "en" ? current.summary_en : current.summary_te}
// //         </p>
// //       </div>
// /**
//  * Slider
//  */
// function Slider({ items = [], language = "en" }) {
//   const [index, setIndex] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!items || items.length <= 1) return;
//     const id = setInterval(
//       () => setIndex((i) => (i + 1) % items.length),
//       4500
//     );
//     return () => clearInterval(id);
//   }, [items]);

//   if (!items || items.length === 0) return null;
//   const current = items[index];

//   return (
//     <div
//       className="w-full mb-6 relative rounded-lg overflow-hidden cursor-pointer"
//       onClick={() => navigate(`/articles/${current.id}`)}
//     >
//       {/* Image */}
//       {current.image_url ? (
//         <img
//           src={current.image_url}
//           alt={language === "en" ? current.title_en : current.title_te}
//           className="w-full h-64 object-cover"
//         />
//       ) : (
//         <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
//           No image
//         </div>
//       )}

//       {/* Overlay */}
//       <div className="absolute left-4 bottom-4 right-4 bg-gradient-to-t from-black/70 to-transparent p-4 rounded">
//         <div className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-bold rounded">
//           {language === "en" ? "FEATURE" : "హైలైట్"}
//         </div>
//         <h2 className="text-xl md:text-2xl font-bold text-white mt-2">
//           {language === "en" ? current.title_en : current.title_te}
//         </h2>

//         {current.updated_at || current.created_at ? (
//           <p className="text-gray-300 text-xs mt-1">
//             {formatDate(current.updated_at || current.created_at)}
//           </p>
//         ) : null}

//         <p className="text-sm text-gray-200 mt-2 line-clamp-2">
//           {language === "en" ? current.summary_en : current.summary_te}
//         </p>

//         {/* ✅ Read More button */}
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             navigate(`/articles/${current.id}`);
//           }}
//           className="mt-3 inline-block bg-white text-red-600 px-4 py-1 rounded font-semibold hover:bg-gray-100"
//         >
//           {language === "te" ? "మరిన్ని చదవండి →" : "Read more →"}
//         </button>
//       </div>

//       {/* Controls … (unchanged) */}

//       {/* Controls */}
//       <div className="absolute bottom-3 right-4 flex items-center gap-3 bg-black/40 px-3 py-2 rounded-full">
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setIndex((i) => (i - 1 + items.length) % items.length);
//           }}
//           className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-full hover:bg-gray-200"
//         >
//           ◀
//         </button>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setIndex((i) => (i + 1) % items.length);
//           }}
//           className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-full hover:bg-gray-200"
//         >
//           ▶
//         </button>
//         <div className="flex gap-2 ml-2">
//           {items.map((_, i) => (
//             <button
//               key={i}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setIndex(i);
//               }}
//               className={`w-2.5 h-2.5 rounded-full ${
//                 i === index ? "bg-red-600" : "bg-gray-300"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// /**
//  * HomePage
//  */
// export default function HomePage() {
//   const { language } = useLanguage();
//   const [articles, setArticles] = useState([]);

//   // Fetch all articles
//   async function fetchArticles() {
//     const { data } = await supabase
//       .from("articles")
//       .select("*")
//       .order("created_at", { ascending: false });
//     setArticles(data || []);
//   }

//   useEffect(() => {
//     fetchArticles();

//     // Realtime subscription
//     const channel = supabase
//       .channel("articles-updates")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "articles" },
//         () => fetchArticles()
//       )
//       .subscribe();

//     return () => supabase.removeChannel(channel);
//   }, []);

//   const sliderItems = articles.slice(0, 5);
//   const rest = articles.slice(5);

//   return (
//     <div className="md:flex md:gap-6">
//       <div className="md:flex-1">
//         <Slider items={sliderItems} language={language} />

//         <section className="mt-6">
//           <h2 className="text-2xl font-bold mb-4">
//             {language === "te" ? "తాజా వార్తలు" : "Latest News"}
//           </h2>
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {rest.map((a) => (
//               <ArticleCard key={a.id} article={a} />
//             ))}
//           </div>
//         </section>
//       </div>
//       <Sidebar />
//     </div>
//   );
// }

// //homepage
// import React, { useState, useEffect } from "react";
// import ArticleCard from "../components/ArticleCard";
// import Sidebar from "../components/Sidebar";
// import { useLanguage } from "../context/LanguageContext";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../lib/supabaseClient";
// import { formatDate } from "../utils/date"; // ✅ added
// import MetaTags from "../components/MetaTags";
// import SelfAd from "../components/SelfAd";
// import GoogleAds from "../components/GoogleAds";


// /**
//  * Slider
//  */
// function Slider({ items = [], language = "en" }) {
//   const [index, setIndex] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!items || items.length <= 1) return;
//     const id = setInterval(
//       () => setIndex((i) => (i + 1) % items.length),
//       4500
//     );
//     return () => clearInterval(id);
//   }, [items]);

//   if (!items || items.length === 0) return null;
//   const current = items[index];

//   return (
//     <div
//       className="w-full mb-6 relative rounded-lg overflow-hidden cursor-pointer"
//       onClick={() => navigate(`/articles/${current.id}`)}
//     >
//       {/* Image */}
//       {current.image_url ? (
//         <img
//           src={current.image_url}
//           alt={language === "en" ? current.title_en : current.title_te}
//           className="w-full h-64 object-cover"
//         />
//       ) : (
//         <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
//           No image
//         </div>
//       )}

//       {/* Overlay */}
//       <div className="absolute left-4 bottom-4 right-4 bg-gradient-to-t from-black/70 to-transparent p-4 rounded">
//         <div className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-bold rounded">
//           {language === "en" ? "FEATURE" : "హైలైట్"}
//         </div>
//         <h2 className="text-xl md:text-2xl font-bold text-white mt-2">
//           {language === "en" ? current.title_en : current.title_te}
//         </h2>

//         {current.updated_at || current.created_at ? (
//           <p className="text-gray-300 text-xs mt-1">
//             {formatDate(current.updated_at || current.created_at)}
//           </p>
//         ) : null}

//         <p className="text-sm text-gray-200 mt-2 line-clamp-2">
//           {language === "en" ? current.summary_en : current.summary_te}
//         </p>

//         {/* ✅ Read More button */}
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             navigate(`/articles/${current.id}`);
//           }}
//           className="mt-3 inline-block bg-white text-red-600 px-4 py-1 rounded font-semibold hover:bg-gray-100"
//         >
//           {language === "te" ? "మరిన్ని చదవండి →" : "Read more →"}
//         </button>
//       </div>

//       {/* Controls */}
//       <div className="absolute bottom-3 right-4 flex items-center gap-3 bg-black/40 px-3 py-2 rounded-full">
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setIndex((i) => (i - 1 + items.length) % items.length);
//           }}
//           className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-full hover:bg-gray-200"
//         >
//           ◀
//         </button>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setIndex((i) => (i + 1) % items.length);
//           }}
//           className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-full hover:bg-gray-200"
//         >
//           ▶
//         </button>
//         <div className="flex gap-2 ml-2">
//           {items.map((_, i) => (
//             <button
//               key={i}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setIndex(i);
//               }}
//               className={`w-2.5 h-2.5 rounded-full ${
//                 i === index ? "bg-red-600" : "bg-gray-300"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// /**
//  * HomePage
//  */
// export default function HomePage() {
//   const { language } = useLanguage();
//   const [articles, setArticles] = useState([]);

//   async function fetchArticles() {
//     const { data } = await supabase
//       .from("articles")
//       .select("*")
//       .order("created_at", { ascending: false });
//     setArticles(data || []);
//   }

//   useEffect(() => {
//     fetchArticles();
//     const channel = supabase
//       .channel("articles-updates")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "articles" },
//         () => fetchArticles()
//       )
//       .subscribe();
//     return () => supabase.removeChannel(channel);
//   }, []);

//   const sliderItems = articles.slice(0, 5);
//   const rest = articles.slice(5);

//   return (
    
//     <div className="md:flex md:gap-6">
//       <div className="md:flex-1">
//         <Slider items={sliderItems} language={language} />

//         <section className="mt-6">
//           <h2 className="text-2xl font-bold mb-4">
//             {language === "te" ? "తాజా వార్తలు" : "Latest News"}
//           </h2>
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {rest.map((a) => (
//               <ArticleCard key={a.id} article={a} />
//             ))}
//           </div>
//         </section>
//       </div>
//       <Sidebar />
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { formatDate } from "../utils/date";
import MetaTags from "../components/MetaTags";   // ✅ SEO
import SelfAd from "../components/SelfAd";       // ✅ Self ads
import GoogleAds from "../components/GoogleAds"; // ✅ Google ads

// function Slider({ items = [], language = "en" }) {
//   const [index, setIndex] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!items || items.length <= 1) return;
//     const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 4500);
//     return () => clearInterval(id);
//   }, [items]);

//   if (!items || items.length === 0) return null;
//   const current = items[index];

//   return (
//     <div
//       className="w-full mb-6 relative rounded-lg overflow-hidden cursor-pointer"
//       onClick={() => navigate(`/articles/${current.id}`)}
//     >
//       {current.image_url ? (
//         <img
//           src={current.image_url}
//           alt={language === "en" ? current.title_en : current.title_te}
//           className="w-full h-64 object-cover"
//         />
//       ) : (
//         <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
//           No image
//         </div>
//       )}
//       <div className="absolute left-4 bottom-4 right-4 bg-gradient-to-t from-black/70 to-transparent p-4 rounded">
//         <div className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-bold rounded">
//           {language === "en" ? "FEATURE" : "హైలైట్"}
//         </div>
//         <h2 className="text-xl md:text-2xl font-bold text-white mt-2">
//           {language === "en" ? current.title_en : current.title_te}
//         </h2>
//         {current.updated_at || current.created_at ? (
//           <p className="text-gray-300 text-xs mt-1">
//             {formatDate(current.updated_at || current.created_at)}
//           </p>
//         ) : null}
//         <p className="text-sm text-gray-200 mt-2 line-clamp-2">
//           {language === "en" ? current.summary_en : current.summary_te}
//         </p>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             navigate(`/articles/${current.id}`);
//           }}
//           className="mt-3 inline-block bg-white text-red-600 px-4 py-1 rounded font-semibold hover:bg-gray-100"
//         >
//           {language === "te" ? "మరిన్ని చదవండి →" : "Read more →"}
//         </button>
//       </div>
//     </div>
//   );
// }

function Slider({ items = [], language = "en" }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!items || items.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 4500);
    return () => clearInterval(id);
  }, [items]);

  if (!items || items.length === 0) return null;
  const current = items[index];

  return (
    <div
      className="w-full mb-6 relative rounded-lg overflow-hidden cursor-pointer"
      onClick={() => navigate(`/articles/${current.id}`)}
    >
      {/* Image */}
      {current.image_url ? (
        <img
          src={current.image_url}
          alt={language === "en" ? current.title_en : current.title_te}
          className="w-full h-64 object-cover"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
          No image
        </div>
      )}

      {/* Overlay */}
      <div className="absolute left-4 bottom-4 right-4 bg-gradient-to-t from-black/70 to-transparent p-4 rounded">
        <div className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-bold rounded">
          {language === "en" ? "FEATURE" : "హైలైట్"}
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white mt-2">
          {language === "en" ? current.title_en : current.title_te}
        </h2>

        {current.updated_at || current.created_at ? (
          <p className="text-gray-300 text-xs mt-1">
            {formatDate(current.updated_at || current.created_at)}
          </p>
        ) : null}

        <p className="text-sm text-gray-200 mt-2 line-clamp-2">
          {language === "en" ? current.summary_en : current.summary_te}
        </p>

        {/* Read More button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/articles/${current.id}`);
          }}
          className="mt-3 inline-block bg-white text-red-600 px-4 py-1 rounded font-semibold hover:bg-gray-100"
        >
          {language === "te" ? "మరిన్ని చదవండి →" : "Read more →"}
        </button>
      </div>

      {/* Controls (arrows + dots) */}
      <div className="absolute bottom-3 right-4 flex items-center gap-3 bg-black/40 px-3 py-2 rounded-full">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIndex((i) => (i - 1 + items.length) % items.length);
          }}
          className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-full hover:bg-gray-200"
        >
          ◀
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIndex((i) => (i + 1) % items.length);
          }}
          className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-full hover:bg-gray-200"
        >
          ▶
        </button>
        <div className="flex gap-2 ml-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
              }}
              className={`w-2.5 h-2.5 rounded-full ${
                i === index ? "bg-red-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { language } = useLanguage();
  const [articles, setArticles] = useState([]);

  async function fetchArticles() {
    const { data } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    setArticles(data || []);
  }

  useEffect(() => {
    fetchArticles();
    const channel = supabase
      .channel("articles-updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "articles" },
        () => fetchArticles()
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  const sliderItems = articles.slice(0, 5);
  const rest = articles.slice(5);

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <MetaTags
        title={language === "te" ? "తాజా వార్తలు - నా వార్తా సైట్" : "Latest News - My News Site"}
        description={language === "te" ? "ఇప్పుడే తాజా వార్తలు చదవండి" : "Read the latest news now"}
      />

      <div className="md:flex md:gap-6">
        <div className="md:flex-1">
          <Slider items={sliderItems} language={language} />

          {/* ✅ Ads after slider */}
          <div className="my-4">
            <SelfAd />
            <GoogleAds slot="homepage_top" />
          </div>

          <section className="mt-6">
            <h2 className="text-2xl font-bold mb-4">
              {language === "te" ? "తాజా వార్తలు" : "Latest News"}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </section>

          {/* ✅ Ads after articles */}
          <div className="my-6">
            <SelfAd />
            <GoogleAds slot="homepage_bottom" />
          </div>
        </div>

        <Sidebar />
      </div>
    </>
  );
}
