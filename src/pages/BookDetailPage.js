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
  const { data, isLoading, toastMessage } = useSelector((state) => state.book);
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
            {data.imageLink && (
              <img
                width="100%"
                src={`${BACKEND_API}/${data.imageLink}`}
                alt=""
              />
            )}
          </Grid>
          <Grid item md={8}>
            {data && (
              <Stack>
                <h2>{data.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {data.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {data.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {data.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {data.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {data.language}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ width: "fit-content" }}
                  onClick={() => dispatch(addToReadingList(data))}
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
