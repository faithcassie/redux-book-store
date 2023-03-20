import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { updatePageNum } from "../data/bookSlice";

const PaginationBar = ({ pageNum, totalPageNum }) => {
  const dispatch = useDispatch();
  // const {pageNum} = useSelector((state) => state.book)
  const handleChange = (event, value) => {
    dispatch(updatePageNum(value));
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPageNum}
        page={pageNum}
        onChange={handleChange}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default PaginationBar;
