import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../apiService.js";

export const fetchBookDetail = createAsyncThunk(
  "fetch-book-detail",
  async (bookId) => {
    const res = await api.get(`/books/${bookId}`);
    return res.data;
  }
);
export const fetchAllBooks = createAsyncThunk(
  "fetch-all-books",
  async ({ query, pageNum }) => {
    let url = `/books?_page=${pageNum}&_limit=10`;
    if (query) url += `&q=${query}`;
    console.log(query);
    const res = await api.get(url);
    console.log(res);
    return res.data;
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    data: [],
    isLoading: false,
    pageNum: 1,
    books: [],
    errorMessage: "",
    query: "",
  },
  reducers: {
    updateQuery: (state, action) => {
      state.query = action.payload;
    },
    updatePageNum: (state, action) => {
      state.pageNum = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookDetail.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchBookDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBookDetail.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
        // state.error = action.error.message;
      });
  },
});

export default bookSlice;
export const { updateQuery, updatePageNum } = bookSlice.actions;
