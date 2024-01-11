import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { defaultAvatarUrl, logo } from "../utils/constants";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { SiOpenai } from "react-icons/si";
import { SUPPORTED_LANGUAGES } from "../utils/languageConstant";
import { changeLanguage } from "../utils/configSlice";

function Header() {
  const user = useSelector((state) => state.user);
  const showGPTSearch = useSelector((state) => state.gpt.showGPTSearch);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGPTSearchClick = () => {
    dispatch(toggleGPTSearchView());
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen z-50 px-8 py-2 bg-gradient-to-b from-black h-[15vh] flex items-center justify-between">
      <div className=" flex-1">
        <img className=" w-52" src={logo} alt="Logo" />
      </div>
      {user && (
        <>
          <div className="flex-1 flex flex-col items-center">
            <button
              onClick={handleGPTSearchClick}
              className={`${
                !showGPTSearch
                  ? "text-green-400 font-bold text-4xl text-opacity-60 hover:text-opacity-100 transition-all duration-300 ease-in-out"
                  : "text-green-400 font-bold text-6xl transition-all duration-300 ease-in-out animate-spin"
              }`}
              style={{ animationDuration: "2s" }}
            >
              <SiOpenai />
            </button>
          </div>
          <div className="flex-1  flex justify-end gap-10">
            {showGPTSearch && (
              <div className="">
                <select
                  className=" py-2 px-3 cursor-pointer bg-transparent font-semibold border-2 rounded-sm border-indigo-300 text-indigo-300"
                  onChange={handleLanguageChange}
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.identifier} value={lang.identifier}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div
              className="cursor-pointer  flex flex-col items-end"
              onClick={handleLogout}
            >
              <img
                src={user?.photoURL ? user?.photoURL : defaultAvatarUrl}
                alt=""
                width={50}
              />
              <h1 className=" text-white font-semibold">Logout</h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
