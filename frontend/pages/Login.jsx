import React from "react";

const Login = () => {
  return (
    <div className="login-page-cont">
      <h3>Welcome Back! Please Login to Your Account</h3>
      <form action="">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" />

        <label htmlFor="passwd">Password</label>
        <input type="password" name="passwd" />

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
