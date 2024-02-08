import { Layout, WorkoutCard, WorkoutForm } from "../components";
import { useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { ACTION_TYPES } from "../context/WorkoutContextProvider";

function Home() {
  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/v1/");
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: ACTION_TYPES.GET_WORKOUT, payload: json.response });
      }
    };
    fetchWorkouts();
  }, [workouts]);

  return (
    <Layout>
      <div className="flex flex-col-reverse sm:flex-row w-full items-start gap-8">
        <div className="w-1/2 ">
          <h1 className="text-xl font-semibold text-center my-4">Workouts</h1>
          <div className="border-2 border-gray-400 p-4 min-w-[300px]">
            {workouts &&
              workouts.map((workout) => {
                return <WorkoutCard key={workout._id} data={workout} />;
              })}
          </div>
        </div>
        <div className=" border-2 border-gray-200 shadow-md">
          <WorkoutForm />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
