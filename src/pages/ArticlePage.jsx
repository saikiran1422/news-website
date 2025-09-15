

// // src/pages/ArticlePage.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { supabase } from "../lib/supabaseClient";
// import { useLanguage } from "../context/LanguageContext";
// import { FiShare2 } from "react-icons/fi";

// export default function ArticlePage() {
//   const { id } = useParams();
//   const { language } = useLanguage();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);

//   async function fetchArticle() {
//     const { data, error } = await supabase
//       .from("articles")
//       .select("*, categories(id, name, name_te)")
//       .eq("id", Number(id))
//       .single();
//     if (!error && data) setArticle(data);
//   }

//   useEffect(() => {
//     async function fetchAndIncrement() {
//       try {
//         if (!sessionStorage.getItem(`viewed-${id}`)) {
//           sessionStorage.setItem(`viewed-${id}`, "true");
//           await supabase.rpc("increment_view_count", { article_id: Number(id) });
//         }
//         await fetchArticle();
//       } catch (err) {
//         console.error("Unexpected error:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchAndIncrement();

//     const channel = supabase
//       .channel(`article-${id}`)
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "articles", filter: `id=eq.${id}` },
//         () => fetchArticle()
//       )
//       .subscribe();

//     return () => supabase.removeChannel(channel);
//   }, [id]);

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (!article) return <div className="text-center py-10">Article not found</div>;

//   const title = language === "en" ? article.title_en : article.title_te;
//   const content = language === "en" ? article.content_en : article.content_te;
//   const categoryName =
//     language === "te"
//       ? article.categories?.name_te || article.categories?.name
//       : article.categories?.name || "";

//   const published = article.updated_at || article.created_at
//     ? new Date(article.updated_at || article.created_at).toLocaleString("en-US", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       })
//     : "";

//   const renderContent = (text) => {
//     if (!text) return null;
//     return text.split("\n").map((line, i) => {
//       const youtubeMatch = line.match(/https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/\S+/);
//       if (youtubeMatch) {
//         const url = youtubeMatch[0];
//         let embedUrl = url;
//         if (url.includes("watch?v=")) {
//           embedUrl = `https://www.youtube.com/embed/${url.split("v=")[1].split("&")[0]}`;
//         }
//         if (url.includes("youtu.be/")) {
//           embedUrl = `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
//         }
//         return (
//           <div key={i} className="my-4">
//             <iframe
//               className="w-full h-64 md:h-96 rounded"
//               src={embedUrl}
//               allowFullScreen
//               title="YouTube"
//             />
//           </div>
//         );
//       }
//       return (
//         <p key={i} className="mb-3 whitespace-pre-line">
//           {line}
//         </p>
//       );
//     });
//   };

//   return (
//     <article className="bg-white p-6 rounded-lg shadow">
//       {/* Breadcrumb */}
//       <nav className="mb-3 text-sm text-gray-500">
//         <Link to="/">Home</Link> ›{" "}
//         {article.categories && (
//           <Link to={`/category/${article.category_id}`}>{categoryName}</Link>
//         )} › <span className="text-gray-700">{title}</span>
//       </nav>

//       {/* Title Row */}
//       <div className="flex items-center justify-between gap-4 mb-2">
//         <h1 className="text-3xl font-bold">{title}</h1>

//         {/* ✅ Share button on right */}
//         <button
//           onClick={async () => {
//             const shareUrl = `${window.location.origin}/articles/${article.id}`;
//             try {
//               if (navigator.share) {
//                 await navigator.share({ title, url: shareUrl });
//               } else {
//                 await navigator.clipboard.writeText(`${title}\n${shareUrl}`);
//                 alert(language === "te" ? "లింక్ కాపీ చేయబడింది" : "Link copied");
//               }
//             } catch {
//               alert(language === "te" ? "షేర్ విఫలమైంది" : "Share failed");
//             }
//           }}
//           className="text-blue-900 hover:text-red-600"
//           aria-label="Share"
//         >
//           <FiShare2 size={22} />
//         </button>
//       </div>

//       {/* Category + Published Date */}
//       <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
//         <div>{categoryName}</div>
//         {/* ✅ Published date on left side */}
//         <div>{published}</div>
//       </div>

//       {/* Image */}
//       {article.image_url && (
//         <img
//           src={article.image_url}
//           alt={title}
//           className="w-full h-64 object-cover rounded mb-4"
//         />
//       )}

//       {/* Content */}
//       <div className="prose max-w-none mb-6">{renderContent(content)}</div>
//     </article>
//   );
// }

// // //articlepage
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { supabase } from "../lib/supabaseClient";
// import { useLanguage } from "../context/LanguageContext";
// import { FiShare2 } from "react-icons/fi";
// import { formatDate } from "../utils/date"; // ✅ added

// export default function ArticlePage() {
//   const { id } = useParams();
//   const { language } = useLanguage();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);

//   async function fetchArticle() {
//     const { data, error } = await supabase
//       .from("articles")
//       .select("*, categories(id, name, name_te)")
//       .eq("id", Number(id))
//       .single();
//     if (!error && data) setArticle(data);
//   }

//   useEffect(() => {
//     async function fetchAndIncrement() {
//       try {
//         if (!sessionStorage.getItem(`viewed-${id}`)) {
//           sessionStorage.setItem(`viewed-${id}`, "true");
//           await supabase.rpc("increment_view_count", { article_id: Number(id) });
//         }
//         await fetchArticle();
//       } catch (err) {
//         console.error("Unexpected error:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchAndIncrement();

//     const channel = supabase
//       .channel(`article-${id}`)
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "articles", filter: `id=eq.${id}` },
//         () => fetchArticle()
//       )
//       .subscribe();
//     return () => supabase.removeChannel(channel);
//   }, [id]);

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (!article) return <div className="text-center py-10">Article not found</div>;

//   const title = language === "en" ? article.title_en : article.title_te;
//   const content = language === "en" ? article.content_en : article.content_te;
//   const categoryName =
//     language === "te"
//       ? article.categories?.name_te || article.categories?.name
//       : article.categories?.name || "";

//   const published = formatDate(article.updated_at || article.created_at); // ✅ fixed

//   const renderContent = (text) => {
//     if (!text) return null;
//     return text.split("\n").map((line, i) => {
//       const youtubeMatch = line.match(/https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/\S+/);
//       if (youtubeMatch) {
//         const url = youtubeMatch[0];
//         let embedUrl = url;
//         if (url.includes("watch?v=")) {
//           embedUrl = `https://www.youtube.com/embed/${url.split("v=")[1].split("&")[0]}`;
//         }
//         if (url.includes("youtu.be/")) {
//           embedUrl = `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
//         }
//         return (
//           <div key={i} className="my-4">
//             <iframe
//               className="w-full h-64 md:h-96 rounded"
//               src={embedUrl}
//               allowFullScreen
//               title="YouTube"
//             />
//           </div>
//         );
//       }
//       return (
//         <p key={i} className="mb-3 whitespace-pre-line">
//           {line}
//         </p>
//       );
//     });
//   };

//   return (
//     <article className="bg-white p-6 rounded-lg shadow">
//       {/* Breadcrumb */}
//       <nav className="mb-3 text-sm text-gray-500">
//         <Link to="/">{language === "te" ? "హోమ్" : "Home"}</Link> ›{" "}
//         {article.categories && (
//           <Link to={`/category/${article.category_id}`}>{categoryName}</Link>
//         )} › <span className="text-gray-700">{title}</span>
//       </nav>

//       {/* Title Row */}
//       <div className="flex items-center justify-between gap-4 mb-2">
//         <h1 className="text-3xl font-bold">{title}</h1>
//         <button
//           onClick={async () => {
//             const shareUrl = `${window.location.origin}/articles/${article.id}`;
//             try {
//               if (navigator.share) {
//                 await navigator.share({ title, url: shareUrl });
//               } else {
//                 await navigator.clipboard.writeText(`${title}\n${shareUrl}`);
//                 alert(language === "te" ? "లింక్ కాపీ చేయబడింది" : "Link copied");
//               }
//             } catch {
//               alert(language === "te" ? "షేర్ విఫలమైంది" : "Share failed");
//             }
//           }}
//           className="text-blue-900 hover:text-red-600"
//           aria-label="Share"
//         >
//           <FiShare2 size={22} />
//         </button>
//       </div>

//       {/* Category + Published Date */}
//       <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
//         <div>{categoryName}</div>
//         <div>{published}</div>
//       </div>

//       {article.image_url ? (
//   <img
//     src={article.image_url}
//     alt={title}
//     onError={(e) => { e.target.src = "/placeholder-600x400.png"; }}
//     className="w-full max-h-96 object-contain rounded mb-4 bg-gray-100"
//   />
// ) : (
//   <div className="w-full max-h-96 flex items-center justify-center bg-gray-200 text-gray-500 rounded mb-4">
//     No image
//   </div>
// )}
//     </article>
//   );
// }

// //articlepage

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { supabase } from "../lib/supabaseClient";
// import { useLanguage } from "../context/LanguageContext";
// import { FiShare2 } from "react-icons/fi";
// import { formatDate } from "../utils/date";
// import MetaTags from "../components/MetaTags";
// import SelfAd from "../components/SelfAd";
// import GoogleAds from "../components/GoogleAds";

// export default function ArticlePage() {
//   const { id } = useParams();
//   const { language } = useLanguage();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);

//   async function fetchArticle() {
//     const { data, error } = await supabase
//       .from("articles")
//       .select("*, categories(id, name, name_te)")
//       .eq("id", Number(id))
//       .single();
//     if (!error && data) setArticle(data);
//   }

//   useEffect(() => {
//     async function fetchAndIncrement() {
//       try {
//         if (!sessionStorage.getItem(`viewed-${id}`)) {
//           sessionStorage.setItem(`viewed-${id}`, "true");
//           await supabase.rpc("increment_view_count", { article_id: Number(id) });
//         }
//         await fetchArticle();
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchAndIncrement();

//     const channel = supabase
//       .channel(`article-${id}`)
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "articles", filter: `id=eq.${id}` },
//         () => fetchArticle()
//       )
//       .subscribe();
//     return () => supabase.removeChannel(channel);
//   }, [id]);

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (!article) return <div className="text-center py-10">Article not found</div>;

//   const title = language === "en" ? article.title_en : article.title_te;
//   const content = language === "en" ? article.content_en : article.content_te;
//   const categoryName =
//     language === "te"
//       ? article.categories?.name_te || article.categories?.name
//       : article.categories?.name || "";
//   const published = formatDate(article.updated_at || article.created_at);

//   return (
//     <article className="bg-white p-6 rounded-lg shadow">
//       {/* ✅ SEO MetaTags */}
//       <MetaTags title={title} description={content?.slice(0, 150)} image={article.image_url} />

//       <nav className="mb-3 text-sm text-gray-500">
//         <Link to="/">{language === "te" ? "హోమ్" : "Home"}</Link> ›{" "}
//         {article.categories && <Link to={`/category/${article.category_id}`}>{categoryName}</Link>} ›{" "}
//         <span className="text-gray-700">{title}</span>
//       </nav>

//       <div className="flex items-center justify-between gap-4 mb-2">
//         <h1 className="text-3xl font-bold">{title}</h1>
//         <button
//           onClick={async () => {
//             const shareUrl = `${window.location.origin}/articles/${article.id}`;
//             try {
//               if (navigator.share) {
//                 await navigator.share({ title, url: shareUrl });
//               } else {
//                 await navigator.clipboard.writeText(`${title}\n${shareUrl}`);
//                 alert(language === "te" ? "లింక్ కాపీ చేయబడింది" : "Link copied");
//               }
//             } catch {
//               alert(language === "te" ? "షేర్ విఫలమైంది" : "Share failed");
//             }
//           }}
//           className="text-blue-900 hover:text-red-600"
//           aria-label="Share"
//         >
//           <FiShare2 size={22} />
//         </button>
//       </div>

//       <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
//         <div>{categoryName}</div>
//         <div>{published}</div>
//       </div>

//       {article.image_url ? (
//         <img
//           src={article.image_url}
//           alt={title}
//           onError={(e) => {
//             e.target.src = "/placeholder-600x400.png";
//           }}
//           className="w-full max-h-96 object-contain rounded mb-4 bg-gray-100"
//         />
//       ) : (
//         <div className="w-full max-h-96 flex items-center justify-center bg-gray-200 text-gray-500 rounded mb-4">
//           No image
//         </div>
//       )}

//       {/* ✅ Ads after image */}
//       <div className="my-4">
//         <SelfAd />
//         <GoogleAds slot="article_top" />
//       </div>

//       <div className="prose max-w-none mb-6 whitespace-pre-line">{content}</div>

//       {/* ✅ Ads after content */}
//       <div className="my-6">
//         <SelfAd />
//         <GoogleAds slot="article_bottom" />
//       </div>
//     </article>
//   );
// }

//articlepage

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useLanguage } from "../context/LanguageContext";
import { FiShare2 } from "react-icons/fi";
import { formatDate } from "../utils/date";
import MetaTags from "../components/MetaTags";
import SelfAd from "../components/SelfAd";
import GoogleAds from "../components/GoogleAds";

export default function ArticlePage() {
  const { id } = useParams();
  const { language } = useLanguage();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchArticle() {
    const { data, error } = await supabase
      .from("articles")
      .select("*, categories(id, name, name_te)")
      .eq("id", Number(id))
      .single();
    if (!error && data) setArticle(data);
  }

  useEffect(() => {
    async function fetchAndIncrement() {
      try {
        if (!sessionStorage.getItem(`viewed-${id}`)) {
          sessionStorage.setItem(`viewed-${id}`, "true");
          await supabase.rpc("increment_view_count", { article_id: Number(id) });
        }
        await fetchArticle();
      } finally {
        setLoading(false);
      }
    }
    fetchAndIncrement();

    const channel = supabase
      .channel(`article-${id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "articles", filter: `id=eq.${id}` },
        () => fetchArticle()
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!article) return <div className="text-center py-10">Article not found</div>;

  const title = language === "en" ? article.title_en : article.title_te;
  const content = language === "en" ? article.content_en : article.content_te;
  const categoryName =
    language === "te"
      ? article.categories?.name_te || article.categories?.name
      : article.categories?.name || "";
  const published = formatDate(article.updated_at || article.created_at);

  // ✅ Function to handle text, YouTube links, and image links
  const renderContent = (text) => {
    if (!text) return null;
    return text.split("\n").map((line, i) => {
      // YouTube Embed
      const youtubeMatch = line.match(/https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/\S+/);
      if (youtubeMatch) {
        const url = youtubeMatch[0];
        let embedUrl = url;
        if (url.includes("watch?v=")) {
          embedUrl = `https://www.youtube.com/embed/${url.split("v=")[1].split("&")[0]}`;
        }
        if (url.includes("youtu.be/")) {
          embedUrl = `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
        }
        return (
          <div key={i} className="my-4">
            <iframe
              className="w-full h-64 md:h-96 rounded"
              src={embedUrl}
              allowFullScreen
              title="YouTube"
            />
          </div>
        );
      }

      // Image Embed
      const imageMatch = line.match(/https?:\/\/\S+\.(jpg|jpeg|png|gif|webp)/i);
      if (imageMatch) {
        return (
          <div key={i} className="my-4">
            <img
              src={imageMatch[0]}
              alt="Article content"
              className="w-full rounded"
              loading="lazy"
            />
          </div>
        );
      }

      // Normal Text
      return (
        <p key={i} className="mb-3 whitespace-pre-line">
          {line}
        </p>
      );
    });
  };

  return (
    <article className="bg-white p-6 rounded-lg shadow">
      {/* ✅ SEO MetaTags */}
      <MetaTags title={title} description={content?.slice(0, 150)} image={article.image_url} />

      <nav className="mb-3 text-sm text-gray-500">
        <Link to="/">{language === "te" ? "హోమ్" : "Home"}</Link> ›{" "}
        {article.categories && <Link to={`/category/${article.category_id}`}>{categoryName}</Link>} ›{" "}
        <span className="text-gray-700">{title}</span>
      </nav>

      <div className="flex items-center justify-between gap-4 mb-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <button
          onClick={async () => {
            const shareUrl = `${window.location.origin}/articles/${article.id}`;
            try {
              if (navigator.share) {
                await navigator.share({ title, url: shareUrl });
              } else {
                await navigator.clipboard.writeText(`${title}\n${shareUrl}`);
                alert(language === "te" ? "లింక్ కాపీ చేయబడింది" : "Link copied");
              }
            } catch {
              alert(language === "te" ? "షేర్ విఫలమైంది" : "Share failed");
            }
          }}
          className="text-blue-900 hover:text-red-600"
          aria-label="Share"
        >
          <FiShare2 size={22} />
        </button>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
        <div>{categoryName}</div>
        <div>{published}</div>
      </div>

      {article.image_url ? (
        <img
          src={article.image_url}
          alt={title}
          onError={(e) => {
            e.target.src = "/placeholder-600x400.png";
          }}
          className="w-full max-h-96 object-contain rounded mb-4 bg-gray-100"
        />
      ) : (
        <div className="w-full max-h-96 flex items-center justify-center bg-gray-200 text-gray-500 rounded mb-4">
          No image
        </div>
      )}

      {/* ✅ Ads after image */}
      <div className="my-4">
        <SelfAd />
        <GoogleAds slot="article_top" />
      </div>

      {/* ✅ Render content with YouTube + images */}
      <div className="prose max-w-none mb-6">{renderContent(content)}</div>

      {/* ✅ Ads after content */}
      <div className="my-6">
        <SelfAd />
        <GoogleAds slot="article_bottom" />
      </div>
    </article>
  );
}
