// General & Hooks Imports
import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
//Components Imports
import Chats from "./Components/Chats";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Sidebar from "./Components/Sidebar";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";

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
      </Router>
    </div>
  );
}
export default App;
