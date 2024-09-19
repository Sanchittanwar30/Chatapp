import React, { useState } from "react";
import "./Login.css";
import assets from "../../assets/assets";
import { signup, login } from "../../config/firebase";

const Login = () => {
  const [currState, setCurrState] = useState("Sign up");

  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currState === "Sign up") {
      signup(userName, email, password);
    } else {
      login(email, password);
    }
  };

  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currState}</h2>
        {currState === "Sign up" ? (
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={userName}
            type="text"
            placeholder="username"
            required
            className="form-input"
          />
        ) : null}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          required
          placeholder="Email Address"
          className="form-input"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          required
          placeholder="password"
          className="form-input"
        />
        <button type="submit">
          {currState === "Sign up" ? "Create Account" : "Login"}
        </button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className="login-forgot">
          {currState === "Sign up" ? (
            <p className="login-toggle">
              {" "}
              Already have an account{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          ) : (
            <p className="login-toggle">
              Create an account
              <span onClick={() => setCurrState("Sign up")}> Click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
