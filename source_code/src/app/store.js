import { configureStore } from "@reduxjs/toolkit";
import dataTableReducer from "../features/dataTable/dataTableSlice";

export default configureStore({
  reducer: {
    dataTable: dataTableReducer,
  },
});
