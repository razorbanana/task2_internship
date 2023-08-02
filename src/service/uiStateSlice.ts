import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { UIState, Note } from "./types";

//початковий стан інтерфейсу, потрібен для форм та виведення контенту нотаток 
const initialState: UIState = {
  formData: {
    id: 0,
    name: "",
    category: "Task",
    created: "",
    content: "",
    isArchieved: false,
  },
  chosenCategory: "",
  activeNotesChosenContent: "Click content cell to read it!",
  archivedNotesChosenContent: "Click content cell of archived notes to read it!",
  isCreateVisible: false,
  isEditVisible: false,
};

//створення слайсу
const uiSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Note>) => {
      state.formData = action.payload;
    },
    setChosenCategory: (state, action: PayloadAction<string>) => {
      state.chosenCategory = action.payload;
    },
    setActiveNotesChosenContent: (state, action: PayloadAction<string>) => {
      state.activeNotesChosenContent = action.payload;
    },
    setArchivedNotesChosenContent: (state, action: PayloadAction<string>) => {
      state.archivedNotesChosenContent = action.payload;
    },
    setIsCreateVisible: (state, action: PayloadAction<boolean>) => {
      state.isCreateVisible = action.payload;
    },
    setIsEditVisible: (state, action: PayloadAction<boolean>) => {
      state.isEditVisible = action.payload;
    },
  },
});

export const {
  setFormData,
  setChosenCategory,
  setActiveNotesChosenContent,
  setArchivedNotesChosenContent,
  setIsCreateVisible,
  setIsEditVisible,
} = uiSlice.actions;

export default uiSlice.reducer;