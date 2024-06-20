import React, { useState } from "react";
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

const RoleUpdateModal = (props) => {
    const [role,setRole] = useState(props.role.role)
  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="formesss">
            <input
              type="text"
              placeholder="Role"
              className="textInputesss"
              value={role || ""}
              onChange={(e) => setRole(e.target.value)}
            />

            <div className="modalButtons">
            <Button className="modalBtn" onClick={props.handleCloseUpdate}>
                Cancel
              </Button>
              <Button
                className="modalBtn"
                onClick={(e) => {
                  e.preventDefault();
                  props.handleUpdate(props.role.id,{role:role});
                  props.handleCloseUpdate();
                }}
              >
                Update
              </Button>
             
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default RoleUpdateModal;
