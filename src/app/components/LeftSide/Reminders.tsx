import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Reminder {
  id: number;
  text: string;
  time: string;
  completed: boolean;
}

export default function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const savedReminders = localStorage.getItem("reminders");
    return savedReminders
      ? JSON.parse(savedReminders)
      : [
          {
            id: 1,
            text: "Check emails",
            time: new Date(Date.now() + 3600000).toISOString(),
            completed: false,
          },
        ];
  });

  const [newReminder, setNewReminder] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    // Set default time to 1 hour from now
    const oneHourLater = new Date();
    oneHourLater.setHours(oneHourLater.getHours() + 1);
    setReminderTime(oneHourLater.toISOString().slice(0, 16));
  }, [showForm]);

  const addReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReminder.trim() && reminderTime) {
      const reminder: Reminder = {
        id: Date.now(),
        text: newReminder.trim(),
        time: new Date(reminderTime).toISOString(),
        completed: false,
      };
      setReminders([...reminders, reminder]);
      setNewReminder("");
      setShowForm(false);
    }
  };

  const toggleReminder = (id: number) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  };

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  // Sort reminders by time and completion status
  const sortedReminders = [...reminders].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return new Date(a.time).getTime() - new Date(b.time).getTime();
  });

  const formatReminderTime = (timeString: string) => {
    const time = new Date(timeString);
    const now = new Date();
    const isToday = time.toDateString() === now.toDateString();

    if (isToday) {
      return `Today at ${time.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    return time.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="reminders">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-700">
          Upcoming Reminders
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
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
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden"
            onSubmit={addReminder}
          >
            <input
              type="text"
              value={newReminder}
              onChange={(e) => setNewReminder(e.target.value)}
              placeholder="Reminder text..."
              className="w-full px-3 py-2 mb-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700 text-sm"
              required
            />
            <input
              type="datetime-local"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="w-full px-3 py-2 mb-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700 text-sm"
              required
            />
            <div className="flex justify-end space-x-2">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(false)}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm"
              >
                Add Reminder
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        <AnimatePresence>
          {sortedReminders.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No reminders yet
            </p>
          ) : (
            sortedReminders.map((reminder) => (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-3 rounded-lg bg-white/80 border border-gray-100 relative group ${
                  reminder.completed ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-start">
                  <button
                    onClick={() => toggleReminder(reminder.id)}
                    className={`mt-0.5 mr-2 w-5 h-5 rounded-full flex-shrink-0 border ${
                      reminder.completed
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {reminder.completed && (
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
                        reminder.completed ? "line-through" : ""
                      }`}
                    >
                      {reminder.text}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatReminderTime(reminder.time)}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteReminder(reminder.id)}
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
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
