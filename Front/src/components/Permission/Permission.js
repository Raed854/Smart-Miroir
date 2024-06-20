import React, {  useEffect, useState } from 'react'
import "./permission.css"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from 'axios';


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    border: "2px solid black",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

const Permission = (props) => {



  const [autorisatione,setAutorisatione] = useState("0000000000")

  
  useEffect(() => {
    if(props.permission && props.permission[0]){
      setAutorisatione(props?.permission[0]?.
        autorisation
        )
    }
  },[props]);



  var body={ 
  "user":props.user.id,
  "autorisation": autorisatione,
  "date_debut": "2024-06-08",
  "date_fin": "2024-06-10"
}



  const changeCharAtIndex = (index) => {
    var newChar = "1";
    if (autorisatione[index] =="0")
      newChar="1";
    else
      newChar="0";
    setAutorisatione(autorisatione.substring(0, index) + newChar + autorisatione.substring(index + 1));
    console.log(autorisatione);
  }

  const handlePermissions = (ch) => {
    if(ch==="1")
      return true;
    else
      return false;
  };



  const handleUpdate = async (id)=>{
    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
      const url = `${API_BASE_URL}/update_user_autorisation/${id}/`;
  
      await axios.put(url, body);
    } catch (error) {
      throw error 
    }
  }

 


  return (
<div>
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="formes">
            <div className='permissions-form'>
                <div className='form-lefts'>
                <img className="img_tip_lefts" src={props.user.imag} alt=''/>
                     <p className="fix_p">Starting Date</p>
                    <input type="date" placeholder="Date" className='calendar' />
                    <p className="fix_p">Final Date</p>
                    <input type="date" placeholder="Date" className='calendar' />
                </div>
                <div className='form-rights'>
                    <div className='form-right-lefts'>
                        <div className='ckbox'>
                            <input type="checkbox" className="custom-checkbox" checked={handlePermissions(autorisatione[0])}  onChange={()=>{changeCharAtIndex(0)}} />
                            <p className="fix_p">Show Users</p>
                        </div>
                        <div className='ckbox'>
                            <input type="checkbox" className="custom-checkbox" checked={handlePermissions(autorisatione[1])}  onChange={()=>{changeCharAtIndex(1)}} />
                            <p className="fix_p">Show Role</p>
                        </div>
                        <div className='ckbox'>
                            <input type="checkbox" className="custom-checkbox" checked={handlePermissions(autorisatione[2])}  onChange={()=>{changeCharAtIndex(2)}} />
                            <p className="fix_p">Show Unknown faces</p>
                        </div>
                        <div className='ckbox'>
                            <input type="checkbox" className="custom-checkbox" checked={handlePermissions(autorisatione[3])}  onChange={()=>{changeCharAtIndex(3)}} />
                            <p  className="fix_p"> Show Time Card</p>
                        </div>
                        <div className='ckbox'>
                            <input type="checkbox" className="custom-checkbox" checked={handlePermissions(autorisatione[4])}  onChange={()=>{changeCharAtIndex(4)}} />
                            <p className="fix_p">Show Satisfaction</p>
                        </div>
                    </div>
                    <div className='form-right-right'>
                        <div className='ckbox'>
                            <input type="checkbox" className="custom-checkbox" checked={handlePermissions(autorisatione[5])}  onChange={()=>{changeCharAtIndex(5)}} />
                            <p className="fix_p">Add Users</p>
                        </div>
                        <div className='ckbox'>
                            <input type="checkbox" className="custom-checkbox" checked={handlePermissions(autorisatione[6])}  onChange={()=>{changeCharAtIndex(6)}} />
                            <p className="fix_p"> Edit Users</p>
                        </div>
                        <div className='ckbox'>
                            <input type="checkbox" className="custom-checkbox" checked={handlePermissions(autorisatione[7])}  onChange={()=>{changeCharAtIndex(7)}} />
                            <p className="fix_p">Delete Users</p>
                        </div>
                        <div className='ckbox'>
                            <input type="checkbox" className="custom-checkbox" checked={handlePermissions(autorisatione[8])}  onChange={()=>{changeCharAtIndex(8)}} />
                            <p className="fix_p">Give Permission</p>
                        </div>
                        <div className='ckbox'>
                            <input type="checkbox" className="custom-checkbox" checked={handlePermissions(autorisatione[9])}  onChange={()=>{changeCharAtIndex(9)}} />
                            <p className="fix_p">Block Users</p>
                        </div>
                    </div>
                </div>
            </div>

          <div className="modalButtons">
            <Button className="modalBtn" onClick={props.handleClose}>Cancel</Button>
            <Button className="modalBtn" onClick={(e)=>{
              handleUpdate(props.user.id)
              props.handleClose();}} >Confirm</Button>
          </div>
        </div>
      </Box>
    </Modal>
  </div>

  )
}

export default Permission