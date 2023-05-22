import React from "react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SongsPage from "./pages/SongsPage"
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <div>
      <NavBar />
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      {/* main body */}
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/songs" element={<SongsPage />} />
        </Routes>
      </div>
    </div>
  );
}


export default App;
