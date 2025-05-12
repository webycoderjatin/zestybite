import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import axios from 'axios'
import getUserInfoFromId from "../getUserInfoFromId";

const baseURL = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const [isLogIn , setIsLogIn] = useState(false)
  const [user , setUser] = useState("")

  const checkAuth = async () => {
      await axios
        .get(`${baseURL}/check-auth`, { withCredentials: true })
        .then(async (response) => {
          setIsLogIn(true)
          setUser(await getUserInfoFromId(response.data.user.id))
        })
        .catch((err) => {
          setIsLogIn(false)
          setUser("")
        });
    };

    useEffect(() => {
      checkAuth()
    }, []);

  return (
    <div className="navbar">
      <div className="link-cont">
        <div className="logo-cont">
          <img src={logo} alt="" height={40} />
          <h3>ZestyBites</h3>
        </div>

        <ul>
            <a href=""><li>Home</li></a>
            <a href="/"><li>Menu</li></a>
            <a href=""><li>About</li></a>
            <a href=""><li>Contact</li></a>
            <a href=""><li className="cart"><FaCartShopping className="icon-cart"/> <span className="cart-num">0</span> </li></a>
            <a href=""><div className="profile-cont">{user ? user.name[0] : ""}</div></a>
        </ul>
      </div>
      
      {!isLogIn && <button>Login / Sign Up</button>}
    </div>
  );
};

export default Navbar;
