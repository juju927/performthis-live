import React from 'react'
import { NavLink } from 'react-router-dom'

import pfp from '../images/pfp.jpg'

const NavBar = () => {

// tailwind css
const LightLink = "block py-2 pl-3 pr-4 text-black bg-transparent rounded hover:text-indigo-400 md:p-0 "
const DarkLink = "dark:text-white md:dark:hover:text-indigo-400 "
const ActiveLightLink = "aria-[current=page]:text-indigo-400 "
const ActiveDarkLink = "aria-[current=page]:dark:text-indigo-400 aria-[current=page]:dark:underline aria-[current=page]:dark:decoration-indigo-400 aria-[current=page]:dark:underline-offset-8 aria-[current=page]:dark:decoration-2"


  return (
    <>
      <nav className="bg-black border-gray-200 dark:bg-zinc-950">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>

          <NavLink to="/" className="flex items-center">
              {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" /> */}
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Qriku</span>
          </NavLink>

          <div className="flex items-center md:order-2">
            <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom-end">
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src={pfp} alt="user photo" />
            </button>
          
          <div className="z-50 hidden my-4 min-w-[150px] text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-indigo-950 dark:divide-gray-600" id="user-dropdown">
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">Joanna Banana</span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-300">@jojobu</span>
            </div>

            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a href="#" className="block px-4 py-2 bg-white text-sm text-gray-700 hover:bg-zinc-100 dark:bg-indigo-950 dark:hover:bg-zinc-600 dark:text-gray-200 dark:hover:text-white">Profile</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 bg-white text-sm text-gray-700 hover:bg-zinc-100 dark:bg-indigo-950 dark:hover:bg-zinc-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
              </li>
              <li>
                <span className="block px-4 py-2 bg-white text-sm text-gray-700 hover:bg-zinc-100 dark:bg-indigo-950 dark:hover:bg-zinc-600 dark:text-gray-200 dark:hover:text-white">Dark Mode</span>
              </li>
            </ul>
            <ul className="py-2">
              <li>
                <a href="#" className="block px-4 py-2 bg-white text-sm text-gray-700 hover:bg-zinc-100 dark:bg-indigo-950 dark:hover:bg-zinc-600 dark:text-gray-200 dark:hover:text-white">Log out</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-black dark:bg-gray-800 md:dark:bg-zinc-950 dark:border-gray-700">
            <li>
              <NavLink to="/" className={LightLink + DarkLink + ActiveLightLink + ActiveDarkLink} aria-current="page">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/songs" className={LightLink + DarkLink + ActiveLightLink + ActiveDarkLink}>Songs</NavLink>
            </li>
            <li>
              <a href="#" className={LightLink + DarkLink + ActiveLightLink + ActiveDarkLink}>Playlists</a>
            </li>
            <li>
              <a href="#" className={LightLink + DarkLink + ActiveLightLink + ActiveDarkLink}>Live</a>
            </li>
          </ul>
        </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar