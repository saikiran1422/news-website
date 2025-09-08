// src/components/Hero.jsx
// import React from "react";
// import { Link } from "react-router-dom";

// export default function Hero({ article, language = "en" }) {
//   if (!article) return null;

//   const title = language === "en" ? article.title_en : article.title_te;
//   const summary = language === "en" ? article.summary_en : article.summary_te;
//   const image = article.image_url || "";

//   return (
//     <section className="mb-6">
//       <div className="relative rounded-lg overflow-hidden">
//         {image ? (
//           <img src={image} alt={title} className="w-full h-72 object-cover" />
//         ) : (
//           <div className="w-full h-72 bg-gray-200 flex items-center justify-center text-gray-500">No image</div>
//         )}

//         <div className="absolute left-4 bottom-4 right-4 bg-gradient-to-t from-black/70 to-transparent p-4 rounded">
//           <div className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-bold rounded">BREAKING</div>
//           <h1 className="text-xl md:text-3xl font-bold text-white mt-2">{title || "Untitled"}</h1>
//           <p className="text-sm text-gray-200 mt-2 line-clamp-2">{summary || ""}</p>
//           <div className="mt-3">
//             <Link to={`/articles/${article.id}`} className="inline-block bg-white text-red-600 px-4 py-2 rounded font-semibold hover:bg-gray-100">
//               Read more
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// src/components/Hero.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";

// export default function Hero({ article }) {
//   const { language } = useLanguage();

//   if (!article) return null;

//   const title = language === "en" ? article.title_en : article.title_te;
//   const summary = language === "en" ? article.summary_en : article.summary_te;
//   const image = article.image_url || "";

//   return (
//     <section className="mb-6">
//       <div className="relative rounded-lg overflow-hidden">
//         {image ? (
//           <img src={image} alt={title} className="w-full h-72 object-cover" />
//         ) : (
//           <div className="w-full h-72 bg-gray-200 flex items-center justify-center text-gray-500">
//             No image
//           </div>
//         )}

//         <div className="absolute left-4 bottom-4 right-4 bg-gradient-to-t from-black/70 to-transparent p-4 rounded">
//           <div className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-bold rounded">
//             {language === "te" ? "తాజా వార్త" : "BREAKING"}
//           </div>
//           <h1 className="text-xl md:text-3xl font-bold text-white mt-2">{title || "Untitled"}</h1>
//           <p className="text-sm text-gray-200 mt-2 line-clamp-2">{summary || ""}</p>
//           <div className="mt-3">
//             <Link
//               to={`/articles/${article.id}`}
//               className="inline-block bg-white text-red-600 px-4 py-2 rounded font-semibold hover:bg-gray-100"
//             >
//               {language === "te" ? "మరిన్ని చదవండి →" : "Read more →"}
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// src/components/Hero.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function Hero({ article }) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  if (!article) return null;

  const title = language === "en" ? article.title_en : article.title_te;
  const summary = language === "en" ? article.summary_en : article.summary_te;
  const image = article.image_url || "";

  const handleClick = () => {
    navigate(`/articles/${article.id}`);
  };

  return (
    <section className="mb-6 cursor-pointer" onClick={handleClick}>
      <div className="relative rounded-lg overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-72 object-cover" />
        ) : (
          <div className="w-full h-72 bg-gray-200 flex items-center justify-center text-gray-500">
            No image
          </div>
        )}

        <div className="absolute left-4 bottom-4 right-4 bg-gradient-to-t from-black/70 to-transparent p-4 rounded">
          <div className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-bold rounded">
            {language === "en" ? "BREAKING" : "తాజా"}
          </div>
          <h1 className="text-xl md:text-3xl font-bold text-white mt-2">{title || "Untitled"}</h1>
          <p className="text-sm text-gray-200 mt-2 line-clamp-2">{summary || ""}</p>
          <div className="mt-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="inline-block bg-white text-red-600 px-4 py-2 rounded font-semibold hover:bg-gray-100"
            >
              {language === "en" ? "Read more" : "మరిన్ని చదవండి"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
