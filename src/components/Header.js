import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className=" px-8 py-2 bg-gradient-to-b from-black h-[15vh] flex items-center justify-between">
      <img
        className=" w-52"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Logo"
      />
      {user && (
        <div className="cursor-pointer" onClick={handleLogout}>
          <img
            src={
              user?.photoURL
                ? user?.photoURL
                : "https://avatars.githubusercontent.com/u/6759280?v=4"
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
