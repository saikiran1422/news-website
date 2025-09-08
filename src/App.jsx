// src/App.jsx
// import React, { useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { supabase } from "./lib/supabaseClient";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import HomePage from "./pages/HomePage";
// import ArticlePage from "./pages/ArticlePage";
// import CategoryPage from "./pages/CategoryPage";
// import ErrorBoundary from "./ErrorBoundary";

// export default function App() {
//   const [articles, setArticles] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // fetch articles and categories once
//   useEffect(() => {
//     async function fetchAll() {
//       setLoading(true);
//       // fetch categories
//       const { data: cats } = await supabase.from("categories").select("*").order("id");
//       if (cats) setCategories(cats);

//       // fetch articles with category relation
//       const { data: arts, error } = await supabase
//         .from("articles")
//         .select(`
//           id,
//           title_en,
//           title_te,
//           summary_en,
//           summary_te,
//           content_en,
//           content_te,
//           image_url,
//           category_id,
//           created_at,
//           categories (id, name)
//         `)
//         .order("created_at", { ascending: false });

//       if (error) console.error("fetch articles:", error);
//       else setArticles(arts || []);
//       setLoading(false);
//     }
//     fetchAll();
//   }, []);

//   if (loading) return <div className="text-center mt-10">Loading articles...</div>;

//   return (
//     <ErrorBoundary>
//       <BrowserRouter>
//         <div className="min-h-screen bg-gray-50 text-gray-900">
//           <Header categories={categories} />
//           <main className="max-w-7xl mx-auto p-4 md:p-6">
//             <Routes>
//               <Route path="/" element={<HomePage articles={articles} categories={categories} />} />
//               <Route path="/articles/:id" element={<ArticlePage articles={articles} />} />
//               <Route path="/category/:id" element={<CategoryPage articles={articles} />} />
//             </Routes>
//           </main>
//           <Footer />
//         </div>
//       </BrowserRouter>
//     </ErrorBoundary>
//   );
// }



// // src/App.jsx
// import React, { useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { supabase } from "./lib/supabaseClient";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import HomePage from "./pages/HomePage";
// import ArticlePage from "./pages/ArticlePage";
// import CategoryPage from "./pages/CategoryPage";
// import ErrorBoundary from "./ErrorBoundary";

// export default function App() {
//   const [articles, setArticles] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // fetch articles and categories once
//   useEffect(() => {
//     async function fetchAll() {
//       setLoading(true);
//       // fetch categories
//       const { data: cats } = await supabase.from("categories").select("*").order("id");
//       if (cats) setCategories(cats);

//       // fetch articles with category relation
//       const { data: arts, error } = await supabase
//         .from("articles")
//         .select(`
//           id,
//           title_en,
//           title_te,
//           summary_en,
//           summary_te,
//           content_en,
//           content_te,
//           image_url,
//           category_id,
//           created_at,
//           categories (id, name, name_te)
//         `)
//         .order("created_at", { ascending: false });

//       if (error) console.error("fetch articles:", error);
//       else setArticles(arts || []);
//       setLoading(false);
//     }
//     fetchAll();
//   }, []);

//   // compute trending (latest 5 articles)
//   const trending = articles
//     .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//     .slice(0, 5);

//   if (loading) return <div className="text-center mt-10">Loading articles...</div>;

//   return (
//     <ErrorBoundary>
//       <BrowserRouter>
//         <div className="min-h-screen bg-gray-50 text-gray-900">
//           <Header categories={categories} trending={trending} />
//           <main className="max-w-7xl mx-auto p-4 md:p-6">
//             <Routes>
//               <Route path="/" element={<HomePage articles={articles} categories={categories} />} />
//               <Route path="/articles/:id" element={<ArticlePage articles={articles} />} />
//               <Route path="/category/:id" element={<CategoryPage articles={articles} />} />

//             </Routes>
//           </main>
//           <Footer />
//         </div>
//       </BrowserRouter>
//     </ErrorBoundary>
//   );
// }


// 

// src/App.jsx
// import React, { useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { supabase } from "./lib/supabaseClient";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import HomePage from "./pages/HomePage";
// import ArticlePage from "./pages/ArticlePage";
// import CategoryPage from "./pages/CategoryPage";
// import AdminPage from "./pages/Admin";   // ✅ fixed import
// import AdminLoginPage from "./pages/AdminLoginPage";
// import ErrorBoundary from "./ErrorBoundary";

// export default function App() {
//   const [articles, setArticles] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ fetch articles and categories once
//   useEffect(() => {
//     async function fetchAll() {
//       setLoading(true);

//       // fetch categories
//       const { data: cats, error: catError } = await supabase
//         .from("categories")
//         .select("*")
//         .order("id");
//       if (catError) {
//         console.error("fetch categories:", catError);
//       } else if (cats) {
//         setCategories(cats);
//       }

//       // fetch articles with category relation
//       const { data: arts, error: artError } = await supabase
//         .from("articles")
//         .select(`
//           id,
//           title_en,
//           title_te,
//           summary_en,
//           summary_te,
//           content_en,
//           content_te,
//           image_url,
//           category_id,
//           created_at,
//           categories (id, name, name_te)
//         `)
//         .order("created_at", { ascending: false });

//       if (artError) {
//         console.error("fetch articles:", artError);
//       } else {
//         setArticles(arts || []);
//       }

//       setLoading(false);
//     }
//     fetchAll();
//   }, []);

//   // ✅ compute trending (latest 5 articles)
//   const trending = articles
//     .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//     .slice(0, 5);

//   if (loading) {
//     return <div className="text-center mt-10">Loading articles...</div>;
//   }

//   return (
//     <ErrorBoundary>
//       <BrowserRouter>
//         <div className="min-h-screen bg-gray-50 text-gray-900">
//           <Header categories={categories} trending={trending} />
//           <main className="max-w-7xl mx-auto p-4 md:p-6">
//             <Routes>
//               <Route
//                 path="/"
//                 element={<HomePage articles={articles} categories={categories} />}
//               />
//               <Route
//                 path="/articles/:id"
//                 element={<ArticlePage articles={articles} />}
//               />
//               <Route
//                 path="/category/:id"
//                 element={<CategoryPage articles={articles} />}
//               />
//               <Route path="/admin-login" element={<AdminLoginPage />} />
//               <Route path="/admin" element={<AdminPage />} />
//             </Routes>
//           </main>
//           <Footer />
//         </div>
//       </BrowserRouter>
//     </ErrorBoundary>
//   );
// }


// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { supabase } from "./lib/supabaseClient";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import CategoryPage from "./pages/CategoryPage";
import AdminPage from "./pages/AdminPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import ErrorBoundary from "./ErrorBoundary";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch articles and categories once
  useEffect(() => {
    async function fetchAll() {
      setLoading(true);

      try {
        // fetch categories
        const { data: cats, error: catError } = await supabase
          .from("categories")
          .select("id, name, name_te")
          .order("id");

        if (catError) {
          console.error("fetch categories error:", catError);
        } else {
          console.log("DEBUG: categories from supabase:", cats);
          setCategories(Array.isArray(cats) ? cats : []);
        }

        // fetch articles with category relation
        const { data: arts, error: artError } = await supabase
          .from("articles")
          .select(`
            id,
            title_en,
            title_te,
            summary_en,
            summary_te,
            content_en,
            content_te,
            image_url,
            category_id,
            created_at,
            categories (id, name, name_te)
          `)
          .order("created_at", { ascending: false });

        if (artError) {
          console.error("fetch articles:", artError);
        } else {
          setArticles(Array.isArray(arts) ? arts : []);
        }
      } catch (err) {
        console.error("Unexpected fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  // compute trending (latest 5 articles)
  const trending = [...articles]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  if (loading) {
    return <div className="text-center mt-10">Loading articles...</div>;
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          <Header categories={categories} trending={trending} />
          <main className="max-w-7xl mx-auto p-4 md:p-6">
            <Routes>
              <Route
                path="/"
                element={<HomePage articles={articles} categories={categories} />}
              />
              <Route
                path="/articles/:id"
                element={<ArticlePage articles={articles} />}
              />
              <Route
                path="/category/:id"
                element={<CategoryPage articles={articles} />}
              />
              <Route path="/admin-login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
