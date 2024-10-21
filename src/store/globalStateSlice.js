import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  selectedPetForAdoption: {},
};

export const globalStateSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    setUserGlobalState: (state, action) => {
      state.user = action.payload;
    },

    setSelectedPetForAdoptionState: (state, action) => {
      state.selectedPetForAdoption = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedPetForAdoptionState, setUserGlobalState } =
  globalStateSlice.actions;

export default globalStateSlice.reducer;