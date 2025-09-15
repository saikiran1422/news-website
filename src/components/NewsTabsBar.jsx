// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../lib/supabaseClient";

// export default function NewsTabsBar() {
//   const [categories, setCategories] = useState([]);
//   const [trending, setTrending] = useState([]);
//   const [popular, setPopular] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCategories();
//     fetchTrending();
//     fetchPopular();
//   }, []);

//   async function fetchCategories() {
//     const { data } = await supabase.from("categories").select("*").order("name");
//     setCategories(data || []);
//   }

//   async function fetchTrending() {
//     const { data } = await supabase
//       .from("articles")
//       .select("id, title_en")
//       .order("view_count", { ascending: false })
//       .limit(5);
//     setTrending(data || []);
//   }

//   async function fetchPopular() {
//     const { data } = await supabase
//       .from("articles")
//       .select("id, title_en")
//       .order("view_count", { ascending: false })
//       .limit(5);
//     setPopular(data || []);
//   }

//   return (
//     <nav className="w-full bg-white border-b shadow-sm mb-4">
//       <ul className="flex justify-center space-x-10 font-semibold text-gray-800 relative">
//         {/* Categories */}
//         <li className="group relative cursor-pointer py-3">
//           <span className="hover:text-blue-600">Categories</span>
//           <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg border mt-1 min-w-[180px] z-50">
//             {categories.map((cat) => (
//               <li
//                 key={cat.id}
//                 onClick={() => navigate(`/category/${cat.id}`)}
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//               >
//                 {cat.name}
//               </li>
//             ))}
//           </ul>
//         </li>

//         {/* Trending */}
//         <li className="group relative cursor-pointer py-3">
//           <span className="hover:text-blue-600">Trending</span>
//           <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg border mt-1 min-w-[220px] z-50">
//             {trending.map((a) => (
//               <li
//                 key={a.id}
//                 onClick={() => navigate(`/articles/${a.id}`)}
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer truncate"
//               >
//                 {a.title_en}
//               </li>
//             ))}
//           </ul>
//         </li>

//         {/* Popular */}
//         <li className="group relative cursor-pointer py-3">
//           <span className="hover:text-blue-600">Popular</span>
//           <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg border mt-1 min-w-[220px] z-50">
//             {popular.map((a) => (
//               <li
//                 key={a.id}
//                 onClick={() => navigate(`/articles/${a.id}`)}
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer truncate"
//               >
//                 {a.title_en}
//               </li>
//             ))}
//           </ul>
//         </li>
//       </ul>
//     </nav>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function NewsTabsBar() {
  const [categories, setCategories] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchTrending();
    fetchPopular();
  }, []);

  async function fetchCategories() {
    const { data } = await supabase.from("categories").select("*").order("name");
    setCategories(data || []);
  }

  async function fetchTrending() {
    // ✅ Latest uploads
    const { data } = await supabase
      .from("articles")
      .select("id, title_en")
      .order("created_at", { ascending: false })
      .limit(5);
    setTrending(data || []);
  }

  async function fetchPopular() {
    // ✅ Most viewed
    const { data } = await supabase
      .from("articles")
      .select("id, title_en")
      .order("view_count", { ascending: false })
      .limit(5);
    setPopular(data || []);
  }

  return (
    <nav className="w-full bg-white border-b shadow-sm mb-4">
      <ul className="flex justify-center space-x-10 font-semibold text-gray-800 relative">
        {/* Categories */}
        <li className="group relative cursor-pointer py-3">
          <span className="hover:text-blue-600">Categories</span>
          <ul className="absolute left-0 md:left-auto md:right-auto right-0 top-full hidden group-hover:block bg-white shadow-lg border mt-1 min-w-[180px] z-50">
            {categories.map((cat) => (
              <li
                key={cat.id}
                onClick={() => navigate(`/category/${cat.id}`)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </li>

        {/* Trending */}
        <li className="group relative cursor-pointer py-3">
          <span className="hover:text-blue-600">Trending</span>
          <ul className="absolute left-0 md:left-auto md:right-auto right-0 top-full hidden group-hover:block bg-white shadow-lg border mt-1 min-w-[220px] z-50">
            {trending.map((a) => (
              <li
                key={a.id}
                onClick={() => navigate(`/articles/${a.id}`)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer truncate"
              >
                {a.title_en}
              </li>
            ))}
          </ul>
        </li>

        {/* Popular */}
        <li className="group relative cursor-pointer py-3">
          <span className="hover:text-blue-600">Popular</span>
          <ul className="absolute left-0 md:left-auto md:right-auto right-0 top-full hidden group-hover:block bg-white shadow-lg border mt-1 min-w-[220px] z-50">
            {popular.map((a) => (
              <li
                key={a.id}
                onClick={() => navigate(`/articles/${a.id}`)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer truncate"
              >
                {a.title_en}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
}
