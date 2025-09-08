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

  // Upload via Netlify Function (/.netlify/functions/upload)
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage("");

    try {
      const fd = new FormData();
      fd.append("file", file);

      const resp = await fetch("/.netlify/functions/upload", {
        method: "POST",
        body: fd,
      });

      const json = await resp.json();
      if (!resp.ok) {
        throw new Error(json?.error || resp.statusText || "Upload failed");
      }

      const publicUrl = json.publicUrl || null;
      const path = json.path || null;

      if (publicUrl) {
        setForm((s) => ({ ...s, image_url: publicUrl }));
      } else if (path) {
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
