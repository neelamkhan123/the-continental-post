import { useEffect, useState } from "react";
import Article from "~/components/article/article";
import type { ArticleProps } from "~/components/article/article";
import Search from "~/components/seach/search";

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
            <h2 className="mb-5 text-xl text-slate-400 font-medium">
              Showing results for "{query}"
            </h2>
          )}
          <ul className="flex flex-col justify-center items-center space-y-20">
            {articles.slice(0, 5).map((article, index) => (
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
        </div>
      ) : (
        <div className="loader-large" />
      )}
    </div>
  );
}
