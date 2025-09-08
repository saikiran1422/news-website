// netlify/functions/upload.js
// const { createClient } = require("@supabase/supabase-js");
// const Busboy = require("busboy");

// const SUPABASE_URL = process.env.SUPABASE_URL;
// const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
// const BUCKET = process.env.SUPABASE_UPLOAD_BUCKET || "article-images";

// const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
//   auth: { persistSession: false },
// });

// exports.handler = async function (event, context) {
//   if (event.httpMethod !== "POST") {
//     return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
//   }

//   const headers = event.headers || {};
//   const contentType = headers["content-type"] || headers["Content-Type"];
//   if (!contentType || !contentType.startsWith("multipart/form-data")) {
//     return { statusCode: 400, body: JSON.stringify({ error: "Content-Type must be multipart/form-data" }) };
//   }

//   const bb = new Busboy({ headers: { "content-type": contentType } });

//   let fileBuffer = null;
//   let filename = null;
//   let fileType = null;

//   try {
//     await new Promise((resolve, reject) => {
//       bb.on("file", (fieldname, file, info) => {
//         const { filename: fname, mimeType } = info;
//         filename = fname;
//         fileType = mimeType;
//         const chunks = [];
//         file.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
//         file.on("end", () => {
//           fileBuffer = Buffer.concat(chunks);
//         });
//       });

//       bb.on("field", () => {});
//       bb.on("finish", resolve);
//       bb.on("error", reject);

//       const body = event.isBase64Encoded ? Buffer.from(event.body, "base64") : Buffer.from(event.body || "");
//       bb.end(body);
//     });
//   } catch (err) {
//     console.error("Busboy parse error:", err);
//     return { statusCode: 500, body: JSON.stringify({ error: "Failed to parse form data" }) };
//   }

//   if (!fileBuffer || !filename) {
//     return { statusCode: 400, body: JSON.stringify({ error: "No file uploaded" }) };
//   }

//   // sanitize filename
//   const safeName = filename.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_.]/g, "");
//   const random = Math.floor(Math.random() * 1e6);
//   const path = `${new Date().toISOString().slice(0,10)}-${Date.now()}-${random}-${safeName}`;

//   try {
//     const { data: uploadData, error: uploadError } = await supabase.storage
//       .from(BUCKET)
//       .upload(path, fileBuffer, { contentType: fileType });

//     if (uploadError) {
//       console.error("Supabase upload error:", uploadError);
//       return { statusCode: 500, body: JSON.stringify({ error: uploadError.message || uploadError }) };
//     }

//     const { data: publicData, error: publicError } = supabase.storage
//       .from(BUCKET)
//       .getPublicUrl(uploadData.path);

//     if (publicError) {
//       console.warn("getPublicUrl error:", publicError);
//     }

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         path: uploadData.path,
//         publicUrl: publicData?.publicUrl || null,
//       }),
//     };
//   } catch (err) {
//     console.error("Upload handler error:", err);
//     return { statusCode: 500, body: JSON.stringify({ error: err.message || String(err) }) };
//   }
// };


// netlify/functions/upload.js
// Server-side Netlify Function — uses SERVICE_ROLE_KEY from process.env only (never commit it)
// const { createClient } = require("@supabase/supabase-js");
// const Busboy = require("busboy");

// const SUPABASE_URL = process.env.SUPABASE_URL;
// const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
// const BUCKET = process.env.SUPABASE_UPLOAD_BUCKET || "article-images"; // not a secret, but prefer env

// if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
//   console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment");
// }

// const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
//   auth: { persistSession: false },
// });

// exports.handler = async function (event, context) {
//   if (event.httpMethod !== "POST") {
//     return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
//   }

//   const headers = event.headers || {};
//   const contentType = headers["content-type"] || headers["Content-Type"];
//   if (!contentType || !contentType.startsWith("multipart/form-data")) {
//     return { statusCode: 400, body: JSON.stringify({ error: "Content-Type must be multipart/form-data" }) };
//   }

//   const bb = new Busboy({ headers: { "content-type": contentType } });

//   let fileBuffer = null;
//   let filename = null;
//   let fileType = null;

//   try {
//     await new Promise((resolve, reject) => {
//       bb.on("file", (fieldname, file, info) => {
//         const { filename: fname, mimeType } = info;
//         filename = fname;
//         fileType = mimeType;
//         const chunks = [];
//         file.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
//         file.on("end", () => {
//           fileBuffer = Buffer.concat(chunks);
//         });
//       });

//       bb.on("field", () => {});
//       bb.on("finish", resolve);
//       bb.on("error", reject);

//       const body = event.isBase64Encoded ? Buffer.from(event.body, "base64") : Buffer.from(event.body || "");
//       bb.end(body);
//     });
//   } catch (err) {
//     console.error("Busboy parse error:", err);
//     return { statusCode: 500, body: JSON.stringify({ error: "Failed to parse form data" }) };
//   }

//   if (!fileBuffer || !filename) {
//     return { statusCode: 400, body: JSON.stringify({ error: "No file uploaded" }) };
//   }

//   // sanitize filename
//   const safeName = filename.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_.]/g, "");
//   const random = Math.floor(Math.random() * 1e6);
//   const path = `${new Date().toISOString().slice(0,10)}-${Date.now()}-${random}-${safeName}`;

//   try {
//     const { data: uploadData, error: uploadError } = await supabase.storage
//       .from(BUCKET)
//       .upload(path, fileBuffer, { contentType: fileType });

//     if (uploadError) {
//       console.error("Supabase upload error:", uploadError);
//       return { statusCode: 500, body: JSON.stringify({ error: uploadError.message || uploadError }) };
//     }

//     const { data: publicData, error: publicError } = supabase.storage
//       .from(BUCKET)
//       .getPublicUrl(uploadData.path);

//     if (publicError) {
//       console.warn("getPublicUrl error:", publicError);
//     }

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         path: uploadData.path,
//         publicUrl: publicData?.publicUrl || null,
//       }),
//     };
//   } catch (err) {
//     console.error("Upload handler error:", err);
//     return { statusCode: 500, body: JSON.stringify({ error: err.message || String(err) }) };
//   }
// };


// netlify/functions/upload.js
// Server-side Netlify Function — uses SERVICE_ROLE_KEY from process.env only (never commit it)
// netlify/functions/upload.js
// Server-side Netlify Function — uses SERVICE_ROLE_KEY from process.env only (never commit it)
const { createClient } = require("@supabase/supabase-js");
const Busboy = require("busboy");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_UPLOAD_BUCKET; // prefer to set in Netlify env

// Validate env early
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !BUCKET) {
  console.error("Missing required environment variables for upload function.");
  // We still export a handler so Netlify shows a friendly message instead of crashing build-time.
}

const supabase = createClient(SUPABASE_URL || "", SUPABASE_SERVICE_ROLE_KEY || "", {
  auth: { persistSession: false },
});

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !BUCKET) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server not configured: missing env variables" }),
    };
  }

  const headers = event.headers || {};
  const contentType = headers["content-type"] || headers["Content-Type"];
  if (!contentType || !contentType.startsWith("multipart/form-data")) {
    return { statusCode: 400, body: JSON.stringify({ error: "Content-Type must be multipart/form-data" }) };
  }

  // parse multipart form using Busboy
  const bb = new Busboy({ headers: { "content-type": contentType } });

  let fileBuffer = null;
  let filename = null;
  let fileType = null;

  try {
    await new Promise((resolve, reject) => {
      bb.on("file", (fieldname, file, info) => {
        const { filename: fname, mimeType } = info;
        filename = fname;
        fileType = mimeType;
        const chunks = [];
        file.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        file.on("end", () => {
          fileBuffer = Buffer.concat(chunks);
        });
      });

      bb.on("field", () => {});
      bb.on("finish", resolve);
      bb.on("error", reject);

      const body = event.isBase64Encoded ? Buffer.from(event.body, "base64") : Buffer.from(event.body || "");
      bb.end(body);
    });
  } catch (err) {
    console.error("Busboy parse error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to parse form data" }) };
  }

  if (!fileBuffer || !filename) {
    return { statusCode: 400, body: JSON.stringify({ error: "No file uploaded" }) };
  }

  // sanitize & build filename
  const safeName = filename.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_.]/g, "");
  const random = Math.floor(Math.random() * 1e6);
  const path = `${new Date().toISOString().slice(0, 10)}-${Date.now()}-${random}-${safeName}`;

  try {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, fileBuffer, { contentType: fileType });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return { statusCode: 500, body: JSON.stringify({ error: uploadError.message || uploadError }) };
    }

    const { data: publicData, error: publicError } = await supabase.storage
      .from(BUCKET)
      .getPublicUrl(uploadData.path);

    if (publicError) {
      console.warn("getPublicUrl error:", publicError);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        path: uploadData.path,
        publicUrl: publicData?.publicUrl || null,
      }),
    };
  } catch (err) {
    console.error("Upload handler error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || String(err) }) };
  }
};
