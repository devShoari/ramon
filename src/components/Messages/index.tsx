"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MusicPlayer from "./MusicPlayer";

// Enhanced message type with music information
export interface Message {
  id: string;
  content: string;
  tags: string[];
  likes: number;
  createdAt: string;
  category?: string;
  music?: {
    title: string;
    artist: string;
    coverUrl: string;
  };
}

const allMessages: Message[] = [
  {
    id: "1",
    content:
      "I still think about our last conversation. There was so much left unsaid, and I wish I had the courage to tell you how much you meant to me. Maybe in another life, we'll get it right.",
    tags: ["#Regret", "#MissYou"],
    likes: 42,
    createdAt: "2023-11-15T12:00:00Z",
    category: "Love",
    music: {
      title: "Someone Like You",
      artist: "Adele",
      coverUrl: "/music-covers/adele.jpg",
    },
  },
  {
    id: "2",
    content:
      "Remember when we used to watch the sunset from that hill behind your house? I've never found another view that beautiful, or another moment that peaceful. I hope you're still watching sunsets.",
    tags: ["#Memories", "#Nostalgia"],
    likes: 28,
    createdAt: "2023-12-03T15:30:00Z",
    category: "Friendship",
    music: {
      title: "Vienna",
      artist: "Billy Joel",
      coverUrl: "/music-covers/billy-joel.jpg",
    },
  },
  {
    id: "3",
    content:
      "I saw someone who looked just like you today. For a moment, my heart stopped. It's been years, but some part of me is still looking for you in every crowd.",
    tags: ["#LostLove", "#MissYou"],
    likes: 56,
    createdAt: "2024-01-20T09:15:00Z",
    category: "Love",
    music: {
      title: "Glimpse of Us",
      artist: "Joji",
      coverUrl: "/music-covers/joji.jpg",
    },
  },
  {
    id: "4",
    content:
      "Mom, I never told you how much I admired your strength. The way you carried our family through the hardest times taught me what real courage looks like. I hope I've made you proud.",
    tags: ["#Family", "#Gratitude"],
    likes: 89,
    createdAt: "2024-02-05T14:20:00Z",
    category: "Family",
    music: {
      title: "The Best Day",
      artist: "Taylor Swift",
      coverUrl: "/music-covers/taylor-swift.jpg",
    },
  },
  {
    id: "5",
    content:
      "To my younger self: It gets better. All those nights you spent worrying about fitting in, about the future, about whether you'd ever feel at home in your own skin—they lead somewhere beautiful. Trust the journey.",
    tags: ["#SelfLove", "#Growth"],
    likes: 104,
    createdAt: "2024-01-10T08:45:00Z",
    category: "Self",
    music: {
      title: "Landslide",
      artist: "Fleetwood Mac",
      coverUrl: "/music-covers/fleetwood-mac.jpg",
    },
  },
  {
    id: "6",
    content:
      "I forgive you. It took years to say those words, even to myself. The weight of holding onto that anger was crushing me. I hope you've found peace too.",
    tags: ["#Forgiveness", "#Healing"],
    likes: 67,
    createdAt: "2023-10-22T16:30:00Z",
    category: "Healing",
    music: {
      title: "Forgive Me Friend",
      artist: "Smith & Thell",
      coverUrl: "/music-covers/smith-thell.jpg",
    },
  },
];

const categories = [
  { name: "All", emoji: "✨" },
  { name: "Love", emoji: "❤️" },
  { name: "Family", emoji: "👪" },
  { name: "Friendship", emoji: "🤝" },
  { name: "Healing", emoji: "🌱" },
  { name: "Self", emoji: "🧘" },
];

export function Messages() {
  const [mounted, setMounted] = useState(false);
  const [playingMusic, setPlayingMusic] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");
  const [showShareModal, setShowShareModal] = useState<string | null>(null);
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const shareModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    // Close share modal when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        shareModalRef.current &&
        !shareModalRef.current.contains(event.target as Node)
      ) {
        setShowShareModal(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Filter and sort messages
    let filtered = [...allMessages];

    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (message) => message.category === selectedCategory
      );
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (message) =>
          message.content.toLowerCase().includes(term) ||
          message.tags.some((tag) => tag.toLowerCase().includes(term)) ||
          (message.music &&
            (message.music.title.toLowerCase().includes(term) ||
              message.music.artist.toLowerCase().includes(term)))
      );
    }

    // Apply sorting
    if (sortBy === "latest") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      filtered.sort((a, b) => b.likes - a.likes);
    }

    setVisibleMessages(filtered);
  }, [searchTerm, selectedCategory, sortBy]);

  const toggleMusic = (messageId: string) => {
    if (playingMusic === messageId) {
      setPlayingMusic(null);
    } else {
      setPlayingMusic(messageId);
    }
  };

  const shareMessage = (message: Message) => {
    // In a real app, this would use the Web Share API or copy to clipboard
    navigator.clipboard
      .writeText(message.content)
      .then(() => {
        alert("Message copied to clipboard!");
        setShowShareModal(null);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader />

        {/* Search and filters - enhanced with cute, loving design */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-sm border border-[var(--light-pink)]/50 p-5 mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-5">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <motion.div
                    animate={{ rotate: searchTerm ? [0, -10, 10, -10, 0] : 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[var(--pink)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </motion.div>
                </div>
                <input
                  type="text"
                  placeholder="Find messages that speak to your heart..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-xl border border-[var(--light-pink)]/30 focus:outline-none focus:border-[var(--pink)] focus:ring-1 focus:ring-[var(--pink)] bg-[var(--light-pink)]/5 placeholder-gray-400"
                />
                {searchTerm && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[var(--pink)]"
                    onClick={() => setSearchTerm("")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.button>
                )}
              </div>

              <div className="flex items-center space-x-3 bg-white rounded-xl px-4 py-2 border border-[var(--light-pink)]/30">
                <span className="text-sm text-gray-500 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-[var(--pink)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                    />
                  </svg>
                  Sort:
                </span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as "latest" | "popular")
                    }
                    className="appearance-none bg-transparent pr-8 py-1 pl-2 rounded-lg text-sm border-0 focus:outline-none focus:ring-0 text-[var(--pink)] font-medium"
                  >
                    <option value="latest">Newest First</option>
                    <option value="popular">Most Loved</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--pink)]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex items-center mb-1">
                <div className="w-5 h-5 rounded-full bg-[var(--light-pink)] flex items-center justify-center mr-2">
                  <span className="text-[10px] text-[var(--pink)]">♡</span>
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  Filter by feeling:
                </span>
              </div>

              <div className="flex overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex space-x-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                        selectedCategory === category.name
                          ? "bg-gradient-to-r from-[var(--pink)] to-[var(--pink)]/80 text-white shadow-md"
                          : "bg-white border border-[var(--light-pink)] text-gray-700 hover:border-[var(--pink)] hover:text-[var(--pink)] hover:shadow-sm"
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="mr-2">{category.emoji}</span>{" "}
                      {category.name}
                      {selectedCategory === category.name && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-1 inline-flex"
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Search results summary */}
          <motion.div
            className="flex justify-between items-center mb-4 px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-sm text-gray-500">
              {visibleMessages.length > 0 ? (
                <span>
                  Showing{" "}
                  <span className="text-[var(--pink)] font-medium">
                    {visibleMessages.length}
                  </span>{" "}
                  {visibleMessages.length === 1 ? "message" : "messages"}
                  {searchTerm && (
                    <span>
                      {" "}
                      for "
                      <span className="text-[var(--pink)] italic">
                        {searchTerm}
                      </span>
                      "
                    </span>
                  )}
                  {selectedCategory !== "All" && (
                    <span>
                      {" "}
                      in{" "}
                      <span className="text-[var(--pink)]">
                        {selectedCategory}
                      </span>
                    </span>
                  )}
                </span>
              ) : (
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-[var(--pink)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  No messages found. Try adjusting your search.
                </span>
              )}
            </div>

            <motion.button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSortBy("latest");
              }}
              className="text-xs text-[var(--pink)] hover:text-[var(--pink)]/80 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={
                !searchTerm && selectedCategory === "All" && sortBy === "latest"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reset filters
            </motion.button>
          </motion.div>
        </motion.div>

        {mounted && (
          <>
            {visibleMessages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleMessages.map((message, index) => (
                  <MessageItem
                    key={message.id}
                    message={message}
                    index={index}
                    isPlaying={playingMusic === message.id}
                    onToggleMusic={() => toggleMusic(message.id)}
                    onShare={() => setShowShareModal(message.id)}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No messages found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filters
                </p>
              </motion.div>
            )}
          </>
        )}

        {/* Create new message button */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="px-6 py-3 bg-[var(--pink)] text-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Write Your Own Message
          </motion.button>
        </motion.div>

        {/* Share Modal */}
        <AnimatePresence>
          {showShareModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                ref={shareModalRef}
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-xl p-6 max-w-md w-full"
              >
                <h3 className="text-lg font-medium mb-4">Share this message</h3>

                <div className="bg-[var(--light-pink)]/10 p-4 rounded-lg mb-4 italic text-gray-700 text-sm">
                  &quot;
                  {allMessages
                    .find((m) => m.id === showShareModal)
                    ?.content.substring(0, 100)}
                  &quot;
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <button
                    onClick={() =>
                      shareMessage(
                        allMessages.find((m) => m.id === showShareModal)!
                      )
                    }
                    className="flex items-center justify-center bg-blue-500 text-white rounded-full px-4 py-2 text-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy to clipboard
                  </button>

                  <button className="flex items-center justify-center bg-green-500 text-white rounded-full px-4 py-2 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    WhatsApp
                  </button>

                  <button className="flex items-center justify-center bg-blue-400 text-white rounded-full px-4 py-2 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                    Twitter
                  </button>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setShowShareModal(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Section Header Component
const SectionHeader = () => (
  <div className="text-center mb-12">
    <motion.h2
      className="text-2xl md:text-3xl font-light text-gray-800 mb-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Words from the{" "}
      <span className="text-[var(--pink)] font-normal">Heart</span>
    </motion.h2>
    <motion.div
      className="w-16 h-0.5 bg-[var(--light-pink)] mx-auto"
      initial={{ width: 0 }}
      animate={{ width: 64 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    />
  </div>
);

// Message Item Component
interface MessageItemProps {
  message: Message;
  index: number;
  isPlaying: boolean;
  onToggleMusic: () => void;
  onShare: () => void;
}

const MessageItem = ({
  message,
  index,
  isPlaying,
  onToggleMusic,
  onShare,
}: MessageItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex flex-col"
  >
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex-grow relative overflow-hidden group">
      {/* Decorative elements */}
      <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-[var(--light-pink)]/10 group-hover:bg-[var(--light-pink)]/20 transition-colors duration-300"></div>
      <div className="absolute right-20 top-20 w-4 h-4 rounded-full bg-[var(--pink)]/10"></div>

      <div className="flex justify-between items-start mb-4">
        <div className="text-xs text-gray-400 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          Unsent Words
        </div>

        <motion.button
          onClick={onShare}
          className="text-gray-400 hover:text-[var(--pink)] transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
        </motion.button>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed italic mb-4 relative z-10">
        &quot;{message.content}&quot;
      </p>

      {/* Music player component */}
      {message.music && (
        <MusicPlayer
          music={message.music}
          isPlaying={isPlaying}
          onTogglePlay={onToggleMusic}
        />
      )}

      <MessageFooter message={message} />
    </div>
  </motion.div>
);

// Message Footer Component
const MessageFooter = ({ message }: { message: Message }) => (
  <div className="mt-auto">
    <div className="flex flex-wrap gap-1 mb-3">
      {message.tags.map((tag) => (
        <span key={tag} className="text-xs text-[var(--pink)] opacity-70">
          {tag}
        </span>
      ))}
    </div>

    <div className="flex justify-between items-center text-xs text-gray-400">
      <div className="flex items-center">
        <motion.button
          className="text-[var(--pink)] flex items-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          {message.likes}
        </motion.button>
      </div>
      <span>
        {new Date(message.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </span>
    </div>
  </div>
);
