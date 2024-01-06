import React from "react";
import { tmdb_img_cdn } from "../utils/constants";

function MovieCard({ poster }) {
  return (
    <div className=" cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
      <img src={tmdb_img_cdn + poster} alt="" className=" min-w-[200px]" />
    </div>
  );
}

export default MovieCard;
