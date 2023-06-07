import React, { useState, useEffect } from "react";
import { fetchData } from "../helpers/common";
import { Route, Routes } from "react-router-dom";

import UserContext from "./context/user"

import NavBar from "./components/NavBar";
import FrontPage from "./pages/FrontPage";
import HomePage from "./pages/HomePage";
import SongsPage from "./pages/SongsPage"
import DashboardPage from "./pages/DashboardPage";
import LivePage from "./pages/LivePage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [toucan, setToucan] = useState("")

  return (
    <>
      <UserContext.Provider
      value={{toucan, setToucan}}>
        <div className="w-screen h-screen">
          { !loggedIn && <FrontPage setLoggedIn={setLoggedIn}/>}

          { loggedIn && (
            <>
              <NavBar />
              {/* not sure how to set height here */}
              <div className="max-w-screen-xl overflow-auto mx-auto"> 
              {/* main body */}
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/songs" element={<SongsPage />} />
                  <Route path="/live" element={<LivePage />} />
                </Routes>
              </div>
            </>
          )}
        </div>
      </UserContext.Provider>

    </>
  );
}


export default App;
