import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../apiService";
import { toast } from "react-toastify";

export const addToReadingList = createAsyncThunk(
  "add-to-favorites",
  async (detail) => {
    try {
      const res = await api.post(`/favorites`, detail);
      toast.success("The book has been added to the reading list!");
      return res.data;
    } catch (error) {
      toast.error(error.message);
    }
  }
);
export const removeBook = createAsyncThunk("remove-book", async (bookId) => {
  await api.delete(`/favorites/${bookId}`);
  const res = await api.get(`/favorites`);
  return res.data;
});
export const fetchFavorites = createAsyncThunk("/favorites", async () => {
  const res = await api.get(`/favorites`);
  return res.data;
});

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    loading: false,
    favoriteBooks: [],
    toastMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToReadingList.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addToReadingList.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToReadingList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favoriteBooks = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(removeBook.fulfilled, (state, action) => {
        state.favoriteBooks = action.payload;
        state.loading = false;
      })
      .addCase(removeBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// console.log(favoriteSlice);
export default favoriteSlice;
