import { useState } from "react";
import { useGetPrograms } from "../features/useGetPrograms";
import DaySelector from "./DaySelector";
import TherapistNotes from "./TherapistNotes";
import StatsAddForm from "./StatsAddForm";
import { useCreatePrograms } from "../features/useCreatePrograms";

function AddExercisePro() {
  const { Programs, isPending, error } = useGetPrograms();
  const [stat, setStat] = useState({
    sets: 0,
    reps: 0,
    holdTime: 0,
    side: "Left",
  });
  const [programId, setProgramId] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [therapistNotes, setTherapistNotes] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const { createProgram, isCreating } = useCreatePrograms();

  const handleSaveCombo = () => {
    const newExercise = {
      exerciseName,
      stat,
      therapistNotes,
      selectedDays,
    };

    console.log("Saved Combo Data:", newExercise);
    createProgram(
      { programId, newExercise },
      {
        onSuccess: () => {
          setProgramId("");
          setExerciseName("");
          setStat({
            sets: 0,
            reps: 0,
            holdTime: 0,
            side: "Left",
          });
          setTherapistNotes("");
          setSelectedDays([]);
        },
        onError: (error) => {
          console.error("Error saving combo:", error);
        },
      }
    );
  };

  const handleAddEntry = () => {
    console.log("Adding entry...");
  };

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2 className="text-lg font-bold mb-4 text-gray-700">Add Exercise</h2>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label>Program</label>
          <select
            className="border rounded-md p-2 w-full"
            value={programId}
            onChange={(e) => setProgramId(e.target.value)}
          >
            <option value="">Select a Program</option>
            {Programs.map((program) => (
              <option key={program.id} value={program.id}>
                {program.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/2">
          <label>Exercise Name</label>
          <input
            type="text"
            className="border rounded-md p-2 w-full"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
          />
        </div>
      </div>

      <StatsAddForm stat={stat} setStat={setStat} />

      <div className="mt-4">
        <DaySelector
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />
      </div>

      <div className="mt-4">
        <TherapistNotes notes={therapistNotes} setNotes={setTherapistNotes} />
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={handleSaveCombo}
          disabled={isCreating}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Save as Combo
        </button>
        <button
          type="button"
          onClick={handleAddEntry}
          disabled={isCreating}
          className="px-6 py-2 bg-gray-400 text-white rounded-lg"
        >
          Add Entry
        </button>
      </div>
    </div>
  );
}

export default AddExercisePro;
