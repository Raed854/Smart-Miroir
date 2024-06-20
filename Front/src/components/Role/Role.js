import React, { useEffect, useState } from "react";
import axios from "axios";
import "./role.css";
import OneRole from "./OneRole";
import RoleAddModal from "./RoleAddModal";
import { useNavigate } from "react-router-dom";
const Role = () => {
    const navigate = useNavigate();
    const [reload,setReload] = useState(false)
    const [roles,setRoles] = useState([])
    const [permission, setPermission] = useState([]);
const fetchRoles = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/role/`);
    setRoles(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des role :', error);
  
  }
};


    useEffect(()=>{
        fetchRoles()
    },[reload,roles.length])
    useEffect(() => {
      if(sessionStorage.getItem('auth')[1]!='1'){
        navigate('/home/404');
      }
    }, []);
  
  return (
    <div className="allUsersContent">
            <div className="hidingAdd">
                <RoleAddModal setReload={setReload} relaod={reload} fetchRoles={fetchRoles} />    
            </div>
    <table className="tableRole">
      <thead>
        <tr className="optionsUsersRole">
        <th scope="col" colSpan={1}>Role</th>
        <th scope="col">Permission</th>
          <th scope="col">Delete</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody>
        {roles.map((role, i) => {
          return (
            <OneRole role={role} key={i} setReload={setReload} relaod={reload} fetchRoles={fetchRoles}/>

          );
        })}
      </tbody>
    </table>
  </div>
  );
};

export default Role;
