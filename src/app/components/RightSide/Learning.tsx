import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WordOfDay {
  word: string;
  definition: string;
  partOfSpeech: string;
  example: string;
}
interface Flashcard {
  id: number;
  front: string;
  back: string;
  category: string;
}

export default function Learning() {
  const [wordOfDay, setWordOfDay] = useState<WordOfDay>({
    word: "",
    definition: "",
    partOfSpeech: "",
    example: "",
  });

  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    const savedCards = localStorage.getItem("learningFlashcards");
    return savedCards
      ? JSON.parse(savedCards)
      : [
          {
            id: 1,
            front: "What is React?",
            back: "A JavaScript library for building user interfaces",
            category: "coding",
          },
          {
            id: 2,
            front: "What is TypeScript?",
            back: "A strongly typed programming language that builds on JavaScript",
            category: "coding",
          },
          {
            id: 3,
            front: "Bonjour",
            back: "Hello in French",
            category: "language",
          },
        ];
  });

  const [activeCard, setActiveCard] = useState<Flashcard | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [newCardData, setNewCardData] = useState({
    front: "",
    back: "",
    category: "coding",
  });
  const [showAddCard, setShowAddCard] = useState(false);

  // Save flashcards to localStorage
  useEffect(() => {
    localStorage.setItem("learningFlashcards", JSON.stringify(flashcards));
  }, [flashcards]);

  // Set word of the day
  useEffect(() => {
    const words = [
      {
        word: "Ephemeral",
        definition: "Lasting for a very short time",
        partOfSpeech: "adjective",
        example:
          "The ephemeral nature of fashion trends makes it hard to stay current.",
      },
      {
        word: "Serendipity",
        definition:
          "The occurrence of events by chance in a happy or beneficial way",
        partOfSpeech: "noun",
        example: "The discovery of penicillin was a serendipity.",
      },
      {
        word: "Ubiquitous",
        definition: "Present, appearing, or found everywhere",
        partOfSpeech: "adjective",
        example: "Mobile phones have become ubiquitous in modern society.",
      },
      {
        word: "Paradigm",
        definition: "A typical example or pattern of something",
        partOfSpeech: "noun",
        example: "The company is a paradigm of successful e-commerce business.",
      },
      {
        word: "Eloquent",
        definition: "Fluent or persuasive in speaking or writing",
        partOfSpeech: "adjective",
        example: "Her eloquent speech moved the audience to tears.",
      },
    ];

    // Use the current date to select a word (so it changes daily)
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    setWordOfDay(words[dayOfYear % words.length]);
  }, []);

  const addFlashcard = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCardData.front.trim() && newCardData.back.trim()) {
      setFlashcards([
        ...flashcards,
        {
          id: Date.now(),
          front: newCardData.front.trim(),
          back: newCardData.back.trim(),
          category: newCardData.category,
        },
      ]);
      setNewCardData({ front: "", back: "", category: "coding" });
      setShowAddCard(false);
    }
  };

  const deleteFlashcard = (id: number) => {
    setFlashcards(flashcards.filter((card) => card.id !== id));
    if (activeCard && activeCard.id === id) {
      setActiveCard(null);
    }
  };

  const handleCardClick = (card: Flashcard) => {
    setActiveCard(card);
    setIsFlipped(false);
  };

  return (
    <div className="learning">
      {/* Word of the Day */}
      <div className="bg-amber-50 p-4 rounded-xl mb-6">
        <h3 className="text-sm font-medium text-amber-800 mb-2">
          Word of the Day
        </h3>
        <div className="mb-1 flex items-baseline">
          <span className="text-lg font-medium text-gray-800 mr-2">
            {wordOfDay.word}
          </span>
          <span className="text-xs text-gray-500 italic">
            {wordOfDay.partOfSpeech}
          </span>
        </div>
        <p className="text-sm text-gray-700 mb-2">{wordOfDay.definition}</p>
        <p className="text-xs text-gray-600 italic">
          &quot;{wordOfDay.example}&quot;
        </p>
      </div>

      {/* Flashcards */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-700">Flashcards</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddCard(!showAddCard)}
            className="p-1.5 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
          </motion.button>
        </div>

        <AnimatePresence>
          {showAddCard && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden"
              onSubmit={addFlashcard}
            >
              <input
                type="text"
                value={newCardData.front}
                onChange={(e) =>
                  setNewCardData({ ...newCardData, front: e.target.value })
                }
                placeholder="Front side (question)"
                className="w-full px-3 py-2 mb-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-1 focus:ring-amber-500 text-gray-700 text-sm"
                required
              />
              <input
                type="text"
                value={newCardData.back}
                onChange={(e) =>
                  setNewCardData({ ...newCardData, back: e.target.value })
                }
                placeholder="Back side (answer)"
                className="w-full px-3 py-2 mb-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-1 focus:ring-amber-500 text-gray-700 text-sm"
                required
              />
              <select
                value={newCardData.category}
                onChange={(e) =>
                  setNewCardData({ ...newCardData, category: e.target.value })
                }
                className="w-full px-3 py-2 mb-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-1 focus:ring-amber-500 text-gray-700 text-sm"
              >
                <option value="coding">Coding</option>
                <option value="language">Language</option>
                <option value="science">Science</option>
                <option value="history">History</option>
                <option value="other">Other</option>
              </select>
              <div className="flex justify-end space-x-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddCard(false)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 bg-amber-500 text-white rounded-lg text-sm"
                >
                  Add Card
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Active Flashcard */}
        {activeCard && (
          <div className="mb-4">
            <motion.div
              className="relative w-full h-40 cursor-pointer"
              onClick={() => setIsFlipped(!isFlipped)}
              initial={false}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.4 }}
              style={{ perspective: 1000 }}
            >
              <div
                className={`absolute w-full h-full rounded-xl p-4 backface-hidden ${
                  isFlipped ? "hidden" : "bg-white shadow-md"
                }`}
              >
                <div className="flex justify-between">
                  <span className="text-xs text-amber-600 font-medium uppercase">
                    {activeCard.category}
                  </span>
                  <span className="text-xs text-gray-400">Click to flip</span>
                </div>
                <div className="flex items-center justify-center h-28">
                  <p className="text-gray-800 text-center">
                    {activeCard.front}
                  </p>
                </div>
              </div>
              <div
                className={`absolute w-full h-full rounded-xl p-4 backface-hidden ${
                  isFlipped ? "bg-amber-50 shadow-md" : "hidden"
                }`}
                style={{ transform: "rotateY(180deg)" }}
              >
                <div className="flex justify-between">
                  <span className="text-xs text-amber-600 font-medium uppercase">
                    ANSWER
                  </span>
                  <span className="text-xs text-gray-400">Click to flip</span>
                </div>
                <div className="flex items-center justify-center h-28">
                  <p className="text-gray-800 text-center">{activeCard.back}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Flashcard List */}
        <div className="grid grid-cols-2 gap-2 max-h-[150px] overflow-y-auto pr-1">
          {flashcards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.03 }}
              className={`p-2 rounded-lg text-sm ${
                activeCard && activeCard.id === card.id
                  ? "bg-amber-100 border-2 border-amber-300"
                  : "bg-white/80 border border-gray-100"
              } cursor-pointer group relative`}
              onClick={() => handleCardClick(card)}
            >
              <p className="line-clamp-2 text-gray-700">{card.front}</p>
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteFlashcard(card.id);
                  }}
                  className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-white/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
