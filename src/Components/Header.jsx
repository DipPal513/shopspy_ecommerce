import React, { useContext, useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { BsCart4 } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaHome,
  FaProductHunt,
  FaHeart,
  FaShoppingCart,
  FaMoon,
  FaSun,
} from "react-icons/fa"; // Import FaMoon and FaSun icons
import { ShopContext } from "../context/ShopContext";

const Header = () => {
  const [open, isOpen] = useState(false);
  const [scrolled, isScrolled] = useState(false);
  const { cartItems, darkMode, setDarkMode } = useContext(ShopContext);
  const navigate = useNavigate();
  const handleCart = () => {
    navigate("/cartitems");
  };
  let total = 0;
  for (let i in cartItems) {
    total += cartItems[i];
  }

  useEffect(() => {
    // const isDark = localStorage.getItem("darkMode","true") == true;
    // setDarkMode(isDark)
    const handleScroll = () => {
      if (window.scrollY > 0) {
        isScrolled(true);
      } else {
        isScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDarkMode = () => {
    localStorage.setItem("darkMode",!darkMode);
    const updatedMode = localStorage.getItem('darkMode') ? !darkMode: darkMode;
    setDarkMode(updatedMode);

    
       // You can apply your dark mode styles here
  };
  darkMode
    ? document.body.classList.add("dark")
    : document.body.classList.remove("dark");

  return (
    <nav
      className={`w-full flex justify-between sm:px-20 px-4 py-10 items-center bg-white z-[111] dark:bg-gray-900 dark:text-white shadow-lg ${
        scrolled ? "fixed top-0" : ""
      } ${darkMode ? "dark-mode" : ""}`}
    >
      <div className="flex gap-x-4">
        <button className="" onClick={() => isOpen(!open)}>
          <HiMenuAlt3
            style={{ fontSize: "35px" }}
            className="transition duration-500 hover:text-red-500"
          />
        </button>
        <h1 className="text-xl text-gray-800 font-bold dark:text-white">
          SHOPSP
          <span
            style={{ transform: "rotate(2deg)" }}
            className="inline-block text-red-400"
          >
            Y
          </span>
        </h1>
      </div>
      <div
        className={`sidenav_area p-10 space-x-6 sideNav absolute top-0 bg-gray-100 dark:bg-gray-700 dark:text-white h-[100vh] w-[calc(100vw-30vw)] md:w-[calc(100vw-70vw)] transition-all duration-700 ${
          open ? "left-0" : "left-[-1000%]  z-[111111]"
        }`}
      >
        <button
          className="absolute top-30 right-10"
          onClick={() => {
            isOpen(!open);
          }}
        >
          <RxCross2
            style={{ fontSize: "35px" }}
            className="transition duration-500 hover:text-red-500"
          />
        </button>
        <h1 className="text-xl text-gray-800 font-bold dark:text-white">
          SHOPSP
          <span
            style={{ transform: "rotate(2deg)" }}
            className="inline-block text-red-400"
          >
            Y
          </span>
        </h1>

        <ul className="flex justify-center items-left flex-col space-y-3 mt-10 dark:text-[white !important] z-40">
          <li className={`text-gray-700 hover:text-black hover:underline`}>
            <Link to="/">
              <FaUser className="inline-block text-xl dark:text-white" />
              <span className="ml-3 dark:text-white">User</span>
            </Link>
          </li>
          <li className={`text-gray-700 hover:text-black hover:underline dark:text-white`}>
            <Link to="/">
              <FaHome className="inline-block text-xl" />
              <span className="ml-3 dark:text-white">Home</span>
            </Link>
          </li>
          <li className={`text-gray-700 hover:text-black hover:underline`}>
            <Link to="/products">
              <FaProductHunt className="inline-block text-xl dark:text-white" />
              <span className="ml-3 dark:text-white">Products</span>
            </Link>
          </li>
          <li className={`text-gray-700 hover:text-black hover:underline dark:text-white`}>
            <Link to="/favorites">
              <FaHeart className="inline-block text-xl" />
              <span className="ml-3 dark:text-white">Favorites</span>
            </Link>
          </li>
          <li className={`text-gray-700 dark:text-white hover:text-black hover:underline`}>
            <Link to="/cartitems">
              <FaShoppingCart className="inline-block text-xl" />
              <span className="ml-3">Cart</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center">
        <div className="flex items-center">
          {/* Day/Night Toggle Button */}
          <button
            className="flex items-center justify-center pointer mr-4 duration-1000"
            onClick={toggleDarkMode}
          >
            {darkMode ? <FaSun size={25} /> : <FaMoon size={25} />}
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="hidden sm:block h-5 w-5 pt-0.5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="ml-2 outline-none bg-transparent sm:block hidden "
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
          />
          <button className="flex items-center justify-center pointer mr-4">
            {/* <BiHeart size={25} />
            <sup className="font-bold bg-red-500 w-5 h-5 flex items-center justify-center text-white rounded-xl">
              {total}
            </sup> */}
          </button>
          <button
            className="flex items-center justify-center pointer"
            onClick={handleCart}
          >
            <BsCart4 size={25} />
            <sup className="font-bold bg-red-500 w-5 h-5 flex items-center justify-center text-white rounded-xl">
              {total}
            </sup>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
