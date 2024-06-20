import React from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid black",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

const DeleteModal = (props) => {

  return (
    <div>
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="formes">
            <p>{"Are you sure you want to delete "+props.user.first_name+" "+props.user.last_name}</p>
          <div className="modalButtons">
          <Button className="modalBtn" onClick={props.handleClose}>Cancel</Button>
            <Button className="modalBtn" onClick={(e)=>{
                e.preventDefault();
                props.handleDelete(props.user.id)
                props.handleClose();
            }}>Delete</Button>
            
          </div>
        </div>
      </Box>
    </Modal>
  </div>
  )
}

export default DeleteModal