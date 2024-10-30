import React from "react";

function TherapistNotes({ notes, setNotes }) {
  return (
    <div className="mt-4">
      <label className="block text-gray-700 font-semibold mb-2">
        Therapist Notes
      </label>
      <textarea
        className="w-full p-3 border rounded-lg bg-gray-50"
        placeholder="Add Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      ></textarea>
    </div>
  );
}

export default TherapistNotes;
