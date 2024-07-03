import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import icon from "../../assets/icon.png";
import Aboutauth from "./Aboutauth";
import { signup, login } from "../../action/auth";

const Auth = () => {
  const [issignup, setissignup] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert("Enter email and password");
    }
    if (issignup) {
      if (!name) {
        alert("Enter a name to continue");
      }
      dispatch(signup({ name, email, phoneNumber, password }, navigate));
    } else {
      dispatch(login({ email, password }, navigate));
    }
  };

  const handleswitch = () => {
    setissignup(!issignup);
    setname("");
    setemail("");
    setpassword("");
    setPhoneNumber("");
  };

  return (
    <section className="auth-section">
      {issignup && <Aboutauth />}
      <div className="auth-container-2">
        <img src={icon} alt="icon" className="login-logo" />
        <form onSubmit={handlesubmit}>
          {issignup && (
            <>
              <label htmlFor="name">
                <h4>Display Name</h4>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!issignup && (
                <Link to="/choose">
                  <p
                    style={{
                      color: "#007ac6",
                      fontSize: "13px",
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
                  >
                    Forgot Password?
                  </p>
                </Link>
              )}
            </div>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          {issignup && (
            <>
              <label htmlFor="phoneNumber">
                <h4>Phone Number</h4>
              </label>
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </>
          )}
          <button type="submit" className="auth-btn">
            {issignup ? "Sign up" : "Log in"}
          </button>
        </form>
        <p>
          {issignup ? "Already have an account?" : "Don't have an account"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleswitch}
          >
            {issignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
