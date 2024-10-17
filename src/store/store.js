import { configureStore } from "@reduxjs/toolkit";
import globalStateSlice  from "./globalStateSlice";


export const store = configureStore({
  reducer: {
    globalState: globalStateSlice,
  },
});
