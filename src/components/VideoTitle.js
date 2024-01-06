import React from "react";
import {BiPlay, BiInfoCircle} from 'react-icons/bi'

const VideoTitle = ({ overview, title }) => {
  return (
    <div className="w-5/12 absolute top-[40%] left-20 flex flex-col gap-5">
      <h1 className="text-white font-bold text-4xl">{title}</h1>
      <p className="text-white font-semibold text-xl">{overview}</p>
      <div className="flex items-center gap-4 text-2xl">
        <button className=" bg-white font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-all duration-300">
        <BiPlay />Play Now
        </button>
        <button className=" bg-gray-700 text-white font-bold rounded-lg px-4 py-2 bg-opacity-80 flex items-center gap-2 hover:bg-gray-500 transition-all duration-300">
          <BiInfoCircle/> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
