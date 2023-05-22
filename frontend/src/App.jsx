import React from "react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SongsPage from "./pages/SongsPage"

function App() {
  return (
    <div>
      <NavBar />
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      {/* main body */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/songs" element={<SongsPage />} />
        </Routes>
      </div>
    </div>
  );
}


export default App;
