import React, { useState } from "react";
import magnifier from "../../images/search-icon.svg";

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim() === "") return;

    onSearch(query);

    setQuery("");
  };

  const selectTag = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    const tag = e.currentTarget.textContent?.trim();
    if (!tag) return;

    onSearch(tag);
    setQuery("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center"
    >
      <h1 className="text-6xl accent-font font-bold mb-10">
        What’s Happening Around the World?
      </h1>
      <div className="w-2/3 relative">
        <input
          type="text"
          name="search"
          id="search"
          className="bg-white rounded-full shadow-lg py-3 px-5 text-md text-black w-full outline-0"
          placeholder="Type a Topic, Country, or Keyword"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="flex justify-center items-center bg-blue-600 rounded-full p-2 w-10 h-10 cursor-pointer hover:bg-blue-500 transition-all duration-300 ease-in-out absolute top-1 right-1"
        >
          <img src={magnifier} alt="Search" className="w-8 h-8" />
        </button>
      </div>
      <ul className="flex justify-center items-center gap-2 my-10">
        <li
          onClick={selectTag}
          className="bg-blue-200 text-blue-700 px-4 py-2 text-base rounded-full cursor-pointer hover:bg-transparent hover:font-bold transition-all duration-300 ease-in-out"
        >
          bitcoin
        </li>
        <li
          onClick={selectTag}
          className="bg-blue-200 text-blue-700 px-4 py-2 text-base rounded-full cursor-pointer hover:bg-transparent hover:font-bold transition-all duration-300 ease-in-out"
        >
          french
        </li>
        <li
          onClick={selectTag}
          className="bg-blue-200 text-blue-700 px-4 py-2 text-base rounded-full cursor-pointer hover:bg-transparent hover:font-bold transition-all duration-300 ease-in-out"
        >
          crypto
        </li>
        <li
          onClick={selectTag}
          className="bg-blue-200 text-blue-700 px-4 py-2 text-base rounded-full cursor-pointer hover:bg-transparent hover:font-bold transition-all duration-300 ease-in-out"
        >
          celebrity
        </li>
        <li
          onClick={selectTag}
          className="bg-blue-200 text-blue-700 px-4 py-2 text-base rounded-full cursor-pointer hover:bg-transparent hover:font-bold transition-all duration-300 ease-in-out"
        >
          spanish
        </li>
        <li
          onClick={selectTag}
          className="bg-blue-200 text-blue-700 px-4 py-2 text-base rounded-full cursor-pointer hover:bg-transparent hover:font-bold transition-all duration-300 ease-in-out"
        >
          sports
        </li>
        <li
          onClick={selectTag}
          className="bg-blue-200 text-blue-700 px-4 py-2 text-base rounded-full cursor-pointer hover:bg-transparent hover:font-bold transition-all duration-300 ease-in-out"
        >
          music
        </li>
        <li
          onClick={selectTag}
          className="bg-blue-200 text-blue-700 px-4 py-2 text-base rounded-full cursor-pointer hover:bg-transparent hover:font-bold transition-all duration-300 ease-in-out"
        >
          football
        </li>
      </ul>
    </form>
  );
}
