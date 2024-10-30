import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DaySelector from "./ui/DaySelector";
import Exercise from "./ui/Exercise";
import ExerciseProgramManager from "./ui/ExerciseProgramManager";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  const [selectedExercise, setSelectedExercise] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
              dismiss: "click",
            },
            error: {
              duration: 5000,
              dismiss: "click",
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "bg-gray-300",
              color: "text-gray-900",
            },
          }}
        />

        <Exercise
          selectedExercise={selectedExercise}
          setSelectedExercise={setSelectedExercise}
        />
        <ExerciseProgramManager />
        <ReactQueryDevtools initialIsOpen={false} />
      </>
    </QueryClientProvider>
  );
}

export default App;
