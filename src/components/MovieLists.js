import React from "react";
import MovieCard from "./MovieCard";

const MovieLists = ({ title, movies }) => {
  // console.log("movies in m card:", movies);
  return (
      <div className="flex flex-col px-10 bg-gray-900">
        <h1 className=" text-3xl font-semibold pb-2 py-4 text-white">{title}</h1>
        <div className="hideScrollBar flex overflow-x-scroll items-center gap-4 pb-4">
          {movies?.map((movie) => (
            <MovieCard key={movie?.id} poster={movie?.poster_path} />
          ))}
        </div>
      </div>
  );
};

export default MovieLists;
