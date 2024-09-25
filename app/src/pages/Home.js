import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  // Previously, we were using useState to manage workouts at the component level:
  // const [workouts, setWorkouts] = useState(null);

  // Now, we're using the context to access state and dispatch:
  const { workouts, dispatch } = useWorkoutsContext();
  // workouts: current list of workouts from global context
  // dispatch: function to send actions to update workouts state

  // useEffect runs when the component mounts (i.e., when the Home component is first rendered)
  useEffect(() => {
    // Async function to fetch workouts from the server (backend API)
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts"); // Send a GET request to the API to get workouts data
      const json = await response.json(); // Parse the JSON response

      // If the response is successful (status code 200), update the context with the fetched workouts
      if (response.ok) {
        // Instead of using useState, we dispatch an action to the reducer
        dispatch({ type: "SET_WORKOUTS", payload: json });
        // type: "SET_WORKOUTS" triggers the reducer to replace current workouts with the fetched ones
        // payload: json (the workouts data fetched from the API)
      }
    };

    fetchWorkouts(); // Call the async function to fetch the data
  }, [dispatch]); // The effect depends on `dispatch`, but since dispatch is stable, the effect runs only once (on mount)

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
