import React from "react";
import Earth from "../../images/google-earth-icon.svg";
import { Link } from "react-router";

export default function Logo() {
  return (
    <Link
      to={"/"}
      className="flex justify-center items-center space-x-2 cursor-pointer"
    >
      <img src={Earth} alt="Earth" className="h-7 w-7" />
      <div className="capitalize flex flex-col justify-center">
        <span className="logo-font">The</span>
        <span className="logo-font text-2xl">Continental Post</span>
      </div>
    </Link>
  );
}
