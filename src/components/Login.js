import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { loginPageBackgroundImage, userNamedAvatar } from "../utils/constants";

const Login = () => {
  const [signInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

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
          updateProfile(user, {
            displayName: name?.current?.value,
            photoURL: `${userNamedAvatar}${name?.current?.value}`,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth?.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // 👇commented because of the value error
              // setErrorMessage("");
              // name.current.value = "";
              // email.current.value = "";
              // password.current.value = "";
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
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
          // console.log("Logged in user:", user);
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
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginPageBackgroundImage})`,
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
