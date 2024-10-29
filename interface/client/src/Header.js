import React, { useState } from "react";

function Header({ language, handleLanguageChange }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleTooltipToggle = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <h1 className="text-center p-4 font-bold ">
      <div className="flex flex-row absolute top-0 right-0 m-4 space-x-2">
        <button
          onClick={handleLanguageChange}
          className="text-sm p-2 text-blue-600 border rounded-full font-semibold bg-blue-600 text-white hover:text-blue-500 hover:bg-white hover:border-blue-600"
        >
          {language}
        </button>
        <div className="relative group">
          <button
            onClick={handleTooltipToggle}
            className="text-sm p-2 text-blue-600 border rounded-full font-semibold bg-blue-600 text-white hover:text-blue-500 hover:bg-white hover:border-blue-600"
          >
            ?
          </button>
          <div
            className={`absolute right-0 mt-2 p-2 bg-white border rounded shadow-lg text-xs ${
              showTooltip ? "block" : "hidden"
            } group-hover:block`}
            style={{ maxWidth: "200px", zIndex: 10 }}
          >
            Ask LINK any questions about eligibility, access, and applications
            for federal and Massachusetts benefits!{" "}
            <span className="text-blue-500">
              <br></br> (This is a project of A Healthier Democracy. Visit
              <a
                href="https://ahealthierdemocracy.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline ml-1"
              >
                ahealthierdemocracy.org
              </a>{" "}
              for more).
            </span>
          </div>
        </div>
      </div>

      <div>
        <span className="relative inline-block text-2xl px-4 pr-6 rounded pb-4 ml-1">
          <span
            className="absolute inset-0 bg-red-100 transform -skew-x-12"
            style={{ top: "1.7rem", height: "30%", width: "100%" }}
          ></span>
          <span className="relative transform italic font-wildy-sans text-5xl">
            Link
          </span>
        </span>{" "}
        <br></br>
        <div className="text-xs md:text-sm">
          {" "}
          Connecting you with federal and Massachusetts benefits
        </div>
      </div>
    </h1>
  );
}

export default Header;
