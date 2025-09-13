// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FiShare2 } from "react-icons/fi";

// export default function ArticleCard({ article }) {
//   const { language } = useLanguage();
//   const navigate = useNavigate();

//   const title = language === "en" ? article.title_en : article.title_te;
//   const summary = language === "en" ? article.summary_en : article.summary_te;
//   const image = article.image_url || "/placeholder-600x400.png";

//   const shareUrl = `${window.location.origin}/articles/${article.id}`;
//   const shareText = title || "";

//   const handleShare = async (e) => {
//     e.stopPropagation();
//     try {
//       if (navigator.share) {
//         await navigator.share({ title: shareText, url: shareUrl });
//         return;
//       }
//       await navigator.clipboard.writeText(`${title}\n${shareUrl}`);
//       alert(language === "te" ? "లింక్ కాపీ చేయబడింది" : "Link copied");
//     } catch (err) {
//       alert(language === "te" ? "షేర్ విఫలమైంది" : "Share failed");
//     }
//   };

//   return (
//     <article
//       onClick={() => navigate(`/articles/${article.id}`)}
//       className="bg-white border rounded-lg overflow-hidden hover:shadow-xl cursor-pointer transition-all duration-200"
//     >
//       <img src={image} alt={title} className="w-full h-44 object-cover" />

//       <div className="p-4">
//         <h2 className="text-lg font-semibold hover:text-red-600">{title}</h2>
//         <p className="text-gray-600 mt-2 text-sm line-clamp-3">{summary}</p>

//         <div className="mt-4 flex items-center justify-between">
//           <span className="text-red-600 font-medium hover:underline">
//             {language === "te" ? "మరిన్ని చదవండి →" : "Read more →"}
//           </span>
//           <button
//             onClick={handleShare}
//             className="text-blue-900 hover:text-red-600"
//             aria-label="Share"
//           >
//             <FiShare2 size={18} />
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// }
// //articlecard
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FiShare2 } from "react-icons/fi";

// export default function ArticleCard({ article }) {
//   const { language } = useLanguage();
//   const navigate = useNavigate();

//   const title = language === "en" ? article.title_en : article.title_te;
//   const summary = language === "en" ? article.summary_en : article.summary_te;
//   const image = article.image_url || "/placeholder-600x400.png";

//   const shareUrl = `${window.location.origin}/articles/${article.id}`;

//   const handleShare = async (e) => {
//     e.stopPropagation();
//     try {
//       if (navigator.share) {
//         await navigator.share({ title, url: shareUrl });
//         return;
//       }
//       await navigator.clipboard.writeText(`${title}\n${shareUrl}`);
//       alert(language === "te" ? "లింక్ కాపీ చేయబడింది" : "Link copied");
//     } catch {
//       alert(language === "te" ? "షేర్ విఫలమైంది" : "Share failed");
//     }
//   };

//   return (
//     <article
//       onClick={() => navigate(`/articles/${article.id}`)}
//       className="bg-white border rounded-lg overflow-hidden hover:shadow-xl cursor-pointer transition-all duration-200"
//     >
//       <img src={image} alt={title} className="w-full h-44 object-cover" />
//       <div className="p-4">
//         <h2 className="text-lg font-semibold hover:text-red-600">{title}</h2>
//         <p className="text-gray-600 mt-2 text-sm line-clamp-3">{summary}</p>
//         <div className="mt-4 flex items-center justify-between">
//           <span className="text-red-600 font-medium hover:underline">
//             {language === "te" ? "మరిన్ని చదవండి →" : "Read more →"}
//           </span>
//           <button
//             onClick={handleShare}
//             className="text-blue-900 hover:text-red-600"
//             aria-label="Share"
//           >
//             <FiShare2 size={18} />
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// }

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FiShare2 } from "react-icons/fi";

// export default function ArticleCard({ article }) {
//   const { language } = useLanguage();
//   const navigate = useNavigate();

//   const title = language === "en" ? article.title_en : article.title_te;
//   const summary = language === "en" ? article.summary_en : article.summary_te;
//   const image = article.image_url || "/placeholder-600x400.png";

//   const published = article.created_at
//     ? new Date(article.created_at).toLocaleString("en-US", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       })
//     : "";

//   const shareUrl = `${window.location.origin}/articles/${article.id}`;

//   const handleShare = async (e) => {
//     e.stopPropagation();
//     try {
//       if (navigator.share) {
//         await navigator.share({ title, url: shareUrl });
//         return;
//       }
//       await navigator.clipboard.writeText(`${title}\n${shareUrl}`);
//       alert(language === "te" ? "లింక్ కాపీ చేయబడింది" : "Link copied");
//     } catch {
//       alert(language === "te" ? "షేర్ విఫలమైంది" : "Share failed");
//     }
//   };

//   return (
//     <article
//       onClick={() => navigate(`/articles/${article.id}`)}
//       className="bg-white border rounded-lg overflow-hidden hover:shadow-xl cursor-pointer transition-all duration-200"
//     >
//       <img src={image} alt={title} className="w-full h-44 object-cover" />
//       <div className="p-4">
//         <h2 className="text-lg font-semibold hover:text-red-600">{title}</h2>
//         <p className="text-gray-600 mt-2 text-sm line-clamp-3">{summary}</p>

//         {/* Published time */}
//         {published && (
//           <p className="text-xs text-gray-500 mt-2">{published}</p>
//         )}

//         <div className="mt-3 flex items-center justify-between">
//           <span className="text-red-600 font-medium hover:underline">
//             {language === "te" ? "మరిన్ని చదవండి →" : "Read more →"}
//           </span>
//           <button
//             onClick={handleShare}
//             className="text-blue-900 hover:text-red-600"
//             aria-label="Share"
//           >
//             <FiShare2 size={18} />
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// }

// //articlecard
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FiShare2 } from "react-icons/fi";

// export default function ArticleCard({ article }) {
//   const { language } = useLanguage();
//   const navigate = useNavigate();

//   const title = language === "en" ? article.title_en : article.title_te;
//   const summary = language === "en" ? article.summary_en : article.summary_te;
//   const image = article.image_url || "/placeholder-600x400.png";

//   // ✅ Show updated_at if present
//   const published = article.updated_at || article.created_at
//     ? new Date(article.updated_at || article.created_at).toLocaleString("en-US", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       })
//     : "";

//   const shareUrl = `${window.location.origin}/articles/${article.id}`;

//   const handleShare = async (e) => {
//     e.stopPropagation();
//     try {
//       if (navigator.share) {
//         await navigator.share({ title, url: shareUrl });
//         return;
//       }
//       await navigator.clipboard.writeText(`${title}\n${shareUrl}`);
//       alert(language === "te" ? "లింక్ కాపీ చేయబడింది" : "Link copied");
//     } catch {
//       alert(language === "te" ? "షేర్ విఫలమైంది" : "Share failed");
//     }
//   };

//   return (
//     <article
//       onClick={() => navigate(`/articles/${article.id}`)}
//       className="bg-white border rounded-lg overflow-hidden hover:shadow-xl cursor-pointer transition-all duration-200"
//     >
//       <img src={image} alt={title} className="w-full h-44 object-cover" />
//       <div className="p-4">
//         <h2 className="text-lg font-semibold hover:text-red-600">{title}</h2>
//         <p className="text-gray-600 mt-2 text-sm line-clamp-3">{summary}</p>
//         <div className="mt-4 flex items-center justify-between">
//           <span className="text-sm text-gray-500">{published}</span>
//           <button
//             onClick={handleShare}
//             className="text-blue-900 hover:text-red-600"
//             aria-label="Share"
//           >
//             <FiShare2 size={18} />
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// }

//articlecard

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FiShare2 } from "react-icons/fi";

// export default function ArticleCard({ article }) {
//   const { language } = useLanguage();
//   const navigate = useNavigate();

//   const title = language === "en" ? article.title_en : article.title_te;
//   const summary = language === "en" ? article.summary_en : article.summary_te;
//   const image = article.image_url || "/placeholder-600x400.png";

//   const published = article.updated_at || article.created_at
//     ? new Date(article.updated_at || article.created_at).toLocaleString("en-US", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       })
//     : "";

//   const shareUrl = `${window.location.origin}/articles/${article.id}`;

//   const handleShare = async (e) => {
//     e.stopPropagation();
//     try {
//       if (navigator.share) {
//         await navigator.share({ title, url: shareUrl });
//         return;
//       }
//       await navigator.clipboard.writeText(`${title}\n${shareUrl}`);
//       alert(language === "te" ? "లింక్ కాపీ చేయబడింది" : "Link copied");
//     } catch {
//       alert(language === "te" ? "షేర్ విఫలమైంది" : "Share failed");
//     }
//   };

//   return (
//     <article
//       onClick={() => navigate(`/articles/${article.id}`)}
//       className="bg-white border rounded-lg overflow-hidden hover:shadow-xl cursor-pointer transition-all duration-200"
//     >
//       <img src={image} alt={title} className="w-full h-44 object-cover" />
//       <div className="p-4">
//         <h2 className="text-lg font-semibold hover:text-red-600">{title}</h2>
//         <p className="text-gray-600 mt-2 text-sm line-clamp-3">{summary}</p>
//         <div className="mt-4 flex items-center justify-between">
//           <span className="text-sm text-gray-500">{published}</span>
//           <button
//             onClick={handleShare}
//             className="text-blue-900 hover:text-red-600"
//             aria-label="Share"
//           >
//             <FiShare2 size={18} />
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// }

// // src/components/ArticleCard.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";
// import { FiShare2 } from "react-icons/fi";

// export default function ArticleCard({ article }) {
//   const { language } = useLanguage();
//   const navigate = useNavigate();

//   const title = language === "en" ? article.title_en : article.title_te;
//   const summary = language === "en" ? article.summary_en : article.summary_te;
//   const image = article.image_url || "/placeholder-600x400.png";

//   const published = article.updated_at || article.created_at
//     ? new Date(article.updated_at || article.created_at).toLocaleString("en-US", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       })
//     : "";

//   const shareUrl = `${window.location.origin}/articles/${article.id}`;

//   const handleShare = async (e) => {
//     e.stopPropagation();
//     try {
//       if (navigator.share) {
//         await navigator.share({ title, url: shareUrl });
//         return;
//       }
//       await navigator.clipboard.writeText(`${title}\n${shareUrl}`);
//       alert(language === "te" ? "లింక్ కాపీ చేయబడింది" : "Link copied");
//     } catch {
//       alert(language === "te" ? "షేర్ విఫలమైంది" : "Share failed");
//     }
//   };

//   return (
//     <article
//       onClick={() => navigate(`/articles/${article.id}`)}
//       className="bg-white border rounded-lg overflow-hidden hover:shadow-xl cursor-pointer transition-all duration-200"
//     >
//       <img src={image} alt={title} className="w-full h-44 object-cover" />
//       <div className="p-4">
//         <h2 className="text-lg font-semibold hover:text-red-600">{title}</h2>
//         <p className="text-gray-600 mt-2 text-sm line-clamp-3">{summary}</p>
//         <div className="mt-4 flex items-center justify-between">
//           <span className="text-sm text-gray-500">{published}</span>
//           <div className="flex items-center gap-3">
//             <span className="text-red-600 font-medium hover:underline">
//               {language === "te" ? "మరిన్ని చదవండి →" : "Read more →"}
//             </span>
//             <button
//               onClick={handleShare}
//               className="text-blue-900 hover:text-red-600"
//               aria-label="Share"
//             >
//               <FiShare2 size={18} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }

import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { FiShare2 } from "react-icons/fi";

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

export default function ArticleCard({ article }) {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const title = language === "en" ? article.title_en : article.title_te;
  const summary = language === "en" ? article.summary_en : article.summary_te;
  const image = article.image_url || "/placeholder-600x400.png";
  const published = formatDate(article.updated_at || article.created_at);
  const shareUrl = `${window.location.origin}/articles/${article.id}`;

  const handleShare = async (e) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({ title, url: shareUrl });
        return;
      }
      await navigator.clipboard.writeText(`${title}\n${shareUrl}`);
      alert(language === "te" ? "లింక్ కాపీ చేయబడింది" : "Link copied");
    } catch {
      alert(language === "te" ? "షేర్ విఫలమైంది" : "Share failed");
    }
  };

  return (
    <article
      onClick={() => navigate(`/articles/${article.id}`)}
      className="bg-white border rounded-lg overflow-hidden hover:shadow-xl cursor-pointer transition-all duration-200"
    >
      <img src={image} alt={title} className="w-full h-44 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold hover:text-red-600">{title}</h2>
        <p className="text-gray-600 mt-2 text-sm line-clamp-3">{summary}</p>

        {/* Published time */}
        {published && (
          <p className="mt-2 text-xs text-gray-500">{published}</p>
        )}

        {/* Bottom row */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-red-600 font-medium hover:underline">
            {language === "te" ? "మరిన్ని చదవండి →" : "Read more →"}
          </span>
          <button
            onClick={handleShare}
            className="text-blue-900 hover:text-red-600"
            aria-label="Share"
          >
            <FiShare2 size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
