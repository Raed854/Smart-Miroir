import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faPen , faTrash} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import CompanyUpdateModal from './CompanyUpdateModal';
import CompanyDeleteModal from './CompanyDeleteModal';


const OneCompany = (props) => {
    const [openDelete,setOpenDelete] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpenUpdate = () => setOpen(true);
    const handleCloseUpdate = () => setOpen(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);


    const handleDelete = async (id) => {
      try {
        console.log(id);
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/company/${id}/delete/`);
        props.setReload(!props.relaod);
        props.fetchCompanies();
      } catch (error) {
        throw error;
      }
    };
    
    const handleUpdate = async (id, body) => {
      try {
        console.log(id);
        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/company/${id}/`, body);
        props.setReload(!props.relaod);
        props.fetchCompanies();
      } catch (error) {
        throw error;
      }
    };
      
  return (
    <tr className="oneTip">
      <td>
        <label className="date_tip">{props.company?.namecompany}</label>
      </td>

      <td className="buttons">
        <FontAwesomeIcon
          icon={faTrash}
          className="lock"
          onClick={handleOpenDelete}
        />
      </td>
      <td className="buttons">
        <FontAwesomeIcon
          icon={faPen}
          className="lock"
          onClick={handleOpenUpdate}
        />
      </td>

      <CompanyUpdateModal open={open} handleCloseUpdate={handleCloseUpdate} company={props.company} handleUpdate={handleUpdate}  />
      <CompanyDeleteModal handleClose={handleCloseDelete} open={openDelete} company={props.company} handleDelete={handleDelete} />
      
    </tr>
  )
}

export default OneCompany

