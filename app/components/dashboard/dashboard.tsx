// Dashboard.tsx
import React, { useEffect, useState } from "react";
import Article from "../article/article";
import type { ArticleProps } from "../article/article";
import Pagination from "../pagination/pagination";

type ArticleResponse = {
  status: string;
  totalResults: number;
  articles: ArticleProps[];
};

export default function Dashboard() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const articlesPerPage = 5;
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    setLoading(true);

    async function fetchNews() {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=8cc19507da084b5a958d6755bf69a6ab`
        );

        if (!res.ok) {
          throw new Error("Failed to get articles");
        }

        const data: ArticleResponse = await res.json();
        setArticles(data.articles);
        setCurrentPage(1); // reset to page 1 on new fetch
      } catch (error) {
        console.error("Error getting articles", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return (
    <div className="flex flex-col items-center pt-10 mb-20">
      <h1 className="text-7xl accent-font font-bold mb-10">Top Headlines</h1>
      {!loading ? (
        <>
          <ul className="flex flex-col justify-center items-center space-y-20">
            {currentArticles.map((article, index) => (
              <li
                className="max-w-2/3 bg-white rounded-lg shadow-lg p-8"
                key={index}
              >
                <Article {...article} />
              </li>
            ))}
          </ul>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="loader-large"></div>
      )}
    </div>
  );
}
