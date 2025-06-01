import React from "react";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../../firebase";
import Bookmarks from "~/components/bookmarks/bookmarks";

export default function Account() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[90vh] mx-20">
      <h1 className="text-6xl accent-font mb-6">Hi, {user?.displayName}</h1>

      <div className="bg-white w-2/3 h-[60vh] p-4 rounded-lg shadow-md">
        <div className="relative flex w-full mx-auto bg-blue-100 p-1 rounded-full mb-4">
          <h2 className="w-full z-10 text-center py-2 font-bold text-blue-600">
            My Bookmarks
          </h2>
        </div>

        <Bookmarks />
      </div>
    </div>
  );
}
