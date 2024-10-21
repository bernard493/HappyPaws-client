import { configureStore } from "@reduxjs/toolkit";
import globalStateSlice from "./globalStateSlice";
import {
  loadState,
  saveState,
  saveUserData,
  getSavedLocalUser,
} from "./localStorageUtils";

// Load state from local storage (if any)
const persistedSelectedPetState = loadState();
const persistedUserState = getSavedLocalUser();

export const store = configureStore({
  reducer: {
    globalState: globalStateSlice,
  },
  preloadedState: {
    globalState: {
      // load the state from local storage
      selectedPetForAdoption: persistedSelectedPetState || {},
      // load the user data from local storage
      user: persistedUserState || {},
    },
  },
});

// Save the selectedPetForAdoption state to localStorage whenever it changes
store.subscribe(() => {
  const { selectedPetForAdoption, user } = store.getState().globalState;
  saveState(selectedPetForAdoption);
  saveUserData(user);
});
