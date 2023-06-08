import React, { useState, useEffect } from "react";
import { fetchData } from "../helpers/common";
import { Navigate, Route, Routes } from "react-router-dom";

import UserContext from "./context/user";

import NavBar from "./components/NavBar";
import FrontPage from "./pages/FrontPage";
import HomePage from "./pages/HomePage";
import SongsPage from "./pages/SongsPage";
import DashboardPage from "./pages/DashboardPage";
import LivePage from "./pages/LivePage";
import LostPage from "./pages/LostPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [toucan, setToucan] = useState("");

  return (
    <>
      <UserContext.Provider value={{ toucan, setToucan }}>
        <div className="w-screen h-screen bg-base-200">
          <NavBar />
          {/* not sure how to set height here */}
          <div className="max-w-screen-xl overflow-auto mx-auto bg-transparent">
            {/* main body */}
            <Routes>
              <Route
                path="/"
                element={<FrontPage setLoggedIn={setLoggedIn} />}
              />

              <Route
                path="/songs"
                element={
                  <Protected loggedIn={loggedIn}>
                    <SongsPage />
                  </Protected>
                }
              />
              <Route
                path="/live"
                element={
                  <Protected loggedIn={loggedIn}>
                    <LivePage />
                  </Protected>
                }
              />

              <Route path="/songs/:username" element={<SongsPage />} />

              <Route path="*" element={<LostPage />} />
            </Routes>
          </div>
        </div>
      </UserContext.Provider>
    </>
  );
}

const Protected = (props) => {
  if (!props.loggedIn) {
    return <Navigate to="/" replace={true} />;
  }
  return props.children;
};

export default App;
