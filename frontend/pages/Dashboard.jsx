import React, { useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const checkAuth = () => {
    axios
      .post("http://localhost:5000/check-auth", {}, { withCredentials: true })

      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          console.log("Not authorized");
          navigate("/login") // if using react-router
        } else {
          console.log(err);
        }
      });
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return <div></div>;
};

export default Dashboard;
