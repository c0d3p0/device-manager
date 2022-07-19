import { configureStore } from "@reduxjs/toolkit";

import editModeReducer from "../features/EditMode";


const store = configureStore({
  reducer:
  {
    editMode: editModeReducer,
  }
});


export default store;