import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button, Box, Grid, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookDetail } from "../data/bookSlice";
import { addToReadingList } from "../data/favoriteSlice";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const BookDetailPage = () => {
  const params = useParams();
  const bookId = params.id;
  const dispatch = useDispatch();
  const { detail, isLoading, toastMessage } = useSelector(
    (state) => state.book
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBookDetail(bookId));
  }, []);

  return (
    <Container>
      {isLoading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="#inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          p={4}
          mt={5}
          sx={{ border: "1px solid black" }}
        >
          <Grid item md={4}>
            {detail.imageLink && (
              <img
                width="100%"
                src={`${BACKEND_API}/${detail.imageLink}`}
                alt=""
              />
            )}
          </Grid>
          <Grid item md={8}>
            {detail && (
              <Stack>
                <h2>{detail.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {detail.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {detail.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {detail.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {detail.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {detail.language}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ width: "fit-content" }}
                  onClick={() => dispatch(addToReadingList(detail))}
                >
                  Add to Reading List
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetailPage;
