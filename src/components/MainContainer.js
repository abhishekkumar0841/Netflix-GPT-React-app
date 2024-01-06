import React from "react";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector((state) => state.movies?.nowPlayingMovies);
  //early return (if movies null) because of code not break. I can also solve with this--> movies?.[0]
  if (!movies) return;

  //generating random number to show random movie trailer
  const randomNumber = Math.floor(Math.random() * 20)

  const mainMovies = movies[randomNumber];
  const { overview, title, id} = mainMovies;

  return (
    <div className="relative">
      <VideoTitle overview={overview} title={title} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
