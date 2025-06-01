import React, { useState } from "react";
import { Link } from "react-router";
import bin from "../../images/recycle-bin-icon.svg";

export type BookmarkProps = {
  id: string;
  title: string;
  urlToImage: string;
  url: string;
  uid: string;
  onDelete?: (id: string) => void;
};

export default function Bookmark({
  title,
  urlToImage,
  url,
  uid,
  id,
  onDelete,
}: BookmarkProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteBookmark = async (
    userId: string,
    bookmarkId: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);

    try {
      const res = await fetch(
        `https://news-auth-eb2f2-default-rtdb.firebaseio.com/articles/${userId}/${bookmarkId}.json`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete");
      }
      if (onDelete) onDelete(bookmarkId); // Notify parent to update state
    } catch (error) {
      console.error("Error deleting bookmark", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <Link
      to={url}
      target="_blank"
      className="flex flex-col justify-between items-center bg-gray-50 p-2 rounded-lg shadow-md h-full cursor-pointer hover:bg-gray-200 hover:shadow-none transition duration-300 ease-in-out"
    >
      <div className="mb-2 relative w-full h-2/3 overflow-hidden rounded-lg">
        <img
          src={urlToImage}
          alt="Thumbnail"
          className="w-full h-full object-cover"
        />
        <div className="w-8 h-8 flex justify-center items-center bg-white rounded-full shadow-lg absolute top-1 right-1 hover:scale-105 transition duration-300 ease-in-out">
          {!loading ? (
            <img
              src={bin}
              onClick={(e) => deleteBookmark(uid, id, e)}
              alt="Delete"
              className="w-7 h-7 p-2"
            />
          ) : (
            <div className="loader"></div>
          )}
        </div>
      </div>
      <p className="text-sm accent-font text-center h-1/3 overflow-hidden text-ellipsis">
        {title}
      </p>
    </Link>
  );
}
