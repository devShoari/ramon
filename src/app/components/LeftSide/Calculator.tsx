import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [hasCalculated, setHasCalculated] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const calculatorRef = useRef<HTMLDivElement>(null);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!calculatorRef.current) return;

      // Only process keys if calculator is in view
      if (document.activeElement?.closest(".calculator")) {
        if (/^[0-9]$/.test(e.key)) {
          handleNumberClick(e.key);
        } else if (["+", "-", "*", "/", "x", "×", "÷"].includes(e.key)) {
          const operatorMap: Record<string, string> = {
            "*": "×",
            "/": "÷",
            x: "×",
          };
          handleOperatorClick(operatorMap[e.key] || e.key);
        } else if (e.key === "Enter" || e.key === "=") {
          handleCalculate();
        } else if (e.key === "Escape") {
          handleClear();
        } else if (e.key === "Backspace") {
          handleBackspace();
        } else if (e.key === ".") {
          handleNumberClick(".");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [display, equation]);

  const handleNumberClick = (num: string) => {
    if (display === "0" || hasCalculated) {
      setDisplay(num);
      setHasCalculated(false);
    } else {
      // Prevent multiple decimal points
      if (num === "." && display.includes(".")) return;
      setDisplay(display + num);
    }
  };

  const handleOperatorClick = (operator: string) => {
    setEquation(display + " " + operator + " ");
    setDisplay("0");
    setHasCalculated(false);
  };

  const handleCalculate = () => {
    try {
      const fullEquation = equation + display;
      // Using Function constructor instead of eval for better security
      const result = new Function(
        `return ${fullEquation.replace(/×/g, "*").replace(/÷/g, "/")}`
      )();

      // Format result to handle long decimals
      const formattedResult = Number.isInteger(result)
        ? String(result)
        : String(parseFloat(result.toFixed(8)));

      setDisplay(formattedResult);

      // Add to history
      const historyItem = `${fullEquation} = ${formattedResult}`;
      setHistory((prev) => [historyItem, ...prev.slice(0, 9)]);

      setEquation(fullEquation + " = ");
      setHasCalculated(true);
    } catch {
      setDisplay("Error");
      setHasCalculated(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
    setHasCalculated(false);
  };

  const handleBackspace = () => {
    if (display === "0" || display === "Error" || hasCalculated) {
      return;
    }
    setDisplay(display.slice(0, -1) || "0");
  };

  const handleSpecialOperation = (operation: string) => {
    try {
      const num = parseFloat(display);
      let result: number;

      switch (operation) {
        case "sqrt":
          if (num < 0)
            throw new Error("Cannot calculate square root of negative number");
          result = Math.sqrt(num);
          break;
        case "square":
          result = num * num;
          break;
        case "percent":
          result = num / 100;
          break;
        case "1/x":
          if (num === 0) throw new Error("Cannot divide by zero");
          result = 1 / num;
          break;
        default:
          return;
      }

      const formattedResult = Number.isInteger(result)
        ? String(result)
        : String(parseFloat(result.toFixed(8)));

      setDisplay(formattedResult);
      setEquation(`${operation}(${num}) = `);
      setHasCalculated(true);

      // Add to history
      const historyItem = `${operation}(${num}) = ${formattedResult}`;
      setHistory((prev) => [historyItem, ...prev.slice(0, 9)]);
    } catch {
      setDisplay("Error");
      setHasCalculated(true);
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const useHistoryItem = (item: string) => {
    const parts = item.split(" = ");
    if (parts.length === 2) {
      setDisplay(parts[1]);
      setEquation(parts[0] + " = ");
      setHasCalculated(true);
    }
  };

  const buttons = [
    { value: "C", type: "clear", span: 1 },
    { value: "√", type: "special", operation: "sqrt" },
    { value: "x²", type: "special", operation: "square" },
    { value: "÷", type: "operator" },
    { value: "7", type: "number" },
    { value: "8", type: "number" },
    { value: "9", type: "number" },
    { value: "×", type: "operator" },
    { value: "4", type: "number" },
    { value: "5", type: "number" },
    { value: "6", type: "number" },
    { value: "-", type: "operator" },
    { value: "1", type: "number" },
    { value: "2", type: "number" },
    { value: "3", type: "number" },
    { value: "+", type: "operator" },
    { value: "%", type: "special", operation: "percent" },
    { value: "0", type: "number" },
    { value: ".", type: "number" },
    { value: "=", type: "equals" },
  ];

  return (
    <div
      ref={calculatorRef}
      className="calculator bg-white/80 rounded-2xl p-5 shadow-lg transition-all duration-300"
      tabIndex={0}
    >
      <div className="flex justify-between items-center mb-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowHistory(!showHistory)}
          className="p-2 rounded-full bg-gray-100 text-gray-600"
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </motion.button>
      </div>

      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-800">History</h3>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-xs text-red-500 hover:text-red-600"
                >
                  Clear
                </button>
              )}
            </div>
            {history.length === 0 ? (
              <p className="text-xs text-gray-500">No history yet</p>
            ) : (
              <ul className="space-y-1">
                {history.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => useHistoryItem(item)}
                    className="text-xs text-gray-800 cursor-pointer hover:bg-opacity-50 p-1 rounded hover:bg-gray-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-4 bg-gray-100 p-3 rounded-lg">
        <motion.div
          className="text-xs text-gray-500 h-4 overflow-hidden"
          animate={{ opacity: equation ? 1 : 0.5 }}
        >
          {equation}
        </motion.div>
        <motion.div
          className="text-2xl font-medium text-right text-gray-800 overflow-x-auto"
          key={display}
          initial={{ opacity: 0.8, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {display}
        </motion.div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {buttons.map((button, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (button.type === "number") {
                handleNumberClick(button.value);
              } else if (button.type === "operator") {
                handleOperatorClick(button.value);
              } else if (button.type === "equals") {
                handleCalculate();
              } else if (button.type === "clear") {
                handleClear();
              } else if (button.type === "special" && button.operation) {
                handleSpecialOperation(button.operation);
              }
            }}
            className={`p-3 rounded-lg font-medium transition-colors ${
              button.type === "operator"
                ? "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                : button.type === "equals"
                ? "bg-indigo-500 text-white hover:bg-indigo-600"
                : button.type === "clear"
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : button.type === "special"
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {button.value}
          </motion.button>
        ))}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBackspace}
          className="p-3 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          ⌫
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSpecialOperation("1/x")}
          className="p-3 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          1/x
        </motion.button>
      </div>
    </div>
  );
}
