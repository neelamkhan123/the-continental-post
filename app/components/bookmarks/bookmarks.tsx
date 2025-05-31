import React from "react";
import Bookmark from "./bookmark";
import type { BookmarkProps } from "./bookmark";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../../../firebase";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkProps[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchBookmarks(currentUser.uid);
      } else {
        setBookmarks([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchBookmarks = async (userId: string) => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://news-auth-eb2f2-default-rtdb.firebaseio.com/articles/${userId}.json`
      );

      if (!res.ok) {
        throw new Error("Could not fetch bookmarks");
      }

      const data = await res.json();

      if (data) {
        // Convert Firebase object to array
        const bookmarksArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setBookmarks(bookmarksArray);
      } else {
        setBookmarks([]);
      }
    } catch (error) {
      console.error("Couldn't retrieve your bookmarks:", error);
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full">
      {!loading ? (
        <ul className="grid grid-cols-4 gap-2">
          {bookmarks.length > 0 ? (
            bookmarks.map((bookmark, index) => (
              <li key={index} className="h-full">
                <Bookmark
                  title={bookmark.title}
                  urlToImage={bookmark.urlToImage}
                  url={bookmark.url}
                />
              </li>
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
              <span className="text-gray-400">Nothing bookmarked yet :(</span>
            </div>
          )}
        </ul>
      ) : (
        <div className="flex justify-center items-center h-full">
          <div className="loader-large"></div>
        </div>
      )}
    </div>
  );
}
