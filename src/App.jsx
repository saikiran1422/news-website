export default function App() {
  const articles = [
    {
      id: 1,
      title: "Breaking: Tech Giants Merge",
      description: "Two of the biggest names in tech announced a historic merger today.",
      image: "https://picsum.photos/400/200?random=1",
    },
    {
      id: 2,
      title: "Global Markets Rally",
      description: "Stock markets worldwide see a surge after positive economic news.",
      image: "https://picsum.photos/400/200?random=2",
    },
    {
      id: 3,
      title: "Sports Update",
      description: "A thrilling finish leaves fans on the edge of their seats.",
      image: "https://picsum.photos/400/200?random=3",
    },
  ];

  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        📰 My News Site
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={article.image}
              alt={`Image for ${article.title}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {article.title}
              </h2>
              <p className="text-gray-600">{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
