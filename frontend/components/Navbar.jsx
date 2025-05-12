import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import axios from "axios";
import getUserInfoFromId from "../getUserInfoFromId";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const baseURL = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const [isLogIn, setIsLogIn] = useState(false);
  const [user, setUser] = useState("");
  const [navbarOpen , setNavbarOpen] = useState(false)

  const checkAuth = async () => {
    await axios
      .get(`${baseURL}/check-auth`, { withCredentials: true })
      .then(async (response) => {
        setIsLogIn(true);
        setUser(await getUserInfoFromId(response.data.user.id));
      })
      .catch((err) => {
        setIsLogIn(false);
        setUser("");
      });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  

  const handleNavHam = ()=>{
    if(navbarOpen){
      document.getElementById("navLinks").style.display = "none"
      setNavbarOpen(false)
    }else{
      document.getElementById("navLinks").style.display = "block"
      setNavbarOpen(true)
    }
  }

  return (
    <div className="navbar">
      <div className="link-cont">
        <div className="logo-cont">
          <img src={logo} alt="" height={40} />
          <h3>ZestyBites</h3>
        </div>

        <span className="nav-ham" id="navHam" onClick={()=>handleNavHam()}>{navbarOpen ? <IoMdClose /> :<GiHamburgerMenu />}</span>
        <ul id="navLinks">
          <a href="">
            <li>Home</li>
          </a>
          <a href="/">
            <li>Menu</li>
          </a>
          <a href="/about">
            <li>About</li>
          </a>
          <a href="">
            <li>Contact</li>
          </a>
          <a href="">
            <li className="cart">
              <FaCartShopping className="icon-cart" />{" "}
              <span className="cart-num">0</span>{" "}
            </li>
          </a>
          <a href="">
            {user ? <div className="profile-cont"> {user.name[0]} </div> : ""}
          </a>
        </ul>
      </div>

    <div className="loginBtnCont">

      {!isLogIn && <a href="/register" ><button className="loginBtn">Login / Sign Up</button></a>}
    </div>
    </div>
  );
};

export default Navbar;
