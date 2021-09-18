// General & Hooks Imports
import React, { useEffect, useState } from "react";
import "./Styles/Chats.css";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router";
//Component Imports
import ChatBody from "./ChatBody";
//Miscellaneous Imports
import db, { auth } from "../firebase";
import Avatar from "react-avatar";

function Chats() {
  //States
  const [rooms, setRooms] = useState([]);

  //Hooks
  const { roomID } = useParams();
  const history = useHistory();

  //User logout hook
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        history.push("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Get all rooms hook
  useEffect(() => {
    let isMounted = true;
    async function fetchRooms() {
      if (isMounted) {
        if (true) {
          db.collection("rooms").onSnapshot((querySnapshot) => {
            setRooms(
              querySnapshot.docs.map((doc) => ({
                id: doc?.id,
                data: doc.data(),
              }))
            );
          });
        }
      }
    }
    fetchRooms();
    return function cleanup() {
      isMounted = false;
    };
  }, []);

  return (
    <div className="chats_group">
      <div className="left_chat">
        {rooms &&
          rooms.map((item) => (
            <Link
              style={{
                textDecoration: "none",
                color: "#352549",
              }}
              to={`/homepage/rooms/${item?.id}`}
            >
              <div key={item?.id} className="left_chat_ind">
                <Avatar
                  name={item?.data?.roomName}
                  size="38"
                  textSizeRatio={1.75}
                  round="20px"
                />
                <h5> {item?.data?.roomName} </h5>
              </div>
            </Link>
          ))}
      </div>
      <div className="right_chat">
        {!roomID ? (
          <div className="right_chat_logo">
            <img
              src="https://i.ibb.co/Pr2y3FL/61fb2e7aca0c9e8b9e7bde5db155d538.png"
              alt=""
            />
          </div>
        ) : (
          <ChatBody />
        )}
      </div>
    </div>
  );
}

export default Chats;
