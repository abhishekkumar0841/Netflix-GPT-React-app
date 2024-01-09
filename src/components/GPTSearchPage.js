import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GPTMoviesSuggestion from "./GPTMoviesSuggestion";
import { loginPageBackgroundImage } from "../utils/constants";

const GPTSearchPage = () => {
  return (
    <div
      className=" pt-[15vh]"
      style={{
        backgroundImage: `url(${loginPageBackgroundImage})`,
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <GPTSearchBar />
      <GPTMoviesSuggestion />
    </div>
  );
};

export default GPTSearchPage;
