import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);

  const [inputValue, setInputValue] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
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

  // handleClick
  const handleClick = async (e) => {
    e.preventDefault();
    const { fname, email, password, cpassword } = inputValue;

    // validation of input field
    if (fname === "") {
      // alert("Name is required!");
      toast.warning("name is required", {
        position: "top-center",
      });
    } else if (email === "") {
      // alert("Email is required!");
      toast.error("email is required", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      // alert("includes @ in your email");
      toast.warning("includes @ in your email", {
        position: "top-center",
      });
    } else if (password === "") {
      // alert("password is required");
      toast.error("password is required", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      // alert("password must be 6 char");
      toast.error("password must be 6 char", {
        position: "top-center",
      });
    } else if (cpassword === "") {
      // alert("cpassword is required");
      toast.error("cpassword is required", {
        position: "top-center",
      });
    } else if (cpassword.length < 6) {
      // alert("confirm password must be 6 char");
      toast.error("confirm password must be 6 char", {
        position: "top-center",
      });
    } else if (password !== cpassword) {
      // alert("pass and cpass not match");
      toast.error("pass and cpass not match", {
        position: "top-center",
      });
    } else {
      // console.log("user register successfull");
      const data = await fetch(`/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          email,
          password,
          cpassword,
        }),
      });

      const res = await data.json();

      if (res.status === 201) {
        // alert("Register successful!");
        toast.success("Registration successful", {
          position: "top-center",
        });
      }

      setInputValue({
        ...inputValue,
        fname: "",
        email: "",
        password: "",
        cpassword: "",
      });
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>

            <p style={{ textAlign: "center" }}>
              We are glad that you will be using Project Cloud to manage <br />
              your tasks! We hope that you will get like it.
            </p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                name="fname"
                value={inputValue.fname}
                onChange={handleChange}
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email Address"
                name="email"
                value={inputValue.email}
                onChange={handleChange}
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  placeholder="Enter Your password"
                  type={!toggle ? "password" : "text"}
                  name="password"
                  value={inputValue.password}
                  onChange={handleChange}
                />
                <div className="showpass" onClick={() => setToggle(!toggle)}>
                  {!toggle ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <div className="form_input">
              <label htmlFor="password">Confirm Password</label>
              <div className="two">
                <input
                  type={!toggle2 ? "password" : "text"}
                  name="cpassword"
                  value={inputValue.cpassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                />
                <div className="showpass" onClick={() => setToggle2(!toggle2)}>
                  {!toggle2 ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <button className="btn" onClick={handleClick}>
              Sign Up
            </button>
            <p>
              Already have an account? <NavLink to="/">Log In</NavLink>
            </p>
          </form>

          {/* react toastify */}
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default Register;
