import React, { useEffect } from "react";
import { fetchData } from "../helpers/common";
import { Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SongsPage from "./pages/SongsPage"
import DashboardPage from "./pages/DashboardPage";
import LivePage from "./pages/LivePage";

function App() {

  // const testConnect = async () => {
  //   const {ok, data} = await fetchData('/test/')

  //   if (ok) {
  //     console.log(data)
  //   } else {
  //     console.log(data)
  //   }
  // }

  // useEffect(()=>{
  //   testConnect()
  // }, [])


  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex-none">
        <NavBar />
      </div>
      <div className="max-w-screen-xl flex-grow flex mx-auto p-4">
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
