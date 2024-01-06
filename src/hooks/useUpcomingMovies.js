import { addUpcomingMovies } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const getNowPlayingMovies = async () => {
    fetch("https://api.themoviedb.org/3/movie/upcoming?page=1", API_OPTIONS)
      .then((response) => response?.json())
      .then((data) => {
        dispatch(addUpcomingMovies(data?.results));
      });
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useUpcomingMovies;
