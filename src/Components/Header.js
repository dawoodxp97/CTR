// General & Hooks Imports
import React, { useState } from "react";
import "./Styles/Header.css";
//Miscellaneous Imports
import AddIcon from "@material-ui/icons/Add";
import Modal from "./Modal";
import db from "../firebase";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [room, setRoom] = useState("");
  const addRoom = (e) => {
    e.preventDefault();
    setIsOpen(false);
    db.collection("rooms")
      .add({
        roomName: room,
      })
      .then((docRef) => {
        //Room created
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    setRoom("");
  };
  return (
    <div className="header">
      {isOpen && (
        <Modal closeModal={() => setIsOpen(false)}>
          {" "}
          <div className="create_room_grp">
            <h2> Create your Room</h2>
            <div className="create_room">
              <form onSubmit={addRoom}>
                <p>Room Name</p>
                <input
                  className="room_inp"
                  type="text"
                  onChange={(e) => setRoom(e.target.value.trimStart())}
                  required
                  value={room}
                  name="msg"
                />
                <input className="modal_submit" type="submit" />
              </form>
            </div>
          </div>
        </Modal>
      )}
      <div className="header_left">
        <h3>Chats</h3>
        <AddIcon onClick={() => setIsOpen(true)} />
      </div>
    </div>
  );
}

export default Header;
