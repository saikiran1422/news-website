// src/components/Sidebar.jsx
// import React from "react";
// import { Link } from "react-router-dom";

// export default function Sidebar({ categories = [], trending = [] , language = "en"}) {
//   return (
//     <aside className="hidden md:block md:w-64">
//       <div className="bg-white p-4 rounded-lg shadow mb-4">
//         <h3 className="font-bold mb-2">Categories</h3>
//         <ul className="space-y-2">
//           {categories.map((c) => (
//             <li key={c.id}>
//               <Link to={`/category/${c.id}`} className="block px-2 py-1 rounded hover:bg-red-50 hover:text-red-600">
//                 {c.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="bg-white p-4 rounded-lg shadow">
//         <h3 className="font-bold mb-2">Trending</h3>
//         <ul className="space-y-2 text-sm">
//           {trending.map((t) => (
//             <li key={t.id}>
//               <Link to={`/articles/${t.id}`} className="block hover:text-red-600">{language === "en" ? t.title_en : t.title_te}</Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </aside>
//   );
// }



// src/components/Sidebar.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";

// export default function Sidebar({ categories = [], trending = [] }) {
//   const { language } = useLanguage();

//   return (
//     <aside className="hidden md:block md:w-64">
//       <div className="bg-white p-4 rounded-lg shadow mb-4">
//         <h3 className="font-bold mb-2">
//           {language === "te" ? "వర్గాలు" : "Categories"}
//         </h3>
//         <ul className="space-y-2">
//           {categories.map((c) => (
//             <li key={c.id}>
//               <Link
//                 to={`/category/${c.id}`}
//                 className="block px-2 py-1 rounded hover:bg-red-50 hover:text-red-600"
//               >
//                 {language === "te" ? c.name_te || c.name : c.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="bg-white p-4 rounded-lg shadow">
//         <h3 className="font-bold mb-2">
//           {language === "te" ? "ట్రెండింగ్" : "Trending"}
//         </h3>
//         <ul className="space-y-2 text-sm">
//           {trending.map((t) => (
//             <li key={t.id}>
//               <Link
//                 to={`/articles/${t.id}`}
//                 className="block hover:text-red-600"
//               >
//                 {language === "en" ? t.title_en : t.title_te}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </aside>
//   );
// }


// src/components/Sidebar.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";

// export default function Sidebar({ categories = [], trending = [] }) {
//   const { language } = useLanguage();

//   return (
//     <aside className="hidden md:block md:w-64">
//       {/* Categories */}
//       <div className="bg-white p-4 rounded-lg shadow mb-4">
//         <h3 className="font-bold mb-2">
//           {language === "te" ? "వర్గాలు" : "Categories"}
//         </h3>
//         <ul className="space-y-2">
//           {categories.map((c) => (
//             <li key={c.id}>
//               <Link
//                 to={`/category/${c.id}`}
//                 className="block px-2 py-1 rounded hover:bg-red-50 hover:text-red-600"
//               >
//                 {language === "te" ? c.name_te : c.name_en}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Trending */}
//       <div className="bg-white p-4 rounded-lg shadow">
//         <h3 className="font-bold mb-2">
//           {language === "te" ? "ట్రెండింగ్" : "Trending"}
//         </h3>
//         <ul className="space-y-2 text-sm">
//           {trending && trending.length > 0 ? (
//             trending.map((t) => (
//               <li key={t.id}>
//                 <Link
//                   to={`/articles/${t.id}`}
//                   className="block hover:text-red-600"
//                 >
//                   {language === "en" ? t.title_en : t.title_te}
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
//     </aside>
//   );
// }


// src/components/Sidebar.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";

// export default function Sidebar({ categories = [], trending = [] }) {
//   const { language } = useLanguage();

//   return (
//     <aside className="hidden md:block md:w-64">
//       {/* Categories */}
//       <div className="bg-white p-4 rounded-lg shadow mb-4">
//         <h3 className="font-bold mb-2">
//           {language === "te" ? "వర్గాలు" : "Categories"}
//         </h3>
//         <ul className="space-y-2">
//           {categories.map((c) => (
//             <li key={c.id}>
//               <Link
//                 to={`/category/${c.id}`}
//                 className="block px-2 py-1 rounded hover:bg-red-50 hover:text-red-600"
//               >
//                 {language === "te" ? c.name_te || c.name : c.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Trending */}
//       <div className="bg-white p-4 rounded-lg shadow">
//         <h3 className="font-bold mb-2">
//           {language === "te" ? "ట్రెండింగ్" : "Trending"}
//         </h3>
//         <ul className="space-y-2 text-sm">
//           {trending && trending.length > 0 ? (
//             trending.map((t) => (
//               <li key={t.id}>
//                 <Link
//                   to={`/articles/${t.id}`}
//                   className="block hover:text-red-600"
//                 >
//                   {language === "te" ? t.title_te : t.title_en}
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
//     </aside>
//   );
// }


// src/components/Sidebar.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "../context/LanguageContext";

// export default function Sidebar({ categories = [], trending = [] }) {
//   const { language } = useLanguage();

//   // ensure trending is always latest 5
//   const latestTrending = trending
//     .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//     .slice(0, 5);

//   return (
//     <aside className="hidden md:block md:w-64">
//       {/* Categories */}
//       <div className="bg-white p-4 rounded-lg shadow mb-4">
//         <h3 className="font-bold mb-2">
//           {language === "te" ? "వర్గాలు" : "Categories"}
//         </h3>
//         <ul className="space-y-2">
//           {categories.map((c) => (
//             <li key={c.id}>
//               <Link
//                 to={`/category/${c.id}`}
//                 className="block px-2 py-1 rounded hover:bg-red-50 hover:text-red-600"
//               >
//                 {language === "te" ? c.name_te || c.name : c.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Trending */}
//       <div className="bg-white p-4 rounded-lg shadow">
//         <h3 className="font-bold mb-2">
//           {language === "te" ? "ట్రెండింగ్" : "Trending"}
//         </h3>
//         <ul className="space-y-2 text-sm">
//           {latestTrending && latestTrending.length > 0 ? (
//             latestTrending.map((t) => (
//               <li key={t.id}>
//                 <Link
//                   to={`/articles/${t.id}`}
//                   className="block hover:text-red-600"
//                 >
//                   {language === "te" ? t.title_te : t.title_en}
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
//     </aside>
//   );
// }


// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function Sidebar({ categories = [], trending = [] }) {
  const { language } = useLanguage();

  const latestTrending = Array.isArray(trending)
    ? [...trending].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5)
    : [];

  return (
    <aside className="hidden md:block md:w-64">
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h3 className="font-bold mb-2">{language === "te" ? "వర్గాలు" : "Categories"}</h3>
        <ul className="space-y-2">
          {categories && categories.length > 0 ? (
            categories.map((c) => (
              <li key={c.id}>
                <Link to={`/category/${c.id}`} className="block px-2 py-1 rounded hover:bg-red-50 hover:text-red-600">
                  {language === "te" ? c.name_te || c.name : c.name}
                </Link>
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-sm">{language === "te" ? "లభ్యం లేదు" : "No categories"}</li>
          )}
        </ul>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold mb-2">{language === "te" ? "ట్రెండింగ్" : "Trending"}</h3>
        <ul className="space-y-2 text-sm">
          {latestTrending.length > 0 ? (
            latestTrending.map((t) => (
              <li key={t.id}>
                <Link to={`/articles/${t.id}`} className="block hover:text-red-600">
                  {language === "te" ? t.title_te || t.title_en : t.title_en || t.title_te}
                </Link>
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-sm">{language === "te" ? "లభ్యం లేదు" : "No trending"}</li>
          )}
        </ul>
      </div>
    </aside>
  );
}
