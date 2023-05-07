import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [passShow, setPassShow] = useState(false);

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputValue(() => {
      return {
        ...inputValue,
        [name]: value,
      };
    });
  };

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = inputValue;

    if (email === "") {
      alert("Email is required!");
    } else if (!email.includes("@")) {
      alert("Includes @ in your email");
    } else if (password === "") {
      alert("password is required!");
    } else if (password.length < 6) {
      alert("Password must be 6 char");
    } else {
      console.log("User login successful");
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad you are back. Please login.</p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
                value={inputValue.email}
                onChange={handleChange}
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="Enter Your password"
                  value={inputValue.password}
                  onChange={handleChange}
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <button className="btn" onClick={handleSubmit}>
              Login
            </button>
            <p>
              Don't have an Account? <Link to="/register">Sign Up</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
