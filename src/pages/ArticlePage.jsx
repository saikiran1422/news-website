// // src/pages/ArticlePage.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { supabase } from "../lib/supabaseClient";
// import { useLanguage } from "../context/LanguageContext";

// export default function ArticlePage({ articles = [] }) {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { language } = useLanguage();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // fetch + increment views
//   useEffect(() => {
//     async function fetchAndIncrement() {
//       const found = articles.find((a) => String(a.id) === String(id));
//       if (found) {
//         setArticle(found);
//         setLoading(false);
//       } else {
//         const { data, error } = await supabase
//           .from("articles")
//           .select("*, categories(id, name, name_te)")
//           .eq("id", id)
//           .single();
//         if (!error) setArticle(data);
//         setLoading(false);
//       }

//       // increment views
//       await supabase.rpc("increment_view_count", { article_id: id });
//     }
//     fetchAndIncrement();
//   }, [id, articles]);

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (!article) return <div className="text-center py-10">Article not found</div>;

//   const title = language === "en" ? article.title_en : article.title_te;
//   const content = language === "en" ? article.content_en : article.content_te;
//   const categoryName =
//     language === "te"
//       ? article.categories?.name_te || article.categories?.name
//       : article.categories?.name || "";

//   const created = article.created_at
//     ? new Date(article.created_at).toLocaleString()
//     : "";
//   const updated = article.updated_at
//     ? new Date(article.updated_at).toLocaleString()
//     : null;

//   const renderContent = (text) => {
//     if (!text) return null;
//     return text.split("\n").map((line, i) => {
//       // YouTube detection
//       const youtubeMatch = line.match(
//         /https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/\S+/
//       );
//       if (youtubeMatch) {
//         const url = youtubeMatch[0];
//         let embedUrl = url;
//         if (url.includes("watch?v="))
//           embedUrl = `https://www.youtube.com/embed/${
//             url.split("v=")[1].split("&")[0]
//           }`;
//         if (url.includes("youtu.be/"))
//           embedUrl = `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
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

//       {/* Title + meta */}
//       <div className="flex items-center justify-between gap-4 mb-3">
//         <div>
//           <h1 className="text-3xl font-bold mb-1">{title}</h1>
//           {categoryName && (
//             <div className="text-sm text-gray-500">{categoryName}</div>
//           )}
//         </div>
//         <div className="text-right text-sm text-gray-500">
//           {created && (
//             <div>
//               {language === "te" ? "ప్రచురించబడింది:" : "Published:"} {created}
//             </div>
//           )}
//           {updated && (
//             <div>
//               {language === "te" ? "నవీకరించబడింది:" : "Updated:"} {updated}
//             </div>
//           )}
//           {typeof article.view_count === "number" && (
//             <div>👁 {article.view_count}</div>
//           )}
//         </div>
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

// // src/pages/ArticlePage.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { supabase } from "../lib/supabaseClient";
// import { useLanguage } from "../context/LanguageContext";

// export default function ArticlePage({ articles = [] }) {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { language } = useLanguage();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // fetch + increment views
//   useEffect(() => {
//     async function fetchAndIncrement() {
//       const found = articles.find((a) => String(a.id) === String(id));
//       if (found) {
//         setArticle(found);
//         setLoading(false);
//       } else {
//         const { data, error } = await supabase
//           .from("articles")
//           .select("*, categories(id, name, name_te)")
//           .eq("id", id)
//           .single();
//         if (!error) setArticle(data);
//         setLoading(false);
//       }

//       // ✅ increment views (using view_count column)
//       const { error: updateError } = await supabase
//         .from("articles")
//         .update({ view_count: (article?.view_count || 0) + 1 })
//         .eq("id", id);

//       if (updateError) console.error("Error updating view_count:", updateError);
//     }
//     fetchAndIncrement();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id, articles]);

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (!article) return <div className="text-center py-10">Article not found</div>;

//   const title = language === "en" ? article.title_en : article.title_te;
//   const content = language === "en" ? article.content_en : article.content_te;
//   const categoryName =
//     language === "te"
//       ? article.categories?.name_te || article.categories?.name
//       : article.categories?.name || "";

//   const created = article.created_at
//     ? new Date(article.created_at).toLocaleString()
//     : "";
//   const updated = article.updated_at
//     ? new Date(article.updated_at).toLocaleString()
//     : null;

//   const renderContent = (text) => {
//     if (!text) return null;
//     return text.split("\n").map((line, i) => {
//       // YouTube detection
//       const youtubeMatch = line.match(
//         /https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/\S+/
//       );
//       if (youtubeMatch) {
//         const url = youtubeMatch[0];
//         let embedUrl = url;
//         if (url.includes("watch?v="))
//           embedUrl = `https://www.youtube.com/embed/${
//             url.split("v=")[1].split("&")[0]
//           }`;
//         if (url.includes("youtu.be/"))
//           embedUrl = `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
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

//       {/* Title + meta */}
//       <div className="flex items-center justify-between gap-4 mb-3">
//         <div>
//           <h1 className="text-3xl font-bold mb-1">{title}</h1>
//           {categoryName && (
//             <div className="text-sm text-gray-500">{categoryName}</div>
//           )}
//         </div>
//         <div className="text-right text-sm text-gray-500">
//           {created && (
//             <div>
//               {language === "te" ? "ప్రచురించబడింది:" : "Published:"} {created}
//             </div>
//           )}
//           {updated && (
//             <div>
//               {language === "te" ? "నవీకరించబడింది:" : "Updated:"} {updated}
//             </div>
//           )}
//           {typeof article.view_count === "number" && (
//             <div>👁 {article.view_count}</div>
//           )}
//         </div>
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


// // src/pages/ArticlePage.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { supabase } from "../lib/supabaseClient";
// import { useLanguage } from "../context/LanguageContext";

// export default function ArticlePage({ articles = [] }) {
//   const { id } = useParams();
//   const { language } = useLanguage();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchAndIncrement() {
//       // ✅ Try increment via RPC
//       let { error: rpcError } = await supabase.rpc("increment_view_count", {
//         article_id: Number(id), // make sure it's an int
//       });

//       if (rpcError) {
//         console.error("RPC error:", rpcError.message);

//         // ✅ fallback: direct update
//         const { error: updateError } = await supabase
//           .from("articles")
//           .update({ view_count: supabase.sql`view_count + 1` })
//           .eq("id", Number(id));
//         if (updateError) {
//           console.error("Fallback update error:", updateError.message);
//         }
//       }

//       // ✅ Always fetch fresh article with latest view_count
//       const { data, error } = await supabase
//         .from("articles")
//         .select("*, categories(id, name, name_te)")
//         .eq("id", Number(id))
//         .single();

//       if (!error) setArticle(data);
//       else console.error("Fetch error:", error);

//       setLoading(false);
//     }
//     fetchAndIncrement();
//   }, [id]);

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (!article) return <div className="text-center py-10">Article not found</div>;

//   const title = language === "en" ? article.title_en : article.title_te;
//   const content = language === "en" ? article.content_en : article.content_te;
//   const categoryName =
//     language === "te"
//       ? article.categories?.name_te || article.categories?.name
//       : article.categories?.name || "";

//   const created = article.created_at
//     ? new Date(article.created_at).toLocaleString()
//     : "";
//   const updated = article.updated_at
//     ? new Date(article.updated_at).toLocaleString()
//     : null;

//   // ✅ Render content with YouTube embed detection
//   const renderContent = (text) => {
//     if (!text) return null;
//     return text.split("\n").map((line, i) => {
//       const youtubeMatch = line.match(
//         /https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/\S+/
//       );
//       if (youtubeMatch) {
//         const url = youtubeMatch[0];
//         let embedUrl = url;
//         if (url.includes("watch?v="))
//           embedUrl = `https://www.youtube.com/embed/${
//             url.split("v=")[1].split("&")[0]
//           }`;
//         if (url.includes("youtu.be/"))
//           embedUrl = `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
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

//       {/* Title + meta */}
//       <div className="flex items-center justify-between gap-4 mb-3">
//         <div>
//           <h1 className="text-3xl font-bold mb-1">{title}</h1>
//           {categoryName && (
//             <div className="text-sm text-gray-500">{categoryName}</div>
//           )}
//         </div>
//         <div className="text-right text-sm text-gray-500">
//           {created && (
//             <div>
//               {language === "te" ? "ప్రచురించబడింది:" : "Published:"} {created}
//             </div>
//           )}
//           {updated && (
//             <div>
//               {language === "te" ? "నవీకరించబడింది:" : "Updated:"} {updated}
//             </div>
//           )}
//           {typeof article.view_count === "number" && (
//             <div>👁 {article.view_count}</div>
//           )}
//         </div>
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

// // src/pages/ArticlePage.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { supabase } from "../lib/supabaseClient";
// import { useLanguage } from "../context/LanguageContext";

// export default function ArticlePage({ articles = [] }) {
//   const { id } = useParams();
//   const { language } = useLanguage();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchAndIncrement() {
//       // ✅ Try increment via RPC
//       let { error: rpcError } = await supabase.rpc("increment_view_count", {
//         article_id: Number(id), // make sure it's an int
//       });

//       if (rpcError) {
//         console.error("RPC error:", rpcError.message);

//         // ✅ fallback: direct update
//         const { error: updateError } = await supabase
//           .from("articles")
//           .update({ view_count: supabase.sql`view_count + 1` })
//           .eq("id", Number(id));
//         if (updateError) {
//           console.error("Fallback update error:", updateError.message);
//         }
//       }

//       // ✅ Always fetch fresh article with latest view_count
//       const { data, error } = await supabase
//         .from("articles")
//         .select("*, categories(id, name, name_te)")
//         .eq("id", Number(id))
//         .single();

//       if (!error) setArticle(data);
//       else console.error("Fetch error:", error);

//       setLoading(false);
//     }
//     fetchAndIncrement();
//   }, [id]);

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (!article) return <div className="text-center py-10">Article not found</div>;

//   const title = language === "en" ? article.title_en : article.title_te;
//   const content = language === "en" ? article.content_en : article.content_te;
//   const categoryName =
//     language === "te"
//       ? article.categories?.name_te || article.categories?.name
//       : article.categories?.name || "";

//   const created = article.created_at
//     ? new Date(article.created_at).toLocaleString()
//     : "";
//   const updated = article.updated_at
//     ? new Date(article.updated_at).toLocaleString()
//     : null;

//   // ✅ Render content with YouTube embed detection
//   const renderContent = (text) => {
//     if (!text) return null;
//     return text.split("\n").map((line, i) => {
//       const youtubeMatch = line.match(
//         /https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/\S+/
//       );
//       if (youtubeMatch) {
//         const url = youtubeMatch[0];
//         let embedUrl = url;
//         if (url.includes("watch?v="))
//           embedUrl = `https://www.youtube.com/embed/${
//             url.split("v=")[1].split("&")[0]
//           }`;
//         if (url.includes("youtu.be/"))
//           embedUrl = `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
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

//       {/* Title + meta */}
//       <div className="flex items-center justify-between gap-4 mb-3">
//         <div>
//           <h1 className="text-3xl font-bold mb-1">{title}</h1>
//           {categoryName && (
//             <div className="text-sm text-gray-500">{categoryName}</div>
//           )}
//         </div>
//         <div className="text-right text-sm text-gray-500">
//           {created && (
//             <div>
//               {language === "te" ? "ప్రచురించబడింది:" : "Published:"} {created}
//             </div>
//           )}
//           {updated && (
//             <div>
//               {language === "te" ? "నవీకరించబడింది:" : "Updated:"} {updated}
//             </div>
//           )}
//           {typeof article.view_count === "number" && (
//             <div>👁 {article.view_count}</div>
//           )}
//         </div>
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

// // src/pages/ArticlePage.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { supabase } from "../lib/supabaseClient";
// import { useLanguage } from "../context/LanguageContext";

// export default function ArticlePage() {
//   const { id } = useParams();
//   const { language } = useLanguage();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchAndIncrement() {
//       try {
//         // ✅ Increment views (only once)
//         const { error: rpcError } = await supabase.rpc("increment_view_count", {
//           article_id: Number(id),
//         });
//         if (rpcError) {
//           console.error("RPC error:", rpcError.message);

//           // fallback: direct update
//           const { error: updateError } = await supabase
//             .from("articles")
//             .update({ view_count: supabase.sql`view_count + 1` })
//             .eq("id", Number(id));
//           if (updateError) {
//             console.error("Fallback update error:", updateError.message);
//           }
//         }

//         // ✅ Always fetch fresh article with updated count
//         const { data, error } = await supabase
//           .from("articles")
//           .select("*, categories(id, name, name_te)")
//           .eq("id", Number(id))
//           .single();

//         if (!error && data) {
//           setArticle(data);
//         } else {
//           console.error("Fetch error:", error?.message);
//         }
//       } catch (err) {
//         console.error("Unexpected error:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchAndIncrement();
//   }, [id]);

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (!article) return <div className="text-center py-10">Article not found</div>;

//   const title = language === "en" ? article.title_en : article.title_te;
//   const content = language === "en" ? article.content_en : article.content_te;
//   const categoryName =
//     language === "te"
//       ? article.categories?.name_te || article.categories?.name
//       : article.categories?.name || "";

//   const created = article.created_at
//     ? new Date(article.created_at).toLocaleString()
//     : "";
//   const updated = article.updated_at
//     ? new Date(article.updated_at).toLocaleString()
//     : null;

//   // ✅ Render content with YouTube embed detection
//   const renderContent = (text) => {
//     if (!text) return null;
//     return text.split("\n").map((line, i) => {
//       const youtubeMatch = line.match(
//         /https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/\S+/
//       );
//       if (youtubeMatch) {
//         const url = youtubeMatch[0];
//         let embedUrl = url;
//         if (url.includes("watch?v="))
//           embedUrl = `https://www.youtube.com/embed/${
//             url.split("v=")[1].split("&")[0]
//           }`;
//         if (url.includes("youtu.be/"))
//           embedUrl = `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
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

//       {/* Title + meta */}
//       <div className="flex items-center justify-between gap-4 mb-3">
//         <div>
//           <h1 className="text-3xl font-bold mb-1">{title}</h1>
//           {categoryName && (
//             <div className="text-sm text-gray-500">{categoryName}</div>
//           )}
//         </div>
//         <div className="text-right text-sm text-gray-500">
//           {created && (
//             <div>
//               {language === "te" ? "ప్రచురించబడింది:" : "Published:"} {created}
//             </div>
//           )}
//           {updated && (
//             <div>
//               {language === "te" ? "నవీకరించబడింది:" : "Updated:"} {updated}
//             </div>
//           )}
//           {typeof article.view_count === "number" && (
//             <div>👁 {article.view_count}</div>
//           )}
//         </div>
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
// //articlepage
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { supabase } from "../lib/supabaseClient";
// import { useLanguage } from "../context/LanguageContext";

// export default function ArticlePage() {
//   const { id } = useParams();
//   const { language } = useLanguage();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchAndIncrement() {
//       try {
//         // ✅ Prevent multiple increments in same session
//         if (!sessionStorage.getItem(`viewed-${id}`)) {
//           sessionStorage.setItem(`viewed-${id}`, "true");

//           const { error: rpcError } = await supabase.rpc(
//             "increment_view_count",
//             { article_id: Number(id) }
//           );

//           if (rpcError) {
//             console.error("RPC error:", rpcError.message);
//           }
//         }

//         // ✅ Always fetch latest article
//         const { data, error } = await supabase
//           .from("articles")
//           .select("*, categories(id, name, name_te)")
//           .eq("id", Number(id))
//           .single();

//         if (!error && data) {
//           setArticle(data);
//         } else {
//           console.error("Fetch error:", error?.message);
//         }
//       } catch (err) {
//         console.error("Unexpected error:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchAndIncrement();
//   }, [id]);

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (!article) return <div className="text-center py-10">Article not found</div>;

//   const title = language === "en" ? article.title_en : article.title_te;
//   const content = language === "en" ? article.content_en : article.content_te;
//   const categoryName =
//     language === "te"
//       ? article.categories?.name_te || article.categories?.name
//       : article.categories?.name || "";

//   const created = article.created_at
//     ? new Date(article.created_at).toLocaleString()
//     : "";
//   const updated = article.updated_at
//     ? new Date(article.updated_at).toLocaleString()
//     : null;

//   // ✅ Render content with YouTube embed detection
//   const renderContent = (text) => {
//     if (!text) return null;
//     return text.split("\n").map((line, i) => {
//       const youtubeMatch = line.match(
//         /https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/\S+/
//       );
//       if (youtubeMatch) {
//         const url = youtubeMatch[0];
//         let embedUrl = url;
//         if (url.includes("watch?v="))
//           embedUrl = `https://www.youtube.com/embed/${
//             url.split("v=")[1].split("&")[0]
//           }`;
//         if (url.includes("youtu.be/"))
//           embedUrl = `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
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

//       {/* Title + meta */}
//       <div className="flex items-center justify-between gap-4 mb-3">
//         <div>
//           <h1 className="text-3xl font-bold mb-1">{title}</h1>
//           {categoryName && (
//             <div className="text-sm text-gray-500">{categoryName}</div>
//           )}
//         </div>
//         <div className="text-right text-sm text-gray-500">
//           {created && (
//             <div>
//               {language === "te" ? "ప్రచురించబడింది:" : "Published:"} {created}
//             </div>
//           )}
//           {updated && (
//             <div>
//               {language === "te" ? "నవీకరించబడింది:" : "Updated:"} {updated}
//             </div>
//           )}
//           {typeof article.view_count === "number" && (
//             <div>👁 {article.view_count}</div>
//           )}
//         </div>
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

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { supabase } from "../lib/supabaseClient";
// import { useLanguage } from "../context/LanguageContext";

// export default function ArticlePage() {
//   const { id } = useParams();
//   const { language } = useLanguage();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchAndIncrement() {
//       try {
//         // ✅ Prevent multiple increments in same session
//         if (!sessionStorage.getItem(`viewed-${id}`)) {
//           sessionStorage.setItem(`viewed-${id}`, "true");
//           await supabase.rpc("increment_view_count", {
//             article_id: Number(id),
//           });
//         }

//         // ✅ Always fetch latest article
//         const { data, error } = await supabase
//           .from("articles")
//           .select("*, categories(id, name, name_te)")
//           .eq("id", Number(id))
//           .single();

//         if (!error && data) setArticle(data);
//         else console.error("Fetch error:", error?.message);
//       } catch (err) {
//         console.error("Unexpected error:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchAndIncrement();
//   }, [id]);

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (!article) return <div className="text-center py-10">Article not found</div>;

//   const title = language === "en" ? article.title_en : article.title_te;
//   const content = language === "en" ? article.content_en : article.content_te;
//   const categoryName =
//     language === "te"
//       ? article.categories?.name_te || article.categories?.name
//       : article.categories?.name || "";

//   const published = article.created_at
//     ? new Date(article.created_at).toLocaleString("en-US", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       })
//     : "";

//   // ✅ Render content with YouTube embed detection
//   const renderContent = (text) => {
//     if (!text) return null;
//     return text.split("\n").map((line, i) => {
//       const youtubeMatch = line.match(
//         /https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/\S+/
//       );
//       if (youtubeMatch) {
//         const url = youtubeMatch[0];
//         let embedUrl = url;
//         if (url.includes("watch?v="))
//           embedUrl = `https://www.youtube.com/embed/${
//             url.split("v=")[1].split("&")[0]
//           }`;
//         if (url.includes("youtu.be/"))
//           embedUrl = `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
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

//       {/* Title + meta */}
//       <div className="mb-3">
//         <h1 className="text-3xl font-bold mb-1">{title}</h1>
//         {categoryName && (
//           <div className="text-sm text-gray-500">{categoryName}</div>
//         )}
//         {published && (
//           <div className="text-xs text-gray-500 mt-1">{published}</div>
//         )}
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

// //articlepage
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { supabase } from "../lib/supabaseClient";
// import { useLanguage } from "../context/LanguageContext";

// export default function ArticlePage() {
//   const { id } = useParams();
//   const { language } = useLanguage();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchAndIncrement() {
//       try {
//         if (!sessionStorage.getItem(`viewed-${id}`)) {
//           sessionStorage.setItem(`viewed-${id}`, "true");

//           await supabase.rpc("increment_view_count", {
//             article_id: Number(id),
//           });
//         }

//         const { data, error } = await supabase
//           .from("articles")
//           .select("*, categories(id, name, name_te)")
//           .eq("id", Number(id))
//           .single();

//         if (!error && data) setArticle(data);
//         else console.error("Fetch error:", error?.message);
//       } catch (err) {
//         console.error("Unexpected error:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchAndIncrement();
//   }, [id]);

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (!article) return <div className="text-center py-10">Article not found</div>;

//   const title = language === "en" ? article.title_en : article.title_te;
//   const content = language === "en" ? article.content_en : article.content_te;
//   const categoryName =
//     language === "te"
//       ? article.categories?.name_te || article.categories?.name
//       : article.categories?.name || "";

//   // ✅ Use updated_at if present else created_at
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
//       const youtubeMatch = line.match(
//         /https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/\S+/
//       );
//       if (youtubeMatch) {
//         const url = youtubeMatch[0];
//         let embedUrl = url;
//         if (url.includes("watch?v="))
//           embedUrl = `https://www.youtube.com/embed/${
//             url.split("v=")[1].split("&")[0]
//           }`;
//         if (url.includes("youtu.be/"))
//           embedUrl = `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
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

//       {/* Title + meta */}
//       <div className="flex items-center justify-between gap-4 mb-3">
//         <div>
//           <h1 className="text-3xl font-bold mb-1">{title}</h1>
//           {categoryName && (
//             <div className="text-sm text-gray-500">{categoryName}</div>
//           )}
//         </div>
//         <div className="text-right text-sm text-gray-500">{published}</div>
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
// //articlepage
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { supabase } from "../lib/supabaseClient";
// import { useLanguage } from "../context/LanguageContext";

// export default function ArticlePage() {
//   const { id } = useParams();
//   const { language } = useLanguage();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchAndIncrement() {
//       try {
//         if (!sessionStorage.getItem(`viewed-${id}`)) {
//           sessionStorage.setItem(`viewed-${id}`, "true");
//           await supabase.rpc("increment_view_count", { article_id: Number(id) });
//         }

//         const { data, error } = await supabase
//           .from("articles")
//           .select("*, categories(id, name, name_te)")
//           .eq("id", Number(id))
//           .single();

//         if (!error && data) setArticle(data);
//         else console.error("Fetch error:", error?.message);
//       } catch (err) {
//         console.error("Unexpected error:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchAndIncrement();
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
//       <nav className="mb-3 text-sm text-gray-500">
//         <Link to="/">Home</Link> ›{" "}
//         {article.categories && (
//           <Link to={`/category/${article.category_id}`}>{categoryName}</Link>
//         )} › <span className="text-gray-700">{title}</span>
//       </nav>

//       <div className="flex items-center justify-between gap-4 mb-3">
//         <div>
//           <h1 className="text-3xl font-bold mb-1">{title}</h1>
//           {categoryName && <div className="text-sm text-gray-500">{categoryName}</div>}
//         </div>
//         <div className="text-right text-sm text-gray-500">{published}</div>
//       </div>

//       {article.image_url && (
//         <img
//           src={article.image_url}
//           alt={title}
//           className="w-full h-64 object-cover rounded mb-4"
//         />
//       )}

//       <div className="prose max-w-none mb-6">{renderContent(content)}</div>
//     </article>
//   );
// }

// // // src/pages/ArticlePage.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { supabase } from "../lib/supabaseClient";
// import { useLanguage } from "../context/LanguageContext";
// import { FiShare2 } from "react-icons/fi"; // ✅ add this at top

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
//       <nav className="mb-3 text-sm text-gray-500">
//         <Link to="/">Home</Link> ›{" "}
//         {article.categories && (
//           <Link to={`/category/${article.category_id}`}>{categoryName}</Link>
//         )} › <span className="text-gray-700">{title}</span>
//       </nav>

//       <div className="flex items-center justify-between gap-4 mb-3">
//         <div>
//           <h1 className="text-3xl font-bold mb-1">{title}</h1>
//           {categoryName && <div className="text-sm text-gray-500">{categoryName}</div>}
//         </div>
//         <div className="flex items-center gap-3 text-sm text-gray-500">{published}</div>
//       </div>
//       {/* <span>{published}</span> */}
//         <button
//     onClick={async () => {
//       const shareUrl = `${window.location.origin}/articles/${article.id}`;
//       try {
//         if (navigator.share) {
//           await navigator.share({ title, url: shareUrl });
//         } else {
//           await navigator.clipboard.writeText(`${title}\n${shareUrl}`);
//           alert(language === "te" ? "లింక్ కాపీ చేయబడింది" : "Link copied");
//         }
//       } catch {
//         alert(language === "te" ? "షేర్ విఫలమైంది" : "Share failed");
//       }
//     }}
//     className="text-blue-900 hover:text-red-600"
//     aria-label="Share"
//   >
//     <FiShare2 size={22} />
//   </button>

//       {article.image_url && (
//         <img
//           src={article.image_url}
//           alt={title}
//           className="w-full h-64 object-cover rounded mb-4"
//         />
//       )}

//       <div className="prose max-w-none mb-6">{renderContent(content)}</div>
//     </article>
//   );
  
// }

// src/pages/ArticlePage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useLanguage } from "../context/LanguageContext";
import { FiShare2 } from "react-icons/fi";

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
      } catch (err) {
        console.error("Unexpected error:", err.message);
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

  const published = article.updated_at || article.created_at
    ? new Date(article.updated_at || article.created_at).toLocaleString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const renderContent = (text) => {
    if (!text) return null;
    return text.split("\n").map((line, i) => {
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
      return (
        <p key={i} className="mb-3 whitespace-pre-line">
          {line}
        </p>
      );
    });
  };

  return (
    <article className="bg-white p-6 rounded-lg shadow">
      {/* Breadcrumb */}
      <nav className="mb-3 text-sm text-gray-500">
        <Link to="/">Home</Link> ›{" "}
        {article.categories && (
          <Link to={`/category/${article.category_id}`}>{categoryName}</Link>
        )} › <span className="text-gray-700">{title}</span>
      </nav>

      {/* Title Row */}
      <div className="flex items-center justify-between gap-4 mb-2">
        <h1 className="text-3xl font-bold">{title}</h1>

        {/* ✅ Share button on right */}
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

      {/* Category + Published Date */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
        <div>{categoryName}</div>
        {/* ✅ Published date on left side */}
        <div>{published}</div>
      </div>

      {/* Image */}
      {article.image_url && (
        <img
          src={article.image_url}
          alt={title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      {/* Content */}
      <div className="prose max-w-none mb-6">{renderContent(content)}</div>
    </article>
  );
}
