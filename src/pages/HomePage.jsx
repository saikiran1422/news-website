// import React, { useMemo, useState, useEffect } from "react";
// import ArticleCard from "../components/ArticleCard";
// import Sidebar from "../components/Sidebar";
// import { useLanguage } from "../context/LanguageContext";
// import { Link } from "react-router-dom";

// /**
//  * Simple Slider component
//  */
// function Slider({ items = [], language = "en" }) {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     if (!items || items.length <= 1) return;
//     const id = setInterval(() => {
//       setIndex((i) => (i + 1) % items.length);
//     }, 4500);
//     return () => clearInterval(id);
//   }, [items]);

//   if (!items || items.length === 0) return null;

//   const current = items[index];

//   return (
//     <div className="w-full mb-6">
//       <div
//         className="relative rounded-lg overflow-hidden cursor-pointer"
//         onClick={() => (window.location.href = `/articles/${current.id}`)}
//       >
//         {current.image_url ? (
//           <img
//             src={current.image_url}
//             alt={language === "en" ? current.title_en : current.title_te}
//             className="w-full h-64 object-cover"
//           />
//         ) : (
//           <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
//             No image
//           </div>
//         )}

//         <div className="absolute left-4 bottom-4 right-4 bg-gradient-to-t from-black/70 to-transparent p-4 rounded">
//           <div className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-bold rounded">
//             {language === "en" ? "FEATURE" : "హైలైట్"}
//           </div>
//           <h2 className="text-xl md:text-2xl font-bold text-white mt-2">
//             {language === "en" ? current.title_en : current.title_te}
//           </h2>
//           <p className="text-sm text-gray-200 mt-2 line-clamp-2">
//             {language === "en" ? current.summary_en : current.summary_te}
//           </p>

//           {/* Controls */}
//           <div className="mt-3 flex items-center gap-2">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setIndex((idx) => (idx - 1 + items.length) % items.length);
//               }}
//               className="px-2 py-1 bg-white/20 text-white rounded"
//             >
//               ◀
//             </button>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setIndex((idx) => (idx + 1) % items.length);
//               }}
//               className="px-2 py-1 bg-white/20 text-white rounded"
//             >
//               ▶
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* dots */}
//       <div className="flex items-center justify-center gap-2 mt-3">
//         {items.map((it, i) => (
//           <button
//             key={it.id}
//             onClick={() => setIndex(i)}
//             className={`w-2 h-2 rounded-full ${
//               i === index ? "bg-blue-900" : "bg-gray-300"
//             }`}
//             aria-label={`Go to slide ${i + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function HomePage({ articles = [], categories = [] }) {
//   const { language } = useLanguage();

//   const latest = useMemo(() => {
//     const copy = Array.isArray(articles) ? [...articles] : [];
//     return copy.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//   }, [articles]);

//   const sliderItems = latest.slice(0, 5);
//   const rest = latest.slice(5); // exclude those in slider

//   return (
//     <div className="md:flex md:gap-6">
//       <div className="md:flex-1">
//         {/* Slider */}
//         <Slider items={sliderItems} language={language} />

//         {/* Latest News Section */}
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

//       {/* Sidebar → now gets full articles list */}
//       <Sidebar articles={articles} />
//     </div>
//   );
// }

// import React, { useMemo, useState, useEffect } from "react";
// import ArticleCard from "../components/ArticleCard";
// import Sidebar from "../components/Sidebar";
// import { useLanguage } from "../context/LanguageContext";

// /**
//  * Slider
//  */
// function Slider({ items = [], language = "en" }) {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     if (!items || items.length <= 1) return;
//     const id = setInterval(() => {
//       setIndex((i) => (i + 1) % items.length);
//     }, 4500);
//     return () => clearInterval(id);
//   }, [items]);

//   if (!items || items.length === 0) return null;
//   const current = items[index];

//   return (
//     <div className="w-full mb-6">
//       <div
//         className="relative rounded-lg overflow-hidden cursor-pointer"
//         onClick={() => (window.location.href = `/articles/${current.id}`)}
//       >
//         {current.image_url ? (
//           <img
//             src={current.image_url}
//             alt={language === "en" ? current.title_en : current.title_te}
//             className="w-full h-64 object-cover"
//           />
//         ) : (
//           <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
//             No image
//           </div>
//         )}

//         <div className="absolute left-4 bottom-4 right-4 bg-gradient-to-t from-black/70 to-transparent p-4 rounded">
//           <div className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-bold rounded">
//             {language === "en" ? "FEATURE" : "హైలైట్"}
//           </div>
//           <h2 className="text-xl md:text-2xl font-bold text-white mt-2">
//             {language === "en" ? current.title_en : current.title_te}
//           </h2>
//           <p className="text-sm text-gray-200 mt-2 line-clamp-2">
//             {language === "en" ? current.summary_en : current.summary_te}
//           </p>
//           <button className="mt-2 bg-white text-blue-900 px-3 py-1 rounded text-sm font-semibold">
//             {language === "te" ? "మరిన్ని చదవండి" : "Read more"}
//           </button>

//           <div className="mt-3 flex items-center gap-2">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setIndex((idx) => (idx - 1 + items.length) % items.length);
//               }}
//               className="px-2 py-1 bg-white/20 text-white rounded"
//             >
//               ◀
//             </button>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setIndex((idx) => (idx + 1) % items.length);
//               }}
//               className="px-2 py-1 bg-white/20 text-white rounded"
//             >
//               ▶
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center justify-center gap-2 mt-3">
//         {items.map((it, i) => (
//           <button
//             key={it.id}
//             onClick={() => setIndex(i)}
//             className={`w-2 h-2 rounded-full ${
//               i === index ? "bg-blue-900" : "bg-gray-300"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function HomePage({ articles = [], categories = [] }) {
//   const { language } = useLanguage();

//   const latest = useMemo(() => {
//     return [...articles].sort(
//       (a, b) => new Date(b.created_at) - new Date(a.created_at)
//     );
//   }, [articles]);

//   const sliderItems = latest.slice(0, 5);
//   const rest = latest.slice(5);

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
//       <Sidebar articles={articles} />
//     </div>
//   );
// }

// import React, { useMemo, useState, useEffect } from "react";
// import ArticleCard from "../components/ArticleCard";
// import Sidebar from "../components/Sidebar";
// import { useLanguage } from "../context/LanguageContext";

// /**
//  * Slider Component
//  */
// function Slider({ items = [], language = "en" }) {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     if (!items || items.length <= 1) return;
//     const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 4500);
//     return () => clearInterval(id);
//   }, [items]);

//   if (!items || items.length === 0) return null;
//   const current = items[index];

//   return (
//     <div className="w-full mb-6">
//       <div
//         className="relative rounded-lg overflow-hidden cursor-pointer"
//         onClick={() => (window.location.href = `/articles/${current.id}`)}
//       >
//         {current.image_url ? (
//           <img
//             src={current.image_url}
//             alt={language === "en" ? current.title_en : current.title_te}
//             className="w-full h-64 object-cover"
//           />
//         ) : (
//           <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
//             No image
//           </div>
//         )}

//         <div className="absolute left-4 bottom-4 right-4 bg-gradient-to-t from-black/70 to-transparent p-4 rounded">
//           <div className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-bold rounded">
//             {language === "en" ? "FEATURE" : "హైలైట్"}
//           </div>
//           <h2 className="text-xl md:text-2xl font-bold text-white mt-2">
//             {language === "en" ? current.title_en : current.title_te}
//           </h2>
//           <p className="text-sm text-gray-200 mt-2 line-clamp-2">
//             {language === "en" ? current.summary_en : current.summary_te}
//           </p>

//           {/* red read button */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               window.location.href = `/articles/${current.id}`;
//             }}
//             className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold"
//           >
//             {language === "te" ? "మరిన్ని చదవండి" : "Read more"}
//           </button>
//         </div>

//         {/* right-side stacked arrows */}
//         <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-20">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setIndex((idx) => (idx - 1 + items.length) % items.length);
//             }}
//             className="w-10 h-10 bg-white/80 text-black rounded flex items-center justify-center shadow"
//             aria-label="Prev slide"
//           >
//             ◀
//           </button>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setIndex((idx) => (idx + 1) % items.length);
//             }}
//             className="w-10 h-10 bg-white/80 text-black rounded flex items-center justify-center shadow"
//             aria-label="Next slide"
//           >
//             ▶
//           </button>
//         </div>
//       </div>

//       <div className="flex items-center justify-center gap-2 mt-3">
//         {items.map((it, i) => (
//           <button
//             key={it.id}
//             onClick={() => setIndex(i)}
//             className={`w-2 h-2 rounded-full ${i === index ? "bg-blue-900" : "bg-gray-300"}`}
//             aria-label={`Go to slide ${i + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


// export default function HomePage({ articles = [], categories = [] }) {
//   const { language } = useLanguage();

//   const latest = useMemo(
//     () =>
//       [...articles].sort(
//         (a, b) => new Date(b.created_at) - new Date(a.created_at)
//       ),
//     [articles]
//   );

//   const sliderItems = latest.slice(0, 5);
//   const rest = latest.slice(5);

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

//       <Sidebar articles={articles} />
//     </div>
//   );
// }


// // src/pages/HomePage.jsx
// import React, { useMemo, useState, useEffect } from "react";
// import ArticleCard from "../components/ArticleCard";
// import Sidebar from "../components/Sidebar";
// import { useLanguage } from "../context/LanguageContext";
// import { useNavigate } from "react-router-dom";

// /**
//  * Slider Component
//  */
// function Slider({ items = [], language = "en" }) {
//   const [index, setIndex] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!items || items.length <= 1) return;
//     const id = setInterval(() => {
//       setIndex((i) => (i + 1) % items.length);
//     }, 4500);
//     return () => clearInterval(id);
//   }, [items]);

//   if (!items || items.length === 0) return null;

//   const current = items[index];

//   return (
//     <div className="w-full mb-6 relative rounded-lg overflow-hidden cursor-pointer">
//       {/* Slide Image */}
//       {current.image_url ? (
//         <img
//           src={current.image_url}
//           alt={language === "en" ? current.title_en : current.title_te}
//           className="w-full h-64 object-cover"
//           onClick={() => navigate(`/articles/${current.id}`)}
//         />
//       ) : (
//         <div
//           className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500"
//           onClick={() => navigate(`/articles/${current.id}`)}
//         >
//           No image
//         </div>
//       )}

//       {/* Overlay Content */}
//       <div className="absolute left-4 bottom-4 right-4 bg-gradient-to-t from-black/70 to-transparent p-4 rounded">
//         <div className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-bold rounded">
//           {language === "en" ? "FEATURE" : "హైలైట్"}
//         </div>
//         <h2 className="text-xl md:text-2xl font-bold text-white mt-2">
//           {language === "en" ? current.title_en : current.title_te}
//         </h2>
//         <p className="text-sm text-gray-200 mt-2 line-clamp-2">
//           {language === "en" ? current.summary_en : current.summary_te}
//         </p>

//         {/* Read more button */}
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             navigate(`/articles/${current.id}`);
//           }}
//           className="mt-3 inline-block bg-red-600 text-white px-4 py-1 rounded font-semibold hover:bg-red-700"
//         >
//           {language === "en" ? "Read more →" : "చదవండి →"}
//         </button>
//       </div>

//       {/* Right-side arrows */}
//       <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-20">
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setIndex((idx) => (idx - 1 + items.length) % items.length);
//           }}
//           className="w-8 h-8 bg-white/80 text-black rounded-full flex items-center justify-center shadow hover:bg-white"
//           aria-label="Previous slide"
//         >
//           ◀
//         </button>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setIndex((idx) => (idx + 1) % items.length);
//           }}
//           className="w-8 h-8 bg-white/80 text-black rounded-full flex items-center justify-center shadow hover:bg-white"
//           aria-label="Next slide"
//         >
//           ▶
//         </button>
//       </div>

//       {/* dots */}
//       <div className="flex items-center justify-center gap-2 mt-3">
//         {items.map((it, i) => (
//           <button
//             key={it.id}
//             onClick={() => setIndex(i)}
//             className={`w-2 h-2 rounded-full ${
//               i === index ? "bg-blue-900" : "bg-gray-300"
//             }`}
//             aria-label={`Go to slide ${i + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function HomePage({ articles = [], categories = [] }) {
//   const { language } = useLanguage();

//   const latest = useMemo(() => {
//     const copy = Array.isArray(articles) ? [...articles] : [];
//     return copy.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//   }, [articles]);

//   const sliderItems = latest.slice(0, 5);
//   const rest = latest.slice(5); // exclude those in slider

//   return (
//     <div className="md:flex md:gap-6">
//       <div className="md:flex-1">
//         {/* Slider */}
//         <Slider items={sliderItems} language={language} />

//         {/* Latest News Section */}
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

//       {/* Sidebar */}
//       <Sidebar articles={articles} />
//     </div>
//   );
// }

// // src/pages/HomePage.jsx
// import React, { useMemo, useState, useEffect } from "react";
// import ArticleCard from "../components/ArticleCard";
// import Sidebar from "../components/Sidebar";
// import { useLanguage } from "../context/LanguageContext";
// import { useNavigate, Link } from "react-router-dom";

// /**
//  * Format date as "13 September 2025, 10:05"
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
//  * Slider Component
//  */
// function Slider({ items = [], language = "en" }) {
//   const [index, setIndex] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!items || items.length <= 1) return;
//     const id = setInterval(() => {
//       setIndex((i) => (i + 1) % items.length);
//     }, 4500);
//     return () => clearInterval(id);
//   }, [items]);

//   if (!items || items.length === 0) return null;
//   const current = items[index];

//   return (
//     <div className="w-full mb-6 relative rounded-lg overflow-hidden cursor-pointer">
//       {/* Slide Image */}
//       {current.image_url ? (
//         <img
//           src={current.image_url}
//           alt={language === "en" ? current.title_en : current.title_te}
//           className="w-full h-64 object-cover"
//           onClick={() => navigate(`/articles/${current.id}`)}
//         />
//       ) : (
//         <div
//           className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500"
//           onClick={() => navigate(`/articles/${current.id}`)}
//         >
//           No image
//         </div>
//       )}

//       {/* Overlay Content */}
//       <div className="absolute left-4 bottom-4 right-4 bg-gradient-to-t from-black/70 to-transparent p-4 rounded">
//         <div className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-bold rounded">
//           {language === "en" ? "FEATURE" : "హైలైట్"}
//         </div>

//         <h2 className="text-xl md:text-2xl font-bold text-white mt-2">
//           {language === "en" ? current.title_en : current.title_te}
//         </h2>

//         {/* ✅ Published Date */}
//         {(
//     current.updated_at || current.created_at) && (
//           <p className="text-gray-300 text-xs mt-1">
//             {formatDate(current.updated_at ||current.created_at)}
//           </p>
//         )}

//         <p className="text-sm text-gray-200 mt-2 line-clamp-2">
//           {language === "en" ? current.summary_en : current.summary_te}
//         </p>

//         {/* ✅ Read more button → white bg, red text */}
//         <Link
//           to={`/articles/${current.id}`}
//           onClick={(e) => e.stopPropagation()}
//           className="mt-3 inline-block bg-white text-red-600 px-4 py-1 rounded font-semibold hover:bg-gray-100"
//         >
//           {language === "en" ? "Read more →" : "చదవండి →"}
//         </Link>
//       </div>

//       {/* ✅ Bottom controls: arrows + dots grouped */}
//       <div className="absolute bottom-3 right-4 flex items-center gap-3 bg-black/40 px-3 py-2 rounded-full">
//         {/* Arrows */}
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setIndex((idx) => (idx - 1 + items.length) % items.length);
//           }}
//           className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-full hover:bg-gray-200"
//         >
//           ◀
//         </button>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setIndex((idx) => (idx + 1) % items.length);
//           }}
//           className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-full hover:bg-gray-200"
//         >
//           ▶
//         </button>

//         {/* Dots */}
//         <div className="flex gap-2 ml-2">
//           {items.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setIndex(i)}
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
//  * Home Page
//  */
// export default function HomePage({ articles = [], categories = [] }) {
//   const { language } = useLanguage();

//   const latest = useMemo(() => {
//     const copy = Array.isArray(articles) ? [...articles] : [];
//     return copy.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//   }, [articles]);

//   const sliderItems = latest.slice(0, 5);
//   const rest = latest.slice(5); // exclude slider items

//   return (
//     <div className="md:flex md:gap-6">
//       <div className="md:flex-1">
//         {/* Slider */}
//         <Slider items={sliderItems} language={language} />

//         {/* Latest News Section */}
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

//       {/* Sidebar */}
//       <Sidebar articles={articles} />
//     </div>
//   );
// }

// //Homepage
// import React, { useMemo, useState, useEffect } from "react";
// import ArticleCard from "../components/ArticleCard";
// import Sidebar from "../components/Sidebar";
// import { useLanguage } from "../context/LanguageContext";
// import { useNavigate, Link } from "react-router-dom";

// /**
//  * Format date as "13 September 2025, 10:05"
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
//  * Slider Component
//  */
// function Slider({ items = [], language = "en" }) {
//   const [index, setIndex] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!items || items.length <= 1) return;
//     const id = setInterval(() => {
//       setIndex((i) => (i + 1) % items.length);
//     }, 4500);
//     return () => clearInterval(id);
//   }, [items]);

//   if (!items || items.length === 0) return null;
//   const current = items[index];

//   return (
//     <div
//       className="w-full mb-6 relative rounded-lg overflow-hidden cursor-pointer"
//       onClick={() => navigate(`/articles/${current.id}`)}
//     >
//       {/* Slide Image */}
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

//       {/* Overlay Content */}
//       <div className="absolute left-4 bottom-4 right-4 bg-gradient-to-t from-black/70 to-transparent p-4 rounded">
//         <div className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-bold rounded">
//           {language === "en" ? "FEATURE" : "హైలైట్"}
//         </div>

//         <h2 className="text-xl md:text-2xl font-bold text-white mt-2">
//           {language === "en" ? current.title_en : current.title_te}
//         </h2>

//         {/* Published Date */}
//         {(current.updated_at || current.created_at) && (
//           <p className="text-gray-300 text-xs mt-1">
//             {formatDate(current.updated_at || current.created_at)}
//           </p>
//         )}

//         <p className="text-sm text-gray-200 mt-2 line-clamp-2">
//           {language === "en" ? current.summary_en : current.summary_te}
//         </p>

//         {/* Read more button */}
//         <Link
//           to={`/articles/${current.id}`}
//           onClick={(e) => e.stopPropagation()}
//           className="mt-3 inline-block bg-white text-red-600 px-4 py-1 rounded font-semibold hover:bg-gray-100"
//         >
//           {language === "en" ? "Read more →" : "చదవండి →"}
//         </Link>
//       </div>

//       {/* Controls */}
//       <div className="absolute bottom-3 right-4 flex items-center gap-3 bg-black/40 px-3 py-2 rounded-full">
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setIndex((idx) => (idx - 1 + items.length) % items.length);
//           }}
//           className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-full hover:bg-gray-200"
//         >
//           ◀
//         </button>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setIndex((idx) => (idx + 1) % items.length);
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
//  * Home Page
//  */
// export default function HomePage({ articles = [], categories = [] }) {
//   const { language } = useLanguage();

//   const latest = useMemo(() => {
//     const copy = Array.isArray(articles) ? [...articles] : [];
//     return copy.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//   }, [articles]);

//   const sliderItems = latest.slice(0, 5);
//   const rest = latest.slice(5);

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

// // src/pages/HomePage.jsx
// import React, { useMemo, useState, useEffect } from "react";
// import ArticleCard from "../components/ArticleCard";
// import Sidebar from "../components/Sidebar";
// import { useLanguage } from "../context/LanguageContext";
// import { useNavigate, Link } from "react-router-dom";
// import { supabase } from "../lib/supabaseClient";

// /**
//  * Format date as "13 September 2025, 10:05"
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
//  * Slider Component
//  */
// function Slider({ items = [], language = "en" }) {
//   const [index, setIndex] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!items || items.length <= 1) return;
//     const id = setInterval(() => {
//       setIndex((i) => (i + 1) % items.length);
//     }, 4500);
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

//         {(current.updated_at || current.created_at) && (
//           <p className="text-gray-300 text-xs mt-1">
//             {formatDate(current.updated_at || current.created_at)}
//           </p>
//         )}

//         <p className="text-sm text-gray-200 mt-2 line-clamp-2">
//           {language === "en" ? current.summary_en : current.summary_te}
//         </p>

//         <Link
//           to={`/articles/${current.id}`}
//           onClick={(e) => e.stopPropagation()}
//           className="mt-3 inline-block bg-white text-red-600 px-4 py-1 rounded font-semibold hover:bg-gray-100"
//         >
//           {language === "en" ? "Read more →" : "చదవండి →"}
//         </Link>
//       </div>

//       <div className="absolute bottom-3 right-4 flex items-center gap-3 bg-black/40 px-3 py-2 rounded-full">
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setIndex((idx) => (idx - 1 + items.length) % items.length);
//           }}
//           className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-full hover:bg-gray-200"
//         >
//           ◀
//         </button>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setIndex((idx) => (idx + 1) % items.length);
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
//  * Home Page
//  */
// export default function HomePage() {
//   const { language } = useLanguage();
//   const [articles, setArticles] = useState([]);

//   // 🔄 Real-time fetch
//   useEffect(() => {
//     async function fetchArticles() {
//       const { data } = await supabase
//         .from("articles")
//         .select("*")
//         .order("created_at", { ascending: false });
//       setArticles(data || []);
//     }
//     fetchArticles();

//     // Supabase real-time
//     const channel = supabase
//       .channel("articles-changes")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "articles" },
//         () => {
//           fetchArticles();
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   const latest = useMemo(() => {
//     return [...articles].sort(
//       (a, b) => new Date(b.created_at) - new Date(a.created_at)
//     );
//   }, [articles]);

//   const sliderItems = latest.slice(0, 5);
//   const rest = latest.slice(5);

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
//homepage
import React, { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

/**
 * Format date like: "13 September 2025, 10:05"
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Slider
 */
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
//       </div>
/**
 * Slider
 */
function Slider({ items = [], language = "en" }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!items || items.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      4500
    );
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

        {/* ✅ Read More button */}
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

      {/* Controls … (unchanged) */}

      {/* Controls */}
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

/**
 * HomePage
 */
export default function HomePage() {
  const { language } = useLanguage();
  const [articles, setArticles] = useState([]);

  // Fetch all articles
  async function fetchArticles() {
    const { data } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    setArticles(data || []);
  }

  useEffect(() => {
    fetchArticles();

    // Realtime subscription
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
    <div className="md:flex md:gap-6">
      <div className="md:flex-1">
        <Slider items={sliderItems} language={language} />

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
      </div>
      <Sidebar />
    </div>
  );
}
