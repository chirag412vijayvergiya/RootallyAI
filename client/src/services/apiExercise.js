import customFetch from "../utils/customFetch";

export async function getExercises() {
  try {
    const response = await customFetch.get("/exercises");
    console.log("Response:", response.data.categories);
    return response.data.categories;
  } catch (err) {
    console.error("Error fetching Exercises: ", err);
    throw new Error("Failed to fetch Exercises");
  }
}
