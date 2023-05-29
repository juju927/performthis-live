import React from 'react'
import { NavLink } from "react-router-dom";

import pfp from "../images/pfp.jpg";



const NavBar = () => {
  return (
    <div className="bg-base-100">
      <div className="navbar max-w-screen-xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            {/* drop down for small screens */}
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Dashboard</a></li>
              <li><a>Songs</a></li>
              <li><a>Live</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">Qriku</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><NavLink to="/" className="bg-transparent hover:text-indigo-400 aria-[current=page]:text-indigo-400 aria-[current=page]:underline aria-[current=page]:decoration-indigo-400 aria-[current=page]:underline-offset-8 aria-[current=page]:decoration-2" aria-current="page">Dashboard</NavLink></li>
            <li><NavLink to="/songs" className="bg-transparent hover:text-indigo-400 aria-[current=page]:text-indigo-400 aria-[current=page]:underline aria-[current=page]:decoration-indigo-400 aria-[current=page]:underline-offset-8 aria-[current=page]:decoration-2" aria-current="page">Songs</NavLink></li>
            <li><NavLink to="/live" className="bg-transparent hover:text-indigo-400 aria-[current=page]:text-indigo-400 aria-[current=page]:underline aria-[current=page]:decoration-indigo-400 aria-[current=page]:underline-offset-8 aria-[current=page]:decoration-2" aria-current="page">Live</NavLink></li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={pfp} />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 shadow menu menu-compact lg:menu-normal dropdown-content bg-base-200 rounded-box w-52 text-sm">
            <li>
              <div className="flex items-center">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={pfp} />
                  </div>
                </div>
                <div className="flex-col items-start">
                  <div className="text-base">Joanna</div>
                  <div className="text-sm text-secondary">@jojobu</div>
                </div>

              </div>
            </li>
            <div className="divider"></div> 
            <li><a>Settings</a></li>
            <li><a>Settings2</a></li>
            <li><a>Settings3</a></li>
            <li><a>Settings4</a></li>
            <div className="divider"></div> 
            <li><a>Logout</a></li>
          </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar