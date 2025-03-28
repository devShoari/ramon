import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
// Add this type definition at the top
interface Bookmark {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  domain: string;
}

const Bookmarks: React.FC = () => {
  const [bookmarks, setBookmarks] = useState([
    {
      id: "1",
      title: "GitHub",
      url: "https://github.com",
      imageUrl: "https://github.githubassets.com/favicons/favicon.svg",
      domain: "github.com",
    },
    {
      id: "2",
      title: "Twitter",
      url: "https://twitter.com",
      imageUrl:
        "https://abs.twimg.com/responsive-web/client-web/icon-svg.168b89d5.svg",
      domain: "twitter.com",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);

  // In a real app, you would load bookmarks from localStorage or an API
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch {
        console.error("Failed to parse bookmarks from localStorage");
      }
    }
  }, []);

  // Save bookmarks to localStorage when they change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleAddBookmark = () => {
    setEditingBookmark(null);
    setShowForm(true);
  };

  const handleEditBookmark = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark);
    setShowForm(true);
  };

  const handleDeleteBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
  };

  const handleSaveBookmark = (bookmark: Bookmark) => {
    if (editingBookmark) {
      // Update existing bookmark
      setBookmarks(bookmarks.map((b) => (b.id === bookmark.id ? bookmark : b)));
    } else {
      // Add new bookmark
      setBookmarks([...bookmarks, bookmark]);
    }
    setShowForm(false);
    setEditingBookmark(null);
  };

  // Add this function to extract domain from URL
  const extractDomain = (url: string): string => {
    try {
      const domain = new URL(url).hostname;
      return domain.startsWith("www.") ? domain.substring(4) : domain;
    } catch {
      return "";
    }
  };

  // Add this function to generate a favicon URL if none is provided
  const getFaviconUrl = (domain: string): string => {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        whileHover={{
          y: -5,
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50 relative overflow-hidden mb-10"
      >
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-indigo-300/20 to-purple-300/20 rounded-full -ml-20 -mb-20 blur-2xl"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-pink-300/20 to-blue-300/20 rounded-full -mr-20 -mt-20 blur-2xl"></div>

        <h2 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-indigo-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          Bookmarks
        </h2>

        <div className="space-y-4">
          <AnimatePresence>
            {bookmarks.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              >
                {/* Bookmark Cards */}
                {bookmarks.map((bookmark) => (
                  <motion.div
                    key={bookmark.id}
                    whileHover={{
                      y: -5,
                      scale: 1.02,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/50 flex flex-col items-center justify-between h-full min-h-[120px] group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>

                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm overflow-hidden">
                        <Image
                          width={32}
                          height={32}
                          src={
                            bookmark.imageUrl || getFaviconUrl(bookmark.domain)
                          }
                          alt={bookmark.title}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = getFaviconUrl(
                              bookmark.domain
                            );
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 text-center line-clamp-1">
                        {bookmark.title}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        {bookmark.domain}
                      </span>
                    </div>

                    <div className="absolute z-10 top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                      <button
                        onClick={() => handleEditBookmark(bookmark)}
                        className="p-1 text-gray-400 hover:text-indigo-500 transition-colors"
                      >
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
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteBookmark(bookmark.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>

                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-0"
                      aria-label={`Visit ${bookmark.title}`}
                    ></a>
                  </motion.div>
                ))}

                {/* Add Bookmark Button */}
                <motion.button
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                  onClick={handleAddBookmark}
                  className="bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/50 flex flex-col items-center justify-center h-full min-h-[120px] relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center mb-3 relative z-10 group-hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700 relative z-10">
                    Add Bookmark
                  </span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-indigo-50 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </div>
                <h3 className="text-gray-500 mb-2">No bookmarks yet</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Add your favorite websites for quick access
                </p>
                <button
                  onClick={handleAddBookmark}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Add Your First Bookmark
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Bookmark Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-6 shadow-xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <BookmarkForm
                onSave={handleSaveBookmark}
                onCancel={() => setShowForm(false)}
                bookmark={editingBookmark}
                extractDomain={extractDomain}
                getFaviconUrl={getFaviconUrl}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Add this new component for the form
interface BookmarkFormProps {
  onSave: (bookmark: Bookmark) => void;
  onCancel: () => void;
  bookmark: Bookmark | null;
  extractDomain: (url: string) => string;
  getFaviconUrl: (domain: string) => string;
}

const BookmarkForm: React.FC<BookmarkFormProps> = ({
  onSave,
  onCancel,
  bookmark,
  extractDomain,
  getFaviconUrl,
}) => {
  const [title, setTitle] = useState(bookmark?.title || "");
  const [url, setUrl] = useState(bookmark?.url || "");
  const [domain, setDomain] = useState(bookmark?.domain || "");
  const [previewImage, setPreviewImage] = useState(bookmark?.imageUrl || "");

  useEffect(() => {
    if (url) {
      const newDomain = extractDomain(url);
      setDomain(newDomain);
    }
  }, [url, extractDomain]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !url) return;

    const newBookmark: Bookmark = {
      id: bookmark?.id || Date.now().toString(),
      title,
      url: url.startsWith("http") ? url : `https://${url}`,
      imageUrl: getFaviconUrl(domain),
      domain: domain || extractDomain(url),
    };

    onSave(newBookmark);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-medium text-gray-800 mb-4">
        {bookmark ? "Edit Bookmark" : "Add New Bookmark"}
      </h3>

      <div className="mb-4 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          {previewImage ? (
            <Image
              width={32}
              height={32}
              src={previewImage}
              alt="Preview"
              className="w-10 h-10 object-contain"
              onError={() => setPreviewImage(getFaviconUrl(domain))}
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101"
              />
            </svg>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          URL
        </label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Save Bookmark
        </button>
      </div>
    </form>
  );
};

export default Bookmarks;
