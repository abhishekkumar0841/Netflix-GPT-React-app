//fetch trailer video and updating the movies store with trailer data
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideo = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      API_OPTIONS
    );
    const video = await response?.json();
    // console.log('video:', video);
    const filterTrailer = video?.results?.filter((v) => v?.type === "Trailer");
    const trailer = filterTrailer?.length
      ? filterTrailer[0]
      : video?.results[0];
    // console.log(trailer);
    dispatch(addTrailerVideo(trailer?.key));
  };

  useEffect(() => {
    getMovieVideo();
  }, []);
};

export default useMovieTrailer;
