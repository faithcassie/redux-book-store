import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookSlice from "./bookSlice";
import favoriteSlice from "./favoriteSlice";

const store = configureStore({
  reducer: combineReducers({
    book: bookSlice.reducer,
    favorite: favoriteSlice.reducer,
  }),
});

export default store;
