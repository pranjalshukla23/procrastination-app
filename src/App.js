import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import MainPage from "./MainPage";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://procrastination-social-api.onrender.com";
axios.defaults.withCredentials = true;
axios.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/user")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        if (location.pathname === "/") {
          navigate("/login");
        }
      });
  }, [location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
