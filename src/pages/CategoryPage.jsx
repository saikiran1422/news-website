import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { useLanguage } from "../context/LanguageContext";

export default function CategoryPage({ articles = [] }) {
  const { language } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();

  const filtered = articles.filter((a) => String(a.category_id) === String(id));

  if (filtered.length === 0) {
    return (
      <div className="text-center py-10">
        <p>{language === "te" ? "ఈ వర్గంలో వ్యాసాలు లేవు" : "No articles in this category."}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
        >
          ← {language === "te" ? "వెనక్కి" : "Back"}
        </button>
      </div>
    );
  }

  const category = filtered[0].categories;
  const categoryName =
    language === "te"
      ? category?.name_te || category?.name
      : category?.name || "Category";

  return (
    <div>
      <nav className="mb-4 text-sm text-gray-500">
        <button
          onClick={() => navigate("/")}
          className="hover:underline text-blue-700"
        >
          Home
        </button>{" "}
        › <span className="text-gray-700">{categoryName}</span>
      </nav>

      <h1 className="text-2xl font-bold mb-4">{categoryName}</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((a) => (
          <ArticleCard key={a.id} article={a} language={language} />
        ))}
      </div>
    </div>
  );
}
