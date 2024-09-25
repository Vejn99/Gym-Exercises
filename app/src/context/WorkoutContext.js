import { createContext, useReducer } from "react"; // Import createContext for creating context and useReducer for state management

// 1. Create a context
export const WorkoutsContext = createContext(); // This creates a context named WorkoutsContext to share state globally

// 2. Reducer function to manage state changes
export const workoutsReducer = (state, action) => {
  // state is the current state, and action is the object dispatched with a type and optional payload

  switch (
    action.type // Check the type of action dispatched
  ) {
    case "SET_WORKOUTS": // When the action type is 'SET_WORKOUTS':
      return {
        workouts: action.payload, // Replace the current workouts with the payload (new workouts list)
      };

    case "CREATE_WORKOUT": // When the action type is 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts], // Add a new workout to the beginning of the workouts array
      };

    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };

    default:
      return state; // If the action type doesn't match, return the current state (no change)
  }
};

// 3. Context provider component
export const WorkoutContextProvider = ({ children }) => {
  // useReducer hook to initialize state and provide dispatch function
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null, // Initial state: workouts is set to null
  });

  return (
    // 4. Provide the context to child components
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children} {/* Render any child components that use this provider */}
    </WorkoutsContext.Provider>
  );
};

/*
Summary of each section:

1. The WorkoutsContext context is created, allowing child components to consume the state and dispatch actions.
2. The workoutsReducer function handles state updates for two actions: 
   - 'SET_WORKOUTS': Sets a list of workouts.
   - 'CREATE_WORKOUT': Adds a new workout to the existing workouts.
3. The WorkoutContextProvider wraps child components and provides them with the current state and a dispatch function via the context.
4. The context value passed includes both the state and the dispatch function so components can access the workouts and update them.
*/
