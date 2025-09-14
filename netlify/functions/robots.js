// netlify/functions/robots.js

export async function handler() {
  const baseUrl = process.env.URL || "http://localhost:5173";

  const content = `
User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: content.trim(),
  };
}
