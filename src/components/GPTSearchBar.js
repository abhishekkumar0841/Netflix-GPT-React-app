import React, { useRef } from "react";
import { language } from "../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openAI";
import { API_OPTIONS } from "../utils/constants";
import { addGPTMovieResults } from "../utils/gptSlice";

const GPTSearchBar = () => {
  const lang = useSelector((state) => state.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  //searching movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/${movie}?include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = data?.json();

    return json?.results;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // make api call to get the movie results
    const query =
      "Act as a Movie Recommendation system and suggest some movies for the query " +
      +" only give me the names of five movies with comma (,) seperated like the example result given ahead. Example result: Don, Sholey, Animal, Gadar, Halchal";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: query }],
      model: "gpt-3.5-turbo",
    });

    //error handling for no-gpt results
    // if (!gptResults) {
    //   console.log("No results");
    // }

    console.log("gpt api results", gptResults.choices?.[0]?.message?.content);
    const gptMoviesList = gptResults.choices?.[0]?.message?.content?.split(",");

    const promiseArray = gptMoviesList.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);
    dispatch(
      addGPTMovieResults({ movieNames: gptResults, movieResults: tmdbResults })
    );
  };

  return (
    <div className="">
      <form
        className=" bg-black bg-opacity-60 w-8/12 mx-auto p-10 flex flex-1 rounded-2xl gap-3"
        onSubmit={handleSubmit}
      >
        <input
          className=" px-4 py-2 font-semibold text-xl rounded-xl flex-[5] bg-transparent text-green-400 outline-none border-4 border-green-400 tracking-wider"
          placeholder={language[lang].searchPlaceholder}
          type="text"
          ref={searchText}
        />
        <button className=" bg-green-400 hover:bg-opacity-70 transition-all duration-300 px-10 py-2 text-xl rounded-lg text-white font-bold flex-3">
          {language[lang].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
