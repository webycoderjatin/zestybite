import React, { useEffect, useState } from 'react';
import axios from 'axios'
import getUserInfoFromId from '../getUserInfoFromId';
const baseURL = import.meta.env.VITE_API_URL;

const UserInfo = () => {
    const [user , setUser] = useState("")

    const checkAuth = async () => {
    await axios
      .get(`${baseURL}/check-auth`, { withCredentials: true })
      .then(async (response) => {
        const userData = await getUserInfoFromId(response.data.user.id)
        setUser(userData)
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          console.log("Not authorized");
          navigate("/login") // if using react-router
        } else {
          setUser("")
        }
      });
  };

  useEffect(() => {
      checkAuth();
    }, []);

  return (
    <div className='u-info-cont'>
      <h3>Name : <span className='u-info'>{user ? user.name : ""}</span></h3>
      <h3>Email : <span className='u-info'>{user ? user.email : ""}</span></h3>
      <button>Edit Profile</button>
    </div>
  );
}

export default UserInfo;
