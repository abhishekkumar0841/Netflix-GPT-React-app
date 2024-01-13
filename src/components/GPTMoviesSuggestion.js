import React from "react";
import { useSelector } from "react-redux";
import MovieLists from "./MovieLists";

const GPTMoviesSuggestion = () => {
  const { movieNames, movieResults } = useSelector((state) => state.gpt);
  if (!movieNames) {
    return (
      <div className=" bg-black bg-opacity-60 px-8 py-4 rounded-lg">
        <h1 className=" text-4xl font-semibold text-red-500">
          You exceeded your current quota of Open-Ai API, please check your plan
          and billing details.
        </h1>
      </div>
    );
  }

  return (
    <div>
      {movieNames?.map((movie, index) => (
        <MovieLists
          key={movieNames}
          title={movieNames}
          movies={movieResults[index]}
        />
      ))}
    </div>
  );
};

export default GPTMoviesSuggestion;
