import React from "react";

const Register = () => {
  return (
    <div className="login-page-cont">
      <h3>Create an account</h3>
      <form action="">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" />

        <label htmlFor="email">Email</label>
        <input type="text" name="email" />

        <label htmlFor="passwd">Password</label>
        <input type="password" name="passwd" />

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
