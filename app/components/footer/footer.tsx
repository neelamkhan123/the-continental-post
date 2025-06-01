import React from "react";
import instagram from "../../images/ig-instagram-icon.svg";
import X from "../../images/x-social-media-logo-icon.svg";
import tiktok from "../../images/tiktok-square-color-icon.svg";
import snapchat from "../../images/snapchat-square-color-icon.svg";

export default function Footer() {
  return (
    <div className="flex justify-center  py-6">
      <div className="flex flex-col justify-between items-center space-y-10 max-w-2/3">
        <ul className="flex justify-between items-center space-x-4 w-full">
          <li className="text-black font-bold hover:underline transition-all duration-200 ease-in-out cursor-pointer text-sm">
            Terms of Use
          </li>
          <li className="text-black font-bold hover:underline transition-all duration-200 ease-in-out cursor-pointer text-sm">
            About
          </li>
          <li className="text-black font-bold hover:underline transition-all duration-200 ease-in-out cursor-pointer text-sm">
            Privacy Policy
          </li>
          <li className="text-black font-bold hover:underline transition-all duration-200 ease-in-out cursor-pointer text-sm">
            Cookies
          </li>
          <li className="text-black font-bold hover:underline transition-all duration-200 ease-in-out cursor-pointer text-sm">
            Accessibility Help
          </li>
          <li className="text-black font-bold hover:underline transition-all duration-200 ease-in-out cursor-pointer text-sm">
            Parental Guidance
          </li>
          <li className="text-black font-bold hover:underline transition-all duration-200 ease-in-out cursor-pointer text-sm">
            Contact
          </li>
          <li className="text-black font-bold hover:underline transition-all duration-200 ease-in-out cursor-pointer text-sm">
            Make an editorial complaint
          </li>
        </ul>

        <div className="flex justify-between items-end w-full bg-white">
          <p className="text-sm">Copyright © 2025 The Continental Post.</p>
          <ul className="flex justify-center items-center space-x-4">
            <img src={X} alt="X" className="w-8 h-8 cursor-pointer" />
            <img
              src={instagram}
              alt="Instagram"
              className="w-8 h-8 cursor-pointer"
            />
            <img src={tiktok} alt="TikTok" className="w-8 h-8 cursor-pointer" />
            <img
              src={snapchat}
              alt="Snapchat"
              className="w-8 h-8 cursor-pointer"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
