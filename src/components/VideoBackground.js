import React from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((state) => state?.movies?.trailerVideo);

  useMovieTrailer(movieId);

  return (
    <div className=" w-screen">
      <iframe
        className=" w-screen aspect-video"
        src={`https://www.youtube.com/embed/${trailerVideo}?&autoplay=1&mute=1`}
      ></iframe>
    </div>
  );
};

export default VideoBackground;
