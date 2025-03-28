import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Complete dashboard design", completed: false },
    { id: 2, text: "Add weather widget", completed: false },
    { id: 3, text: "Implement sticky notes", completed: true },
  ]);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const todoInputRef = useRef(null);

  useEffect(() => {
    if (showAddTodo && todoInputRef.current) {
      (todoInputRef.current as HTMLInputElement).focus();
    }
  }, [showAddTodo]);

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todoElement = (e.target as HTMLFormElement).elements.namedItem('todoText');
    const text = todoElement instanceof HTMLInputElement 
      ? todoElement.value.trim() 
      : todoElement instanceof HTMLTextAreaElement 
        ? todoElement.value.trim()
        : '';
    
    if (text) {
      setTodos([...todos, { id: Date.now(), text, completed: false }]);
      (e.target as HTMLFormElement).reset();
      setShowAddTodo(false);
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      whileHover={{
        y: -5,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50 row-span-2 relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-300/20 to-purple-300/20 rounded-full -ml-20 -mb-20 blur-2xl"></div>
      <h2 className="text-xl font-medium text-gray-800 mb-4 flex items-center justify-between">
        <span className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          Tasks
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddTodo(true)}
          className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
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

      <AnimatePresence>
        {showAddTodo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <form
              onSubmit={addTodo}
              className="bg-white/80 rounded-xl p-3 shadow-sm"
            >
              <input
                ref={todoInputRef}
                type="text"
                name="todoText"
                placeholder="Add new task..."
                className="w-full px-3 py-2 rounded-lg bg-transparent border-0 focus:outline-none text-gray-700"
              />
              <div className="flex justify-end mt-2 space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddTodo(false)}
                  className="px-3 py-1.5 text-sm rounded-lg text-gray-500 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Add Task
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3 mb-4 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center group bg-white/40 rounded-xl p-3 hover:bg-white/70 transition"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 flex items-center justify-center transition-all ${
                  todo.completed
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 border-blue-500"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                {todo.completed && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
              <span
                className={`flex-grow ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
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
            </motion.div>
          ))}
        </AnimatePresence>

        {todos.length === 0 && (
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p>No tasks yet</p>
            <button
              onClick={() => setShowAddTodo(true)}
              className="mt-2 text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              Add your first task
            </button>
          </div>
        )}
      </div>

      <div className="mt-auto pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>
            {todos.filter((t) => t.completed).length} of {todos.length}{" "}
            completed
          </span>
          {todos.length > 0 && todos.some((t) => t.completed) && (
            <button
              onClick={() => setTodos(todos.filter((t) => !t.completed))}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              Clear completed
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
