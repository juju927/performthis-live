import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../context/user";
import jwt_decode from "jwt-decode";

import pfp from "../images/pfp.jpg";

const NavBar = () => {
  // use theme from local storage if available or set light theme
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "night"
  );
  const [isPerformer, setIsPerformer] = useState(false)
  const [username, setUsername] = useState("")
  const userDetails = useContext(UserContext);
  const navigate = useNavigate();
  
  

  // update state on toggle
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("night");
    } else {
      setTheme("winter");
    }
  };

  const logout = () => {
    userDetails.setToucan("");
    localStorage.removeItem("toucan");
    navigate("/");
  };

  // set theme state in localstorage on mount & also update localstorage on state change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  useEffect(() => {
    if (userDetails.toucan) {
      const decodedUserDetails = jwt_decode(userDetails.toucan);
      setIsPerformer(decodedUserDetails.is_performer);
      setUsername(decodedUserDetails.username)
    }
  }, [userDetails.toucan])

  return (
    <div className="bg-base-100">
      <div className="navbar max-w-screen-xl mx-auto">
        <div className="navbar-start">
          {isPerformer && (
            <div className="dropdown">
              {/* drop down for small screens */}
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Dashboard</a>
                </li>
                <li>
                  <a>Songs</a>
                </li>
                <li>
                  <a>Live</a>
                </li>
              </ul>
            </div>
          )}
          <a className="btn btn-ghost normal-case text-xl text-base-content">
            Qriku
          </a>
        </div>

        {isPerformer && (
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-base-content">
              <li>
                <NavLink
                  to="/"
                  className="bg-transparent hover:text-indigo-400 aria-[current=page]:text-indigo-400 aria-[current=page]:underline aria-[current=page]:decoration-indigo-400 aria-[current=page]:underline-offset-8 aria-[current=page]:decoration-2"
                  aria-current="page"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/songs"
                  className="bg-transparent hover:text-indigo-400 aria-[current=page]:text-indigo-400 aria-[current=page]:underline aria-[current=page]:decoration-indigo-400 aria-[current=page]:underline-offset-8 aria-[current=page]:decoration-2"
                  aria-current="page"
                >
                  Songs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/live"
                  className="bg-transparent hover:text-indigo-400 aria-[current=page]:text-indigo-400 aria-[current=page]:underline aria-[current=page]:decoration-indigo-400 aria-[current=page]:underline-offset-8 aria-[current=page]:decoration-2"
                  aria-current="page"
                >
                  Live
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        <div className="navbar-end">
          {userDetails.toucan && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar-placeholder">
                <div className="w-10 rounded-full">
                  <span className="text-3xl uppercase">{username.charAt(0)}</span>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 shadow menu menu-compact lg:menu-normal dropdown-content bg-base-200 rounded-box w-52 text-sm text-base-content"
              >
                <li>
                  <div className="flex items-center">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <span className="text-3xl uppercase">{username.charAt(0)}</span>
                      </div>
                    </div>
                    <div className="flex-col items-start text-base-content">
                      <div className="text-sm text-secondary">{`@${username}`}</div>
                    </div>
                  </div>
                </li>
                <div className="divider"></div>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Settings2</a>
                </li>
                <li>
                  <a>Settings3</a>
                </li>
                <li>
                  <a>
                    Dark Mode{" "}
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      onChange={handleToggle}
                      checked={theme === "winter" ? false : true}
                    />
                  </a>
                </li>
                <div className="divider"></div>
                <li>
                  <a onClick={logout}>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
