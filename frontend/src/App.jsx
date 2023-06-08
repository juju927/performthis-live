import React, { useState, useEffect } from "react";
import { fetchData } from "../helpers/common";
import { Navigate, Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";

import UserContext from "./context/user";

import NavBar from "./components/NavBar";
import FrontPage from "./pages/FrontPage";
import HomePage from "./pages/HomePage";
import SongsPage from "./pages/SongsPage";
import DashboardPage from "./pages/DashboardPage";
import LivePage from "./pages/LivePage";
import LostPage from "./pages/LostPage";

function App() {
  const [toucan, setToucan] = useState(localStorage.getItem('toucan'));

  useEffect(()=> {
    setToucan(localStorage.getItem("toucan"))
  }, [])

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
                element={<FrontPage />}
              />

              <Route 
                path="/dashboard"
                element={
                  <Protected toucan={toucan}>
                    <DashboardPage />
                  </Protected>
                }
              />

              <Route
                path="/songs"
                element={
                  <Protected toucan={toucan} performerOnly={true}>
                    <SongsPage />
                  </Protected>
                }
              />
              <Route
                path="/live"
                element={
                  <Protected toucan={toucan} performerOnly={true}>
                    <LivePage />
                  </Protected>
                }
              />

              <Route path="/songs/:username" element={<SongsPage />} />
              <Route path="/live/:username" element={<LivePage />} />

              <Route path="*" element={<LostPage />} />
            </Routes>
          </div>
        </div>
      </UserContext.Provider>
    </>
  );
}

const Protected = (props) => {
  // if no token, navigate to login page
  if (!props.toucan) {
    return <Navigate to="/" replace={true} />;
  }

  const is_performer = jwt_decode(props.toucan).is_performer

  // if trying to access performer-only page,
  // but token belongs to non-performer
  // redirect to dashboard
  if (props.performerOnly) {
    if (!is_performer) {
      return <Navigate to="/dashboard" replace={true} />;
    } else {
      return props.children
    }
  } return props.children  
};

export default App;
