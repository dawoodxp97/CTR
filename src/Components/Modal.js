import React from "react";
import "./Styles/Modal.css";
import CloseIcon from "@material-ui/icons/Close";
function Modal(props) {
  const { closeModal } = props;

  return (
    <div className="modal_overlay">
      <div className="modal_content">
        {<CloseIcon className="modal_close" onClick={closeModal} />}
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
