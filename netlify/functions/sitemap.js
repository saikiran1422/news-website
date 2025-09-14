// // netlify/functions/sitemap.js
// const { createClient } = require("@supabase/supabase-js");

// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY // service role for server-side
// );

// exports.handler = async function (event) {
//   try {
//     // Fetch latest 1000 articles
//     const { data: articles, error } = await supabase
//       .from("articles")
//       .select("id, updated_at, created_at")
//       .order("created_at", { ascending: false })
//       .limit(1000);

//     if (error) throw error;

//     const baseUrl = process.env.SITE_URL || "https://yourdomain.com";

//     // Build XML
//     let urls = `
//       <url>
//         <loc>${baseUrl}</loc>
//         <priority>1.0</priority>
//       </url>
//       <url>
//         <loc>${baseUrl}/privacy</loc>
//       </url>
//       <url>
//         <loc>${baseUrl}/terms</loc>
//       </url>
//     `;

//     if (articles) {
//       urls += articles
//         .map((a) => {
//           const lastmod = a.updated_at || a.created_at || new Date().toISOString();
//           return `
//             <url>
//               <loc>${baseUrl}/articles/${a.id}</loc>
//               <lastmod>${new Date(lastmod).toISOString()}</lastmod>
//               <priority>0.8</priority>
//             </url>`;
//         })
//         .join("\n");
//     }

//     const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
//       <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//         ${urls}
//       </urlset>`;

//     return {
//       statusCode: 200,
//       headers: { "Content-Type": "application/xml" },
//       body: sitemap,
//     };
//   } catch (err) {
//     return { statusCode: 500, body: err.message };
//   }
// };

// // netlify/functions/sitemap.js
// import { supabase } from "../../src/lib/supabaseClient";

// export async function handler() {
//   // Fetch all article IDs from Supabase
//   const { data: articles } = await supabase
//     .from("articles")
//     .select("id, updated_at");

//   const baseUrl = "https://your-domain.com"; // replace with your actual domain

//   // Static pages
//   let urls = [
//     { loc: `${baseUrl}/`, changefreq: "daily", priority: 1.0 },
//     { loc: `${baseUrl}/privacy-policy`, changefreq: "yearly", priority: 0.2 },
//     { loc: `${baseUrl}/terms`, changefreq: "yearly", priority: 0.2 },
//   ];

//   // Add article URLs
//   if (articles) {
//     articles.forEach((a) => {
//       urls.push({
//         loc: `${baseUrl}/articles/${a.id}`,
//         lastmod: new Date(a.updated_at).toISOString(),
//         changefreq: "daily",
//         priority: 0.8,
//       });
//     });
//   }

//   // Build XML
//   const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
//   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//     ${urls
//       .map(
//         (u) => `
//       <url>
//         <loc>${u.loc}</loc>
//         ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}
//         <changefreq>${u.changefreq}</changefreq>
//         <priority>${u.priority}</priority>
//       </url>`
//       )
//       .join("")}
//   </urlset>`;

//   return {
//     statusCode: 200,
//     headers: { "Content-Type": "application/xml" },
//     body: sitemap,
//   };
// }

// netlify/functions/sitemap.js
import { supabase } from "../../src/lib/supabaseClient";

export async function handler() {
  // Fetch all article IDs from Supabase
  const { data: articles } = await supabase
    .from("articles")
    .select("id, updated_at");

  // ✅ Use Netlify's site URL dynamically
  const baseUrl = process.env.URL || "http://localhost:5173";

  // Static pages
  let urls = [
    { loc: `${baseUrl}/`, changefreq: "daily", priority: 1.0 },
    { loc: `${baseUrl}/privacy`, changefreq: "yearly", priority: 0.2 },
    { loc: `${baseUrl}/terms`, changefreq: "yearly", priority: 0.2 },
  ];

  // Add article URLs dynamically
  if (articles) {
    articles.forEach((a) => {
      urls.push({
        loc: `${baseUrl}/articles/${a.id}`,
        lastmod: new Date(a.updated_at).toISOString(),
        changefreq: "daily",
        priority: 0.8,
      });
    });
  }

  // Build XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (u) => `
      <url>
        <loc>${u.loc}</loc>
        ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}
        <changefreq>${u.changefreq}</changefreq>
        <priority>${u.priority}</priority>
      </url>`
      )
      .join("")}
  </urlset>`;

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/xml" },
    body: sitemap,
  };
}
