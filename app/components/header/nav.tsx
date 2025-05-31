import React from "react";
import { Link, useLocation } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useEffect } from "react";

import Logo from "../ui/logo";
import { useState } from "react";

export default function Nav() {
  const [userPresent, setUserPresent] = useState(false);
  const [uid, setUid] = useState<string>("");
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setUserPresent(true);
      } else {
        setUserPresent(false);
        setUid("");
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then()
      .catch((error) => {
        console.error("Error with logging out", error);
      });
  };

  return (
    <div className="sticky top-0 flex justify-around items-center bg-white/90 backdrop-blur-lg py-8 shadow-md z-40">
      <Logo />
      <nav className="flex justify-center items-center space-x-10">
        <Link
          to={"/"}
          className={`text-base font-bold transition duration-500 ease-in-out ${
            isActive("/") ? "text-blue-600" : "hover:text-blue-600"
          }`}
        >
          Home
        </Link>
        <Link
          to={"/discover"}
          className={`text-base font-bold transition duration-500 ease-in-out ${
            isActive("/discover") ? "text-blue-600" : "hover:text-blue-600"
          }`}
        >
          Discover
        </Link>

        {/* Authentication */}
        {!userPresent ? (
          <div className="flex justify-center items-center space-x-2">
            <Link
              to="/login"
              className="text-base font-bold bg-gray-100 px-4 py-2 rounded-md shadow-sm hover:bg-white hover:shadow-none text-blue-600 hover:text-black transition duration-500 ease-in-out"
            >
              Login
            </Link>
            <Link
              to="/sign-up"
              className="text-base font-bold bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:text-blue-600 hover:bg-white hover:shadow-none transition duration-300 ease-in-out"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center space-x-2">
            <Link
              to={`/user/${uid}`}
              className="text-base font-bold bg-gray-100 px-4 py-2 rounded-md shadow-sm hover:bg-white hover:shadow-none text-blue-600 hover:text-black transition duration-500 ease-in-out"
            >
              My Account
            </Link>
            <Link
              to="/"
              onClick={handleLogout}
              className="text-base font-bold bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:text-blue-600 hover:bg-white hover:shadow-none transition duration-300 ease-in-out"
            >
              Logout
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
