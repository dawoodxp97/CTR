//General & Hooks Imports
import React, { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import { useHistory, useParams } from "react-router";
//Material UI Imports
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
//Miscellaneous Imports
import timestamp from "time-stamp";
import Avatar from "react-avatar";
import db from "../firebase";
import Modal from "./Modal";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
function ChatBody() {
  //Context API
  const [{ user }] = useStateValue();

  //States
  const [input, setInput] = useState("");
  const [data, setData] = useState();
  const [roomData, setRoomData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [room, setRoom] = useState("");
  const [edit, setEdit] = useState("");

  //Hooks
  const history = useHistory();
  const { roomID } = useParams();

  //-->> Room Details hook
  useEffect(() => {
    let isMounted = true;
    async function fetchRoomDetails() {
      if (isMounted) {
        if (true) {
          db.collection("rooms")
            .doc(roomID)
            .onSnapshot((doc) => {
              if (doc.exists) {
                setRoomData({
                  id: doc.id,
                  data: doc.data(),
                });
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            });
        }
      }
    }
    fetchRoomDetails();
    return function cleanup() {
      isMounted = false;
    };
  }, [roomID]);

  //-->> Chat details hook
  useEffect(() => {
    let isMounted = true;
    async function fetchChat() {
      if (isMounted) {
        if (true) {
          db.collection("rooms")
            .doc(roomID)
            .collection("chat")
            .orderBy("ts", "asc")
            .onSnapshot((querySnapshot) => {
              setData(
                querySnapshot.docs.map((doc) => ({
                  id: doc?.id,
                  data: doc.data(),
                }))
              );
            });
        }
      }
    }
    fetchChat();
    return function cleanup() {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomID]);

  useEffect(() => {
    scrollBottom();
  }, [data]);

  //Function to send Chat message
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms")
      .doc(roomID)
      .collection("chat")
      .add({
        message: input,
        userName: user?.displayName,
        timeStamp: timestamp("HH:mm - YYYY/MM/DD"),
        ts: timestamp("YYYYMMDDHHmmssms"),
      })
      .then((docRef) => {
        //Message Created
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    setInput("");
  };

  //Function to Edit the Room Name
  const editRoom = (e) => {
    e.preventDefault();
    setIsOpen(false);
    db.collection("rooms").doc(roomData?.id).update({
      roomName: room,
    });
    setRoom("");
  };

  //Function to delete the Room
  const deleteRoom = (e) => {
    e.preventDefault();
    db.collection("rooms")
      .doc(roomData?.id)
      .delete()
      .then(() => {
        //Document successfully deleted!
        history.push("/homepage");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  //Function to Scroll Bottom
  const scrollBottom = () => {
    setTimeout(() => {
      var chatsBody = document.getElementById("chat_b");
      chatsBody.scrollTop = chatsBody.scrollHeight;
    }, 0);
  };

  return (
    <div className="chat_body_grp">
      {isOpen && (
        <Modal closeModal={() => setIsOpen(false)}>
          {" "}
          <div className="create_room_grp">
            <h2> Edit your Room</h2>
            <div className="create_room">
              <form onSubmit={editRoom}>
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
      <div className="header_right">
        <div className="header_user">
          <div className="header_user_item1">
            <Avatar
              name={roomData?.data?.roomName}
              size="40"
              textSizeRatio={1.75}
              round="20px"
            />
            <h5>{roomData?.data?.roomName}</h5>
          </div>
          <div className="header_user_item2">
            <DeleteIcon onClick={deleteRoom} />
            <EditIcon
              onClick={() => {
                setRoom(roomData?.data.roomName);
                setIsOpen(true);
              }}
            />
          </div>
        </div>
      </div>
      <div id="chat_b" className="chat_body">
        {data?.map((message) => (
          <p
            key={message?.id}
            className={`chat_message ${
              message?.data?.userName === user?.displayName &&
              "chat_message_reciever"
            }`}
          >
            <span className="chat_name">{message?.data?.userName}</span>
            {message?.data?.userName === user?.displayName ? (
              <EditText
                name="textbox"
                style={{
                  width: "auto",
                  fontSize: "16px",
                  borderRadius: "0.5rem",
                  backgroundColor: "#cad0ff",
                }}
                onChange={setEdit}
                onSave={({ value }) => {
                  db.collection("rooms")
                    .doc(roomID)
                    .collection("chat")
                    .doc(message?.id)
                    .update({
                      message: value,
                    });
                }}
                defaultValue={message?.data.message}
              />
            ) : (
              message?.data.message
            )}

            <span className="chat_timestamp">
              {" "}
              {message?.data?.timeStamp}{" "}
              {message?.data?.userName === user?.displayName ? (
                <DeleteIcon
                  onClick={() => {
                    db.collection("rooms")
                      .doc(roomID)
                      .collection("chat")
                      .doc(message?.id)
                      .delete()
                      .then(() => {
                        //deleted
                      })
                      .catch((err) => console.log(err));
                  }}
                />
              ) : (
                ""
              )}{" "}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <div className="chat_footer_2">
          <form onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value.trimStart())}
              placeholder="Type your Message"
              className="chat_input"
              type="text"
              name="name"
              required
            />
            <button type="submit"></button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatBody;
