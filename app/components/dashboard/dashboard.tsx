import React from "react";
import { useEffect, useState } from "react";
import Article from "../article/article";
import type { ArticleProps } from "../article/article";

type ArticleResponse = {
  status: string;
  totalResults: number;
  articles: ArticleProps[];
};

export default function Dashboard() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    async function fetchNews() {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
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
  }, []);

  return (
    <div className="flex flex-col items-center pt-10 mb-20">
      <h1 className="text-7xl accent-font font-bold mb-10">Top Headlines</h1>
      {!loading ? (
        <ul className="flex flex-col justify-center items-center space-y-20">
          {articles.slice(0, 3).map((article, index) => (
            <li
              className="max-w-2/3 bg-white rounded-lg shadow-lg p-8"
              key={index}
            >
              <Article
                title={article.title}
                author={article.author}
                url={article.url}
                urlToImage={article.urlToImage}
                publishedAt={article.publishedAt}
                content={article.content}
                description={article.description}
                source={article.source}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="loader-large"></div>
      )}
    </div>
  );
}
