import React from "react";
import "./Styles/Sidebar.css";
import Avatar from "react-avatar";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import PersonIcon from "@material-ui/icons/Person";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import { Tooltip, Badge } from "@material-ui/core";
import { auth } from "../firebase";
import { useHistory } from "react-router";
import { useStateValue } from "../StateProvider";

function Sidebar() {
  const History = useHistory();
  const [{ user }] = useStateValue();
  const handleSignOut = () => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        auth.signOut();
        History.push("/");
      }
    });
  };
  const pushHome = () => {
    History.push("/homepage");
  };
  const profilePush = () => {
    History.push("/profile");
  };
  return (
    <div className="sidebar">
      {!user?.photoURL ? (
        <Avatar
          name={user?.displayName}
          size="30"
          textSizeRatio={1.75}
          round="20px"
        />
      ) : (
        <img alt="" src={user?.photoURL} className="user_avatar" />
      )}

      <div className="user">
        <p>{user?.displayName}</p>
      </div>

      <Tooltip title="Chats" arrow>
        <div onClick={pushHome} className="icons">
          <Badge color="error" variant="dot">
            <ChatBubbleIcon />
          </Badge>
        </div>
      </Tooltip>

      <Tooltip title="Profile" arrow>
        <div onClick={profilePush} className="icons">
          <PersonIcon />
        </div>
      </Tooltip>
      <Tooltip title="Settings" arrow>
        <div className="icons">
          <SettingsApplicationsIcon />
        </div>
      </Tooltip>
      <div>
        <button className="signout_btn" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
