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


const CompanyUpdateModal = (props) => {
    const [company,setCompany] = useState(props.company.namecompany)

  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="form">
            <input
              type="text"
              placeholder="Role"
              className="textInputs"
              value={company || ""}
              onChange={(e) => setCompany(e.target.value)}
            />

            <div className="modalButtons">
            <Button className="modalBtn" onClick={props.handleCloseUpdate}>
                Cancel
              </Button>
              <Button
                className="modalBtn"
                onClick={(e) => {
                  e.preventDefault();
                  props.handleUpdate(props.company.id,{namecompany:company});
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
  )
}

export default CompanyUpdateModal