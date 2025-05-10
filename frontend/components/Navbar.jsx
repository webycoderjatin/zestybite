import React from "react";
import logo from "../assets/logo.png";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="link-cont">
        <div className="logo-cont">
          <img src={logo} alt="" height={40} />
          <h3>ZestyBites</h3>
        </div>

        <ul>
            <a href=""><li>Home</li></a>
            <a href=""><li>Menu</li></a>
            <a href=""><li>About</li></a>
            <a href=""><li>Contact</li></a>
            <a href=""><li className="cart"><FaCartShopping className="icon-cart"/> <span className="cart-num">0</span> </li></a>
        </ul>
      </div>
      <button>Login / Sign Up</button>
    </div>
  );
};

export default Navbar;
