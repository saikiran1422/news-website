// // src/components/ArticleCard.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

// export default function ArticleCard({ article, language = "en" }) {
//   if (!article) return null;

//   const title = language === "en" ? article.title_en : article.title_te;
//   const summary = language === "en" ? article.summary_en : article.summary_te;
//   const image = article.image_url || "/placeholder-600x400.png";
//   const shareUrl = `${window.location.origin}/articles/${article.id}`;
//   const shareText = encodeURIComponent(title || "");

//   return (
//     <article className="bg-white border rounded-lg overflow-hidden hover:shadow-xl hover:border-red-500 transition-all duration-200">
//       <Link to={`/articles/${article.id}`} className="block">
//         <img src={image} alt={title} className="w-full h-44 object-cover" />
//       </Link>

//       <div className="p-4">
//         <Link to={`/articles/${article.id}`} className="text-lg font-semibold hover:text-red-600">
//           {title || "Untitled"}
//         </Link>

//         <p className="text-gray-600 mt-2 text-sm line-clamp-3">{summary || ""}</p>

//         <div className="mt-4 flex items-center justify-between">
//           <Link to={`/articles/${article.id}`} className="text-red-600 font-medium hover:underline">
//             Read more →
//           </Link>

//           <div className="flex items-center gap-3 text-xl">
//             <a
//               href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
//               target="_blank"
//               rel="noreferrer"
//               className="text-blue-600 hover:opacity-80"
//               aria-label="Share on Facebook"
//             >
//               <FaFacebook />
//             </a>
//             <a
//               href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`}
//               target="_blank"
//               rel="noreferrer"
//               className="text-sky-500 hover:opacity-80"
//               aria-label="Share on Twitter"
//             >
//               <FaTwitter />
//             </a>
//             <a
//               href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
//               target="_blank"
//               rel="noreferrer"
//               className="text-blue-700 hover:opacity-80"
//               aria-label="Share on LinkedIn"
//             >
//               <FaLinkedin />
//             </a>
//             <a
//               href={`https://wa.me/?text=${encodeURIComponent(title + " " + shareUrl)}`}
//               target="_blank"
//               rel="noreferrer"
//               className="text-green-500 hover:opacity-80"
//               aria-label="Share on WhatsApp"
//             >
//               <FaWhatsapp />
//             </a>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }


//src/components/ArticleCard.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
// import { useLanguage } from "../context/LanguageContext";

// export default function ArticleCard({ article }) {
//   const { language } = useLanguage();
//   const title = language === "en" ? article.title_en : article.title_te;
//   const summary = language === "en" ? article.summary_en : article.summary_te;
//   const image = article.image_url || "/placeholder-600x400.png";

//   const shareUrl = `${window.location.origin}/articles/${article.id}`;
//   const shareText = encodeURIComponent(title || "");

//   return (
//     <article className="bg-white border rounded-lg overflow-hidden hover:shadow-xl hover:border-red-500 transition-all duration-200">
//       <Link to={`/articles/${article.id}`}>
//         <img src={image} alt={title} className="w-full h-44 object-cover" />
//       </Link>

//       <div className="p-4">
//         <Link
//           to={`/articles/${article.id}`}
//           className="text-lg font-semibold hover:text-red-600"
//         >
//           {title || "Untitled"}
//         </Link>

//         <p className="text-gray-600 mt-2 text-sm line-clamp-3">
//           {summary || ""}
//         </p>

//         <div className="mt-4 flex items-center justify-between">
//           <Link
//             to={`/articles/${article.id}`}
//             className="text-red-600 font-medium hover:underline"
//           >
//             Read more →
//           </Link>

//           <div className="flex items-center gap-3 text-xl">
//             <a
//               href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//                 shareUrl
//               )}`}
//               target="_blank"
//               rel="noreferrer"
//               className="text-blue-600 hover:opacity-80"
//             >
//               <FaFacebook />
//             </a>
//             <a
//               href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
//                 shareUrl
//               )}&text=${shareText}`}
//               target="_blank"
//               rel="noreferrer"
//               className="text-sky-500 hover:opacity-80"
//             >
//               <FaTwitter />
//             </a>
//             <a
//               href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//                 shareUrl
//               )}`}
//               target="_blank"
//               rel="noreferrer"
//               className="text-blue-700 hover:opacity-80"
//             >
//               <FaLinkedin />
//             </a>
//             <a
//               href={`https://wa.me/?text=${encodeURIComponent(
//                 title + " " + shareUrl
//               )}`}
//               target="_blank"
//               rel="noreferrer"
//               className="text-green-500 hover:opacity-80"
//             >
//               <FaWhatsapp />
//             </a>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }

// src/components/ArticleCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

export default function ArticleCard({ article }) {
  const { language } = useLanguage();
  const title = language === "en" ? article.title_en : article.title_te;
  const summary = language === "en" ? article.summary_en : article.summary_te;
  const image = article.image_url || "/placeholder-600x400.png";

  const shareUrl = `${window.location.origin}/articles/${article.id}`;
  const shareText = encodeURIComponent(title || "");

  return (
    <article className="bg-white border rounded-lg overflow-hidden hover:shadow-xl hover:border-red-500 transition-all duration-200">
      <Link to={`/articles/${article.id}`}>
        <img src={image} alt={title} className="w-full h-44 object-cover" />
      </Link>

      <div className="p-4">
        <Link
          to={`/articles/${article.id}`}
          className="text-lg font-semibold hover:text-red-600"
        >
          {title || "Untitled"}
        </Link>

        <p className="text-gray-600 mt-2 text-sm line-clamp-3">
          {summary || ""}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <Link
            to={`/articles/${article.id}`}
            className="text-red-600 font-medium hover:underline"
          >
            {language === "te" ? "మరిన్ని చదవండి →" : "Read more →"}
          </Link>

          <div className="flex items-center gap-3 text-xl">
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
        </div>
      </div>
    </article>
  );
}
