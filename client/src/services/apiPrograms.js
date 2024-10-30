import customFetch from "../utils/customFetch";

export async function getPrograms() {
  try {
    const response = await customFetch.get("/programs");
    console.log("Response:", response.data.programs);
    return response.data.programs;
  } catch (err) {
    console.error("Error fetching Programs: ", err);
    throw new Error("Failed to fetch Programs");
  }
}

export async function saveProgram({ programId, newExercise }) {
  console.log("Program ID:", programId);
  console.log("New Exercise:", newExercise);
  try {
    const response = await customFetch.post("/programs", {
      programId,
      newExercise,
    });
    console.log("Response:", response.data.program);
    return response.data.program;
  } catch (err) {
    console.error("Error saving Program: ", err);
    throw new Error("Failed to save Program");
  }
}

export async function deleteProgram(exerciseId) {
  try {
    const response = await customFetch.delete(`/programs/${exerciseId}`);
    console.log("Response:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error deleting Exercise: ", err);
    throw new Error("Failed to delete Exercise");
  }
}
