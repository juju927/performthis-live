import React from "react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";


import HomePage from "./pages/HomePage";
import SongsPage from "./pages/SongsPage"
import DashboardPage from "./pages/DashboardPage";
import LivePage from "./pages/LivePage";

function App() {
  return (
    <div>
      <NavBar />
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
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
