import React from "react";
import { Link } from "react-router";

export type BookmarkProps = {
  title: string;
  urlToImage: string;
  url: string;
};

export default function Bookmark({ title, urlToImage, url }: BookmarkProps) {
  return (
    <Link
      to={url}
      target="_blank"
      className="flex flex-col justify-center items-center bg-gray-50 p-2 rounded-lg shadow-md h-full cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
    >
      <div className="mb-2">
        <img src={urlToImage} alt="Thumbnail" className="rounded-lg" />
      </div>
      <p className="text-sm accent-font">{title}</p>
    </Link>
  );
}
