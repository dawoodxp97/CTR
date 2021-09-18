import React, { useState } from "react";
import "./Styles/Signup.css";
import Llogo from "./images/61fb2e7aca0c9e8b9e7bde5db155d538.png";
import { Tooltip } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function Signup() {
  const History = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const successNotify = (r) => {
    toast.success(r, { autoClose: 1500 });
  };
  const warnNotify = (r) => {
    toast.warn(r);
  };

  const signUp = (e) => {
    e.preventDefault();
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User Created
        if (userCredential) {
          successNotify(
            "Successfully Created your CTR account. Enjoy your CTR App"
          );
        }
      })
      .then(() => {
        const currUser = auth.currentUser;
        currUser.updateProfile({
          displayName: name,
        });
        setLoading(false);
        History.push("/homepage");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.code);
        warnNotify(error.message);
      });
  };
  return (
    <div className="signup">
      {loading && (
        <div className="load">
          <ClipLoader color="#ffffff" loading={loading} size={110} />
        </div>
      )}
      <div className="logo">
        <img alt="" src={Llogo} />
        <div className="logo_title">
          <h1>C T R</h1>
          <Tooltip
            title="The term CTR is the English expressions for gossiping or making friendly small talk, or a long and informal conversation with someone."
            placement="right"
            arrow
          >
            <h4>(Chew the Rag)</h4>
          </Tooltip>
          <p>
            <strong>CTR-App</strong> is a Fully Functional Real-Time Messaging
            App Capable of Group Messaging.
          </p>
        </div>
      </div>
      <div className="signup_details">
        <div className="signup_form_group">
          <form onSubmit={signUp} className="signup_form">
            <h1>Sign-Up</h1>
            <h5>User Name</h5>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value.trimStart())}
              className="signup_form_input"
            />
            <h5>E-mail</h5>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value.trimStart())}
              className="signup_form_input"
            />

            <h5>Password</h5>
            <input
              type="password"
              className="signup_form_input"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value.trimStart())}
            />
            <button type="submit" className="signUpButton">
              Sign Up
            </button>
            <p>
              Already have account ? -{" "}
              <Link
                style={{
                  textDecoration: "none",
                  color: "#ff9900",
                }}
                to="/"
              >
                {" "}
                Sign-In{" "}
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
