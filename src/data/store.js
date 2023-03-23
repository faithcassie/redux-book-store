import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookSlice from "./bookSlice";
import favoriteSlice from "./favoriteSlice";

const store = configureStore({
  reducer: {
    book: bookSlice.reducer,
    favorite: favoriteSlice.reducer,
  },
});

export default store;
