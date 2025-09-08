// import React, { useState, useEffect } from "react";
// import { supabase } from "../lib/supabaseClient";
// import { useNavigate } from "react-router-dom";

// export default function AdminPage() {
//   const navigate = useNavigate();
//   const [session, setSession] = useState(null);

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

//   // ✅ Check login status
//   useEffect(() => {
//     supabase.auth.getSession().then(({ data }) => {
//       if (!data.session) {
//         navigate("/admin-login");
//       } else {
//         setSession(data.session);
//       }
//     });

//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         if (!session) {
//           navigate("/admin-login");
//         } else {
//           setSession(session);
//         }
//       }
//     );

//     return () => listener.subscription.unsubscribe();
//   }, [navigate]);

//   // ✅ Fetch categories
//   useEffect(() => {
//     async function fetchCategories() {
//       const { data, error } = await supabase.from("categories").select("*");
//       if (error) {
//         console.error("Error fetching categories:", error.message);
//       } else {
//         setCategories(data || []);
//       }
//     }
//     fetchCategories();
//   }, []);

//   // ✅ Handle input
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle image upload
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const fileName = `${Date.now()}-${file.name}`;
//     const { error } = await supabase.storage
//       .from("article-images") // ensure bucket exists
//       .upload(fileName, file);

//     if (error) {
//       setMessage("❌ Error uploading image: " + error.message);
//     } else {
//       const { data } = supabase.storage
//         .from("article-images")
//         .getPublicUrl(fileName);
//       setForm({ ...form, image_url: data.publicUrl });
//       setMessage("✅ Image uploaded successfully!");
//     }
//   };

//   // ✅ Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     const { error } = await supabase.from("articles").insert([form]);

//     if (error) {
//       setMessage("❌ Error uploading article: " + error.message);
//     } else {
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
//     }

//     setLoading(false);
//   };

//   // ✅ Logout function
//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate("/admin-login");
//   };

//   if (!session) return <div className="text-center mt-10">Checking auth...</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Upload Article</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>

//       {message && <div className="mb-4">{message}</div>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           name="title_en"
//           placeholder="Title (English)"
//           value={form.title_en}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           name="title_te"
//           placeholder="Title (Telugu)"
//           value={form.title_te}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <textarea
//           name="summary_en"
//           placeholder="Summary (English)"
//           value={form.summary_en}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <textarea
//           name="summary_te"
//           placeholder="Summary (Telugu)"
//           value={form.summary_te}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <textarea
//           name="content_en"
//           placeholder="Content (English)"
//           value={form.content_en}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <textarea
//           name="content_te"
//           placeholder="Content (Telugu)"
//           value={form.content_te}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         {/* ✅ Image upload */}
//         <div>
//           <input type="file" accept="image/*" onChange={handleImageUpload} />
//           {form.image_url && (
//             <img
//               src={form.image_url}
//               alt="Uploaded"
//               className="mt-2 w-32 h-32 object-cover rounded"
//             />
//           )}
//         </div>

//         {/* ✅ Category dropdown */}
//         <select
//           name="category_id"
//           value={form.category_id}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         >
//           <option value="">-- Select Category --</option>
//           {categories.map((c) => (
//             <option key={c.id} value={c.id}>
//               {c.name} / {c.name_te || ""}
//             </option>
//           ))}
//         </select>

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {loading ? "Uploading..." : "Upload"}
//         </button>
//       </form>
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

//   // ✅ Check login status
//   useEffect(() => {
//     async function checkSession() {
//       const { data } = await supabase.auth.getSession();
//       if (!data.session) {
//         navigate("/admin-login");
//       } else {
//         setSession(data.session);
//       }
//       setLoadingSession(false);
//     }
//     checkSession();

//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         if (!session) {
//           navigate("/admin-login");
//         } else {
//           setSession(session);
//         }
//       }
//     );

//     return () => listener.subscription.unsubscribe();
//   }, [navigate]);

//   // ✅ Fetch categories
//   useEffect(() => {
//     async function fetchCategories() {
//       const { data, error } = await supabase.from("categories").select("*");
//       if (error) {
//         console.error("Error fetching categories:", error.message);
//       } else {
//         setCategories(data || []);
//       }
//     }
//     fetchCategories();
//   }, []);

//   // ✅ Handle input
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle image upload
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const fileName = `${Date.now()}-${file.name}`;
//     const { error } = await supabase.storage
//       .from("article-images")
//       .upload(fileName, file);

//     if (error) {
//       setMessage("❌ Error uploading image: " + error.message);
//     } else {
//       const { data } = supabase.storage
//         .from("article-images")
//         .getPublicUrl(fileName);
//       setForm({ ...form, image_url: data.publicUrl });
//       setMessage("✅ Image uploaded successfully!");
//     }
//   };

//   // ✅ Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     const { error } = await supabase.from("articles").insert([form]);

//     if (error) {
//       setMessage("❌ Error uploading article: " + error.message);
//     } else {
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
//     }

//     setLoading(false);
//   };

//   // ✅ Logout function
//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate("/admin-login");
//   };

//   if (loadingSession) return <div className="text-center mt-10">Checking auth...</div>;
//   if (!session) return null; // if not logged in, redirect already triggered

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
//       {/* Header with logout button */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Upload Article</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>

//       {message && <div className="mb-4">{message}</div>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           name="title_en"
//           placeholder="Title (English)"
//           value={form.title_en}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           name="title_te"
//           placeholder="Title (Telugu)"
//           value={form.title_te}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <textarea
//           name="summary_en"
//           placeholder="Summary (English)"
//           value={form.summary_en}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <textarea
//           name="summary_te"
//           placeholder="Summary (Telugu)"
//           value={form.summary_te}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <textarea
//           name="content_en"
//           placeholder="Content (English)"
//           value={form.content_en}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <textarea
//           name="content_te"
//           placeholder="Content (Telugu)"
//           value={form.content_te}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         {/* Image upload */}
//         <div>
//           <input type="file" accept="image/*" onChange={handleImageUpload} />
//           {form.image_url && (
//             <img
//               src={form.image_url}
//               alt="Uploaded"
//               className="mt-2 w-32 h-32 object-cover rounded"
//             />
//           )}
//         </div>

//         {/* Category dropdown */}
//         <select
//           name="category_id"
//           value={form.category_id}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         >
//           <option value="">-- Select Category --</option>
//           {categories.map((c) => (
//             <option key={c.id} value={c.id}>
//               {c.name} / {c.name_te || ""}
//             </option>
//           ))}
//         </select>

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
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

//   // Upload image to storage and set public URL on success
//   const handleImageUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploading(true);
//     setMessage("");

//     try {
//       // sanitize filename
//       const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

//       // upload
//       const { data: uploadData, error: uploadError } = await supabase.storage
//         .from("article-images")
//         .upload(fileName, file, { cacheControl: "3600", upsert: false });

//       if (uploadError) throw uploadError;
//       if (!uploadData?.path) throw new Error("Upload did not return a path.");

//       // get public url (bucket must be public)
//       const { data: publicUrlData, error: publicError } = supabase.storage
//         .from("article-images")
//         .getPublicUrl(uploadData.path);

//       if (publicError) throw publicError;
//       if (!publicUrlData?.publicUrl) throw new Error("Could not get public URL.");

//       // set form image_url to public URL
//       setForm((s) => ({ ...s, image_url: publicUrlData.publicUrl }));
//       setMessage("✅ Image uploaded successfully!");
//     } catch (err) {
//       console.error("Image upload error:", err);
//       setMessage("❌ Image upload failed: " + (err?.message || JSON.stringify(err)));
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
//       // ensure category_id is integer (supabase expects correct type)
//       const payload = {
//         ...form,
//         category_id: form.category_id ? Number(form.category_id) : null,
//       };

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

//   // Upload image to storage and set public URL on success
//   const handleImageUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploading(true);
//     setMessage("");

//     try {
//       // generate a safe, unique filename
//       const safeName = file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_.]/g, "");
//       const random = Math.floor(Math.random() * 1e6);
//       const fileName = `${new Date().toISOString().slice(0,10)}-${Date.now()}-${random}-${safeName}`;

//       console.log("Uploading to bucket 'article-images' as:", fileName);

//       // upload (bucket must exist)
//       const { data: uploadData, error: uploadError } = await supabase.storage
//         .from("article-images")
//         .upload(fileName, file, { cacheControl: "86400", upsert: false });

//       if (uploadError) throw uploadError;
//       if (!uploadData?.path) throw new Error("Upload did not return a path.");

//       // get public url (bucket must be public)
//       const { data: publicUrlData, error: publicError } = supabase.storage
//         .from("article-images")
//         .getPublicUrl(uploadData.path);

//       if (publicError) throw publicError;
//       if (!publicUrlData?.publicUrl) throw new Error("Could not get public URL. Make sure bucket is public.");

//       // set form image_url to public URL
//       setForm((s) => ({ ...s, image_url: publicUrlData.publicUrl }));
//       setMessage("✅ Image uploaded successfully! You can now submit the article.");
//       console.log("Public URL:", publicUrlData.publicUrl);
//     } catch (err) {
//       console.error("Image upload error:", err);
//       setMessage("❌ Image upload failed: " + (err?.message || JSON.stringify(err)));
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
//       // ensure category_id is integer (supabase expects correct type)
//       const payload = {
//         ...form,
//         category_id: form.category_id ? Number(form.category_id) : null,
//       };

//       // optional guard: warn if no image uploaded
//       if (!payload.image_url) {
//         // allow submission without image, but warn user
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

// const BUCKET = "article-images"; // <<== make sure this matches your Supabase bucket name exactly

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

//   // Upload image to storage and set public URL on success
//   const handleImageUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploading(true);
//     setMessage("");

//     try {
//       // generate a safe, unique filename
//       const safeName = file.name
//         .replace(/\s+/g, "-")
//         .replace(/[^a-zA-Z0-9-_.]/g, "");
//       const random = Math.floor(Math.random() * 1e6);
//       const fileName = `${new Date().toISOString().slice(0, 10)}-${Date.now()}-${random}-${safeName}`;

//       console.log(`Uploading to bucket '${BUCKET}' as:`, fileName);

//       // upload (bucket must exist)
//       const { data: uploadData, error: uploadError } = await supabase.storage
//         .from(BUCKET)
//         .upload(fileName, file, { cacheControl: "86400", upsert: false });

//       if (uploadError) throw uploadError;
//       if (!uploadData?.path) throw new Error("Upload did not return a path.");

//       // get public url (bucket must be public)
//       const { data: publicUrlData, error: publicError } = supabase.storage
//         .from(BUCKET)
//         .getPublicUrl(uploadData.path);

//       if (publicError) throw publicError;
//       if (!publicUrlData?.publicUrl) throw new Error("Could not get public URL. Make sure bucket is public.");

//       // set form image_url to public URL
//       setForm((s) => ({ ...s, image_url: publicUrlData.publicUrl }));
//       setMessage("✅ Image uploaded successfully! You can now submit the article.");
//       console.log("Public URL:", publicUrlData.publicUrl);
//     } catch (err) {
//       console.error("Image upload error:", err);
//       setMessage("❌ Image upload failed: " + (err?.message || JSON.stringify(err)));
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
//       // ensure category_id is integer (supabase expects correct type)
//       const payload = {
//         ...form,
//         category_id: form.category_id ? Number(form.category_id) : null,
//       };

//       // optional guard: warn if no image uploaded
//       if (!payload.image_url) {
//         // allow submission without image, but warn user
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
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

  const [form, setForm] = useState({
    title_en: "",
    title_te: "",
    summary_en: "",
    summary_te: "",
    content_en: "",
    content_te: "",
    image_url: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  // Check login status & redirect if not authenticated
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

  // Fetch categories (public select policy must exist)
  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, name_te")
        .order("id");
      if (error) {
        console.error("Error fetching categories:", error);
        setMessage("Error loading categories.");
      } else {
        setCategories(data || []);
      }
    }
    fetchCategories();
  }, []);

  // handle inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  // NEW: upload via Netlify Function (/.netlify/functions/upload)
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage("");

    try {
      const fd = new FormData();
      fd.append("file", file);
      // optional: add metadata
      // fd.append("uploader", session?.user?.email || "");

      const resp = await fetch("/.netlify/functions/upload", {
        method: "POST",
        body: fd,
      });

      const json = await resp.json();
      if (!resp.ok) {
        throw new Error(json?.error || resp.statusText || "Upload failed");
      }

      // The function returns { path, publicUrl } (publicUrl may be null if bucket not public)
      const publicUrl = json.publicUrl || null;
      const path = json.path || null;

      // Prefer publicUrl for direct <img src>, otherwise you may construct a storage public url
      if (publicUrl) {
        setForm((s) => ({ ...s, image_url: publicUrl }));
      } else if (path) {
        // Construct a public URL for public bucket (optional)
        // NOTE: replace with your supabase project url if desired; better to make bucket public
        const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
        const fallback = `${SUPABASE_URL}/storage/v1/object/public/${path}`;
        setForm((s) => ({ ...s, image_url: fallback }));
      }

      setMessage("✅ Image uploaded successfully! You can now submit the article.");
    } catch (err) {
      console.error("Upload error (client):", err);
      setMessage("❌ Upload failed: " + (err?.message || String(err)));
    } finally {
      setUploading(false);
    }
  };

  // submit article
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        ...form,
        category_id: form.category_id ? Number(form.category_id) : null,
      };

      if (!payload.image_url) {
        if (!window.confirm("You didn't upload an image. Submit anyway?")) {
          setLoading(false);
          return;
        }
      }

      const { error } = await supabase.from("articles").insert([payload]);

      if (error) throw error;

      setMessage("✅ Article uploaded successfully!");
      setForm({
        title_en: "",
        title_te: "",
        summary_en: "",
        summary_te: "",
        content_en: "",
        content_te: "",
        image_url: "",
        category_id: "",
      });
    } catch (err) {
      console.error("Insert error:", err);
      setMessage("❌ Error uploading article: " + (err?.message || JSON.stringify(err)));
    } finally {
      setLoading(false);
    }
  };

  // logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  if (loadingSession) return <div className="text-center mt-10">Checking auth...</div>;
  if (!session) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Upload Article</h1>
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

      {message && <div className="mb-4">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title_en" placeholder="Title (English)" value={form.title_en} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="title_te" placeholder="Title (Telugu)" value={form.title_te} onChange={handleChange} className="w-full border p-2 rounded" required />
        <textarea name="summary_en" placeholder="Summary (English)" value={form.summary_en} onChange={handleChange} className="w-full border p-2 rounded" />
        <textarea name="summary_te" placeholder="Summary (Telugu)" value={form.summary_te} onChange={handleChange} className="w-full border p-2 rounded" />
        <textarea name="content_en" placeholder="Content (English)" value={form.content_en} onChange={handleChange} className="w-full border p-2 rounded" />
        <textarea name="content_te" placeholder="Content (Telugu)" value={form.content_te} onChange={handleChange} className="w-full border p-2 rounded" />

        <div>
          <label className="block mb-1">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading && <div className="text-sm text-gray-600 mt-2">Uploading...</div>}
          {form.image_url && (
            <img src={form.image_url} alt="Uploaded" className="mt-2 w-40 h-40 object-cover rounded" />
          )}
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <select name="category_id" value={form.category_id} onChange={handleChange} className="w-full border p-2 rounded" required>
            <option value="">-- Select Category --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} {c.name_te ? ` / ${c.name_te}` : ""}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading || uploading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
