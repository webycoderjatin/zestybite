import React from 'react';
import { FaUserAlt } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";
import { IoMdPin } from "react-icons/io";
import { FaCreditCard } from "react-icons/fa";
import { RiShutDownLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

const DashBoardSideBar = () => {
  return (
    <div className='dash-side'>
      <ul>
        <Link to="/dashboard/userInfo"><li><FaUserAlt /> User Details</li></Link>
        <Link to="/dashboard/orders"><li><FaBoxArchive /> Orders</li></Link>
        <Link to=""><li><IoMdPin /> Saved Addresses</li></Link>
        <Link to=""><li><FaCreditCard /> Payment Methods</li></Link>
        <button><RiShutDownLine /> Log Out</button>
      </ul>
    </div>
  );
}

export default DashBoardSideBar;
