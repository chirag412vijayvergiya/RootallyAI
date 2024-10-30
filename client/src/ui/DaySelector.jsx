import React, { useState } from "react";

function DaySelector({ selectedDays, setSelectedDays }) {
  const days = [
    { id: "sun", label: "S" },
    { id: "mon", label: "M" },
    { id: "tue", label: "T" },
    { id: "wed", label: "W" },
    { id: "thu", label: "T" },
    { id: "fri", label: "F" },
    { id: "sat", label: "S" },
  ];

  const [frequency, setFrequency] = useState(1);

  function toggleDay(dayId) {
    setSelectedDays((prev) =>
      prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]
    );
  }

  function toggleSelectAll() {
    if (selectedDays.length === days.length) {
      setSelectedDays([]);
    } else {
      setSelectedDays(days.map((day) => day.id));
    }
  }

  return (
    <div className="items-center bg-white p-6 rounded-lg shadow-md w-full flex flex-row justify-between">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold mr-4">Day of Week</h1>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSelectAll();
            }}
            className={`px-3 py-2 rounded-full transition duration-300 ease-in-out ${
              selectedDays.length === days.length
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {selectedDays.length === days.length
              ? "Deselect All"
              : "Select All"}
          </button>
        </div>
        <div className="flex flex-wrap justify-center space-x-2">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={(e) => {
                e.stopPropagation();
                toggleDay(day.id);
              }}
              className={`px-4 py-2 rounded-full transition duration-300 ease-in-out ${
                selectedDays.includes(day.id)
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col items-end">
        <label className="text-gray-800 font-semibold mb-2">
          Daily Frequency
        </label>
        <div className="flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFrequency(Math.max(1, frequency - 1));
            }}
            className="px-3 py-2 bg-gray-200 text-gray-800 rounded-l-md hover:bg-gray-300 transition"
          >
            -
          </button>

          <input
            type="number"
            value={frequency}
            onChange={(e) => {
              setFrequency(Math.max(1, parseInt(e.target.value, 10)));
            }}
            className="border-t border-b border-gray-300 p-2 w-20 text-center"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              setFrequency(frequency + 1);
            }}
            className="px-3 py-2 bg-gray-200 text-gray-800 rounded-r-md hover:bg-gray-300 transition"
          >
            +
          </button>

          <span className="text-gray-600 text-sm ml-2">sessions/day</span>
        </div>
      </div>
    </div>
  );
}

export default DaySelector;
