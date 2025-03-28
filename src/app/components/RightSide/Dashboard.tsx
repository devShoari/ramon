import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Goal {
  id: number;
  text: string;
  completed: boolean;
}

export default function Dashboard() {
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [goals, setGoals] = useState<Goal[]>(() => {
    const savedGoals = localStorage.getItem("dashboardGoals");
    return savedGoals
      ? JSON.parse(savedGoals)
      : [
          { id: 1, text: "Complete project outline", completed: false },
          { id: 2, text: "Read 30 minutes", completed: false },
        ];
  });
  const [newGoal, setNewGoal] = useState("");
  const [showAddGoal, setShowAddGoal] = useState(false);

  // Update greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  // Save goals to localStorage
  useEffect(() => {
    localStorage.setItem("dashboardGoals", JSON.stringify(goals));
  }, [goals]);

  // Fetch a random quote
  useEffect(() => {
    const quotes = [
      {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
      },
      {
        text: "Life is what happens when you're busy making other plans.",
        author: "John Lennon",
      },
      {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
      },
      {
        text: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius",
      },
      {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker",
      },
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const addGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim()) {
      setGoals([
        ...goals,
        { id: Date.now(), text: newGoal.trim(), completed: false },
      ]);
      setNewGoal("");
      setShowAddGoal(false);
    }
  };

  const toggleGoal = (id: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  return (
    <div className="dashboard">
      {/* Greeting Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-medium text-gray-800">{greeting}!</h3>
        <p className="text-gray-600 mt-1">Here&apos;s your personal dashboard</p>
      </div>

      {/* Quote Section */}
      <div className="bg-purple-50 p-4 rounded-xl mb-6">
        <p className="text-gray-700 italic">&quot;{quote.text}&quot;</p>
        <p className="text-gray-500 text-sm mt-1">— {quote.author}</p>
      </div>

      {/* Daily Goals Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-700">Today&apos;s Focus</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddGoal(!showAddGoal)}
            className="p-1.5 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
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

        {showAddGoal && (
          <form onSubmit={addGoal} className="mb-3">
            <div className="flex">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Add a focus item..."
                className="flex-grow px-3 py-2 rounded-l-lg bg-white border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-700 text-sm"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-r-lg bg-purple-500 text-white text-sm"
              >
                Add
              </button>
            </div>
          </form>
        )}

        <div className="space-y-2">
          {goals.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-2">
              No focus items yet
            </p>
          ) : (
            goals.map((goal) => (
              <div
                key={goal.id}
                className="flex items-start p-3 rounded-lg bg-white/80 border border-gray-100 group"
              >
                <button
                  onClick={() => toggleGoal(goal.id)}
                  className={`mt-0.5 mr-2 w-5 h-5 rounded-full flex-shrink-0 border ${
                    goal.completed
                      ? "bg-purple-500 border-purple-500 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {goal.completed && (
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
                <div className="flex-1">
                  <p
                    className={`text-gray-700 text-sm ${
                      goal.completed ? "line-through" : ""
                    }`}
                  >
                    {goal.text}
                  </p>
                </div>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity"
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
            ))
          )}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="bg-white/80 p-4 rounded-xl">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Daily Progress
        </h3>
        <div className="flex items-center mb-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
            <div
              className="bg-purple-500 h-2.5 rounded-full"
              style={{
                width: `${Math.round(
                  (goals.filter((g) => g.completed).length /
                    Math.max(goals.length, 1)) *
                    100
                )}%`,
              }}
            ></div>
          </div>
          <span className="text-sm text-gray-600">
            {Math.round(
              (goals.filter((g) => g.completed).length /
                Math.max(goals.length, 1)) *
                100
            )}
            %
          </span>
        </div>
        <p className="text-xs text-gray-500">
          {goals.filter((g) => g.completed).length} of {goals.length} items
          completed
        </p>
      </div>
    </div>
  );
}
