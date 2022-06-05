import { configureStore } from "@reduxjs/toolkit";
import apiActionReducer from "../features/ApiAction"
import editModeReducer from "../features/EditMode";


const store = configureStore({
  reducer:
  {
    editMode: editModeReducer,
    apiAction: apiActionReducer
  }
});


export default store;