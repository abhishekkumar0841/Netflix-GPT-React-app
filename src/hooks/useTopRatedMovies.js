import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const getNowPlayingMovies = async () => {
    fetch("https://api.themoviedb.org/3/movie/top_rated?page=1", API_OPTIONS)
      .then((response) => response?.json())
      .then((data) => {
        dispatch(addTopRatedMovies(data?.results));
      });
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useTopRatedMovies;
