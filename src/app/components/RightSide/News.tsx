import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsItem {
  id: number;
  title: string;
  source: string;
  category: "general" | "tech" | "business" | "crypto" | "health";
  time: string;
  url: string;
}

export default function News() {
  const [activeCategory, setActiveCategory] = useState<
    "general" | "tech" | "business" | "crypto" | "health"
  >("general");
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch news data (mock data for now)
  useEffect(() => {
    setLoading(true);

    // Simulate API call with timeout
    const timeout = setTimeout(() => {
      const mockNews: NewsItem[] = [
        {
          id: 1,
          title: "Global markets rally as inflation fears ease",
          source: "Financial Times",
          category: "business",
          time: "2 hours ago",
          url: "#",
        },
        {
          id: 2,
          title:
            "New AI model can predict protein structures with unprecedented accuracy",
          source: "Tech Crunch",
          category: "tech",
          time: "4 hours ago",
          url: "#",
        },
        {
          id: 3,
          title: "Bitcoin surges past $60,000 as ETF approval looms",
          source: "CoinDesk",
          category: "crypto",
          time: "1 hour ago",
          url: "#",
        },
        {
          id: 4,
          title:
            "Study finds regular exercise reduces risk of cognitive decline",
          source: "Health Journal",
          category: "health",
          time: "5 hours ago",
          url: "#",
        },
        {
          id: 5,
          title:
            "Climate summit ends with new commitments from major economies",
          source: "World News",
          category: "general",
          time: "3 hours ago",
          url: "#",
        },
        {
          id: 6,
          title: "Tech giants face new antitrust regulations in EU",
          source: "Reuters",
          category: "tech",
          time: "6 hours ago",
          url: "#",
        },
        {
          id: 7,
          title: "Central banks signal shift in monetary policy",
          source: "Bloomberg",
          category: "business",
          time: "2 hours ago",
          url: "#",
        },
        {
          id: 8,
          title: "Ethereum completes major network upgrade",
          source: "Decrypt",
          category: "crypto",
          time: "7 hours ago",
          url: "#",
        },
        {
          id: 9,
          title: "New breakthrough in cancer treatment shows promising results",
          source: "Medical News",
          category: "health",
          time: "8 hours ago",
          url: "#",
        },
        {
          id: 10,
          title: "Space agency announces plans for new lunar mission",
          source: "Science Daily",
          category: "general",
          time: "4 hours ago",
          url: "#",
        },
      ];

      setNewsItems(mockNews);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const filteredNews =
    activeCategory === "general"
      ? newsItems
      : newsItems.filter((item) => item.category === activeCategory);

  return (
    <div className="news">
      {/* Category Tabs */}
      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        <CategoryButton
          active={activeCategory === "general"}
          onClick={() => setActiveCategory("general")}
          label="All News"
          color="bg-blue-100 text-blue-600"
        />
        <CategoryButton
          active={activeCategory === "tech"}
          onClick={() => setActiveCategory("tech")}
          label="Technology"
          color="bg-blue-100 text-blue-600"
        />
        <CategoryButton
          active={activeCategory === "business"}
          onClick={() => setActiveCategory("business")}
          label="Business"
          color="bg-blue-100 text-blue-600"
        />
        <CategoryButton
          active={activeCategory === "crypto"}
          onClick={() => setActiveCategory("crypto")}
          label="Crypto"
          color="bg-blue-100 text-blue-600"
        />
        <CategoryButton
          active={activeCategory === "health"}
          onClick={() => setActiveCategory("health")}
          label="Health"
          color="bg-blue-100 text-blue-600"
        />
      </div>

      {/* News Items */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <AnimatePresence>
            {filteredNews.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/80 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-800 text-sm">
                    {item.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ml-2 flex-shrink-0 ${
                      item.category === "tech"
                        ? "bg-purple-100 text-purple-600"
                        : item.category === "business"
                        ? "bg-green-100 text-green-600"
                        : item.category === "crypto"
                        ? "bg-yellow-100 text-yellow-600"
                        : item.category === "health"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                  <span>{item.source}</span>
                  <span>{item.time}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function CategoryButton({
  active,
  onClick,
  label,
  color,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  color: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
        active ? color : "bg-white/70 text-gray-600 hover:bg-white"
      }`}
    >
      {label}
    </motion.button>
  );
}
