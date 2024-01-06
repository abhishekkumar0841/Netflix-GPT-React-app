import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { defaultAvatarUrl, logo } from "../utils/constants";

function Header() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  return (
    <div className="absolute w-screen z-50 px-8 py-2 bg-gradient-to-b from-black h-[15vh] flex items-center justify-between">
      <img
        className=" w-52"
        src={logo}
        alt="Logo"
      />
      {user && (
        <div className="cursor-pointer" onClick={handleLogout}>
          <img
            src={
              user?.photoURL
                ? user?.photoURL
                : defaultAvatarUrl
            }
            alt=""
            width={50}
          />
          <h1 className=" text-white font-semibold">Logout</h1>
        </div>
      )}
    </div>
  );
}

export default Header;
