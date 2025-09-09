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
// const { createClient } = require("@supabase/supabase-js");
// const Busboy = require("busboy");

// const SUPABASE_URL = process.env.SUPABASE_URL;
// const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
// const BUCKET = process.env.SUPABASE_UPLOAD_BUCKET; // prefer to set in Netlify env

// // Validate env early
// if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !BUCKET) {
//   console.error("Missing required environment variables for upload function.");
//   // We still export a handler so Netlify shows a friendly message instead of crashing build-time.
// }

// const supabase = createClient(SUPABASE_URL || "", SUPABASE_SERVICE_ROLE_KEY || "", {
//   auth: { persistSession: false },
// });

// exports.handler = async function (event, context) {
//   if (event.httpMethod !== "POST") {
//     return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
//   }

//   if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !BUCKET) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: "Server not configured: missing env variables" }),
//     };
//   }

//   const headers = event.headers || {};
//   const contentType = headers["content-type"] || headers["Content-Type"];
//   if (!contentType || !contentType.startsWith("multipart/form-data")) {
//     return { statusCode: 400, body: JSON.stringify({ error: "Content-Type must be multipart/form-data" }) };
//   }

//   // parse multipart form using Busboy
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

//   // sanitize & build filename
//   const safeName = filename.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_.]/g, "");
//   const random = Math.floor(Math.random() * 1e6);
//   const path = `${new Date().toISOString().slice(0, 10)}-${Date.now()}-${random}-${safeName}`;

//   try {
//     const { data: uploadData, error: uploadError } = await supabase.storage
//       .from(BUCKET)
//       .upload(path, fileBuffer, { contentType: fileType });

//     if (uploadError) {
//       console.error("Supabase upload error:", uploadError);
//       return { statusCode: 500, body: JSON.stringify({ error: uploadError.message || uploadError }) };
//     }

//     const { data: publicData, error: publicError } = await supabase.storage
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

// // try to load busboy in a way that works with different bundlers (CJS/ESM)
// let BusboyPkg;
// try {
//   BusboyPkg = require("busboy");
// } catch (err) {
//   console.error("require('busboy') failed:", err && err.message);
//   // Let it fall through; we'll try dynamic import below
// }
// if (!BusboyPkg) {
//   try {
//     // dynamic import fallback for some bundlers
//     // Note: dynamic import returns a promise; but require() fallback above usually works.
//     BusboyPkg = require("busboy").default || require("busboy");
//   } catch (err) {
//     console.error("second attempt to require('busboy') failed:", err && err.message);
//   }
// }

// // resolve constructor safely
// const Busboy = BusboyPkg && (BusboyPkg.default || BusboyPkg);
// if (!Busboy || typeof Busboy !== "function") {
//   console.error("Busboy is not available as a constructor. BusboyPkg:", !!BusboyPkg);
// }

// // envs
// const SUPABASE_URL = process.env.SUPABASE_URL;
// const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
// const BUCKET = process.env.SUPABASE_UPLOAD_BUCKET || "article-images";

// if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
//   console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment");
// }

// const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
//   auth: { persistSession: false },
// });

// exports.handler = async function (event, context) {
//   try {
//     if (event.httpMethod !== "POST") {
//       return {
//         statusCode: 405,
//         body: JSON.stringify({ error: "Method not allowed - use POST" }),
//       };
//     }

//     const headers = event.headers || {};
//     const contentType = headers["content-type"] || headers["Content-Type"];
//     if (!contentType || !contentType.startsWith("multipart/form-data")) {
//       return {
//         statusCode: 400,
//         body: JSON.stringify({ error: "Content-Type must be multipart/form-data" }),
//       };
//     }

//     if (!Busboy || typeof Busboy !== "function") {
//       console.error("Busboy constructor missing at runtime.");
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ error: "Server error: busboy unavailable" }),
//       };
//     }

//     // parse multipart form-data via Busboy
//     const bb = new Busboy({ headers: { "content-type": contentType } });

//     let fileBuffer = null;
//     let filename = null;
//     let fileType = null;

//     await new Promise((resolve, reject) => {
//       bb.on("file", (fieldname, file, info) => {
//         const { filename: fname, mimeType } = info || {};
//         filename = fname;
//         fileType = mimeType;
//         const chunks = [];
//         file.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
//         file.on("end", () => {
//           fileBuffer = Buffer.concat(chunks);
//         });
//         file.on("error", (err) => {
//           console.error("file stream error:", err && err.message);
//           reject(err);
//         });
//       });

//       bb.on("field", () => {}); // ignore fields for now
//       bb.on("finish", () => resolve());
//       bb.on("error", (err) => {
//         console.error("busboy error:", err && err.message);
//         reject(err);
//       });

//       // event.body may be base64 or string
//       try {
//         const body = event.isBase64Encoded
//           ? Buffer.from(event.body || "", "base64")
//           : Buffer.from(event.body || "", "utf8");
//         bb.end(body);
//       } catch (err) {
//         console.error("error preparing body for busboy:", err && err.message);
//         reject(err);
//       }
//     });

//     if (!fileBuffer || !filename) {
//       return {
//         statusCode: 400,
//         body: JSON.stringify({ error: "No file uploaded or file parsing failed" }),
//       };
//     }

//     // sanitize filename and build path
//     const safeName = filename.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_.]/g, "");
//     const random = Math.floor(Math.random() * 1e6);
//     const path = `${new Date().toISOString().slice(0, 10)}-${Date.now()}-${random}-${safeName}`;

//     // upload to Supabase storage (service role key allows upload)
//     const { data: uploadData, error: uploadError } = await supabase.storage
//       .from(BUCKET)
//       .upload(path, fileBuffer, { contentType: fileType });

//     if (uploadError) {
//       console.error("Supabase upload error:", uploadError);
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ error: uploadError.message || uploadError }),
//       };
//     }

//     // get public url (works if bucket is public)
//     const { data: publicData, error: publicError } = supabase.storage.from(BUCKET).getPublicUrl(uploadData.path);
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
//     console.error("Upload handler error (unexpected):", err && err.stack ? err.stack : err);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: (err && err.message) || "Unexpected server error" }),
//     };
//   }
// };


// netlify/functions/upload.js
// Server-side Netlify Function — uses SERVICE_ROLE_KEY from process.env only (never commit it)
// const { createClient } = require("@supabase/supabase-js");
// const formidable = require("formidable");

// const SUPABASE_URL = process.env.SUPABASE_URL;
// const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
// const BUCKET = process.env.SUPABASE_UPLOAD_BUCKET || "article-images";

// if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
//   console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment");
// }

// const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
//   auth: { persistSession: false },
// });

// exports.handler = async function (event, context) {
//   try {
//     if (event.httpMethod !== "POST") {
//       return {
//         statusCode: 405,
//         body: JSON.stringify({ error: "Method not allowed - use POST" }),
//       };
//     }

//     // Build a Promise wrapper around formidable parsing
//     const parseForm = (ev) =>
//       new Promise((resolve, reject) => {
//         const form = formidable({
//           multiples: false,
//           keepExtensions: true,
//           maxFileSize: 10 * 1024 * 1024, // 10MB
//         });

//         // netlify sends base64 body when binary
//         const buffer = ev.isBase64Encoded ? Buffer.from(ev.body || "", "base64") : Buffer.from(ev.body || "", "utf8");

//         // formidable expects a stream; create one
//         const Stream = require("stream").Readable;
//         const s = new Stream();
//         s.push(buffer);
//         s.push(null);

//         form.parse(s, (err, fields, files) => {
//           if (err) {
//             reject(err);
//             return;
//           }
//           resolve({ fields, files });
//         });
//       });

//     // parse the incoming multipart form-data
//     const { files } = await parseForm(event);

//     // expect the input field to be named "file"
//     const fileObj = files.file || files.image || Object.values(files)[0];
//     if (!fileObj) {
//       return { statusCode: 400, body: JSON.stringify({ error: "No file uploaded (field name should be 'file' or 'image')" }) };
//     }

//     // read file buffer from formidable file.path
//     const fs = require("fs");
//     const filePath = fileObj.filepath || fileObj.path; // formidable v2 uses filepath
//     if (!filePath || !fs.existsSync(filePath)) {
//       return { statusCode: 500, body: JSON.stringify({ error: "Uploaded file not available on server" }) };
//     }

//     const fileBuffer = fs.readFileSync(filePath);
//     const originalName = fileObj.originalFilename || fileObj.name || "upload";
//     const mimeType = fileObj.mimetype || fileObj.type || "application/octet-stream";

//     // sanitize file name and create unique path
//     const safeName = (originalName || "file").replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_.]/g, "");
//     const random = Math.floor(Math.random() * 1e6);
//     const path = `${new Date().toISOString().slice(0, 10)}-${Date.now()}-${random}-${safeName}`;

//     // upload to Supabase storage (service role key required for server-side writes)
//     const { data: uploadData, error: uploadError } = await supabase.storage
//       .from(BUCKET)
//       .upload(path, fileBuffer, { contentType: mimeType });

//     if (uploadError) {
//       console.error("Supabase upload error:", uploadError);
//       return { statusCode: 500, body: JSON.stringify({ error: uploadError.message || uploadError }) };
//     }

//     // get public url (works if bucket is public)
//     const { data: publicData, error: publicError } = supabase.storage.from(BUCKET).getPublicUrl(uploadData.path);
//     if (publicError) console.warn("getPublicUrl error:", publicError);

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         path: uploadData.path,
//         publicUrl: publicData?.publicUrl || null,
//       }),
//     };
//   } catch (err) {
//     console.error("Upload handler error (unexpected):", err && err.stack ? err.stack : err);
//     return { statusCode: 500, body: JSON.stringify({ error: (err && err.message) || "Unexpected server error" }) };
//   }
// };


// netlify/functions/upload.js
// Server-side Netlify Function — uses SERVICE_ROLE_KEY from process.env only (never commit it)
// const { createClient } = require("@supabase/supabase-js");
// const formidableLib = require("formidable");
// const fs = require("fs");
// const Stream = require("stream").Readable;

// const SUPABASE_URL = process.env.SUPABASE_URL;
// const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
// const BUCKET = process.env.SUPABASE_UPLOAD_BUCKET || "article-images";

// if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
//   console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment");
// }

// const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
//   auth: { persistSession: false },
// });

// exports.handler = async function (event, context) {
//   try {
//     if (event.httpMethod !== "POST") {
//       return {
//         statusCode: 405,
//         body: JSON.stringify({ error: "Method not allowed - use POST" }),
//       };
//     }

//     // create a wrapper to parse the multipart/form-data using formidable IncomingForm
//     const parseForm = (ev) =>
//       new Promise((resolve, reject) => {
//         // use IncomingForm constructor (works across formidable versions)
//         const IncomingForm = formidableLib.IncomingForm || formidableLib;
//         const form = new IncomingForm({
//           keepExtensions: true,
//           multiples: false,
//           maxFileSize: 10 * 1024 * 1024, // 10 MB
//         });

//         // Netlify will give us the body as base64 when binary — provide a stream to formidable
//         const buffer = ev.isBase64Encoded ? Buffer.from(ev.body || "", "base64") : Buffer.from(ev.body || "", "utf8");
//         const s = new Stream();
//         s.push(buffer);
//         s.push(null);

//         // formidable expects headers to detect boundary; pass content-type header
//         form.parse(s, (err, fields, files) => {
//           if (err) {
//             reject(err);
//             return;
//           }
//           resolve({ fields, files });
//         });
//       });

//     const { files } = await parseForm(event);

//     // pick the uploaded file (support field name 'file' or 'image' or first file)
//     const fileObj = files.file || files.image || (files && Object.values(files)[0]);
//     if (!fileObj) {
//       return { statusCode: 400, body: JSON.stringify({ error: "No file uploaded (field name should be 'file' or 'image')" }) };
//     }

//     // formidable v2 uses fileObj.filepath, earlier uses fileObj.path
//     const filePath = fileObj.filepath || fileObj.path;
//     if (!filePath || !fs.existsSync(filePath)) {
//       return { statusCode: 500, body: JSON.stringify({ error: "Uploaded file not available on server" }) };
//     }

//     const fileBuffer = fs.readFileSync(filePath);
//     const originalName = fileObj.originalFilename || fileObj.name || "upload";
//     const mimeType = fileObj.mimetype || fileObj.type || "application/octet-stream";

//     // sanitize filename and build unique path
//     const safeName = (originalName || "file").replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_.]/g, "");
//     const random = Math.floor(Math.random() * 1e6);
//     const path = `${new Date().toISOString().slice(0, 10)}-${Date.now()}-${random}-${safeName}`;

//     // upload to Supabase storage (server uses service role key)
//     const { data: uploadData, error: uploadError } = await supabase.storage
//       .from(BUCKET)
//       .upload(path, fileBuffer, { contentType: mimeType });

//     if (uploadError) {
//       console.error("Supabase upload error:", uploadError);
//       return { statusCode: 500, body: JSON.stringify({ error: uploadError.message || uploadError }) };
//     }

//     // get public url (works if bucket is public)
//     const { data: publicData, error: publicError } = supabase.storage.from(BUCKET).getPublicUrl(uploadData.path);
//     if (publicError) console.warn("getPublicUrl error:", publicError);

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         path: uploadData.path,
//         publicUrl: publicData?.publicUrl || null,
//       }),
//     };
//   } catch (err) {
//     console.error("Upload handler error (unexpected):", err && err.stack ? err.stack : err);
//     return { statusCode: 500, body: JSON.stringify({ error: (err && err.message) || "Unexpected server error" }) };
//   }
// };


// netlify/functions/upload.js
// Server-side Netlify Function — uses SERVICE_ROLE_KEY from process.env only (never commit it)
const { createClient } = require("@supabase/supabase-js");
const formidableLib = require("formidable");
const fs = require("fs");
const { Readable } = require("stream");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_UPLOAD_BUCKET || "article-images";

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

exports.handler = async function (event, context) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed - use POST" }),
      };
    }

    // Ensure Content-Type header exists
    const headers = event.headers || {};
    const contentType = headers["content-type"] || headers["Content-Type"];
    if (!contentType || !contentType.startsWith("multipart/form-data")) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Content-Type must be multipart/form-data" }),
      };
    }

    // Build a buffer from the event body (Netlify may base64-encode)
    const buffer = event.isBase64Encoded
      ? Buffer.from(event.body || "", "base64")
      : Buffer.from(event.body || "", "utf8");

    // Create a readable stream that mimics an http.IncomingMessage
    const req = new Readable();
    req.push(buffer);
    req.push(null);

    // Provide headers (formidable expects headers and content-length)
    req.headers = {
      ...headers,
      "content-type": contentType,
      "content-length": String(buffer.length),
    };
    req.method = event.httpMethod;
    req.url = event.path;

    // parse form with formidable
    const IncomingForm = formidableLib.IncomingForm || formidableLib;
    const form = new IncomingForm({
      keepExtensions: true,
      multiples: false,
      maxFileSize: 20 * 1024 * 1024, // 20 MB
    });

    const parseResult = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const { files } = parseResult;
    const fileObj = files?.file || files?.image || (files && Object.values(files)[0]);
    if (!fileObj) {
      return { statusCode: 400, body: JSON.stringify({ error: "No file uploaded (field 'file' or 'image')" }) };
    }

    // Get filepath depending on formidable version
    const localPath = fileObj.filepath || fileObj.path;
    if (!localPath || !fs.existsSync(localPath)) {
      return { statusCode: 500, body: JSON.stringify({ error: "Uploaded file not available on server" }) };
    }

    const fileBuffer = fs.readFileSync(localPath);
    const originalName = fileObj.originalFilename || fileObj.name || "upload";
    const mimeType = fileObj.mimetype || fileObj.type || "application/octet-stream";

    // sanitize filename and build unique path
    const safeName = (originalName || "file").replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_.]/g, "");
    const random = Math.floor(Math.random() * 1e6);
    const path = `${new Date().toISOString().slice(0, 10)}-${Date.now()}-${random}-${safeName}`;

    // Upload to Supabase storage (service role key)
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, fileBuffer, { contentType: mimeType });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return { statusCode: 500, body: JSON.stringify({ error: uploadError.message || uploadError }) };
    }

    // Get public URL (works if bucket is public)
    const { data: publicData, error: publicError } = supabase.storage.from(BUCKET).getPublicUrl(uploadData.path);
    if (publicError) console.warn("getPublicUrl error:", publicError);

    return {
      statusCode: 200,
      body: JSON.stringify({
        path: uploadData.path,
        publicUrl: publicData?.publicUrl || null,
      }),
    };
  } catch (err) {
    console.error("Upload handler error (unexpected):", err && err.stack ? err.stack : err);
    // Return plain JSON body (client expects JSON)
    return { statusCode: 500, body: JSON.stringify({ error: (err && err.message) || "Unexpected server error" }) };
  }
};
