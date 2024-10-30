import React, { useState, useRef, useEffect } from "react";
import { useGetExercises } from "../features/usegetExercises";

function Exercise({ selectedExercise, setSelectedExercise }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const { isPending, exercises, error } = useGetExercises();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isDropdownOpen) return;

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  if (isPending) return <p>Loading...</p>;
  const categories = exercises.reduce((acc, category) => {
    acc[category.name] = category.exercises.map((exercise) => ({
      id: exercise.id,
      name: exercise.name,
    }));
    return acc;
  }, {});

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
    setDropdownOpen(false);

    // console.log("Selected Exercise ID:", exercise.id);
  };
  return (
    <div className="flex flex-col space-y-6 p-6 max-w-full mx-auto bg-gray-50 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="w-2/5">
          <label className="block text-gray-800 font-semibold mb-2">
            Programme Name
          </label>
          <input
            type="text"
            placeholder="Knee Rehab Programme"
            className="border border-gray-300 p-3 rounded-lg w-full bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value="Knee Rehab Programme"
            readOnly
          />
        </div>

        <div className="w-2/5 relative" ref={dropdownRef}>
          <label className="block text-gray-800 font-semibold mb-2">
            Exercise Combo
          </label>

          <div
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between border border-gray-300 p-3 rounded-lg cursor-pointer bg-white shadow-sm hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
          >
            <span className="text-gray-700">
              {selectedExercise ? selectedExercise.name : "Select Combo"}
            </span>
            <span className="ml-2 text-gray-500">&#9662;</span>{" "}
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <ul className="py-2">
                {Object.keys(categories).map((category) => (
                  <li
                    key={category}
                    onMouseEnter={() => setHoveredCategory(category)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className="relative px-4 py-2 hover:bg-blue-100 cursor-pointer text-gray-700 font-medium"
                  >
                    {category}

                    {/* Submenu for Exercises */}
                    {hoveredCategory === category && (
                      <div className="absolute top-0 left-full ml-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <ul className="py-2">
                          {categories[category].map((exercise) => (
                            <li
                              key={exercise.id}
                              onClick={() => handleExerciseSelect(exercise)}
                              className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-gray-600"
                            >
                              {exercise.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="">
          <button className="ml-7 mt-7 self-start border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition">
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

export default Exercise;
