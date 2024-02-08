import React, { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { ACTION_TYPES } from "../context/WorkoutContextProvider";

function WorkoutForm() {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState("");

  const [isPosted, setIsPosted] = useState(false);

  const { dispatch } = useWorkoutContext();

  const addWorkout = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/v1/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        reps,
        load,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setTitle("");
      setReps("");
      setLoad("");
      setTimeout(() => {
        setIsPosted(false);
      }, 2000);
      setIsPosted(true);
      dispatch({ type: ACTION_TYPES.ADD_WORKOUT, payload: json });
    }
  };
  return (
    <div className="w-full flex flex-col px-4 py-2">
      <h1 className="text-xl font-semibold text-center">Add Workout</h1>
      <form onSubmit={addWorkout} className="flex flex-col">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Workout Name"
        />
        <input
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          type="number"
          placeholder="Reps"
        />
        <input
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          type="number"
          placeholder="Load"
        />
        <button className="flex items-center justify-center gap-2 mt-4 bg-pink-500 rounded-lg py-2 hover:bg-pink-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span className="text-white">Add Workout</span>
        </button>
        {isPosted && (
          <p className="text-green-500 font-semibold text-center mt-2">
            {" "}
            Workout Added!
          </p>
        )}
      </form>
    </div>
  );
}

export default WorkoutForm;
