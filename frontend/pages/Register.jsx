import React, { useState } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isExists, setIsExists] = useState(false);
  const [isSuc, setIsSuc] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const status = await axios.post(`${baseURL}/register`, {
        name,
        email,
        password,
      });

      if (status.data.status) {
        setIsSuc(true);
        setIsExists(false); // Reset the error state if registration is successful
      }
    } catch (err) {
      if (err.response && err.response.data && !err.response.data.status) {
        setIsExists(true);
        setIsSuc(false); // Reset the success state if user already exists
      } else {
        // Handle other errors
        console.error("Error:", err);
        setIsSuc(false);
        setIsExists(false);
      }
    }
  };

  return (
    <div className="login-page-cont">
      {isSuc ? <div className="u-success">Successfully Registered</div> : ""}
      
      <h3>Create an account</h3>
      <form onSubmit={handleRegister}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {isExists ? <span className="u-exists">User Already Exists</span> : ""}

        <label htmlFor="passwd">Password</label>
        <input
          type="password"
          name="passwd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register Now!</button>
      </form>
      <div className="login-link">
        <span>or</span>
        <p>
          Already a user? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
