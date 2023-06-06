import React, { useEffect } from "react";
import { fetchData } from "../helpers/common";
import { Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SongsPage from "./pages/SongsPage"
import DashboardPage from "./pages/DashboardPage";
import LivePage from "./pages/LivePage";

function App() {



  return (
    <div className="w-screen h-screen">
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
    </div>
  );
}


export default App;
