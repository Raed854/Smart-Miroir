import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey,faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import RoleDeleteModal from "./RoleDeleteModal";
import axios from "axios";
import RoleUpdateModal from "./RoleUpdateModal";
import Permission_Role from "../Permission_Role/Permission_Role";
const OneRole = (props) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpenUpdate = () => setOpen(true);
  const handleCloseUpdate = () => setOpen(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const [openPermission_Role,setOpenPermission_Role] = useState(false)
  const handleOpenPermission_Role = () => setOpenPermission_Role(true)
  const handleClosePermission_Role = () => {
    
    setOpenPermission_Role(false)}
    const handleDelete = async (id) => {
      try {
        console.log(id);
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/roles/${id}/delete/`);
        props.setReload(!props.relaod);
        props.fetchRoles();
      } catch (error) {
        throw error;
      }
    };
    
    const handleUpdate = async (id, body) => {
      try {
        console.log(id);
        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/roles/${id}/`, body);
        props.setReload(!props.relaod);
        props.fetchRoles();
      } catch (error) {
        throw error;
      }
    };
     return (
    <tr className="oneTip">
      <td>
      <label className="date_tip">{props.role?.role}</label>
      </td>
      <td className='buttons' >
     
     <FontAwesomeIcon icon={faKey} className='lock' onClick={(e)=>{
       e.preventDefault()
       handleOpenPermission_Role()
     }}  />
     </td>

      <td className="buttons">
        <FontAwesomeIcon
          icon={faTrash}
          className="lock roleButtons"
          onClick={handleOpenDelete}
        />
      </td>
      <td className="buttons">
        <FontAwesomeIcon
          icon={faPen}
          className="lock roleButtons"
          onClick={handleOpenUpdate}
        />
      </td>

      <RoleUpdateModal
        open={open}
        handleCloseUpdate={handleCloseUpdate}
        role={props.role}
        handleUpdate={handleUpdate}
      />
      <RoleDeleteModal
        handleClose={handleCloseDelete}
        open={openDelete}
        role={props.role}
        handleDelete={handleDelete}
      />
      <Permission_Role open={openPermission_Role} handleClose={handleClosePermission_Role} role={props.role} Permission_Role={props.role.autorisation} />
    </tr>
  );
};

export default OneRole;
