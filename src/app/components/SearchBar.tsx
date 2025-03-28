import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { SpeechRecognitionEvent } from "../types/global";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchEngine, setSearchEngine] = useState("google");
  const [showEngineOptions, setShowEngineOptions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showImageSearch, setShowImageSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const searchEngines = {
    google: {
      name: "Google",
      url: "https://www.google.com/search?q=",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="#4285F4"
          />
        </svg>
      ),
    },
    bing: {
      name: "Bing",
      url: "https://www.bing.com/search?q=",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.06 3L5 15.055l4.978 2.764L5 19.938V3zm5.446 7.418c-.16-.059-1.078-.714-1.078-.714V5.087l6.52 2.364-5.442 2.967zm.167 8.393l4.948-2.835L24 20.153 10.673 24v-5.189z"
            fill="#008373"
          />
        </svg>
      ),
    },
    duckduckgo: {
      name: "DuckDuckGo",
      url: "https://duckduckgo.com/?q=",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"
            fill="#DE5833"
          />
          <path
            d="M15.51 13.965c0 1.307-1.046 2.365-2.334 2.365-1.29 0-2.335-1.058-2.335-2.365 0-1.306 1.046-2.364 2.335-2.364 1.288 0 2.334 1.058 2.334 2.364z"
            fill="#FFF"
          />
        </svg>
      ),
    },
    yahoo: {
      name: "Yahoo",
      url: "https://search.yahoo.com/search?p=",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"
            fill="#5F01D1"
          />
          <path
            d="M13.383 13.466l3.528-6.599h-2.586l-2.453 4.829-2.464-4.829H6.674l3.528 6.599v4.271h3.181v-4.271z"
            fill="#FFF"
          />
        </svg>
      ),
    },
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const engine = searchEngines[searchEngine as keyof typeof searchEngines];
      window.open(`${engine.url}${encodeURIComponent(searchQuery)}`, "_blank");
      setSearchQuery("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      inputRef.current?.blur();
      setIsFocused(false);
    }
  };

  const startVoiceRecognition = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      setIsListening(true);

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert("Speech recognition is not supported in your browser.");
    }
  };

  const handleImageSearch = () => {
    setShowImageSearch(true);
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For Google, redirect to Google Lens
      if (searchEngine === 'google') {
        // Create a form to upload the image to Google Lens
        const formData = new FormData();
        formData.append('image', file);
        
        // Since we can't directly upload to Google Lens via JavaScript,
        // we'll open Google Lens in a new tab and instruct the user
        window.open('https://lens.google.com/upload', '_blank');
      } else if (searchEngine === 'bing') {
        // For Bing Visual Search
        window.open('https://www.bing.com/images/discover?FORM=ILPMFT', '_blank');
      } else {
        // For other search engines that may not support direct image search
        alert(`Image search opened with ${searchEngines[searchEngine as keyof typeof searchEngines].name}. Please upload your image manually.`);
        
        // Open the regular search page
        const engine = searchEngines[searchEngine as keyof typeof searchEngines];
        window.open(engine.url, '_blank');
      }
    }
    setShowImageSearch(false);
    
    // Reset the file input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Close engine options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowEngineOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentEngine =
    searchEngines[searchEngine as keyof typeof searchEngines];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-12 px-4"
    >
      <form onSubmit={handleSearch} className="flex justify-center">
        <div
          className={`relative w-full max-w-2xl ${
            isFocused ? "scale-105" : ""
          } transition-all duration-300`}
        >
          {/* Search engine selector */}
          <div
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20"
            ref={optionsRef}
          >
            <button
              type="button"
              onClick={() => setShowEngineOptions(!showEngineOptions)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {currentEngine.icon}
            </button>

            {/* Search engine dropdown */}
            <AnimatePresence>
              {showEngineOptions && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-12 left-0 bg-white rounded-xl shadow-lg p-2 w-40 border border-gray-100"
                >
                  {Object.entries(searchEngines).map(([key, engine]) => (
                    <motion.button
                      key={key}
                      type="button"
                      whileHover={{ backgroundColor: "rgba(243, 244, 246, 1)" }}
                      onClick={() => {
                        setSearchEngine(key);
                        setShowEngineOptions(false);
                      }}
                      className={`flex items-center w-full p-2 rounded-lg text-left text-sm ${
                        searchEngine === key ? "bg-gray-100" : ""
                      }`}
                    >
                      <span className="mr-2">{engine.icon}</span>
                      {engine.name}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search input */}
          <input
            ref={inputRef}
            type="text"
            placeholder={`Search ${currentEngine.name}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            className={`w-full pl-14 pr-32 py-5 rounded-full bg-white/70 backdrop-blur-md border border-white/50 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-lg ${
              isFocused ? "bg-white/90" : ""
            }`}
          />

          {/* Voice search button */}
          <motion.button
            type="button"
            onClick={startVoiceRecognition}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`absolute right-16 top-1/2 transform -translate-y-1/2 p-3 rounded-full 
              ${
                isListening
                  ? "bg-red-500 animate-pulse"
                  : "bg-gradient-to-r from-purple-500 to-indigo-600"
              } 
              text-white transition shadow-md`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </motion.button>

          {/* Image search button */}
          <motion.button
            type="button"
            onClick={handleImageSearch}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-28 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-gradient-to-r from-green-500 to-teal-600 text-white transition shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </motion.button>

          {/* Hidden file input for image search */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* Animated search button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white transition shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </motion.button>

          {/* Animated border effect when focused */}
          {isFocused && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 rounded-full border-2 border-blue-300 animate-pulse"></div>
            </motion.div>
          )}
        </div>
      </form>

      {/* Voice recognition indicator */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg max-w-md mx-auto p-4 border border-red-200"
          >
            <div className="flex items-center justify-center space-x-2">
              <div className="relative flex justify-center items-center">
                <div className="absolute w-8 h-8 rounded-full bg-red-500/20 animate-ping"></div>
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
              </div>
              <p className="text-gray-700">Listening... Speak now</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search suggestions (placeholder) */}
      {isFocused && searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-2 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg max-w-2xl mx-auto overflow-hidden border border-white/50"
        >
          <div className="p-2">
            <p className="text-xs text-gray-500 px-3 py-1">
              Try searching for:
            </p>
            {[
              "weather forecast",
              "news today",
              "productivity tips",
              "best movies 2023",
            ].map((suggestion, index) => (
              <motion.button
                key={index}
                whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.8)" }}
                onClick={() => setSearchQuery(suggestion)}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {suggestion}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
