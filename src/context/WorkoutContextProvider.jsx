import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const ACTION_TYPES = {
  GET_WORKOUT: "GET_WORKOUT",
  ADD_WORKOUT: "ADD_WORKOUT",
  DELETE_WORKOUT: "DELETE_WORKOUT",
  EDIT_WORKOUT: "EDIT_WORKOUT",
};

export const workoutReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_WORKOUT:
      return {
        workouts: action.payload,
      };

    case ACTION_TYPES.ADD_WORKOUT:
      return {
        workouts: [action.payload, ...state.workouts],
      };

    default:
      return {
        state,
      };
  }
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, { workouts: null });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
