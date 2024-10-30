import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

function ExerciseItem({ exercise, onDuplicate, onDelete }) {
  const [sets, setSets] = useState(exercise.sets);
  const [reps, setReps] = useState(exercise.reps);
  const [holdTime, setHoldTime] = useState(exercise.holdTime);
  const [side, setSide] = useState(exercise.side);
  const [duplicatedSides, setDuplicatedSides] = useState({
    Left: false,
    Right: false,
  });

  const handleDuplicate = () => {
    if (!duplicatedSides[side]) {
      onDuplicate({ ...exercise, side });
      setDuplicatedSides((prev) => ({ ...prev, [side]: true }));
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center space-x-4">
      <div className="w-full">
        <h3 className="font-semibold text-gray-700">{exercise.name}</h3>
        <div className="flex items-center space-x-2 mt-2">
          <div>
            <label>Sets</label>
            <input
              type="number"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              className="border rounded-md p-1 w-16"
            />
          </div>
          <div>
            <label>Reps</label>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="border rounded-md p-1 w-16"
            />
          </div>
          <div>
            <label>Hold Time</label>
            <input
              type="number"
              value={holdTime}
              onChange={(e) => setHoldTime(e.target.value)}
              className="border rounded-md p-1 w-16"
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-2 ml-auto">
        <div className="flex items-center">
          <button
            onClick={() => setSide("Left")}
            className={`px-2 py-1 border rounded-l-lg ${
              side === "Left" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Left
          </button>
          <button
            onClick={() => setSide("Right")}
            className={`px-2 py-1 border rounded-r-lg ${
              side === "Right" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Right
          </button>
        </div>
        <button
          onClick={handleDuplicate}
          className="bg-gray-200 px-3 py-1 rounded-lg text-blue-600 font-semibold hover:bg-blue-100"
          disabled={duplicatedSides.Left && duplicatedSides.Right}
        >
          Duplicate
        </button>

        <button
          onClick={() => onDelete(exercise.programId, exercise.id)} // Call onDelete with exercise ID
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default ExerciseItem;
