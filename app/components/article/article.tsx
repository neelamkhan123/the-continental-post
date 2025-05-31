import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../../../firebase";

export type ArticleProps = {
  source: {
    id: null;
    name: string;
  };
  author: string;
  title: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  description: string;
};

export default function Article({
  title,
  author,
  url,
  urlToImage,
  publishedAt,
  content,
  description,
  source,
}: ArticleProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        checkIfBookmarked(title, currentUser.uid);
      } else {
        setBookmarked(false); // Reset bookmark state when user logs out
      }
    });

    return () => unsubscribe();
  }, [title]);

  const checkIfBookmarked = async (articleTitle: string, userId: string) => {
    try {
      const res = await fetch(
        `https://news-auth-eb2f2-default-rtdb.firebaseio.com/articles/${userId}.json`
      );

      if (res.ok) {
        const articles = await res.json();
        if (articles) {
          const isBookmarked = Object.values(articles).some(
            (article: any) => article.title === articleTitle
          );
          setBookmarked(isBookmarked);
        } else {
          setBookmarked(false);
        }
      }
    } catch (error) {
      console.error("Error checking bookmark status:", error);
    }
  };

  const toggleBookmark = async (title: string) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      if (bookmarked) {
        // Remove bookmark - find and delete the article
        const res = await fetch(
          `https://news-auth-eb2f2-default-rtdb.firebaseio.com/articles/${user.uid}.json`
        );

        if (res.ok) {
          const articles = await res.json();
          if (articles) {
            // Find the article key to delete
            const articleKey = Object.keys(articles).find(
              (key) => articles[key].title === title
            );

            if (articleKey) {
              const deleteRes = await fetch(
                `https://news-auth-eb2f2-default-rtdb.firebaseio.com/articles/${user.uid}/${articleKey}.json`,
                { method: "DELETE" }
              );

              if (deleteRes.ok) {
                setBookmarked(false);
              }
            }
          }
        }
      } else {
        // Add bookmark
        const res = await fetch(
          `https://news-auth-eb2f2-default-rtdb.firebaseio.com/articles/${user.uid}.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              author,
              url,
              urlToImage,
              publishedAt,
              content,
              description,
              source,
            }),
          }
        );

        if (res.ok) {
          setBookmarked(true);
        }
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col">
      <h2 className="accent-font text-5xl text-black mb-5">{title}</h2>

      <div className="w-full flex justify-between items-center mb-5">
        <div className="flex flex-col justicy-center space-x-2">
          <p className="leading-none font-bold">
            {author ? author : "Anonymous"}
          </p>
          <p className="text-sm text-gray-500">{formatDate(publishedAt)}</p>
        </div>

        <div
          onClick={() => !loading && toggleBookmark(title)}
          className={`w-10 h-10 flex justify-center items-center rounded-full p-2 text-xl cursor-pointer ${
            bookmarked
              ? "text-blue-600 bg-blue-50"
              : "bg-gray-100 text-white shadow-xs hover:text-blue-600 hover:bg-white hover:shadow-none transition duration-300 ease-in-out"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <i
            className={`fa-solid ${
              loading
                ? "fa-spin fa-spinner"
                : bookmarked
                ? "fa-bookmark"
                : "fa-bookmark"
            }`}
          ></i>
        </div>
      </div>

      <div className="w-full flex justify-center items-center mb-5">
        <img
          src={urlToImage}
          alt="Thumbnail"
          className="w-full h-auto rounded-lg shadow-sm object-cover"
        />
      </div>

      <p className="font-bold text-xl mb-2">{description}</p>
      <Link className="text-sm" to={url} target="_blank">
        {content}
      </Link>
    </div>
  );
}
