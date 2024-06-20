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

const RoleDeleteModal = (props) => {

  return (
    <div>
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="formesss">
            <p>{"Are you sure you want to delete "+props.role.role}</p>
          <div className="modalButtons">
          <Button className="modalBtn" onClick={props.handleClose}>Cancel</Button>
            <Button className="modalBtn" onClick={(e)=>{
                e.preventDefault();
                props.handleDelete(props.role.id)
                props.handleClose();
            }}>Delete</Button>
            
          </div>
        </div>
      </Box>
    </Modal>
  </div>
  )
}

export default RoleDeleteModal