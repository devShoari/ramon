import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface Note {
  id: number;
  text: string;
  color: string;
  created?: string;
  lastEdited?: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes
      ? JSON.parse(savedNotes)
      : [
          { id: 1, text: "Remember to drink water!", color: "bg-yellow-100" },
          { id: 2, text: "Call mom this weekend", color: "bg-pink-100" },
        ];
  });
  const [showAddNote, setShowAddNote] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const noteInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if ((showAddNote || editingNote) && noteInputRef.current) {
      (noteInputRef.current as HTMLInputElement).focus();
    }
  }, [showAddNote, editingNote]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const text = (
      form.elements.namedItem("noteText") as HTMLTextAreaElement
    )?.value.trim();

    if (text) {
      const colors = [
        "bg-yellow-100",
        "bg-pink-100",
        "bg-blue-100",
        "bg-green-100",
        "bg-purple-100",
      ];

      if (editingNote) {
        // Update existing note
        setNotes(
          notes.map((note) =>
            note.id === editingNote.id
              ? {
                  ...note,
                  text,
                  color: selectedColor || note.color,
                  lastEdited: new Date().toISOString(),
                }
              : note
          )
        );
        setEditingNote(null);
      } else {
        // Add new note
        const noteColor =
          selectedColor || colors[Math.floor(Math.random() * colors.length)];
        setNotes([
          ...notes,
          {
            id: Date.now(),
            text,
            color: noteColor,
            created: new Date().toISOString(),
            lastEdited: new Date().toISOString(),
          },
        ]);
      }

      (form as HTMLFormElement).reset();
      setShowAddNote(false);
      setSelectedColor("");
    }
  };

  const startEditingNote = (note: Note) => {
    setEditingNote(note);
    setSelectedColor(note.color);
    setShowAddNote(false);
  };

  const cancelEditing = () => {
    setEditingNote(null);
    setSelectedColor("");
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileHover={{
        y: -5,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50 row-span-2 relative overflow-hidden"
    >
      <h2 className="text-xl font-medium text-gray-800 mb-4 flex items-center justify-between">
        <span className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Notes
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddNote(true)}
          className="p-1.5 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition"
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
      </h2>

      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 pl-9 rounded-lg bg-white/80 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-pink-500 text-gray-700 text-sm"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 absolute left-3 top-2.5 text-gray-400"
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
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
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
          )}
        </div>
      </div>

      <AnimatePresence>
        {(showAddNote || editingNote) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white/80 rounded-xl p-3 shadow-sm"
            >
              <textarea
                ref={noteInputRef}
                name="noteText"
                placeholder="Write a note..."
                defaultValue={editingNote ? (editingNote as Note).text : ""}
                className="w-full px-3 py-2 rounded-lg bg-transparent border-0 focus:outline-none text-gray-700 font-handwriting resize-none h-20"
              ></textarea>

              <div className="flex space-x-2 mt-2 mb-2">
                {[
                  "bg-yellow-100",
                  "bg-pink-100",
                  "bg-blue-100",
                  "bg-green-100",
                  "bg-purple-100",
                ].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full ${color} border ${
                      selectedColor === color
                        ? "border-gray-800 ring-2 ring-gray-400"
                        : "border-gray-300"
                    }`}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => setSelectedColor("")}
                  className="text-xs text-gray-500 hover:text-gray-700 ml-1"
                >
                  {editingNote && !selectedColor ? "Keep current" : "Random"}
                </button>
              </div>

              <div className="flex justify-end mt-2 space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    if (editingNote) {
                      cancelEditing();
                    } else {
                      setShowAddNote(false);
                      setSelectedColor("");
                    }
                  }}
                  className="px-3 py-1.5 text-sm rounded-lg text-gray-500 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-sm bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
                >
                  {editingNote ? "Update Note" : "Add Note"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4 mb-4 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence>
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, height: 0 }}
                style={{
                  rotate: index % 2 === 0 ? "1deg" : "-1deg",
                  transformOrigin: index % 2 === 0 ? "top left" : "top right",
                }}
                whileHover={{
                  scale: 1.02,
                  rotate: "0deg",
                  transition: { duration: 0.2 },
                }}
                className={`p-4 rounded-lg shadow-sm ${note.color} relative group`}
              >
                <div className="font-handwriting text-gray-800 text-lg">
                  {note.text}
                </div>
                {note.lastEdited && (
                  <div className="text-xs text-gray-500 mt-2">
                    {new Date(note.lastEdited).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                )}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex space-x-1">
                  <button
                    onClick={() => startEditingNote(note)}
                    className="p-1 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition"
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
                    onClick={() => deleteNote(note.id)}
                    className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
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
              </motion.div>
            ))
          ) : searchTerm ? (
            <div className="text-center py-6 text-gray-500">
              <p>No notes found matching &quot;{searchTerm}&quot;</p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-2 text-pink-500 hover:text-pink-700 text-sm font-medium"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-300 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <p>No notes yet</p>
              <button
                onClick={() => setShowAddNote(true)}
                className="mt-2 text-pink-500 hover:text-pink-700 text-sm font-medium"
              >
                Add your first note
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
