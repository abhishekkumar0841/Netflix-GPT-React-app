import React from "react";

const GPTSearchBar = () => {
  return (
    <div className="">
      <form className=" bg-black bg-opacity-60 w-8/12 mx-auto p-10 flex flex-1 rounded-2xl gap-3">
        <input
          type="text"
          placeholder="Confused! Ask from GPT and watch👍"
          className=" px-4 py-2 font-semibold text-xl rounded-xl flex-[5] bg-transparent text-green-400 outline-none border-4 border-green-400 tracking-wider"
        />
        <button className=" bg-green-400 hover:bg-opacity-70 transition-all duration-300 px-10 py-2 text-xl rounded-lg text-white font-bold flex-3">
          Search
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
