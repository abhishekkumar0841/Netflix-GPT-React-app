import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [signInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleForm = () => {
    setSignInForm(!signInForm);
  };
  const handleSubmit = () => {
    const msg = checkValidateData(email.current.value, password.current.value);

    if (msg) {
      setErrorMessage(msg);
      return;
    }

    // sign in / sign up logic
    if (!signInForm) {
      //sign-up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log("Registered User:", user);
          setErrorMessage("");
          name.current.value = "";
          email.current.value = "";
          password.current.value = "";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //sign-in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Logged in user:", user);
          setErrorMessage("");
          email.current.value = "";
          password.current.value = "";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }

    if (!msg) {
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg")',
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Header />
      <div className=" min-h-[85vh] w-full flex justify-center items-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className=" bg-black w-4/12 px-16 py-10 rounded-md flex flex-col gap-8 bg-opacity-80 text-white"
        >
          <h1 className="text-3xl font-semibold">
            {signInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!signInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Name"
              className=" px-4 py-2 font-semibold rounded-md text-xl bg-gray-700"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="User name"
            className=" px-4 py-2 font-semibold rounded-md text-xl bg-gray-700"
          />
          <input
            ref={password}
            type="text"
            placeholder="Password"
            className=" px-4 py-2 font-semibold rounded-md text-xl bg-gray-700"
          />
          <button
            onClick={handleSubmit}
            className=" bg-red-500 text-white font-semibold text-xl py-2 rounded-md"
          >
            {signInForm ? "Sign In" : "Sign Up"}
          </button>
          {errorMessage && (
            <div>
              <h1 className=" text-xl font-bold text-red-500">
                <sup>**</sup>
                {errorMessage} <sup>**</sup>
              </h1>
            </div>
          )}
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
