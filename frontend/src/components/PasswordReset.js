import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // onchange
  const setVal = (e) => {
    setEmail(e.target.value);
  };

  const sendLink = async (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error(`Email is required`, {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.warning(`includes @ in your email`, {
        position: "top-center",
      });
    } else {
      //  api call
      const res = await fetch(`/sendpasswordlink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.status === 201) {
        setEmail("");
        setMessage(true);
      } else {
        toast.error("Invalid User", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Enter Your Email</h1>
          </div>

          {message ? (
            <p style={{ color: "green" }}>
              Password reset link send successfully in your email
            </p>
          ) : (
            ""
          )}

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={setVal}
              />
            </div>

            <button className="btn" onClick={sendLink}>
              Send
            </button>
          </form>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default PasswordReset;
