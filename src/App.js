// General & Hooks Imports

import React, { useEffect, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { ClipLoader } from "react-spinners";

//Components Imports

const Chats = lazy(() => import("./Components/Chats"));
const Header = lazy(() => import("./Components/Header"));
const Login = lazy(() => import("./Components/Login"));
const Sidebar = lazy(() => import("./Components/Sidebar"));
const Signup = lazy(() => import("./Components/Signup"));
const Profile = lazy(() => import("./Components/Profile"));

function App() {
  //Context API
  const [, dispatch] = useStateValue();

  // Get logged in user Details hook
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Router>
        <Suspense
          fallback={
            <div className="load">
              <ClipLoader color="white" loading={true} size={120} />
            </div>
          }
        >
          <Switch>
            <Route path="/profile">
              <Sidebar />
              <Profile />
            </Route>
            <Route path="/homepage/rooms/:roomID">
              <Header />
              <Sidebar />
              <Chats />
            </Route>
            <Route path="/homepage">
              <Header />
              <Sidebar />
              <Chats />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}
export default App;
