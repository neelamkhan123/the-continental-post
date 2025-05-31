import React from "react";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../../firebase";
import Bookmarks from "~/components/bookmarks/bookmarks";
import Profile from "~/components/profile/profile";

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "bookmarks">(
    "profile"
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full h-full mx-20">
      <h1 className="text-6xl accent-font mb-6">Hi, {user?.displayName}</h1>

      <div className="bg-white  w-full h-[60vh] p-4 rounded-lg shadow-md">
        <nav className="relative flex w-full mx-auto bg-blue-100 p-1 rounded-full mb-4">
          {/* Sliding Background */}
          <div
            className={`absolute top-1 bottom-1 left-1 w-1/2 bg-blue-200 rounded-full transition-transform duration-300 ease-in-out transform ${
              activeTab === "bookmarks" ? "translate-x-full" : ""
            }`}
          ></div>

          {/* Tabs */}
          <button
            onClick={() => setActiveTab("profile")}
            className="w-1/2 z-10 text-center py-2 font-bold text-blue-600 cursor-pointer"
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("bookmarks")}
            className="w-1/2 z-10 text-center py-2 font-bold text-blue-600 cursor-pointer"
          >
            My Bookmarks
          </button>
        </nav>

        <div className="h-[90%] overflow-y-scroll">
          {activeTab === "profile" && <Profile />}
          {activeTab === "bookmarks" && <Bookmarks />}
        </div>
      </div>
    </div>
  );
}
