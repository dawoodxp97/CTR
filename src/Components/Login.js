import React, { useState } from "react";
import "./Styles/Login.css";
import Llogo from "./images/61fb2e7aca0c9e8b9e7bde5db155d538.png";
import { Tooltip } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function Login() {
  //States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //Hooks
  const History = useHistory();

  //Toastify Functions
  const successNotify = (r) => {
    toast.success(r, { autoClose: 1500 });
  };
  const warnNotify = (r) => {
    toast.warn(r);
  };

  //Google Login
  const googleAuth = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        if (result) {
          History.push("/homepage");
        }
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
  };

  //Email Login
  const signIn = (e) => {
    e.preventDefault();
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        //Signed In
        History.push("/homepage");
        setLoading(false);
        successNotify("Signed In Successfully");
      })
      .catch((error) => {
        setPassword("");
        console.log(error.code);
        setLoading(false);
        warnNotify(error.message);
      });
  };

  return (
    <div className="login">
      {loading && (
        <div className="load">
          <ClipLoader color="#ffffff" loading={loading} size={110} />
        </div>
      )}
      <div className="login_logo">
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
      <div className="login_details">
        <div className="form_group">
          <form onSubmit={signIn} className="form">
            <h1>Sign-In</h1>
            <h5>E-mail</h5>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trimStart())}
              className="form_input"
              required
            />

            <h5>Password</h5>
            <input
              type="password"
              className="form_input"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value.trimStart())}
            />

            <button type="submit" className="signInButton">
              Sign In
            </button>
            <p>
              Don't have account ? -{" "}
              <Link
                style={{
                  textDecoration: "none",
                  color: "#ff9900",
                }}
                to="/signup"
              >
                {" "}
                Sign-Up{" "}
              </Link>{" "}
            </p>
            <h5
              style={{ cursor: "pointer" }}
              onClick={() => {
                setEmail("tester@test.in");
                setPassword("tester@12345");
              }}
            >
              Test Login
            </h5>
          </form>
        </div>
        <Tooltip title="Login with Google" arrow>
          <div onClick={googleAuth} className="google_logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/480px-Google_%22G%22_Logo.svg.png"
              alt=""
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

export default Login;
