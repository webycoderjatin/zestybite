import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getUserInfoFromId from "../getUserInfoFromId";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoardSideBar from "../components/DashBoardSideBar";
import { Outlet } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const checkAuth = async () => {
    await axios
      .get(`${baseURL}/check-auth`, { withCredentials: true })
      .then(async (response) => {
        const userData = await getUserInfoFromId(response.data.user.id);
        console.log(userData);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          console.log("Not authorized");
          navigate("/login"); // if using react-router
        } else {
          console.log(err);
        }
      });
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div className="dash-align">
      <DashBoardSideBar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
