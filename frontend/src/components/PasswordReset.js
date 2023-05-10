import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  // onchange
  const setVal = (e) => {
    setEmail(e.target.value);
  };

  const sendLink = async (e) => {
    e.preventDefault();

    //  api call
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Enter Your Email</h1>
          </div>

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
