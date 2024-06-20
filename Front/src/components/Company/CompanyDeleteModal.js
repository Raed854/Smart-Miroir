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

const CompanyDeleteModal = (props) => {
  return (
    <div>
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="form">
            <p>{"Are you sure you want to delete "+props.company.namecompany}</p>
          <div className="modalButtons">
            <Button className="modalBtn" onClick={(e)=>{
                e.preventDefault();
                props.handleDelete(props.company.id)
                props.handleClose();
            }}>Delete</Button>
            <Button className="modalBtn" onClick={props.handleClose}>Cancel</Button>
          </div>
        </div>
      </Box>
    </Modal>
  </div>
  )
}

export default CompanyDeleteModal