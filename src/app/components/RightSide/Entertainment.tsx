import { useState } from "react";
import { motion } from "framer-motion";

interface MediaItem {
  id: number;
  title: string;
  type: "movie" | "show" | "music" | "podcast" | "game";
  description: string;
  imageUrl: string;
}

export default function Entertainment() {
  const [activeTab, setActiveTab] = useState<
    "movie" | "show" | "music" | "podcast" | "game"
  >("movie");

  // Sample media data
  const mediaItems: MediaItem[] = [
    {
      id: 1,
      title: "Dune: Part Two",
      type: "movie",
      description:
        "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      imageUrl: "https://via.placeholder.com/150x200/3F51B5/FFFFFF?text=Dune+2",
    },
    {
      id: 2,
      title: "The Batman",
      type: "movie",
      description:
        "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate.",
      imageUrl: "https://via.placeholder.com/150x200/212121/FFFFFF?text=Batman",
    },
    {
      id: 3,
      title: "Succession",
      type: "show",
      description:
        "The Roy family is known for controlling the biggest media and entertainment company in the world.",
      imageUrl:
        "https://via.placeholder.com/150x200/FFD700/000000?text=Succession",
    },
    {
      id: 4,
      title: "The Last of Us",
      type: "show",
      description:
        "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl.",
      imageUrl:
        "https://via.placeholder.com/150x200/006400/FFFFFF?text=Last+Of+Us",
    },
    {
      id: 5,
      title: "After Hours",
      type: "music",
      description:
        "The fourth studio album by Canadian singer The Weeknd, released on March 20, 2020.",
      imageUrl:
        "https://via.placeholder.com/150x150/FF0000/FFFFFF?text=After+Hours",
    },
    {
      id: 6,
      title: "Midnights",
      type: "music",
      description:
        "The tenth studio album by American singer-songwriter Taylor Swift, released on October 21, 2022.",
      imageUrl:
        "https://via.placeholder.com/150x150/9400D3/FFFFFF?text=Midnights",
    },
    {
      id: 7,
      title: "The Joe Rogan Experience",
      type: "podcast",
      description:
        "The Joe Rogan Experience is a podcast hosted by American comedian and UFC commentator Joe Rogan.",
      imageUrl: "https://via.placeholder.com/150x150/4682B4/FFFFFF?text=JRE",
    },
    {
      id: 8,
      title: "SmartLess",
      type: "podcast",
      description:
        "A podcast hosted by Jason Bateman, Sean Hayes, and Will Arnett where they connect and promote with a high-profile surprise guest.",
      imageUrl:
        "https://via.placeholder.com/150x150/FF8C00/FFFFFF?text=SmartLess",
    },
    {
      id: 9,
      title: "Baldur's Gate 3",
      type: "game",
      description:
        "A role-playing video game developed and published by Larian Studios. It is the third main game in the Baldur's Gate series.",
      imageUrl: "https://via.placeholder.com/150x200/8B0000/FFFFFF?text=BG3",
    },
    {
      id: 10,
      title: "Elden Ring",
      type: "game",
      description:
        "An action role-playing game developed by FromSoftware and published by Bandai Namco Entertainment.",
      imageUrl:
        "https://via.placeholder.com/150x200/DAA520/000000?text=Elden+Ring",
    },
  ];

  const filteredItems = mediaItems.filter((item) => item.type === activeTab);

  return (
    <div className="entertainment">
      {/* Media Type Tabs */}
      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        <TabButton
          active={activeTab === "movie"}
          onClick={() => setActiveTab("movie")}
          label="Movies"
          color="bg-pink-100 text-pink-600"
        />
        <TabButton
          active={activeTab === "show"}
          onClick={() => setActiveTab("show")}
          label="TV Shows"
          color="bg-pink-100 text-pink-600"
        />
        <TabButton
          active={activeTab === "music"}
          onClick={() => setActiveTab("music")}
          label="Music"
          color="bg-pink-100 text-pink-600"
        />
        <TabButton
          active={activeTab === "podcast"}
          onClick={() => setActiveTab("podcast")}
          label="Podcasts"
          color="bg-pink-100 text-pink-600"
        />
        <TabButton
          active={activeTab === "game"}
          onClick={() => setActiveTab("game")}
          label="Games"
          color="bg-pink-100 text-pink-600"
        />
      </div>

      {/* Media Items */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex bg-white/80 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-20 h-28 flex-shrink-0">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 flex-1">
              <h3 className="font-medium text-gray-800">{item.title}</h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-3">
                {item.description}
              </p>
              <div className="mt-2 flex justify-end">
                <button className="text-xs text-pink-500 hover:text-pink-700">
                  Add to List
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TabButton({
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
