import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isExists, setIsExists] = useState(true);
  const [isSuc, setIsSuc] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate()


  const handleLogin = (e) => {
    let count = 2;
    
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", { email, password }, { withCredentials: true })
      .then((response) => {
        if (response.data.isSuccess) {
          setIsSuc(true);
          setIsExists(true);
          setIsInvalid(false);


          const counter = setInterval(() => {
            count -= 1;
          if(count==0){
            clearInterval(counter)
            console.log("Interval Cleared")
            navigate("/dashboard")
          }
          }, 1000);

        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data) {
          if (error.response.data.msg === "Invalid credentials") {
            setIsInvalid(true);
            setIsExists(true);
            setIsSuc(false);
          } else if (error.response.data.msg === "User not found") {
            setIsExists(false);
            setIsInvalid(false);
            setIsSuc(false);
          }
        }
      });
  };

  return (
    <div className="login-page-cont">
      {isSuc && <div className="log-suc">Logged in Successfully</div>}
      {!isExists && <div className="log-err">User Not Found</div>}
      {isInvalid && <div className="log-err">Invalid Credentials</div>}

      <h3>Welcome Back! Please Login to Your Account</h3>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="passwd">Password</label>
        <input
          type="password"
          name="passwd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login Now!</button>
      </form>
      <div className="reg-link">
        <span>or</span>
        <p>
          Create an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
