import React, { useEffect, useState } from 'react';
import "./oneUser.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faKey, faLock , faLockOpen , faPaperPlane, faPen , faTrash} from '@fortawesome/free-solid-svg-icons';
import UpdateModal from '../OverView/UpdateModal';
import axios from 'axios';
import DeleteModal from '../OverView/DeleteModal';
import { useNavigate } from 'react-router-dom';
import Permission from '../Permission/Permission';
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

const OneUser = (props) => {
  const [details,setDetails] = useState({});
  const [permission, setPermission] = useState([]);
  const [block,setBlocked] = useState(props.user.is_active);
  const [openDelete,setOpenDelete] = useState(false);
  const [openPermission,setOpenPermission] = useState(false);
  const [open, setOpen] = useState(false);
  const [oneUserreload, setOneUserReload] = useState(false);
  const [emailSent, setEmailSent] = useState(false); // State variable for controlling email sent modal

  const navigate = useNavigate();

  const handleOpenPermission = () => setOpenPermission(true);
  const handleClosePermission = () => {
    setOneUserReload(!oneUserreload);
    setOpenPermission(false);
  };
  const handleOpenUpdate = () => setOpen(true);
  const handleCloseUpdate = () => setOpen(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const fetchPermission = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user_autorisation/${id}/`);
      setPermission(response.data);
    } catch (error) {
      throw error;
    }
  };
  
  const handleUpdate = async (id, body) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/users/${id}/edit/`, body);
      props.setReload(!props.relaod);
      setOneUserReload(!oneUserreload);
      props.fetchUsers();
    } catch (error) {
      throw error;
    }
  };
  
  const handleDetails = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user_role_company/${id}/`);
      props.setReload(!props.relaod);
      props.fetchUsers();
      setDetails(response.data[0]);
      props.setReload();
    } catch (error) {
      throw error;
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/users/${id}/delete/`);
      setOneUserReload(!oneUserreload);
      props.refetch();
    } catch (error) {
      throw error;
    }
  };
  
  const handleBlockUser = async (id, body) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/users/${id}/edit/`, body);
      setBlocked(body.is_active);
      setOneUserReload(!oneUserreload);
      props.refetch();
    } catch (error) {
      throw error;
    }
  };
  
  const handleUpdateRole = async (id, body) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/user_role_company/update/${id}/`, body);
      props.setReload(!props.relaod);
    } catch (error) {
      throw error;
    }
  };
  
  const handleSendEmail = async (id) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/send-email/${id}/`);
      props.setReload(!props.relaod);
      setEmailSent(true); // Set state to true when email is sent
    } catch (error) {
      throw error;
    }
  };

  useEffect(()=>{
    fetchPermission(props.user.id);
    handleDetails(props.user.id);
  },[oneUserreload,props.reload]);

  return (
    <tr className="oneTip">
      <td>
        <img className="img_tip" src={props.user.imag} alt=''/>
      </td>
      <td>
        <h6>{props.user.first_name+" "+props.user.last_name}</h6>
      </td>
      <td>
        <h6>{props.user.email}</h6>
      </td>
      <td>
        <label className="date_tip">
          <h6> {details?.role}</h6>
        </label>
      </td>
      <td>
        <label className="date_tip">
          <h6>{details?.company}</h6>
        </label>
      </td>
      <td>
    {( props.user.is_active && true )?
   
      <FontAwesomeIcon icon={faLockOpen} className='lock' onClick={()=>{handleBlockUser(props.user.id,{is_active:!block})}}/>  :
      <FontAwesomeIcon icon={faLock} className='lock' style={{color:"red"}} onClick={()=>{handleBlockUser(props.user.id,{is_active:!block})}} />
}
  </td>


      
      <td className='buttons' >
      {parseInt(sessionStorage.getItem('auth')[7], 10) !== 0 && 
        (<FontAwesomeIcon icon={faTrash} className='lock'  onClick={handleOpenDelete}  />)}
      </td>
      <td className='buttons' >
      {parseInt(sessionStorage.getItem('auth')[6], 10) !== 0 &&  
        (<FontAwesomeIcon icon={faPen} className='lock'   onClick={handleOpenUpdate} />)}
      </td>
      <td className='buttons' >
      {parseInt(sessionStorage.getItem('auth')[8], 10) !== 0 && 
        (<FontAwesomeIcon icon={faKey} className='lock' onClick={(e)=>{
          e.preventDefault();
          handleOpenPermission();
        }}/>)}
      </td>
      <td className='buttons' >
      {parseInt(sessionStorage.getItem('auth')[8], 10) !== 0 && 
        (<FontAwesomeIcon icon={faPaperPlane} className='lock'  onClick={(e)=>{
          e.preventDefault();
          handleSendEmail(props.user.id);
        }} />)}
      </td>

      {/* Email Sent Popup */}
      <Modal
        open={emailSent}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="formes">
            <p className="successMessage">Email sent successfully!</p>
            <div className="modalButtonses">
              <Button className="modalBtn" onClick={() => setEmailSent(false)}>OK</Button>
            </div>
          </div>
        </Box>
      </Modal>
      {parseInt(sessionStorage.getItem('auth')[7], 10) !== 0 && 
      (<UpdateModal open={open} handleCloseUpdate={handleCloseUpdate} user={props.user}  handleUpdate={handleUpdate}
        handleUpdateRole={handleUpdateRole} 
        handleReload={()=>{setOneUserReload(!oneUserreload)}}
      />)}
       {parseInt(sessionStorage.getItem('auth')[7], 10) !== 0 && 
      (<DeleteModal open={openDelete} handleClose={handleCloseDelete} user={props.user} handleDelete={handleDelete}
       handleReload={()=>{setOneUserReload(!oneUserreload)}} />)}
        {parseInt(sessionStorage.getItem('auth')[8], 10) !== 0 && 
        (<Permission open={openPermission} handleClose={handleClosePermission} user={props.user} permission={permission} />)}
      
    </tr>
  );
};

export default OneUser;
