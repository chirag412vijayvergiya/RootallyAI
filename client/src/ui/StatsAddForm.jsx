import React from "react";

function StatsAddForm({ stat, setStat }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the state based on input changes
    setStat((prevStat) => ({
      ...prevStat,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg max-w-full mx-auto">
      <h2 className="text-lg font-bold mb-4 text-gray-700">
        Add Exercise Stats
      </h2>

      <div className="flex flex-row space-x-4">
        {/* Sets Input */}
        <div className="flex-1">
          <label className="block text-gray-600">Sets</label>
          <input
            type="number"
            name="sets" // Name attribute to identify the input
            className="border rounded-md p-2 w-full"
            placeholder="Enter number of sets"
            value={stat.sets} // Controlled value
            onChange={handleInputChange} // Handle changes
          />
        </div>

        {/* Reps Input */}
        <div className="flex-1">
          <label className="block text-gray-600">Reps</label>
          <input
            type="number"
            name="reps" // Name attribute to identify the input
            className="border rounded-md p-2 w-full"
            placeholder="Enter number of reps"
            value={stat.reps} // Controlled value
            onChange={handleInputChange} // Handle changes
          />
        </div>

        {/* Hold Time Input */}
        <div className="flex-1">
          <label className="block text-gray-600">Hold Time (seconds)</label>
          <input
            type="number"
            name="holdTime" // Name attribute to identify the input
            className="border rounded-md p-2 w-full"
            placeholder="Enter hold time in seconds"
            value={stat.holdTime} // Controlled value
            onChange={handleInputChange} // Handle changes
          />
        </div>

        {/* Side Select */}
        <div className="flex-1">
          <label className="block text-gray-600">Side</label>
          <select
            name="side" // Name attribute to identify the select
            className="border rounded-md p-2 w-full"
            value={stat.side} // Controlled value
            onChange={handleInputChange} // Handle changes
          >
            <option value="Left">Left</option>
            <option value="Right">Right</option>
            <option value="Both">Both</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default StatsAddForm;
