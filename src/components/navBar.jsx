import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/plogo.png";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme === "light" ? "dark" : "light");
  };

  const handleNavigate = () => {
    try {
      navigate("/");
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <nav
      className={` overflow-hidden ${
        theme === "light"
          ? "bg-gray-100 text-gray-800"
          : "bg-gray-800 text-white"
      } py-5 px-6 flex justify-between items-center shadow-xl shadow-gray-500 shadow-opacity-50 `}
    >
      <section 
      onClick={handleNavigate}
      className="flex items-center tracking-wide bg-clip-text text-transparent hover:scale-105 transform transition-transform duration-300 cursor-pointer" >
        <img
          src={logo}
          alt="Pea Share"
          className=" h-10 w-auto object-contain"
        />
        <h3
          className="text-4xl font-bold ml-3 py-1"
          style={{
            color: "white",
            textShadow: `
          2px 2px 4px rgba(0, 0, 0, 0.2),
          -1px -1px 0 rgba(255, 255, 255, 0.1),
          0 4px 8px rgba(0, 128, 0, 0.2)
        `,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <span className="relative">Pea Share</span>
        </h3>
      </section>

      <div className=" relative">
        <button
          className=" bg-transparent border-0 py-2 px-4 cursor-pointer"
          onClick={handleThemeToggle}
        >
          {theme === "light" ? (
            <FontAwesomeIcon icon={faMoon} size="lg" />
          ) : (
            <FontAwesomeIcon icon={faSun} size="lg" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
