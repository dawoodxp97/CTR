import React, { useState, useRef } from "react";
import { useStateValue } from "../StateProvider";
import "./Styles/Profile.css";
import Avatar from "react-avatar";
import { storage, auth } from "../firebase";
function Profile() {
  const [{ user }] = useStateValue();
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);

  const handleUpload = () => {
    setStatus(true);
    let bucketName = "images";
    let storageRef = storage.ref(`${bucketName}/${file.name}`);
    storageRef.put(file).then((snapshot) => {
      //Uploaded a blob or file!
      let bucketRef = storage.ref();
      bucketRef
        .child("images/" + file.name)
        .getDownloadURL()
        .then((url) => {
          const currUser = auth.currentUser;
          currUser
            .updateProfile({
              photoURL: url,
            })
            .then(() => {
              //upload success
              setStatus(false);
            })
            .catch((error) => {
              // An error occurred
              console.log(error);
            });
        });
    });
  };

  return (
    <div className="profile">
      <div className="profile_details_grp">
        <div className="child_grp">
          <div className="profile_details_grp_child1">
            {!user?.photoURL ? (
              <Avatar
                name={user?.displayName}
                size="150"
                textSizeRatio={1.75}
                round="20px"
              />
            ) : (
              <img src={user?.photoURL} alt=""></img>
            )}
          </div>
          <div className="profile_details_grp_child2">
            <p>Your Username : {user?.displayName}</p>
            <p>Your Email : {user?.email}</p>
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpload();
                }}
              >
                <input
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  required
                />
                <button className="upload_btn" disabled={status}>
                  {status ? "Uploading..." : "Upload"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
