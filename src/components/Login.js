import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [signInForm, setSignInForm] = useState(false);

  const toggleForm = () => {
    setSignInForm(!signInForm);
  };
  return (
    <div
      style={{
        backgroundImage:
          'url("https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg")',
        height: "100vh",
        width: "100vw",
      }}
      className=" object-cover "
    >
      <Header />
      {/* <div>
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="" />
        </div> */}
      <div className=" min-h-[85vh] w-full flex justify-center items-center">
        <form className=" bg-black w-4/12 px-16 py-10 rounded-md flex flex-col gap-8 bg-opacity-80 text-white">
          <h1 className="text-3xl font-semibold">
            {signInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!signInForm && (
            <input
              type="text"
              placeholder="Name"
              className=" px-4 py-2 font-semibold rounded-md text-xl bg-gray-700"
            />
          )}
          <input
            type="text"
            placeholder="User name"
            className=" px-4 py-2 font-semibold rounded-md text-xl bg-gray-700"
          />
          <input
            type="text"
            placeholder="Password"
            className=" px-4 py-2 font-semibold rounded-md text-xl bg-gray-700"
          />
          <button className=" bg-red-500 text-white font-semibold text-xl py-2 rounded-md">
            {signInForm ? "Sign In" : "Sign Up"}
          </button>
          <div onClick={toggleForm} className=" cursor-pointer">
            <span className=" text-gray-400">
              {signInForm ? "New to netflix?" : "Already have an account?"}
            </span>{" "}
            <span className=" font-semibold">
              {signInForm ? "Sign up now." : "Sign in now."}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
