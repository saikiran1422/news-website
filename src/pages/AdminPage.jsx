// // src/pages/AdminPage.jsx
// import React, { useState, useEffect } from "react";
// import { supabase } from "../lib/supabaseClient";
// import { useNavigate } from "react-router-dom";

// export default function AdminPage() {
//   const navigate = useNavigate();
//   const [session, setSession] = useState(null);
//   const [loadingSession, setLoadingSession] = useState(true);

//   const [form, setForm] = useState({
//     title_en: "",
//     title_te: "",
//     summary_en: "",
//     summary_te: "",
//     content_en: "",
//     content_te: "",
//     image_url: "",
//     category_id: "",
//   });
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [uploading, setUploading] = useState(false);

//   // Check login status & redirect if not authenticated
//   useEffect(() => {
//     async function checkSession() {
//       const { data } = await supabase.auth.getSession();
//       if (!data?.session) {
//         navigate("/admin-login");
//       } else {
//         setSession(data.session);
//       }
//       setLoadingSession(false);
//     }
//     checkSession();

//     const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
//       if (!s) {
//         navigate("/admin-login");
//       } else {
//         setSession(s);
//       }
//     });

//     return () => listener.subscription.unsubscribe();
//   }, [navigate]);

//   // Fetch categories (public select policy must exist)
//   useEffect(() => {
//     async function fetchCategories() {
//       const { data, error } = await supabase
//         .from("categories")
//         .select("id, name, name_te")
//         .order("id");
//       if (error) {
//         console.error("Error fetching categories:", error);
//         setMessage("Error loading categories.");
//       } else {
//         setCategories(data || []);
//       }
//     }
//     fetchCategories();
//   }, []);

//   // handle inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((s) => ({ ...s, [name]: value }));
//   };

//   // Upload via Netlify Function (/.netlify/functions/upload)
//   const handleImageUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploading(true);
//     setMessage("");

//     try {
//       const fd = new FormData();
//       fd.append("file", file);

//       const resp = await fetch("/.netlify/functions/upload", {
//         method: "POST",
//         body: fd,
//       });

//       const json = await resp.json();
//       if (!resp.ok) {
//         throw new Error(json?.error || resp.statusText || "Upload failed");
//       }

//       const publicUrl = json.publicUrl || null;
//       const path = json.path || null;

//       if (publicUrl) {
//         setForm((s) => ({ ...s, image_url: publicUrl }));
//       } else if (path) {
//         const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
//         const fallback = `${SUPABASE_URL}/storage/v1/object/public/${path}`;
//         setForm((s) => ({ ...s, image_url: fallback }));
//       }

//       setMessage("✅ Image uploaded successfully! You can now submit the article.");
//     } catch (err) {
//       console.error("Upload error (client):", err);
//       setMessage("❌ Upload failed: " + (err?.message || String(err)));
//     } finally {
//       setUploading(false);
//     }
//   };

//   // submit article
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const payload = {
//         ...form,
//         category_id: form.category_id ? Number(form.category_id) : null,
//       };

//       if (!payload.image_url) {
//         if (!window.confirm("You didn't upload an image. Submit anyway?")) {
//           setLoading(false);
//           return;
//         }
//       }

//       const { error } = await supabase.from("articles").insert([payload]);

//       if (error) throw error;

//       setMessage("✅ Article uploaded successfully!");
//       setForm({
//         title_en: "",
//         title_te: "",
//         summary_en: "",
//         summary_te: "",
//         content_en: "",
//         content_te: "",
//         image_url: "",
//         category_id: "",
//       });
//     } catch (err) {
//       console.error("Insert error:", err);
//       setMessage("❌ Error uploading article: " + (err?.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // logout
//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate("/admin-login");
//   };

//   if (loadingSession) return <div className="text-center mt-10">Checking auth...</div>;
//   if (!session) return null;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Upload Article</h1>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => navigate("/")}
//             className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
//           >
//             Go to site
//           </button>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {message && <div className="mb-4">{message}</div>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input name="title_en" placeholder="Title (English)" value={form.title_en} onChange={handleChange} className="w-full border p-2 rounded" required />
//         <input name="title_te" placeholder="Title (Telugu)" value={form.title_te} onChange={handleChange} className="w-full border p-2 rounded" required />
//         <textarea name="summary_en" placeholder="Summary (English)" value={form.summary_en} onChange={handleChange} className="w-full border p-2 rounded" />
//         <textarea name="summary_te" placeholder="Summary (Telugu)" value={form.summary_te} onChange={handleChange} className="w-full border p-2 rounded" />
//         <textarea name="content_en" placeholder="Content (English)" value={form.content_en} onChange={handleChange} className="w-full border p-2 rounded" />
//         <textarea name="content_te" placeholder="Content (Telugu)" value={form.content_te} onChange={handleChange} className="w-full border p-2 rounded" />

//         <div>
//           <label className="block mb-1">Upload Image</label>
//           <input type="file" accept="image/*" onChange={handleImageUpload} />
//           {uploading && <div className="text-sm text-gray-600 mt-2">Uploading...</div>}
//           {form.image_url && (
//             <img src={form.image_url} alt="Uploaded" className="mt-2 w-40 h-40 object-cover rounded" />
//           )}
//         </div>

//         <div>
//           <label className="block mb-1">Category</label>
//           <select name="category_id" value={form.category_id} onChange={handleChange} className="w-full border p-2 rounded" required>
//             <option value="">-- Select Category --</option>
//             {categories.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.name} {c.name_te ? ` / ${c.name_te}` : ""}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button type="submit" disabled={loading || uploading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//           {loading ? "Uploading..." : "Upload"}
//         </button>
//       </form>
//     </div>
//   );
// }


// src/pages/AdminPage.jsx
// import React, { useState, useEffect } from "react";
// import { supabase } from "../lib/supabaseClient";
// import { useNavigate } from "react-router-dom";

// export default function AdminPage() {
//   const navigate = useNavigate();
//   const [session, setSession] = useState(null);
//   const [loadingSession, setLoadingSession] = useState(true);

//   const [form, setForm] = useState({
//     title_en: "",
//     title_te: "",
//     summary_en: "",
//     summary_te: "",
//     content_en: "",
//     content_te: "",
//     image_url: "",
//     category_id: "",
//   });
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [uploading, setUploading] = useState(false);

//   // Check login status & redirect if not authenticated
//   useEffect(() => {
//     async function checkSession() {
//       const { data } = await supabase.auth.getSession();
//       if (!data?.session) {
//         navigate("/admin-login");
//       } else {
//         setSession(data.session);
//       }
//       setLoadingSession(false);
//     }
//     checkSession();

//     const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
//       if (!s) {
//         navigate("/admin-login");
//       } else {
//         setSession(s);
//       }
//     });

//     return () => listener.subscription.unsubscribe();
//   }, [navigate]);

//   // Fetch categories (public select policy must exist)
//   useEffect(() => {
//     async function fetchCategories() {
//       const { data, error } = await supabase
//         .from("categories")
//         .select("id, name, name_te")
//         .order("id");
//       if (error) {
//         console.error("Error fetching categories:", error);
//         setMessage("Error loading categories.");
//       } else {
//         setCategories(data || []);
//       }
//     }
//     fetchCategories();
//   }, []);

//   // handle inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((s) => ({ ...s, [name]: value }));
//   };

//   // NEW: read file as base64 and POST JSON to Netlify function
//   const handleImageUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploading(true);
//     setMessage("");

//     try {
//       // read file as data URL then strip prefix to get raw base64
//       const b64 = await new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const result = reader.result; // "data:<mime>;base64,XXXXX"
//           const comma = result.indexOf(",");
//           if (comma >= 0) resolve(result.slice(comma + 1));
//           else resolve(result);
//         };
//         reader.onerror = (err) => reject(err);
//         reader.readAsDataURL(file);
//       });

//       const payload = {
//         filename: file.name,
//         mimeType: file.type || "application/octet-stream",
//         b64,
//       };

//       // call server function that uses service role to upload
//       const resp = await fetch("/.netlify/functions/upload", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       // Attempt to parse JSON (function should return JSON)
//       const json = await resp.json().catch(() => ({ error: "Invalid JSON response" }));

//       if (!resp.ok) {
//         console.error("Upload function error:", json);
//         throw new Error(json?.error || resp.statusText || "Upload failed");
//       }

//       // function returns { path, publicUrl }
//       const publicUrl = json.publicUrl || null;
//       const path = json.path || null;

//       if (publicUrl) {
//         setForm((s) => ({ ...s, image_url: publicUrl }));
//       } else if (path) {
//         // fallback using VITE_SUPABASE_URL if bucket public
//         const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
//         const fallback = `${SUPABASE_URL}/storage/v1/object/public/${path}`;
//         setForm((s) => ({ ...s, image_url: fallback }));
//       } else {
//         throw new Error("Upload response missing URL");
//       }

//       setMessage("✅ Image uploaded successfully! You can now submit the article.");
//     } catch (err) {
//       console.error("Upload error (client):", err);
//       setMessage("❌ Upload failed: " + (err?.message || String(err)));
//     } finally {
//       setUploading(false);
//     }
//   };

//   // submit article
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const payload = {
//         ...form,
//         category_id: form.category_id ? Number(form.category_id) : null,
//       };

//       if (!payload.image_url) {
//         if (!window.confirm("You didn't upload an image. Submit anyway?")) {
//           setLoading(false);
//           return;
//         }
//       }

//       const { error } = await supabase.from("articles").insert([payload]);

//       if (error) throw error;

//       setMessage("✅ Article uploaded successfully!");
//       setForm({
//         title_en: "",
//         title_te: "",
//         summary_en: "",
//         summary_te: "",
//         content_en: "",
//         content_te: "",
//         image_url: "",
//         category_id: "",
//       });
//     } catch (err) {
//       console.error("Insert error:", err);
//       setMessage("❌ Error uploading article: " + (err?.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // logout
//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate("/admin-login");
//   };

//   if (loadingSession) return <div className="text-center mt-10">Checking auth...</div>;
//   if (!session) return null;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Upload Article</h1>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => navigate("/")}
//             className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
//           >
//             Go to site
//           </button>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {message && <div className="mb-4">{message}</div>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input name="title_en" placeholder="Title (English)" value={form.title_en} onChange={handleChange} className="w-full border p-2 rounded" required />
//         <input name="title_te" placeholder="Title (Telugu)" value={form.title_te} onChange={handleChange} className="w-full border p-2 rounded" required />
//         <textarea name="summary_en" placeholder="Summary (English)" value={form.summary_en} onChange={handleChange} className="w-full border p-2 rounded" />
//         <textarea name="summary_te" placeholder="Summary (Telugu)" value={form.summary_te} onChange={handleChange} className="w-full border p-2 rounded" />
//         <textarea name="content_en" placeholder="Content (English)" value={form.content_en} onChange={handleChange} className="w-full border p-2 rounded" />
//         <textarea name="content_te" placeholder="Content (Telugu)" value={form.content_te} onChange={handleChange} className="w-full border p-2 rounded" />

//         <div>
//           <label className="block mb-1">Upload Image</label>
//           <input type="file" accept="image/*" onChange={handleImageUpload} />
//           {uploading && <div className="text-sm text-gray-600 mt-2">Uploading...</div>}
//           {form.image_url && (
//             <img src={form.image_url} alt="Uploaded" className="mt-2 w-40 h-40 object-cover rounded" />
//           )}
//         </div>

//         <div>
//           <label className="block mb-1">Category</label>
//           <select name="category_id" value={form.category_id} onChange={handleChange} className="w-full border p-2 rounded" required>
//             <option value="">-- Select Category --</option>
//             {categories.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.name} {c.name_te ? ` / ${c.name_te}` : ""}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button type="submit" disabled={loading || uploading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//           {loading ? "Uploading..." : "Upload"}
//         </button>
//       </form>
//     </div>
//   );
// }


// //src/pages/AdminPage.jsx
// import React, { useState, useEffect } from "react";
// import { supabase } from "../lib/supabaseClient";
// import { useNavigate } from "react-router-dom";

// export default function AdminPage() {
//   const navigate = useNavigate();
//   const [session, setSession] = useState(null);
//   const [loadingSession, setLoadingSession] = useState(true);

//   const emptyForm = {
//     id: null,
//     title_en: "",
//     title_te: "",
//     summary_en: "",
//     summary_te: "",
//     content_en: "",
//     content_te: "",
//     image_url: "",
//     category_id: "",
//   };
//   const [form, setForm] = useState(emptyForm);
//   const [categories, setCategories] = useState([]);
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [editingId, setEditingId] = useState(null);

//   // check session
//   useEffect(() => {
//     async function checkSession() {
//       const { data } = await supabase.auth.getSession();
//       if (!data?.session) {
//         navigate("/admin-login");
//       } else {
//         setSession(data.session);
//       }
//       setLoadingSession(false);
//     }
//     checkSession();

//     const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
//       if (!s) {
//         navigate("/admin-login");
//       } else {
//         setSession(s);
//       }
//     });

//     return () => listener.subscription.unsubscribe();
//   }, [navigate]);

//   // load categories & articles
//   useEffect(() => {
//     async function load() {
//       const { data: catData, error: catErr } = await supabase.from("categories").select("id, name, name_te").order("id");
//       if (!catErr) setCategories(catData || []);

//       const { data: artData, error: artErr } = await supabase
//         .from("articles")
//         .select("id, title_en, title_te, category_id, image_url, created_at, updated_at")
//         .order("created_at", { ascending: false });

//       if (!artErr) setArticles(artData || []);
//     }
//     load();
//   }, []);

//   const refreshArticles = async () => {
//     const { data: artData, error } = await supabase
//       .from("articles")
//       .select("id, title_en, title_te, category_id, image_url, created_at, updated_at")
//       .order("created_at", { ascending: false });
//     if (!error) setArticles(artData || []);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((s) => ({ ...s, [name]: value }));
//   };

//   // upload image via Netlify function (same approach as you had)
//   const handleImageUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploading(true);
//     setMessage("");

//     try {
//       const b64 = await new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const res = reader.result;
//           const comma = res.indexOf(",");
//           resolve(comma >= 0 ? res.slice(comma + 1) : res);
//         };
//         reader.onerror = (err) => reject(err);
//         reader.readAsDataURL(file);
//       });

//       const resp = await fetch("/.netlify/functions/upload", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ filename: file.name, mimeType: file.type, b64 }),
//       });

//       const json = await resp.json();
//       if (!resp.ok) throw new Error(json?.error || "Upload failed");

//       const publicUrl = json.publicUrl || null;
//       const path = json.path || null;

//       if (publicUrl) setForm((s) => ({ ...s, image_url: publicUrl }));
//       else if (path) {
//         const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
//         setForm((s) => ({ ...s, image_url: `${SUPABASE_URL}/storage/v1/object/public/${path}` }));
//       } else throw new Error("Upload response missing URL");

//       setMessage("✅ Image uploaded");
//     } catch (err) {
//       console.error("Upload error:", err);
//       setMessage("❌ Upload failed: " + (err?.message || err));
//     } finally {
//       setUploading(false);
//     }
//   };

//   // create or update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const payload = {
//         title_en: form.title_en,
//         title_te: form.title_te,
//         summary_en: form.summary_en,
//         summary_te: form.summary_te,
//         content_en: form.content_en,
//         content_te: form.content_te,
//         image_url: form.image_url || null,
//         category_id: form.category_id ? Number(form.category_id) : null,
//       };

//       if (editingId) {
//         // update
//         const { error } = await supabase.from("articles").update(payload).eq("id", editingId);
//         if (error) throw error;
//         setMessage("✅ Article updated");
//         setEditingId(null);
//       } else {
//         // insert
//         const { error } = await supabase.from("articles").insert([payload]);
//         if (error) throw error;
//         setMessage("✅ Article created");
//       }

//       setForm(emptyForm);
//       await refreshArticles();
//     } catch (err) {
//       console.error("Save error:", err);
//       setMessage("❌ Save failed: " + (err?.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startEdit = (a) => {
//     setEditingId(a.id);
//     setForm({
//       id: a.id,
//       title_en: a.title_en || "",
//       title_te: a.title_te || "",
//       summary_en: a.summary_en || "",
//       summary_te: a.summary_te || "",
//       content_en: a.content_en || "",
//       content_te: a.content_te || "",
//       image_url: a.image_url || "",
//       category_id: a.category_id ? String(a.category_id) : "",
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this article?")) return;
//     setLoading(true);
//     try {
//       const { error } = await supabase.from("articles").delete().eq("id", id);
//       if (error) throw error;
//       setMessage("✅ Deleted");
//       await refreshArticles();
//     } catch (err) {
//       console.error("Delete error:", err);
//       setMessage("❌ Delete failed: " + (err?.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate("/admin-login");
//   };

//   if (loadingSession) return <div className="text-center mt-10">Checking auth...</div>;
//   if (!session) return null;

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">{editingId ? "Edit Article" : "Upload Article"}</h1>
//         <div className="flex items-center gap-3">
//           <button onClick={() => navigate("/")} className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300">
//             Go to site
//           </button>
//           <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
//             Logout
//           </button>
//         </div>
//       </div>

//       {message && <div className="mb-4 text-sm">{message}</div>}

//       <form onSubmit={handleSubmit} className="space-y-4 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input name="title_en" placeholder="Title (English)" value={form.title_en} onChange={(e) => handleChange(e)} className="w-full border p-2 rounded" required />
//           <input name="title_te" placeholder="Title (Telugu)" value={form.title_te} onChange={(e) => handleChange(e)} className="w-full border p-2 rounded" required />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <textarea name="summary_en" placeholder="Summary (English)" value={form.summary_en} onChange={(e) => handleChange(e)} className="w-full border p-2 rounded" />
//           <textarea name="summary_te" placeholder="Summary (Telugu)" value={form.summary_te} onChange={(e) => handleChange(e)} className="w-full border p-2 rounded" />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <textarea name="content_en" placeholder="Content (English)" value={form.content_en} onChange={(e) => handleChange(e)} className="w-full border p-2 rounded h-40" />
//           <textarea name="content_te" placeholder="Content (Telugu)" value={form.content_te} onChange={(e) => handleChange(e)} className="w-full border p-2 rounded h-40" />
//         </div>

//         <div>
//           <label className="block mb-1">Upload Image</label>
//           <input type="file" accept="image/*" onChange={handleImageUpload} />
//           {uploading && <div className="text-sm text-gray-600 mt-2">Uploading...</div>}
//           {form.image_url && <img src={form.image_url} alt="Uploaded" className="mt-2 w-40 h-40 object-cover rounded" />}
//         </div>

//         <div>
//           <label className="block mb-1">Category</label>
//           <select name="category_id" value={form.category_id} onChange={(e) => handleChange(e)} className="w-full border p-2 rounded" required>
//             <option value="">-- Select Category --</option>
//             {categories.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.name} {c.name_te ? ` / ${c.name_te}` : ""}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button type="submit" disabled={loading || uploading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//           {loading ? "Saving..." : editingId ? "Update" : "Upload"}
//         </button>
//         {editingId && (
//           <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="ml-2 bg-gray-200 px-3 py-1 rounded">
//             Cancel
//           </button>
//         )}
//       </form>

//       {/* List */}
//       <section>
//         <h2 className="text-xl font-bold mb-3">All Articles</h2>
//         <div className="space-y-3">
//           {articles.map((a) => (
//             <div key={a.id} className="flex items-center justify-between p-3 border rounded">
//               <div className="flex items-center gap-3">
//                 {a.image_url ? <img src={a.image_url} alt={a.title_en} className="w-20 h-14 object-cover rounded" /> : <div className="w-20 h-14 bg-gray-100 rounded" />}
//                 <div>
//                   <div className="font-semibold">{a.title_en}</div>
//                   <div className="text-sm text-gray-500">
//                     {a.created_at ? new Date(a.created_at).toLocaleString() : ""} {a.updated_at ? ` • Updated ${new Date(a.updated_at).toLocaleString()}` : ""}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button onClick={() => startEdit(a)} className="px-3 py-1 bg-yellow-400 text-black rounded">Edit</button>
//                 <button onClick={() => handleDelete(a.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }


// //src/pages/AdminPage.jsx
// import React, { useState, useEffect } from "react";
// import { supabase } from "../lib/supabaseClient";
// import { useNavigate } from "react-router-dom";

// export default function AdminPage() {
//   const navigate = useNavigate();
//   const [session, setSession] = useState(null);
//   const [loadingSession, setLoadingSession] = useState(true);

//   const emptyForm = {
//     id: null,
//     title_en: "",
//     title_te: "",
//     summary_en: "",
//     summary_te: "",
//     content_en: "",
//     content_te: "",
//     image_url: "",
//     category_id: "",
//   };
//   const [form, setForm] = useState(emptyForm);
//   const [categories, setCategories] = useState([]);
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [editingId, setEditingId] = useState(null);

//   // check session
//   useEffect(() => {
//     async function checkSession() {
//       const { data } = await supabase.auth.getSession();
//       if (!data?.session) {
//         navigate("/admin-login");
//       } else {
//         setSession(data.session);
//       }
//       setLoadingSession(false);
//     }
//     checkSession();

//     const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
//       if (!s) {
//         navigate("/admin-login");
//       } else {
//         setSession(s);
//       }
//     });

//     return () => listener.subscription.unsubscribe();
//   }, [navigate]);

//   // load categories & articles (list view)
//   useEffect(() => {
//     async function load() {
//       const { data: catData, error: catErr } = await supabase
//         .from("categories")
//         .select("id, name, name_te")
//         .order("id");
//       if (!catErr) setCategories(catData || []);

//       // fetch only the fields we need for list (not content/summary) to keep list fast
//       const { data: artData, error: artErr } = await supabase
//         .from("articles")
//         .select("id, title_en, title_te, category_id, image_url, created_at, updated_at")
//         .order("created_at", { ascending: false });

//       if (!artErr) setArticles(artData || []);
//     }
//     load();
//   }, []);

//   const refreshArticles = async () => {
//     const { data: artData, error } = await supabase
//       .from("articles")
//       .select("id, title_en, title_te, category_id, image_url, created_at, updated_at")
//       .order("created_at", { ascending: false });
//     if (!error) setArticles(artData || []);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((s) => ({ ...s, [name]: value }));
//   };

//   // upload image via Netlify function (same approach as you had)
//   const handleImageUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploading(true);
//     setMessage("");

//     try {
//       // Read file as base64
//       const b64 = await new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const res = reader.result;
//           const comma = res.indexOf(",");
//           resolve(comma >= 0 ? res.slice(comma + 1) : res);
//         };
//         reader.onerror = (err) => reject(err);
//         reader.readAsDataURL(file);
//       });

//       const resp = await fetch("/.netlify/functions/upload", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ filename: file.name, mimeType: file.type, b64 }),
//       });

//       const json = await resp.json().catch(() => ({ error: "Invalid JSON response" }));
//       if (!resp.ok) throw new Error(json?.error || "Upload failed");

//       const publicUrl = json.publicUrl || null;
//       const path = json.path || null;

//       if (publicUrl) setForm((s) => ({ ...s, image_url: publicUrl }));
//       else if (path) {
//         const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
//         setForm((s) => ({ ...s, image_url: `${SUPABASE_URL}/storage/v1/object/public/${path}` }));
//       } else throw new Error("Upload response missing URL");

//       setMessage("✅ Image uploaded");
//     } catch (err) {
//       console.error("Upload error:", err);
//       setMessage("❌ Upload failed: " + (err?.message || err));
//     } finally {
//       setUploading(false);
//     }
//   };

//   // create or update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     // basic validation
//     if (!form.title_en?.trim() || !form.title_te?.trim()) {
//       setMessage("Please enter both English and Telugu titles.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const payload = {
//         title_en: form.title_en.trim(),
//         title_te: form.title_te.trim(),
//         summary_en: form.summary_en || null,
//         summary_te: form.summary_te || null,
//         content_en: form.content_en || null,
//         content_te: form.content_te || null,
//         image_url: form.image_url || null,
//         category_id: form.category_id ? Number(form.category_id) : null,
//       };

//       if (editingId) {
//         // update
//         // NOTE: updated_at column will be set by DB trigger if you add it (see migration SQL below)
//         const { error } = await supabase.from("articles").update(payload).eq("id", editingId);
//         if (error) throw error;
//         setMessage("✅ Article updated");
//         setEditingId(null);
//       } else {
//         // insert
//         const { error } = await supabase.from("articles").insert([payload]);
//         if (error) throw error;
//         setMessage("✅ Article created");
//       }

//       setForm(emptyForm);
//       await refreshArticles();
//     } catch (err) {
//       console.error("Save error:", err);
//       setMessage("❌ Save failed: " + (err?.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // When user clicks Edit — fetch full article if list entry lacks full content/summary
//   const startEdit = async (a) => {
//     setMessage("");
//     // If the list item already contains full fields, use them; otherwise fetch single row
//     if (a.summary_en !== undefined && a.content_en !== undefined) {
//       setEditingId(a.id);
//       setForm({
//         id: a.id,
//         title_en: a.title_en || "",
//         title_te: a.title_te || "",
//         summary_en: a.summary_en || "",
//         summary_te: a.summary_te || "",
//         content_en: a.content_en || "",
//         content_te: a.content_te || "",
//         image_url: a.image_url || "",
//         category_id: a.category_id ? String(a.category_id) : "",
//       });
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       return;
//     }

//     // fetch single article (includes content/summary)
//     setLoading(true);
//     try {
//       const { data, error } = await supabase
//         .from("articles")
//         .select("*")
//         .eq("id", a.id)
//         .single();

//       if (error) throw error;

//       setEditingId(data.id);
//       setForm({
//         id: data.id,
//         title_en: data.title_en || "",
//         title_te: data.title_te || "",
//         summary_en: data.summary_en || "",
//         summary_te: data.summary_te || "",
//         content_en: data.content_en || "",
//         content_te: data.content_te || "",
//         image_url: data.image_url || "",
//         category_id: data.category_id ? String(data.category_id) : "",
//       });
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } catch (err) {
//       console.error("Fetch for edit error:", err);
//       setMessage("❌ Could not load article for editing: " + (err?.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this article?")) return;
//     setLoading(true);
//     try {
//       const { error } = await supabase.from("articles").delete().eq("id", id);
//       if (error) throw error;
//       setMessage("✅ Deleted");
//       await refreshArticles();
//     } catch (err) {
//       console.error("Delete error:", err);
//       setMessage("❌ Delete failed: " + (err?.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate("/admin-login");
//   };

//   if (loadingSession) return <div className="text-center mt-10">Checking auth...</div>;
//   if (!session) return null;

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">{editingId ? "Edit Article" : "Upload Article"}</h1>
//         <div className="flex items-center gap-3">
//           <button onClick={() => navigate("/")} className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300">
//             Go to site
//           </button>
//           <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
//             Logout
//           </button>
//         </div>
//       </div>

//       {message && <div className="mb-4 text-sm">{message}</div>}

//       <form onSubmit={handleSubmit} className="space-y-4 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input name="title_en" placeholder="Title (English)" value={form.title_en} onChange={handleChange} className="w-full border p-2 rounded" required />
//           <input name="title_te" placeholder="Title (Telugu)" value={form.title_te} onChange={handleChange} className="w-full border p-2 rounded" required />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <textarea name="summary_en" placeholder="Summary (English)" value={form.summary_en} onChange={handleChange} className="w-full border p-2 rounded" />
//           <textarea name="summary_te" placeholder="Summary (Telugu)" value={form.summary_te} onChange={handleChange} className="w-full border p-2 rounded" />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <textarea name="content_en" placeholder="Content (English)" value={form.content_en} onChange={handleChange} className="w-full border p-2 rounded h-40" />
//           <textarea name="content_te" placeholder="Content (Telugu)" value={form.content_te} onChange={handleChange} className="w-full border p-2 rounded h-40" />
//         </div>

//         <div>
//           <label className="block mb-1">Upload Image</label>
//           <input type="file" accept="image/*" onChange={handleImageUpload} />
//           {uploading && <div className="text-sm text-gray-600 mt-2">Uploading...</div>}
//           {form.image_url && <img src={form.image_url} alt="Uploaded" className="mt-2 w-40 h-40 object-cover rounded" />}
//         </div>

//         <div>
//           <label className="block mb-1">Category</label>
//           <select name="category_id" value={form.category_id} onChange={handleChange} className="w-full border p-2 rounded" required>
//             <option value="">-- Select Category --</option>
//             {categories.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.name} {c.name_te ? ` / ${c.name_te}` : ""}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex items-center gap-2">
//           <button type="submit" disabled={loading || uploading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//             {loading ? "Saving..." : editingId ? "Update" : "Upload"}
//           </button>
//           {editingId && (
//             <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="ml-2 bg-gray-200 px-3 py-1 rounded">
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {/* List */}
//       <section>
//         <h2 className="text-xl font-bold mb-3">All Articles</h2>
//         <div className="space-y-3">
//           {articles.map((a) => (
//             <div key={a.id} className="flex items-center justify-between p-3 border rounded">
//               <div className="flex items-center gap-3">
//                 {a.image_url ? <img src={a.image_url} alt={a.title_en} className="w-20 h-14 object-cover rounded" /> : <div className="w-20 h-14 bg-gray-100 rounded" />}
//                 <div>
//                   <div className="font-semibold">{a.title_en}</div>
//                   <div className="text-sm text-gray-500">
//                     {a.created_at ? new Date(a.created_at).toLocaleString() : ""} {a.updated_at ? ` • Updated ${new Date(a.updated_at).toLocaleString()}` : ""}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button onClick={() => startEdit(a)} className="px-3 py-1 bg-yellow-400 text-black rounded">Edit</button>
//                 <button onClick={() => handleDelete(a.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { supabase } from "../lib/supabaseClient";
// import { useNavigate } from "react-router-dom";

// export default function AdminPage() {
//   const navigate = useNavigate();
//   const [session, setSession] = useState(null);
//   const [loadingSession, setLoadingSession] = useState(true);

//   const emptyForm = {
//     id: null,
//     title_en: "",
//     title_te: "",
//     summary_en: "",
//     summary_te: "",
//     content_en: "",
//     content_te: "",
//     image_url: "",
//     category_id: "",
//   };
//   const [form, setForm] = useState(emptyForm);
//   const [categories, setCategories] = useState([]);
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [editingId, setEditingId] = useState(null);

//   // check session
//   useEffect(() => {
//     async function checkSession() {
//       const { data } = await supabase.auth.getSession();
//       if (!data?.session) {
//         navigate("/admin-login");
//       } else {
//         setSession(data.session);
//       }
//       setLoadingSession(false);
//     }
//     checkSession();

//     const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
//       if (!s) {
//         navigate("/admin-login");
//       } else {
//         setSession(s);
//       }
//     });

//     return () => listener.subscription.unsubscribe();
//   }, [navigate]);

//   // load categories & articles
//   useEffect(() => {
//     async function load() {
//       const { data: catData } = await supabase
//         .from("categories")
//         .select("id, name, name_te")
//         .order("id");
//       setCategories(catData || []);

//       const { data: artData } = await supabase
//         .from("articles")
//         .select("id, title_en, title_te, category_id, image_url, created_at, updated_at")
//         .order("created_at", { ascending: false });
//       setArticles(artData || []);
//     }
//     load();
//   }, []);

//   const refreshArticles = async () => {
//     const { data: artData } = await supabase
//       .from("articles")
//       .select("id, title_en, title_te, category_id, image_url, created_at, updated_at")
//       .order("created_at", { ascending: false });
//     setArticles(artData || []);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((s) => ({ ...s, [name]: value }));
//   };

//   // upload image
//   const handleImageUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploading(true);
//     setMessage("");

//     try {
//       const b64 = await new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const res = reader.result;
//           const comma = res.indexOf(",");
//           resolve(comma >= 0 ? res.slice(comma + 1) : res);
//         };
//         reader.onerror = (err) => reject(err);
//         reader.readAsDataURL(file);
//       });

//       const resp = await fetch("/.netlify/functions/upload", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ filename: file.name, mimeType: file.type, b64 }),
//       });

//       const json = await resp.json().catch(() => ({ error: "Invalid JSON response" }));
//       if (!resp.ok) throw new Error(json?.error || "Upload failed");

//       const publicUrl = json.publicUrl || null;
//       const path = json.path || null;

//       if (publicUrl) setForm((s) => ({ ...s, image_url: publicUrl }));
//       else if (path) {
//         const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
//         setForm((s) => ({ ...s, image_url: `${SUPABASE_URL}/storage/v1/object/public/${path}` }));
//       } else throw new Error("Upload response missing URL");

//       setMessage("✅ Image uploaded");
//     } catch (err) {
//       console.error("Upload error:", err);
//       setMessage("❌ Upload failed: " + (err?.message || err));
//     } finally {
//       setUploading(false);
//     }
//   };

//   // create or update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     if (!form.title_en?.trim() || !form.title_te?.trim()) {
//       setMessage("Please enter both English and Telugu titles.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const payload = {
//         title_en: form.title_en.trim(),
//         title_te: form.title_te.trim(),
//         summary_en: form.summary_en || null,
//         summary_te: form.summary_te || null,
//         content_en: form.content_en || null,
//         content_te: form.content_te || null,
//         image_url: form.image_url || null,
//         category_id: form.category_id ? Number(form.category_id) : null,
//       };

//       if (editingId) {
//         const { error } = await supabase.from("articles").update(payload).eq("id", editingId);
//         if (error) throw error;
//         setMessage("✅ Article updated");
//         setEditingId(null);
//       } else {
//         const { data, error } = await supabase.from("articles").insert([payload]).select("id").single();
//         if (error) throw error;
//         setMessage("✅ Article created");

//         // 🔔 send notification
//         try {
//           await fetch("/.netlify/functions/sendNotification", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               title: payload.title_en,
//               message: payload.summary_en || payload.title_en,
//               url: `${window.location.origin}/articles/${data.id}`,
//             }),
//           });
//         } catch (err) {
//           console.warn("Notification send failed", err);
//         }
//       }

//       setForm(emptyForm);
//       await refreshArticles();
//     } catch (err) {
//       console.error("Save error:", err);
//       setMessage("❌ Save failed: " + (err?.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // edit
//   const startEdit = async (a) => {
//     setMessage("");
//     const { data, error } = await supabase.from("articles").select("*").eq("id", a.id).single();
//     if (error) {
//       console.error("Fetch for edit error:", error);
//       setMessage("❌ Could not load article for editing");
//       return;
//     }
//     setEditingId(data.id);
//     setForm({
//       id: data.id,
//       title_en: data.title_en || "",
//       title_te: data.title_te || "",
//       summary_en: data.summary_en || "",
//       summary_te: data.summary_te || "",
//       content_en: data.content_en || "",
//       content_te: data.content_te || "",
//       image_url: data.image_url || "",
//       category_id: data.category_id ? String(data.category_id) : "",
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // delete
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this article?")) return;
//     setLoading(true);
//     try {
//       const { error } = await supabase.from("articles").delete().eq("id", id);
//       if (error) throw error;
//       setMessage("✅ Deleted");
//       await refreshArticles();
//     } catch (err) {
//       console.error("Delete error:", err);
//       setMessage("❌ Delete failed: " + (err?.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate("/admin-login");
//   };

//   if (loadingSession) return <div className="text-center mt-10">Checking auth...</div>;
//   if (!session) return null;

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">{editingId ? "Edit Article" : "Upload Article"}</h1>
//         <div className="flex items-center gap-3">
//           <button onClick={() => navigate("/")} className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300">
//             Go to site
//           </button>
//           <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
//             Logout
//           </button>
//         </div>
//       </div>

//       {message && <div className="mb-4 text-sm">{message}</div>}

//       <form onSubmit={handleSubmit} className="space-y-4 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input name="title_en" placeholder="Title (English)" value={form.title_en} onChange={handleChange} className="w-full border p-2 rounded" required />
//           <input name="title_te" placeholder="Title (Telugu)" value={form.title_te} onChange={handleChange} className="w-full border p-2 rounded" required />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <textarea name="summary_en" placeholder="Summary (English)" value={form.summary_en} onChange={handleChange} className="w-full border p-2 rounded" />
//           <textarea name="summary_te" placeholder="Summary (Telugu)" value={form.summary_te} onChange={handleChange} className="w-full border p-2 rounded" />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <textarea name="content_en" placeholder="Content (English)" value={form.content_en} onChange={handleChange} className="w-full border p-2 rounded h-40" />
//           <textarea name="content_te" placeholder="Content (Telugu)" value={form.content_te} onChange={handleChange} className="w-full border p-2 rounded h-40" />
//         </div>

//         <div>
//           <label className="block mb-1">Upload Image</label>
//           <input type="file" accept="image/*" onChange={handleImageUpload} />
//           {uploading && <div className="text-sm text-gray-600 mt-2">Uploading...</div>}
//           {form.image_url && <img src={form.image_url} alt="Uploaded" className="mt-2 w-40 h-40 object-cover rounded" />}
//         </div>

//         <div>
//           <label className="block mb-1">Category</label>
//           <select name="category_id" value={form.category_id} onChange={handleChange} className="w-full border p-2 rounded" required>
//             <option value="">-- Select Category --</option>
//             {categories.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.name} {c.name_te ? ` / ${c.name_te}` : ""}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex items-center gap-2">
//           <button type="submit" disabled={loading || uploading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//             {loading ? "Saving..." : editingId ? "Update" : "Upload"}
//           </button>
//           {editingId && (
//             <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="ml-2 bg-gray-200 px-3 py-1 rounded">
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {/* List */}
//       <section>
//         <h2 className="text-xl font-bold mb-3">All Articles</h2>
//         <div className="space-y-3">
//           {articles.map((a) => (
//             <div key={a.id} className="flex items-center justify-between p-3 border rounded">
//               <div className="flex items-center gap-3">
//                 {a.image_url ? <img src={a.image_url} alt={a.title_en} className="w-20 h-14 object-cover rounded" /> : <div className="w-20 h-14 bg-gray-100 rounded" />}
//                 <div>
//                   <div className="font-semibold">{a.title_en}</div>
//                   <div className="text-sm text-gray-500">
//                     {a.created_at ? new Date(a.created_at).toLocaleString() : ""} {a.updated_at ? ` • Updated ${new Date(a.updated_at).toLocaleString()}` : ""}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button onClick={() => startEdit(a)} className="px-3 py-1 bg-yellow-400 text-black rounded">Edit</button>
//                 <button onClick={() => handleDelete(a.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { supabase } from "../lib/supabaseClient";
// import { useNavigate } from "react-router-dom";

// export default function AdminPage() {
//   const navigate = useNavigate();
//   const [session, setSession] = useState(null);
//   const [loadingSession, setLoadingSession] = useState(true);

//   const emptyForm = {
//     id: null,
//     title_en: "",
//     title_te: "",
//     summary_en: "",
//     summary_te: "",
//     content_en: "",
//     content_te: "",
//     image_url: "",
//     category_id: "",
//   };
//   const [form, setForm] = useState(emptyForm);
//   const [categories, setCategories] = useState([]);
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [editingId, setEditingId] = useState(null);

//   // 🔑 check session
//   useEffect(() => {
//     async function checkSession() {
//       const { data } = await supabase.auth.getSession();
//       if (!data?.session) {
//         navigate("/admin-login");
//       } else {
//         setSession(data.session);
//       }
//       setLoadingSession(false);
//     }
//     checkSession();

//     const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
//       if (!s) {
//         navigate("/admin-login");
//       } else {
//         setSession(s);
//       }
//     });

//     return () => listener.subscription.unsubscribe();
//   }, [navigate]);

//   // 🔄 load categories & articles
//   useEffect(() => {
//     async function load() {
//       const { data: catData } = await supabase
//         .from("categories")
//         .select("id, name, name_te")
//         .order("id");
//       setCategories(catData || []);
//       await refreshArticles();
//     }
//     load();

//     // 🔔 realtime subscription
//     const channel = supabase
//       .channel("admin-articles")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "articles" },
//         () => {
//           refreshArticles();
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   const refreshArticles = async () => {
//     const { data: artData, error } = await supabase
//       .from("articles")
//       .select("id, title_en, title_te, category_id, image_url, created_at, updated_at")
//       .order("created_at", { ascending: false });
//     if (error) console.error("Fetch articles error:", error.message);
//     setArticles(artData || []);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((s) => ({ ...s, [name]: value }));
//   };

//   // 📸 upload image
//   const handleImageUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploading(true);
//     setMessage("");

//     try {
//       const b64 = await new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const res = reader.result;
//           const comma = res.indexOf(",");
//           resolve(comma >= 0 ? res.slice(comma + 1) : res);
//         };
//         reader.onerror = (err) => reject(err);
//         reader.readAsDataURL(file);
//       });

//       const resp = await fetch("/.netlify/functions/upload", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ filename: file.name, mimeType: file.type, b64 }),
//       });

//       const json = await resp.json().catch(() => ({ error: "Invalid JSON response" }));
//       if (!resp.ok) throw new Error(json?.error || "Upload failed");

//       const publicUrl = json.publicUrl || null;
//       const path = json.path || null;

//       if (publicUrl) setForm((s) => ({ ...s, image_url: publicUrl }));
//       else if (path) {
//         const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
//         setForm((s) => ({ ...s, image_url: `${SUPABASE_URL}/storage/v1/object/public/${path}` }));
//       } else throw new Error("Upload response missing URL");

//       setMessage("✅ Image uploaded");
//     } catch (err) {
//       console.error("Upload error:", err);
//       setMessage("❌ Upload failed: " + (err?.message || err));
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ✍️ create or update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     if (!form.title_en?.trim() || !form.title_te?.trim()) {
//       setMessage("Please enter both English and Telugu titles.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const payload = {
//         title_en: form.title_en.trim(),
//         title_te: form.title_te.trim(),
//         summary_en: form.summary_en || null,
//         summary_te: form.summary_te || null,
//         content_en: form.content_en || null,
//         content_te: form.content_te || null,
//         image_url: form.image_url || null,
//         category_id: form.category_id ? Number(form.category_id) : null,
//         updated_at: new Date().toISOString(), // ✅ force timestamp update
//       };

//       if (editingId) {
//         const { error } = await supabase.from("articles").update(payload).eq("id", editingId);
//         if (error) throw error;
//         setMessage("✅ Article updated");
//         setEditingId(null);
//       } else {
//         const { data, error } = await supabase.from("articles").insert([payload]).select("id").single();
//         if (error) throw error;
//         setMessage("✅ Article created");

//         // 🔔 optional: send notification
//         try {
//           await fetch("/.netlify/functions/sendNotification", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               title: payload.title_en,
//               message: payload.summary_en || payload.title_en,
//               url: `${window.location.origin}/articles/${data.id}`,
//             }),
//           });
//         } catch (err) {
//           console.warn("Notification send failed", err);
//         }
//       }

//       setForm(emptyForm);
//       await refreshArticles();
//     } catch (err) {
//       console.error("Save error:", err);
//       setMessage("❌ Save failed: " + (err?.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✏️ edit
//   const startEdit = async (a) => {
//     setMessage("");
//     const { data, error } = await supabase.from("articles").select("*").eq("id", a.id).maybeSingle();
//     if (error) {
//       console.error("Fetch for edit error:", error);
//       setMessage("❌ Could not load article for editing");
//       return;
//     }
//     setEditingId(data.id);
//     setForm({
//       id: data.id,
//       title_en: data.title_en || "",
//       title_te: data.title_te || "",
//       summary_en: data.summary_en || "",
//       summary_te: data.summary_te || "",
//       content_en: data.content_en || "",
//       content_te: data.content_te || "",
//       image_url: data.image_url || "",
//       category_id: data.category_id ? String(data.category_id) : "",
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // 🗑 delete
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this article?")) return;
//     setLoading(true);
//     try {
//       const { error } = await supabase.from("articles").delete().eq("id", id);
//       if (error) throw error;
//       setMessage("✅ Deleted");
//       await refreshArticles();
//     } catch (err) {
//       console.error("Delete error:", err);
//       setMessage("❌ Delete failed: " + (err?.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate("/admin-login");
//   };

//   if (loadingSession) return <div className="text-center mt-10">Checking auth...</div>;
//   if (!session) return null;

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">{editingId ? "Edit Article" : "Upload Article"}</h1>
//         <div className="flex items-center gap-3">
//           <button onClick={() => navigate("/")} className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300">
//             Go to site
//           </button>
//           <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
//             Logout
//           </button>
//         </div>
//       </div>

//       {message && <div className="mb-4 text-sm">{message}</div>}

//       {/* form omitted for brevity (same as yours)… */}

//       {/* List */}
//       <section>
//         <h2 className="text-xl font-bold mb-3">All Articles</h2>
//         <div className="space-y-3">
//           {articles.map((a) => {
//             const created = a.created_at ? new Date(a.created_at).toLocaleString() : "";
//             const updated = a.updated_at ? ` • Updated ${new Date(a.updated_at).toLocaleString()}` : "";
//             return (
//               <div key={a.id} className="flex items-center justify-between p-3 border rounded">
//                 <div className="flex items-center gap-3">
//                   {a.image_url ? <img src={a.image_url} alt={a.title_en} className="w-20 h-14 object-cover rounded" /> : <div className="w-20 h-14 bg-gray-100 rounded" />}
//                   <div>
//                     <div className="font-semibold">{a.title_en}</div>
//                     <div className="text-sm text-gray-500">
//                       {created} {updated}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <button onClick={() => startEdit(a)} className="px-3 py-1 bg-yellow-400 text-black rounded">Edit</button>
//                   <button onClick={() => handleDelete(a.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </section>
//     </div>
//   );
// }

// src/pages/AdminPage.jsx
// import React, { useState, useEffect } from "react";
// import { supabase } from "../lib/supabaseClient";
// import { useNavigate } from "react-router-dom";

// export default function AdminPage() {
//   const navigate = useNavigate();
//   const [session, setSession] = useState(null);
//   const [loadingSession, setLoadingSession] = useState(true);

//   const emptyForm = {
//     id: null,
//     title_en: "",
//     title_te: "",
//     summary_en: "",
//     summary_te: "",
//     content_en: "",
//     content_te: "",
//     image_url: "",
//     category_id: "",
//   };

//   const [form, setForm] = useState(emptyForm);
//   const [categories, setCategories] = useState([]);
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [editingId, setEditingId] = useState(null);

//   // 🔑 check session
//   useEffect(() => {
//     async function checkSession() {
//       const { data } = await supabase.auth.getSession();
//       if (!data?.session) {
//         navigate("/admin-login");
//       } else {
//         setSession(data.session);
//       }
//       setLoadingSession(false);
//     }
//     checkSession();

//     const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
//       if (!s) {
//         navigate("/admin-login");
//       } else {
//         setSession(s);
//       }
//     });

//     return () => listener.subscription.unsubscribe();
//   }, [navigate]);

//   // 🔄 load categories & articles
//   useEffect(() => {
//     async function load() {
//       const { data: catData } = await supabase
//         .from("categories")
//         .select("id, name, name_te")
//         .order("id");
//       setCategories(catData || []);
//       await refreshArticles();
//     }
//     load();

//     // 🔔 realtime subscription
//     const channel = supabase
//       .channel("admin-articles")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "articles" },
//         () => {
//           refreshArticles();
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   const refreshArticles = async () => {
//     const { data: artData, error } = await supabase
//       .from("articles")
//       .select("id, title_en, title_te, category_id, image_url, created_at, updated_at")
//       .order("created_at", { ascending: false });
//     if (error) console.error("Fetch articles error:", error.message);
//     setArticles(artData || []);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((s) => ({ ...s, [name]: value }));
//   };

//   // 📸 upload image
//   const handleImageUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploading(true);
//     setMessage("");

//     try {
//       const b64 = await new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const res = reader.result;
//           const comma = res.indexOf(",");
//           resolve(comma >= 0 ? res.slice(comma + 1) : res);
//         };
//         reader.onerror = (err) => reject(err);
//         reader.readAsDataURL(file);
//       });

//       const resp = await fetch("/.netlify/functions/upload", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ filename: file.name, mimeType: file.type, b64 }),
//       });

//       const json = await resp.json().catch(() => ({ error: "Invalid JSON response" }));
//       if (!resp.ok) throw new Error(json?.error || "Upload failed");

//       const publicUrl = json.publicUrl || null;
//       const path = json.path || null;

//       if (publicUrl) setForm((s) => ({ ...s, image_url: publicUrl }));
//       else if (path) {
//         const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
//         setForm((s) => ({ ...s, image_url: `${SUPABASE_URL}/storage/v1/object/public/${path}` }));
//       } else throw new Error("Upload response missing URL");

//       setMessage("✅ Image uploaded");
//     } catch (err) {
//       console.error("Upload error:", err);
//       setMessage("❌ Upload failed: " + (err?.message || err));
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ✍️ create or update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     if (!form.title_en?.trim() || !form.title_te?.trim()) {
//       setMessage("Please enter both English and Telugu titles.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const payload = {
//         title_en: form.title_en.trim(),
//         title_te: form.title_te.trim(),
//         summary_en: form.summary_en || null,
//         summary_te: form.summary_te || null,
//         content_en: form.content_en || null,
//         content_te: form.content_te || null,
//         image_url: form.image_url || null,
//         category_id: form.category_id ? Number(form.category_id) : null,
//         updated_at: new Date().toISOString(), // ✅ force timestamp update
//       };

//       if (editingId) {
//         const { error } = await supabase.from("articles").update(payload).eq("id", editingId);
//         if (error) throw error;
//         setMessage("✅ Article updated");
//         setEditingId(null);
//       } else {
//         const { data, error } = await supabase.from("articles").insert([payload]).select("id").single();
//         if (error) throw error;
//         setMessage("✅ Article created");

//         // 🔔 optional: send notification
//         try {
//           await fetch("/.netlify/functions/sendNotification", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               title: payload.title_en,
//               message: payload.summary_en || payload.title_en,
//               url: `${window.location.origin}/articles/${data.id}`,
//             }),
//           });
//         } catch (err) {
//           console.warn("Notification send failed", err);
//         }
//       }

//       setForm(emptyForm);
//       await refreshArticles();
//     } catch (err) {
//       console.error("Save error:", err);
//       setMessage("❌ Save failed: " + (err?.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✏️ edit
//   const startEdit = async (a) => {
//     setMessage("");
//     const { data, error } = await supabase.from("articles").select("*").eq("id", a.id).maybeSingle();
//     if (error) {
//       console.error("Fetch for edit error:", error);
//       setMessage("❌ Could not load article for editing");
//       return;
//     }
//     setEditingId(data.id);
//     setForm({
//       id: data.id,
//       title_en: data.title_en || "",
//       title_te: data.title_te || "",
//       summary_en: data.summary_en || "",
//       summary_te: data.summary_te || "",
//       content_en: data.content_en || "",
//       content_te: data.content_te || "",
//       image_url: data.image_url || "",
//       category_id: data.category_id ? String(data.category_id) : "",
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // 🗑 delete
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this article?")) return;
//     setLoading(true);
//     try {
//       const { error } = await supabase.from("articles").delete().eq("id", id);
//       if (error) throw error;
//       setMessage("✅ Deleted");
//       await refreshArticles();
//     } catch (err) {
//       console.error("Delete error:", err);
//       setMessage("❌ Delete failed: " + (err?.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate("/admin-login");
//   };

//   if (loadingSession) return <div className="text-center mt-10">Checking auth...</div>;
//   if (!session) return null;

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">{editingId ? "Edit Article" : "Upload Article"}</h1>
//         <div className="flex items-center gap-3">
//           <button onClick={() => navigate("/")} className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300">
//             Go to site
//           </button>
//           <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
//             Logout
//           </button>
//         </div>
//       </div>

//       {message && <div className="mb-4 text-sm">{message}</div>}

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-4 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input name="title_en" placeholder="Title (English)" value={form.title_en} onChange={handleChange} className="w-full border p-2 rounded" required />
//           <input name="title_te" placeholder="Title (Telugu)" value={form.title_te} onChange={handleChange} className="w-full border p-2 rounded" required />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <textarea name="summary_en" placeholder="Summary (English)" value={form.summary_en} onChange={handleChange} className="w-full border p-2 rounded" />
//           <textarea name="summary_te" placeholder="Summary (Telugu)" value={form.summary_te} onChange={handleChange} className="w-full border p-2 rounded" />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <textarea name="content_en" placeholder="Content (English)" value={form.content_en} onChange={handleChange} className="w-full border p-2 rounded h-40" />
//           <textarea name="content_te" placeholder="Content (Telugu)" value={form.content_te} onChange={handleChange} className="w-full border p-2 rounded h-40" />
//         </div>

//         <div>
//           <label className="block mb-1">Upload Image</label>
//           <input type="file" accept="image/*" onChange={handleImageUpload} />
//           {uploading && <div className="text-sm text-gray-600 mt-2">Uploading...</div>}
//           {form.image_url && <img src={form.image_url} alt="Uploaded" className="mt-2 w-40 h-40 object-cover rounded" />}
//         </div>

//         <div>
//           <label className="block mb-1">Category</label>
//           <select name="category_id" value={form.category_id} onChange={handleChange} className="w-full border p-2 rounded" required>
//             <option value="">-- Select Category --</option>
//             {categories.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.name} {c.name_te ? ` / ${c.name_te}` : ""}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex items-center gap-2">
//           <button type="submit" disabled={loading || uploading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//             {loading ? "Saving..." : editingId ? "Update" : "Upload"}
//           </button>
//           {editingId && (
//             <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="ml-2 bg-gray-200 px-3 py-1 rounded">
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {/* List */}
//       <section>
//         <h2 className="text-xl font-bold mb-3">All Articles</h2>
//         <div className="space-y-3">
//           {articles.map((a) => {
//             const created = a.created_at ? new Date(a.created_at).toLocaleString() : "";
//             const updated = a.updated_at ? ` • Updated ${new Date(a.updated_at).toLocaleString()}` : "";
//             return (
//               <div key={a.id} className="flex items-center justify-between p-3 border rounded">
//                 <div className="flex items-center gap-3">
//                   {a.image_url ? <img src={a.image_url} alt={a.title_en} className="w-20 h-14 object-cover rounded" /> : <div className="w-20 h-14 bg-gray-100 rounded" />}
//                   <div>
//                     <div className="font-semibold">{a.title_en}</div>
//                     <div className="text-sm text-gray-500">
//                       {created} {updated}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <button onClick={() => startEdit(a)} className="px-3 py-1 bg-yellow-400 text-black rounded">Edit</button>
//                   <button onClick={() => handleDelete(a.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </section>
//     </div>
//   );
// }


// // src/pages/AdminPage.jsx
// import React, { useState, useEffect } from "react";
// import { supabase } from "../lib/supabaseClient";
// import { useNavigate } from "react-router-dom";

// export default function AdminPage() {
//   const navigate = useNavigate();
//   const [session, setSession] = useState(null);
//   const [loadingSession, setLoadingSession] = useState(true);

//   const emptyForm = {
//     id: null,
//     title_en: "",
//     title_te: "",
//     summary_en: "",
//     summary_te: "",
//     content_en: "",
//     content_te: "",
//     image_url: "",
//     category_id: "",
//   };

//   const [form, setForm] = useState(emptyForm);
//   const [categories, setCategories] = useState([]);
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [editingId, setEditingId] = useState(null);

//   // 🔑 check session
//   useEffect(() => {
//     async function checkSession() {
//       const { data } = await supabase.auth.getSession();
//       if (!data?.session) {
//         navigate("/admin-login");
//       } else {
//         setSession(data.session);
//       }
//       setLoadingSession(false);
//     }
//     checkSession();

//     const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
//       if (!s) navigate("/admin-login");
//       else setSession(s);
//     });

//     return () => listener.subscription.unsubscribe();
//   }, [navigate]);

//   // 🔄 load categories & articles + realtime
//   useEffect(() => {
//     async function load() {
//       const { data: catData } = await supabase
//         .from("categories")
//         .select("id, name, name_te")
//         .order("id");
//       setCategories(catData || []);
//       await refreshArticles();
//     }
//     load();

//     // realtime sync
//     const channel = supabase
//       .channel("admin-articles")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "articles" },
//         () => refreshArticles()
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   const refreshArticles = async () => {
//     const { data: artData, error } = await supabase
//       .from("articles")
//       .select("id, title_en, title_te, category_id, image_url, created_at, updated_at")
//       .order("created_at", { ascending: false });

//     if (error) console.error("Fetch articles error:", error.message);
//     setArticles(artData || []);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((s) => ({ ...s, [name]: value }));
//   };

//   // 📸 upload image
//   const handleImageUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploading(true);
//     setMessage("");

//     try {
//       const b64 = await new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const res = reader.result;
//           const comma = res.indexOf(",");
//           resolve(comma >= 0 ? res.slice(comma + 1) : res);
//         };
//         reader.onerror = (err) => reject(err);
//         reader.readAsDataURL(file);
//       });

//       const resp = await fetch("/.netlify/functions/upload", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ filename: file.name, mimeType: file.type, b64 }),
//       });

//       const json = await resp.json().catch(() => ({ error: "Invalid JSON response" }));
//       if (!resp.ok) throw new Error(json?.error || "Upload failed");

//       const publicUrl = json.publicUrl || null;
//       const path = json.path || null;

//       if (publicUrl) setForm((s) => ({ ...s, image_url: publicUrl }));
//       else if (path) {
//         const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
//         setForm((s) => ({
//           ...s,
//           image_url: `${SUPABASE_URL}/storage/v1/object/public/${path}`,
//         }));
//       } else throw new Error("Upload response missing URL");

//       setMessage("✅ Image uploaded");
//     } catch (err) {
//       console.error("Upload error:", err);
//       setMessage("❌ Upload failed: " + (err?.message || err));
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ✍️ create or update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     if (!form.title_en?.trim() || !form.title_te?.trim()) {
//       setMessage("Please enter both English and Telugu titles.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const payload = {
//         title_en: form.title_en.trim(),
//         title_te: form.title_te.trim(),
//         summary_en: form.summary_en || null,
//         summary_te: form.summary_te || null,
//         content_en: form.content_en || null,
//         content_te: form.content_te || null,
//         image_url: form.image_url || null,
//         category_id: form.category_id ? Number(form.category_id) : null,
//         // ❌ no need to send updated_at, DB trigger handles it
//       };

//       if (editingId) {
//         const { error } = await supabase.from("articles").update(payload).eq("id", editingId);
//         if (error) throw error;
//         setMessage("✅ Article updated");
//         setEditingId(null);
//       } else {
//         const { data, error } = await supabase
//           .from("articles")
//           .insert([payload])
//           .select("id")
//           .single();
//         if (error) throw error;
//         setMessage("✅ Article created");
//       }

//       setForm(emptyForm);
//       await refreshArticles();
//     } catch (err) {
//       console.error("Save error:", err);
//       setMessage("❌ Save failed: " + (err?.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✏️ edit
//   const startEdit = async (a) => {
//     setMessage("");
//     const { data, error } = await supabase.from("articles").select("*").eq("id", a.id).maybeSingle();
//     if (error) {
//       console.error("Fetch for edit error:", error);
//       setMessage("❌ Could not load article for editing");
//       return;
//     }
//     setEditingId(data.id);
//     setForm({
//       id: data.id,
//       title_en: data.title_en || "",
//       title_te: data.title_te || "",
//       summary_en: data.summary_en || "",
//       summary_te: data.summary_te || "",
//       content_en: data.content_en || "",
//       content_te: data.content_te || "",
//       image_url: data.image_url || "",
//       category_id: data.category_id ? String(data.category_id) : "",
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // 🗑 delete
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this article?")) return;
//     setLoading(true);
//     try {
//       const { error } = await supabase.from("articles").delete().eq("id", id);
//       if (error) throw error;
//       setMessage("✅ Deleted");
//       await refreshArticles();
//     } catch (err) {
//       console.error("Delete error:", err);
//       setMessage("❌ Delete failed: " + (err?.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate("/admin-login");
//   };

//   if (loadingSession) return <div className="text-center mt-10">Checking auth...</div>;
//   if (!session) return null;

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">{editingId ? "Edit Article" : "Upload Article"}</h1>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => navigate("/")}
//             className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
//           >
//             Go to site
//           </button>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {message && <div className="mb-4 text-sm">{message}</div>}

//       {/* ✅ Form */}
//       <form onSubmit={handleSubmit} className="space-y-4 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             name="title_en"
//             placeholder="Title (English)"
//             value={form.title_en}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             name="title_te"
//             placeholder="Title (Telugu)"
//             value={form.title_te}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <textarea
//             name="summary_en"
//             placeholder="Summary (English)"
//             value={form.summary_en}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//           <textarea
//             name="summary_te"
//             placeholder="Summary (Telugu)"
//             value={form.summary_te}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <textarea
//             name="content_en"
//             placeholder="Content (English)"
//             value={form.content_en}
//             onChange={handleChange}
//             className="w-full border p-2 rounded h-40"
//           />
//           <textarea
//             name="content_te"
//             placeholder="Content (Telugu)"
//             value={form.content_te}
//             onChange={handleChange}
//             className="w-full border p-2 rounded h-40"
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Upload Image</label>
//           <input type="file" accept="image/*" onChange={handleImageUpload} />
//           {uploading && <div className="text-sm text-gray-600 mt-2">Uploading...</div>}
//           {form.image_url && (
//             <img src={form.image_url} alt="Uploaded" className="mt-2 w-40 h-40 object-cover rounded" />
//           )}
//         </div>

//         <div>
//           <label className="block mb-1">Category</label>
//           <select
//             name="category_id"
//             value={form.category_id}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           >
//             <option value="">-- Select Category --</option>
//             {categories.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.name} {c.name_te ? ` / ${c.name_te}` : ""}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             type="submit"
//             disabled={loading || uploading}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             {loading ? "Saving..." : editingId ? "Update" : "Upload"}
//           </button>
//           {editingId && (
//             <button
//               type="button"
//               onClick={() => {
//                 setEditingId(null);
//                 setForm(emptyForm);
//               }}
//               className="ml-2 bg-gray-200 px-3 py-1 rounded"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {/* ✅ List */}
//       <section>
//         <h2 className="text-xl font-bold mb-3">All Articles</h2>
//         <div className="space-y-3">
//           {articles.map((a) => {
//             const created = a.created_at ? new Date(a.created_at).toLocaleString() : "";
//             const updated = a.updated_at ? ` • Updated ${new Date(a.updated_at).toLocaleString()}` : "";
//             return (
//               <div key={a.id} className="flex items-center justify-between p-3 border rounded">
//                 <div className="flex items-center gap-3">
//                   {a.image_url ? (
//                     <img src={a.image_url} alt={a.title_en} className="w-20 h-14 object-cover rounded" />
//                   ) : (
//                     <div className="w-20 h-14 bg-gray-100 rounded" />
//                   )}
//                   <div>
//                     <div className="font-semibold">{a.title_en}</div>
//                     <div className="text-sm text-gray-500">
//                       {created} {updated}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => startEdit(a)}
//                     className="px-3 py-1 bg-yellow-400 text-black rounded"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(a.id)}
//                     className="px-3 py-1 bg-red-500 text-white rounded"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </section>
//     </div>
//   );
// }

// src/pages/AdminPage.jsx
// import React, { useState, useEffect } from "react";
// import { supabase } from "../lib/supabaseClient";
// import { useNavigate } from "react-router-dom";

// export default function AdminPage() {
//   const navigate = useNavigate();
//   const [session, setSession] = useState(null);
//   const [loadingSession, setLoadingSession] = useState(true);

//   const emptyForm = {
//     id: null,
//     title_en: "",
//     title_te: "",
//     summary_en: "",
//     summary_te: "",
//     content_en: "",
//     content_te: "",
//     image_url: "",
//     category_id: "",
//   };
//   const [form, setForm] = useState(emptyForm);
//   const [categories, setCategories] = useState([]);
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [editingId, setEditingId] = useState(null);

//   // 🔑 check session
//   useEffect(() => {
//     async function checkSession() {
//       const { data } = await supabase.auth.getSession();
//       if (!data?.session) {
//         navigate("/admin-login");
//       } else {
//         setSession(data.session);
//       }
//       setLoadingSession(false);
//     }
//     checkSession();

//     const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
//       if (!s) {
//         navigate("/admin-login");
//       } else {
//         setSession(s);
//       }
//     });

//     return () => listener.subscription.unsubscribe();
//   }, [navigate]);

//   // 🔄 load categories & articles
//   useEffect(() => {
//     async function load() {
//       const { data: catData } = await supabase
//         .from("categories")
//         .select("id, name, name_te")
//         .order("id");
//       setCategories(catData || []);
//       await refreshArticles();
//     }
//     load();

//     // 🔔 realtime subscription for articles
//     const channel = supabase
//       .channel("admin-articles")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "articles" },
//         () => {
//           refreshArticles();
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   const refreshArticles = async () => {
//     const { data: artData, error } = await supabase
//       .from("articles")
//       .select("id, title_en, title_te, category_id, image_url, created_at, updated_at")
//       .order("created_at", { ascending: false });
//     if (error) console.error("Fetch articles error:", error.message);
//     setArticles(artData || []);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((s) => ({ ...s, [name]: value }));
//   };

//   // 📸 upload image
//   const handleImageUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploading(true);
//     setMessage("");

//     try {
//       const b64 = await new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const res = reader.result;
//           const comma = res.indexOf(",");
//           resolve(comma >= 0 ? res.slice(comma + 1) : res);
//         };
//         reader.onerror = (err) => reject(err);
//         reader.readAsDataURL(file);
//       });

//       const resp = await fetch("/.netlify/functions/upload", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ filename: file.name, mimeType: file.type, b64 }),
//       });

//       const json = await resp.json().catch(() => ({ error: "Invalid JSON response" }));
//       if (!resp.ok) throw new Error(json?.error || "Upload failed");

//       const publicUrl = json.publicUrl || null;
//       const path = json.path || null;

//       if (publicUrl) setForm((s) => ({ ...s, image_url: publicUrl }));
//       else if (path) {
//         const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
//         setForm((s) => ({
//           ...s,
//           image_url: `${SUPABASE_URL}/storage/v1/object/public/${path}`,
//         }));
//       } else throw new Error("Upload response missing URL");

//       setMessage("✅ Image uploaded");
//     } catch (err) {
//       console.error("Upload error:", err);
//       setMessage("❌ Upload failed: " + (err?.message || err));
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ✍️ create or update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     if (!form.title_en?.trim() || !form.title_te?.trim()) {
//       setMessage("Please enter both English and Telugu titles.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const payload = {
//         title_en: form.title_en.trim(),
//         title_te: form.title_te.trim(),
//         summary_en: form.summary_en || null,
//         summary_te: form.summary_te || null,
//         content_en: form.content_en || null,
//         content_te: form.content_te || null,
//         image_url: form.image_url || null,
//         category_id: form.category_id ? Number(form.category_id) : null,
//       };

//       if (editingId) {
//         // ✅ Always touch updated_at so DB trigger + UI reflect changes
//         const { error } = await supabase
//           .from("articles")
//           .update({ ...payload, updated_at: new Date().toISOString() })
//           .eq("id", editingId);
//         if (error) throw error;
//         setMessage("✅ Article updated");
//         setEditingId(null);
//       } else {
//         const { data, error } = await supabase
//           .from("articles")
//           .insert([payload])
//           .select("id")
//           .single();
//         if (error) throw error;
//         setMessage("✅ Article created");

//         // 🔔 optional: send notification
//         try {
//           await fetch("/.netlify/functions/sendNotification", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               title: payload.title_en,
//               message: payload.summary_en || payload.title_en,
//               url: `${window.location.origin}/articles/${data.id}`,
//             }),
//           });
//         } catch (err) {
//           console.warn("Notification send failed", err);
//         }
//       }

//       setForm(emptyForm);
//       await refreshArticles();
//     } catch (err) {
//       console.error("Save error:", err);
//       setMessage("❌ Save failed: " + (err?.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✏️ edit
//   const startEdit = async (a) => {
//     setMessage("");
//     const { data, error } = await supabase.from("articles").select("*").eq("id", a.id).maybeSingle();
//     if (error) {
//       console.error("Fetch for edit error:", error);
//       setMessage("❌ Could not load article for editing");
//       return;
//     }
//     setEditingId(data.id);
//     setForm({
//       id: data.id,
//       title_en: data.title_en || "",
//       title_te: data.title_te || "",
//       summary_en: data.summary_en || "",
//       summary_te: data.summary_te || "",
//       content_en: data.content_en || "",
//       content_te: data.content_te || "",
//       image_url: data.image_url || "",
//       category_id: data.category_id ? String(data.category_id) : "",
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // 🗑 delete
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this article?")) return;
//     setLoading(true);
//     try {
//       const { error } = await supabase.from("articles").delete().eq("id", id);
//       if (error) throw error;
//       setMessage("✅ Deleted");
//       await refreshArticles();
//     } catch (err) {
//       console.error("Delete error:", err);
//       setMessage("❌ Delete failed: " + (err?.message || JSON.stringify(err)));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate("/admin-login");
//   };

//   if (loadingSession) return <div className="text-center mt-10">Checking auth...</div>;
//   if (!session) return null;

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">{editingId ? "Edit Article" : "Upload Article"}</h1>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => navigate("/")}
//             className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
//           >
//             Go to site
//           </button>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {message && <div className="mb-4 text-sm">{message}</div>}

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-4 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             name="title_en"
//             placeholder="Title (English)"
//             value={form.title_en}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             name="title_te"
//             placeholder="Title (Telugu)"
//             value={form.title_te}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <textarea
//             name="summary_en"
//             placeholder="Summary (English)"
//             value={form.summary_en}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//           <textarea
//             name="summary_te"
//             placeholder="Summary (Telugu)"
//             value={form.summary_te}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <textarea
//             name="content_en"
//             placeholder="Content (English)"
//             value={form.content_en}
//             onChange={handleChange}
//             className="w-full border p-2 rounded h-40"
//           />
//           <textarea
//             name="content_te"
//             placeholder="Content (Telugu)"
//             value={form.content_te}
//             onChange={handleChange}
//             className="w-full border p-2 rounded h-40"
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Upload Image</label>
//           <input type="file" accept="image/*" onChange={handleImageUpload} />
//           {uploading && <div className="text-sm text-gray-600 mt-2">Uploading...</div>}
//           {form.image_url && (
//             <img
//               src={form.image_url}
//               alt="Uploaded"
//               className="mt-2 w-40 h-40 object-cover rounded"
//             />
//           )}
//         </div>

//         <div>
//           <label className="block mb-1">Category</label>
//           <select
//             name="category_id"
//             value={form.category_id}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           >
//             <option value="">-- Select Category --</option>
//             {categories.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.name} {c.name_te ? ` / ${c.name_te}` : ""}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             type="submit"
//             disabled={loading || uploading}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             {loading ? "Saving..." : editingId ? "Update" : "Upload"}
//           </button>
//           {editingId && (
//             <button
//               type="button"
//               onClick={() => {
//                 setEditingId(null);
//                 setForm(emptyForm);
//               }}
//               className="ml-2 bg-gray-200 px-3 py-1 rounded"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {/* Articles List */}
//       <section>
//         <h2 className="text-xl font-bold mb-3">All Articles</h2>
//         <div className="space-y-3">
//           {articles.map((a) => {
//             const created = a.created_at ? new Date(a.created_at).toLocaleString() : "";
//             const updated = a.updated_at
//               ? ` • Updated ${new Date(a.updated_at).toLocaleString()}`
//               : "";
//             return (
//               <div
//                 key={a.id}
//                 className="flex items-center justify-between p-3 border rounded"
//               >
//                 <div className="flex items-center gap-3">
//                   {a.image_url ? (
//                     <img
//                       src={a.image_url}
//                       alt={a.title_en}
//                       className="w-20 h-14 object-cover rounded"
//                     />
//                   ) : (
//                     <div className="w-20 h-14 bg-gray-100 rounded" />
//                   )}
//                   <div>
//                     <div className="font-semibold">{a.title_en}</div>
//                     <div className="text-sm text-gray-500">
//                       {created} {updated}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => startEdit(a)}
//                     className="px-3 py-1 bg-yellow-400 text-black rounded"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(a.id)}
//                     className="px-3 py-1 bg-red-500 text-white rounded"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </section>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

  const emptyForm = {
    id: null,
    title_en: "",
    title_te: "",
    summary_en: "",
    summary_te: "",
    content_en: "",
    content_te: "",
    image_url: "",
    category_id: "",
  };
  const [form, setForm] = useState(emptyForm);
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  // 🔑 check session
  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) {
        navigate("/admin-login");
      } else {
        setSession(data.session);
      }
      setLoadingSession(false);
    }
    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!s) {
        navigate("/admin-login");
      } else {
        setSession(s);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  // 🔄 load categories & articles
  useEffect(() => {
    async function load() {
      const { data: catData } = await supabase
        .from("categories")
        .select("id, name, name_te")
        .order("id");
      setCategories(catData || []);
      await refreshArticles();
    }
    load();

    // 🔔 realtime subscription
    const channel = supabase
      .channel("admin-articles")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "articles" },
        () => {
          refreshArticles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const refreshArticles = async () => {
    const { data: artData, error } = await supabase
      .from("articles")
      .select(
        "id, title_en, title_te, category_id, image_url, created_at, updated_at,view_count"
      )
      .order("created_at", { ascending: false });
    if (error) console.error("Fetch articles error:", error.message);
    setArticles(artData || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  // 📸 upload image
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage("");

    try {
      const b64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const res = reader.result;
          const comma = res.indexOf(",");
          resolve(comma >= 0 ? res.slice(comma + 1) : res);
        };
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });

      const resp = await fetch("/.netlify/functions/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          mimeType: file.type,
          b64,
        }),
      });

      const json = await resp
        .json()
        .catch(() => ({ error: "Invalid JSON response" }));
      if (!resp.ok) throw new Error(json?.error || "Upload failed");

      const publicUrl = json.publicUrl || null;
      const path = json.path || null;

      if (publicUrl) setForm((s) => ({ ...s, image_url: publicUrl }));
      else if (path) {
        const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
        setForm((s) => ({
          ...s,
          image_url: `${SUPABASE_URL}/storage/v1/object/public/${path}`,
        }));
      } else throw new Error("Upload response missing URL");

      setMessage("✅ Image uploaded");
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("❌ Upload failed: " + (err?.message || err));
    } finally {
      setUploading(false);
    }
  };

  // ✍️ create or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!form.title_en?.trim() || !form.title_te?.trim()) {
      setMessage("Please enter both English and Telugu titles.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        title_en: form.title_en.trim(),
        title_te: form.title_te.trim(),
        summary_en: form.summary_en || null,
        summary_te: form.summary_te || null,
        content_en: form.content_en || null,
        content_te: form.content_te || null,
        image_url: form.image_url || null,
        category_id: form.category_id ? Number(form.category_id) : null,
      };

      if (editingId) {
        console.log("Updating article:", editingId, payload);
        const { data, error } = await supabase
          .from("articles")
          .update(payload) // ✅ trigger handles updated_at
          .eq("id", editingId)
          .select("*");

        if (error) throw error;
        if (!data?.length) throw new Error("No rows updated — check ID");
        console.log("Updated row:", data[0]);
        setMessage("✅ Article updated");
        setEditingId(null);
      } else {
        const { data, error } = await supabase
          .from("articles")
          .insert([payload])
          .select("*");
        if (error) throw error;
        setMessage("✅ Article created");

        // 🔔 optional notification
        try {
          await fetch("/.netlify/functions/sendNotification", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: payload.title_en,
              message: payload.summary_en || payload.title_en,
              url: `${window.location.origin}/articles/${data[0].id}`,
            }),
          });
        } catch (err) {
          console.warn("Notification send failed", err);
        }
      }

      setForm(emptyForm);
      await refreshArticles();
    } catch (err) {
      console.error("Save error:", err);
      setMessage(
        "❌ Save failed: " + (err?.message || JSON.stringify(err))
      );
    } finally {
      setLoading(false);
    }
  };

  // ✏️ edit
  const startEdit = async (a) => {
    setMessage("");
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("id", a.id)
      .maybeSingle();
    if (error) {
      console.error("Fetch for edit error:", error);
      setMessage("❌ Could not load article for editing");
      return;
    }
    setEditingId(data.id);
    setForm({
      id: data.id,
      title_en: data.title_en || "",
      title_te: data.title_te || "",
      summary_en: data.summary_en || "",
      summary_te: data.summary_te || "",
      content_en: data.content_en || "",
      content_te: data.content_te || "",
      image_url: data.image_url || "",
      category_id: data.category_id ? String(data.category_id) : "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🗑 delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this article?")) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("articles").delete().eq("id", id);
      if (error) throw error;
      setMessage("✅ Deleted");
      await refreshArticles();
    } catch (err) {
      console.error("Delete error:", err);
      setMessage("❌ Delete failed: " + (err?.message || JSON.stringify(err)));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  if (loadingSession)
    return <div className="text-center mt-10">Checking auth...</div>;
  if (!session) return null;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {editingId ? "Edit Article" : "Upload Article"}
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
          >
            Go to site
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {message && <div className="mb-4 text-sm">{message}</div>}

      {/* ✅ Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="title_en"
            placeholder="Title (English)"
            value={form.title_en}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="title_te"
            placeholder="Title (Telugu)"
            value={form.title_te}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <textarea
            name="summary_en"
            placeholder="Summary (English)"
            value={form.summary_en}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <textarea
            name="summary_te"
            placeholder="Summary (Telugu)"
            value={form.summary_te}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <textarea
            name="content_en"
            placeholder="Content (English)"
            value={form.content_en}
            onChange={handleChange}
            className="w-full border p-2 rounded h-40"
          />
          <textarea
            name="content_te"
            placeholder="Content (Telugu)"
            value={form.content_te}
            onChange={handleChange}
            className="w-full border p-2 rounded h-40"
          />
        </div>

        <div>
          <label className="block mb-1">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading && (
            <div className="text-sm text-gray-600 mt-2">Uploading...</div>
          )}
          {form.image_url && (
            <img
              src={form.image_url}
              alt="Uploaded"
              className="mt-2 w-40 h-40 object-cover rounded"
            />
          )}
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} {c.name_te ? ` / ${c.name_te}` : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={loading || uploading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Saving..." : editingId ? "Update" : "Upload"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="ml-2 bg-gray-200 px-3 py-1 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* ✅ List */}
      <section>
        <h2 className="text-xl font-bold mb-3">All Articles</h2>
        <div className="space-y-3">
          {articles.map((a) => {
            const created = a.created_at
              ? new Date(a.created_at).toLocaleString()
              : "";
            const updated = a.updated_at
              ? ` • Updated ${new Date(a.updated_at).toLocaleString()}`
              : "";
            return (
              <div
                key={a.id}
                className="flex items-center justify-between p-3 border rounded"
              >
                <div className="flex items-center gap-3">
                  {a.image_url ? (
                    <img
                      src={a.image_url}
                      alt={a.title_en}
                      className="w-20 h-14 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-14 bg-gray-100 rounded" />
                  )}
                  { <div>
                    <div className="font-semibold">{a.title_en}</div>
                    <div className="text-sm text-gray-500">
                      {created} {updated}
                       {typeof a.view_count === "number" && (
    <span> • 👁 {a.view_count}</span>
  )}
                    </div>
                  </div>
               }
               </div>




                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEdit(a)}
                    className="px-3 py-1 bg-yellow-400 text-black rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
