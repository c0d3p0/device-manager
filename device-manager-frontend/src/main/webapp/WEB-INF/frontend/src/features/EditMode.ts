import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
  name: "editMode",
  initialState: {value: false},
  reducers:
  {
    toggleEditMode: (state) =>
    {
      state.value = !state.value;
    }
  }
});


export const { toggleEditMode } = editSlice.actions;
export default editSlice.reducer;