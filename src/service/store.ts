import { configureStore } from "@reduxjs/toolkit";
import uiSliceReducer from "./uiStateSlice"
import notesSliceReducer from "./notesSlice"

//створення магазину з ред'юсерами для стану інтерфейсу та стану нотаток
const store = configureStore({
    reducer: {
      ui: uiSliceReducer,
      notes: notesSliceReducer,
    },
  });

export default store