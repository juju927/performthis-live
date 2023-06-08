import React, { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { fetchData } from "../../helpers/common";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/user";

const FrontPage = (props) => {
  const userDetails = useContext(UserContext);
  const navigate = useNavigate()
  const [form, setForm] = useState("register");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPerformer, setIsPerformer] = useState(false);

  

  const login = async () => {
    const { ok, data } = await fetchData("auth/login/", undefined, "POST", {
      username: username,
      password: password,
    });

    if (ok) {
      userDetails.setToucan(data.data.token);
      console.log(data.data.token)
      localStorage.setItem("toucan", data.data.token)
      navigate("/songs")
    } else {
      console.log(data);
    }
  };

  const register = async () => {
    const { ok, data } = await fetchData("/auth/register/", undefined, "POST", {
      email: email,
      username: username,
      password: password,
      is_performer: isPerformer,
    });

    if (ok) {
      login();
    } else {
      console.log(data);
    }
  };

  const handleClick = () => {
    if (form == "register") {
      register();
    } else {
      login();
    }
  };
  
  useEffect(()=> {
    if (userDetails.toucan) {
      navigate("/songs")
    }
  })

  return (
    <div className="w-screen h-screen">
      <div className="m-auto w-96 text-lg font-bold m-auto text-center pt-8">
        Join the Q!
      </div>

      <div className="m-auto w-full max-w-xs">
        <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {form == "register" && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded bg-base-200 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  value={email}
                  id="email"
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  className="inline-block text-sm font-bold mb-2"
                  htmlFor="isPerformer"
                >
                  Joining as a performer
                </label>
                <input
                  className="shadow appearance-none border rounded bg-base-200 mx-3 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  checked={isPerformer}
                  id="isPerformer"
                  type="checkbox"
                  placeholder="isPerformer"
                  onChange={(e) => setIsPerformer(e.target.checked)}
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded bg-base-200 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              id="username"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded bg-base-200 w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-secondary hover:bg-secondary-focus font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleClick}
            >
              {form == "register" ? "Register" : "Log in"}
            </button>
          </div>
          <div className="flex mt-2 gap-2 text-sm text-italic">
            <div className="text-content">
              {form == "register" ? "Already a member?" : "Not on Qriku yet?"}
            </div>
            <div
              className="font-bold cursor-pointer hover:text-accent"
              onClick={() =>
                form == "register" ? setForm("login") : setForm("register")
              }
            >
              {form == "register" ? "Log in" : "Make an account"}
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};

export default FrontPage;
