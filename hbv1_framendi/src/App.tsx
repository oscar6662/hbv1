import { Routes, Route, Outlet, Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.scss";
import { useSelector } from "react-redux";
import { fetchUser, authSelector } from "./stores/auth.slice";

import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import Register from "./pages/register/Register";
import { useEffect } from "react";
import { useAppDispatch } from "./stores/mainStore";

function App() {
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
/*
  const { isLoggedIn } = useSelector(authSelector);
  console.log();
  */
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
