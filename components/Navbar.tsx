import React from "react";

const Navbar = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/194/194967.png"
            className="w-8 h-8"
            alt="logo"
          />
          <span className="ml-3 text-xl">
            Tukan<small> beta</small>
          </span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a href="/" className="mr-5 hover:text-orange-500 cursor-pointer">
            Home{" "}
          </a>
          <a
            href="/aboutUs"
            className="mr-5 hover:text-orange-500 cursor-pointer"
          >
            About Us{" "}
          </a>
          <a
            href="/pricing"
            className="mr-5 hover:text-orange-500 cursor-pointer"
          >
            Pricing
          </a>
        </nav>
        <button className="inline-flex items-center text-white bg-orange-500 border-0 py-1 px-3 focus:outline-none hover:bg-orange-600 rounded text-base mt-4 md:mt-0">
          Get started
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
