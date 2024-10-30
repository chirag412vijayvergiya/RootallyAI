import React, { useState, useEffect } from "react";
import ExerciseList from "./ExerciseList";
import { useGetPrograms } from "../features/usegetPrograms";
import AddExercisePro from "./AddExercisePro";
import { useDeleteProgram } from "../features/useDeleteProgram";

function ExerciseProgramManager() {
  const [exercises, setExercises] = useState([]);
  const { Programs, isPending, error } = useGetPrograms();
  const { isDeleting, deleteprogram } = useDeleteProgram();

  useEffect(() => {
    if (Programs) {
      const allExercises = Programs.flatMap((program) => program.exercises);
      setExercises(allExercises);
    }
  }, [Programs]);

  function handleDuplicate(id) {
    const exerciseToDuplicate = exercises.find(
      (exercise) => exercise.id === id
    );
    setExercises([
      ...exercises,
      { ...exerciseToDuplicate, id: `${Math.random()}` },
    ]);
  }

  function handleDelete(programId, exerciseId) {
    // setExercises(exercises.filter((exercise) => exercise.id !== id));setExercises((prevExercises) =>
    console.log(
      "Deleting exercise with ID:",
      exerciseId,
      "from program:",
      programId
    );

    deleteprogram(exerciseId);
    setExercises((prevExercises) =>
      prevExercises.filter((exercise) => exercise.id !== exerciseId)
    );
  }

  function handleDragEnd(result) {
    if (!result.destination) return;
    const reorderedExercises = Array.from(exercises);
    const [movedExercise] = reorderedExercises.splice(result.source.index, 1);
    reorderedExercises.splice(result.destination.index, 0, movedExercise);
    setExercises(reorderedExercises);
  }

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-full mx-auto">
      <h2 className="text-lg font-bold mb-4 text-gray-700">
        Exercise Programme
      </h2>
      <ExerciseList
        exercises={exercises}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete} // Pass the delete handler
        onDragEnd={handleDragEnd}
      />
      <AddExercisePro />
    </div>
  );
}

export default ExerciseProgramManager;
