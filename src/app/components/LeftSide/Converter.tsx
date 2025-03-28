import { useState } from "react";
import { motion } from "framer-motion";

type ConversionType = "length" | "weight" | "temperature" | "currency";

interface ConversionOption {
  id: string;
  label: string;
  ratio?: number; // Ratio to base unit (not used for temperature)
  toBase?: (value: number) => number; // Custom conversion to base unit
  fromBase?: (value: number) => number; // Custom conversion from base unit
}

export default function Converter() {
  const [conversionType, setConversionType] = useState<ConversionType>("length");
  const [fromValue, setFromValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<string>("m");
  const [toUnit, setToUnit] = useState<string>("cm");
  const [result, setResult] = useState<string>("100");

  // Conversion options for each type
  const conversionOptions: Record<ConversionType, ConversionOption[]> = {
    length: [
      { id: "km", label: "Kilometers", ratio: 1000 },
      { id: "m", label: "Meters", ratio: 1 },
      { id: "cm", label: "Centimeters", ratio: 0.01 },
      { id: "mm", label: "Millimeters", ratio: 0.001 },
      { id: "in", label: "Inches", ratio: 0.0254 },
      { id: "ft", label: "Feet", ratio: 0.3048 },
      { id: "yd", label: "Yards", ratio: 0.9144 },
      { id: "mi", label: "Miles", ratio: 1609.34 },
    ],
    weight: [
      { id: "kg", label: "Kilograms", ratio: 1 },
      { id: "g", label: "Grams", ratio: 0.001 },
      { id: "mg", label: "Milligrams", ratio: 0.000001 },
      { id: "lb", label: "Pounds", ratio: 0.453592 },
      { id: "oz", label: "Ounces", ratio: 0.0283495 },
    ],
    temperature: [
      { 
        id: "c", 
        label: "Celsius", 
        toBase: (value) => value,
        fromBase: (value) => value
      },
      { 
        id: "f", 
        label: "Fahrenheit", 
        toBase: (value) => (value - 32) * 5/9,
        fromBase: (value) => value * 9/5 + 32
      },
      { 
        id: "k", 
        label: "Kelvin", 
        toBase: (value) => value - 273.15,
        fromBase: (value) => value + 273.15
      },
    ],
    currency: [
      { id: "usd", label: "US Dollar", ratio: 1 },
      { id: "eur", label: "Euro", ratio: 1.08 },
      { id: "gbp", label: "British Pound", ratio: 1.27 },
      { id: "jpy", label: "Japanese Yen", ratio: 0.0067 },
      { id: "cad", label: "Canadian Dollar", ratio: 0.73 },
    ],
  };

  const handleConvert = () => {
    const value = parseFloat(fromValue);
    if (isNaN(value)) {
      setResult("Invalid input");
      return;
    }

    const options = conversionOptions[conversionType];
    const fromOption = options.find(opt => opt.id === fromUnit);
    const toOption = options.find(opt => opt.id === toUnit);

    if (!fromOption || !toOption) {
      setResult("Invalid units");
      return;
    }

    let convertedValue: number;

    if (conversionType === "temperature") {
      // For temperature, convert to base (Celsius) then to target
      const toCelsius = fromOption.toBase!(value);
      convertedValue = toOption.fromBase!(toCelsius);
    } else {
      // For other conversions, use ratios
      const baseValue = value * fromOption.ratio!;
      convertedValue = baseValue / toOption.ratio!;
    }

    // Format the result
    setResult(convertedValue.toLocaleString(undefined, {
      maximumFractionDigits: 6,
      minimumFractionDigits: 0
    }));
  };

  return (
    <div className="converter">
      <div className="mb-4">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              onClick={() => setConversionType("length")}
              className={`px-3 py-1 rounded-md text-sm ${
                conversionType === "length"
                  ? "bg-green-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Length
            </button>
            <button
              onClick={() => setConversionType("weight")}
              className={`px-3 py-1 rounded-md text-sm ${
                conversionType === "weight"
                  ? "bg-green-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Weight
            </button>
            <button
              onClick={() => setConversionType("temperature")}
              className={`px-3 py-1 rounded-md text-sm ${
                conversionType === "temperature"
                  ? "bg-green-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Temp
            </button>
            <button
              onClick={() => setConversionType("currency")}
              className={`px-3 py-1 rounded-md text-sm ${
                conversionType === "currency"
                  ? "bg-green-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Currency
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={fromValue}
              onChange={(e) => {
                setFromValue(e.target.value);
                handleConvert();
              }}
              className="w-full px-3 py-2 rounded-l-lg bg-white border border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-700"
            />
            <select
              value={fromUnit}
              onChange={(e) => {
                setFromUnit(e.target.value);
                handleConvert();
              }}
              className="px-3 py-2 rounded-r-lg bg-white border border-l-0 border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-700"
            >
              {conversionOptions[conversionType].map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center my-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const temp = fromUnit;
                setFromUnit(toUnit);
                setToUnit(temp);
                handleConvert();
              }}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </motion.button>
          </div>

          <div className="flex items-center">
            <input
              type="text"
              value={result}
              readOnly
              className="w-full px-3 py-2 rounded-l-lg bg-gray-100 border border-gray-200 focus:outline-none text-gray-700"
            />
            <select
              value={toUnit}
              onChange={(e) => {
                setToUnit(e.target.value);
                handleConvert();
              }}
              className="px-3 py-2 rounded-r-lg bg-white border border-l-0 border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-700"
            >
              {conversionOptions[conversionType].map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleConvert}
          className="w-full py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
        >
          Convert
        </motion.button>
      </div>
    </div>
  );
}