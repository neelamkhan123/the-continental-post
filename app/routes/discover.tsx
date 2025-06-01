import { useEffect, useState } from "react";
import Article from "~/components/article/article";
import type { ArticleProps } from "~/components/article/article";
import Search from "~/components/seach/search";
import Pagination from "~/components/pagination/pagination";

type ArticleResponse = {
  status: string;
  totalResults: number;
  articles: ArticleProps[];
};

export default function Discover() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [query, setQuery] = useState<string>("");
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
    async function fetchNews() {
      if (!query.trim()) return;

      setLoading(true);

      try {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
        );

        if (!res.ok) {
          throw new Error("Failed to get article");
        }

        const data: ArticleResponse = await res.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error getting articles", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [query]);

  return (
    <div className="flex flex-col items-center my-20">
      <Search onSearch={(query) => setQuery(query)} />
      {!loading ? (
        <div className="flex flex-col justify-center items-center">
          {query && (
            <>
              <h2 className="mb-5 text-xl text-slate-400 font-medium">
                Showing results for "{query}"
              </h2>

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
          )}
        </div>
      ) : (
        <div className="loader-large" />
      )}
    </div>
  );
}
