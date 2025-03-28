import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuickNote {
  id: number;
  text: string;
  color: string;
  created: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<QuickNote[]>(() => {
    const savedNotes = localStorage.getItem("quickNotes");
    return savedNotes
      ? JSON.parse(savedNotes)
      : [
          {
            id: 1,
            text: "Welcome to Quick Notes! Add short notes here for quick reference.",
            color: "bg-yellow-100",
            created: new Date().toISOString(),
          },
        ];
  });

  const [newNote, setNewNote] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-yellow-100");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    localStorage.setItem("quickNotes", JSON.stringify(notes));
  }, [notes]);

  const colors = [
    "bg-yellow-100",
    "bg-pink-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-purple-100",
  ];

  const addNote = () => {
    if (newNote.trim()) {
      const note: QuickNote = {
        id: Date.now(),
        text: newNote.trim(),
        color: selectedColor,
        created: new Date().toISOString(),
      };
      setNotes([note, ...notes]);
      setNewNote("");
      setSelectedColor("bg-yellow-100");
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addNote();
    }
  };

  return (
    <div className="quick-notes">
      <div className="mb-4">
        <div className="flex mb-2">
          <textarea
            ref={textareaRef}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a quick note..."
            className={`w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-yellow-500 text-gray-700 ${selectedColor}`}
            rows={2}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full ${color} ${
                  selectedColor === color
                    ? "ring-2 ring-offset-2 ring-gray-400"
                    : ""
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addNote}
            className="px-4 py-1 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600"
          >
            Add
          </motion.button>
        </div>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        <AnimatePresence>
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className={`p-3 rounded-lg ${note.color} relative group`}
            >
              <p className="text-gray-700 text-sm">{note.text}</p>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => deleteNote(note.id)}
                  className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-white/50"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(note.created).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
