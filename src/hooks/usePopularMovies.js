import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const getNowPlayingMovies = async () => {
    fetch("https://api.themoviedb.org/3/movie/popular?page=1", API_OPTIONS)
      .then((response) => response?.json())
      .then((data) => {
        dispatch(addPopularMovies(data?.results));
      });
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default usePopularMovies;
