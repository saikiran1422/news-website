import { supabase } from "../../src/lib/supabaseClient.js";

export async function handler(event) {
  const match = event.path.match(/\/articles\/(\d+)/);
  if (!match) {
    return { statusCode: 404, body: "Not found" };
  }

  const id = parseInt(match[1], 10);
  const { data: article } = await supabase
    .from("articles")
    .select("id, title_en, summary_en, image_url, updated_at, created_at")
    .eq("id", id)
    .single();

  if (!article) {
    return { statusCode: 404, body: "Article not found" };
  }

  const title = article.title_en || "Article";
  const description = article.summary_en || "";
  const image = article.image_url || "https://your-domain.com/placeholder.png";
  const url = `https://your-domain.com/articles/${id}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${image}">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${image}">
</head>
<body>
  <div id="root">Loading article...</div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>`;

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: html,
  };
}