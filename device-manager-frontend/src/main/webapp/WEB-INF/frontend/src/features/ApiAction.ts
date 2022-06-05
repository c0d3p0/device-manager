import { createSlice } from "@reduxjs/toolkit";


const apiActionSlice = createSlice({
  name: "apiAction",
  initialState:
  {
    value: {actionKey: "device-find-all", params: []}
  },
  reducers:
  {
    setAction: (state, action) =>
    {
      state.value = action.payload;
    }
  }
});


export const { setAction } = apiActionSlice.actions;
export default apiActionSlice.reducer;