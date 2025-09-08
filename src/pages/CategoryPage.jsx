// src/pages/CategoryPage.jsx
// import React from "react";
// import { useParams } from "react-router-dom";
// import ArticleCard from "../components/ArticleCard";

// export default function CategoryPage({ articles = [] }) {
//   const { id } = useParams();
//   const filtered = articles.filter((a) => String(a.category_id) === String(id));

//   if (filtered.length === 0) return <div className="text-center py-10">No articles in this category.</div>;

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">{filtered[0].categories?.name || "Category"}</h1>
//       <div className="grid gap-6 md:grid-cols-2">
//         {filtered.map((a) => <ArticleCard key={a.id} article={a} language="en" />)}
//       </div>
//     </div>
//   );
// }


// src/pages/CategoryPage.jsx
// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import ArticleCard from "../components/ArticleCard";
// import { useLanguage } from "../context/LanguageContext";

// export default function CategoryPage({ articles = [] }) {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { language } = useLanguage();

//   const filtered = articles.filter((a) => String(a.category_id) === String(id));

//   if (filtered.length === 0)
//     return (
//       <div className="text-center py-10">
//         {language === "te" ? "ఈ వర్గంలో వ్యాసాలు లేవు." : "No articles in this category."}
//       </div>
//     );

//   const categoryName = filtered[0].categories
//     ? language === "te"
//       ? filtered[0].categories.name_te || filtered[0].categories.name
//       : filtered[0].categories.name
//     : language === "te"
//     ? "వర్గం"
//     : "Category";

//   return (
//     <div>
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
//       >
//         ← {language === "te" ? "వెనక్కి" : "Back"}
//       </button>

//       <h1 className="text-2xl font-bold mb-4">{categoryName}</h1>

//       <div className="grid gap-6 md:grid-cols-2">
//         {filtered.map((a) => (
//           <ArticleCard key={a.id} article={a} />
//         ))}
//       </div>
//     </div>
//   );
// }

// src/pages/CategoryPage.jsx
// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import ArticleCard from "../components/ArticleCard";
// import { useLanguage } from "../context/LanguageContext";

// export default function CategoryPage({ articles = [] }) {
//   const { language } = useLanguage();
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // Filter articles belonging to this category
//   const filtered = articles.filter(a => String(a.category_id) === String(id));

//   if (filtered.length === 0) 
//     return <div className="text-center py-10">No articles in this category.</div>;

//   // Get category info from first article (assuming all in same category)
//   const category = filtered[0].categories;
//   const categoryName = language === "te" 
//     ? category?.name_te || category?.name
//     : category?.name || "Category";

//   return (
//     <div>
//       {/* Back button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
//       >
//         ← {language === "te" ? "వెనక్కి" : "Back"}
//       </button>

//       {/* Category title */}
//       <h1 className="text-2xl font-bold mb-4">{categoryName}</h1>

//       <div className="grid gap-6 md:grid-cols-2">
//         {filtered.map(a => <ArticleCard key={a.id} article={a} language={language} />)}
//       </div>
//     </div>
//   );
// }


// src/pages/CategoryPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { useLanguage } from "../context/LanguageContext";

export default function CategoryPage({ articles = [] }) {
  const { language } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();

  const filtered = articles.filter(a => String(a.category_id) === String(id));

  if (filtered.length === 0)
    return <div className="text-center py-10">No articles in this category.</div>;

  const category = filtered[0].categories;
  const categoryName = language === "te" 
    ? category?.name_te || category?.name 
    : category?.name || "Category";

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
      >
        ← {language === "te" ? "వెనక్కి" : "Back"}
      </button>

      <h1 className="text-2xl font-bold mb-4">{categoryName}</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map(a => <ArticleCard key={a.id} article={a} language={language} />)}
      </div>
    </div>
  );
}
