import React from "react";
import Home from "../pages/Home";
import Order from "../pages/Order";
import "../src/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import UserInfo from "../components/UserInfo";
import OrderDetails from "../components/OrderDetails";
import OrderSuccess from "../pages/OrderSuccess";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="userInfo" element={<UserInfo />} />
          <Route path="orders" element={<OrderDetails />} />
        </Route>
        <Route path='/order-success' element={<OrderSuccess/>}/>
      </Routes>
    </Router>
  );
};

export default App;
