// // src/pages/ArticlePage.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { supabase } from "../lib/supabaseClient";

// export default function ArticlePage({ articles = [] }) {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // try to find in loaded list first
//     const found = articles.find((a) => String(a.id) === String(id));
//     if (found) {
//       setArticle(found);
//       setLoading(false);
//       return;
//     }

//     // fallback: fetch single article from Supabase
//     (async () => {
//       const { data, error } = await supabase
//         .from("articles")
//         .select("*, categories(id, name)")
//         .eq("id", id)
//         .single();

//       if (error) {
//         console.error("fetch single article:", error);
//       } else {
//         setArticle(data);
//       }
//       setLoading(false);
//     })();
//   }, [id, articles]);

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (!article) return <div className="text-center py-10">Article not found</div>;

//   return (
//     <article className="bg-white p-6 rounded-lg shadow">
//       <button onClick={() => navigate(-1)} className="mb-4 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
//         ← Back
//       </button>

//       <h1 className="text-3xl font-bold mb-3">{article.title_en}</h1>
//       {article.image_url && <img src={article.image_url} alt={article.title_en} className="w-full h-64 object-cover rounded mb-4" />}
//       <div className="prose max-w-none">
//         <p>{article.content_en}</p>
//       </div>
//     </article>
//   );
// }


// src/pages/ArticlePage.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { supabase } from "../lib/supabaseClient";
// import { useLanguage } from "../context/LanguageContext";

// export default function ArticlePage({ articles = [] }) {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { language } = useLanguage(); // ✅ use language context
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // try to find in loaded list first
//     const found = articles.find((a) => String(a.id) === String(id));
//     if (found) {
//       setArticle(found);
//       setLoading(false);
//       return;
//     }

//     // fallback: fetch single article from Supabase
//     (async () => {
//       const { data, error } = await supabase
//         .from("articles")
//         .select("*, categories(id, name)")
//         .eq("id", id)
//         .single();

//       if (error) {
//         console.error("fetch single article:", error);
//       } else {
//         setArticle(data);
//       }
//       setLoading(false);
//     })();
//   }, [id, articles]);

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (!article) return <div className="text-center py-10">Article not found</div>;

//   return (
//     <article className="bg-white p-6 rounded-lg shadow">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
//       >
//         ← {language === "te" ? "వెనక్కి" : "Back"}
//       </button>

//       <h1 className="text-3xl font-bold mb-3">
//         {article[`title_${language}`]}
//       </h1>

//       {article.image_url && (
//         <img
//           src={article.image_url}
//           alt={article[`title_${language}`]}
//           className="w-full h-64 object-cover rounded mb-4"
//         />
//       )}

//       <div className="prose max-w-none">
//         <p>{article[`content_${language}`]}</p>
//       </div>
//     </article>
//   );
// }


// src/pages/ArticlePage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useLanguage } from "../context/LanguageContext";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function ArticlePage({ articles = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = articles.find((a) => String(a.id) === String(id));
    if (found) {
      setArticle(found);
      setLoading(false);
      return;
    }

    (async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*, categories(id, name, name_te)")
        .eq("id", id)
        .single();

      if (error) {
        console.error("fetch single article:", error);
      } else {
        setArticle(data);
      }
      setLoading(false);
    })();
  }, [id, articles]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!article) return <div className="text-center py-10">Article not found</div>;

  const title = language === "en" ? article.title_en : article.title_te;
  const content = language === "en" ? article.content_en : article.content_te;

  const shareUrl = `${window.location.origin}/articles/${article.id}`;
  const shareText = encodeURIComponent(title || "");

  return (
    <article className="bg-white p-6 rounded-lg shadow">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
      >
        ← {language === "te" ? "వెనక్కి" : "Back"}
      </button>

      <h1 className="text-3xl font-bold mb-3">{title}</h1>

      {article.image_url && (
        <img
          src={article.image_url}
          alt={title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      <div className="prose max-w-none mb-6">
        <p>{content}</p>
      </div>

      {/* ✅ Social share icons */}
      <div className="flex items-center gap-4 text-2xl">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:opacity-80"
        >
          <FaFacebook />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            shareUrl
          )}&text=${shareText}`}
          target="_blank"
          rel="noreferrer"
          className="text-sky-500 hover:opacity-80"
        >
          <FaTwitter />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            shareUrl
          )}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-700 hover:opacity-80"
        >
          <FaLinkedin />
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(
            title + " " + shareUrl
          )}`}
          target="_blank"
          rel="noreferrer"
          className="text-green-500 hover:opacity-80"
        >
          <FaWhatsapp />
        </a>
      </div>
    </article>
  );
}
