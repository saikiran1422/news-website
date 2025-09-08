// src/pages/HomePage.jsx
// import React from "react";
// import Hero from "../components/Hero";
// import ArticleCard from "../components/ArticleCard";
// import Sidebar from "../components/Sidebar";

// export default function HomePage({ articles = [], categories = [] }) {
//   const [hero, ...rest] = articles;
//   const trending = articles.slice(0, 5);

//   return (
//     <div className="md:flex md:gap-6">
//       <div className="md:flex-1">
//         {hero && <Hero article={hero} language="en" />}

//         <section className="mt-6">
//           <h2 className="text-2xl font-bold mb-4">Latest News</h2>
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {rest.map((a) => (
//               <ArticleCard key={a.id} article={a} language="en" />
//             ))}
//           </div>
//         </section>
//       </div>

//       <Sidebar categories={categories} trending={trending} language="en" />
//     </div>
//   );
// }



// src/pages/HomePage.jsx
// import React from "react";
// import Hero from "../components/Hero";
// import ArticleCard from "../components/ArticleCard";
// import Sidebar from "../components/Sidebar";
// import { useLanguage } from "../context/LanguageContext";

// export default function HomePage({ articles = [], categories = [] }) {
//   const { language } = useLanguage(); // use language context
//   const [hero, ...rest] = articles;

//   // Latest 5 articles for trending
//   const trending = articles
//     .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//     .slice(0, 5);

//   return (
//     <div className="md:flex md:gap-6">
//       <div className="md:flex-1">
//         {hero && <Hero article={hero} language={language} />}

//         <section className="mt-6">
//           <h2 className="text-2xl font-bold mb-4">
//             {language === "te" ? "తాజా వార్తలు" : "Latest News"}
//           </h2>
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {rest.map((a) => (
//               <ArticleCard key={a.id} article={a} language={language} />
//             ))}
//           </div>
//         </section>
//       </div>

//       <Sidebar categories={categories} trending={trending} language={language} />
//     </div>
//   );
// }


// src/pages/HomePage.jsx
import React from "react";
import Hero from "../components/Hero";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";
import { useLanguage } from "../context/LanguageContext";

export default function HomePage({ articles = [], categories = [] }) {
  const { language } = useLanguage(); // use language context
  const [hero, ...rest] = articles;

  // Latest 5 articles for trending
  const trending = articles
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return (
    <div className="md:flex md:gap-6">
      <div className="md:flex-1">
        {/* Hero / Breaking Article */}
        {hero && <Hero article={hero} language={language} />}

        {/* Ads Section */}
        {/* <div className="my-6 space-y-4">  */}
          {/* Google Ad Placeholder */}
          {/* <div className="w-full h-24 bg-gray-100 flex items-center justify-center border rounded">
            <span>Google Ad Placeholder</span>
          </div>  */}

          {/* Self Ad Placeholder */}
          {/* <div className="w-full h-24 bg-yellow-100 flex items-center justify-center border rounded">
            <span>Self Ad / Promo Placeholder</span>
            
          </div>
        </div>  */}

        {/* Latest News Section */}
        <section className="mt-6">
          <h2 className="text-2xl font-bold mb-4">
            {language === "te" ? "తాజా వార్తలు" : "Latest News"}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <ArticleCard key={a.id} article={a} language={language} />
            ))}
          </div>
        </section>
      </div>

      {/* Sidebar */}
      <Sidebar categories={categories} trending={trending} language={language} />
    </div>
  );
}
