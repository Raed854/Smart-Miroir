import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import add from "../../assets/add.png"


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

const UpdateModal = (props) => {

    const [image, setImage] = React.useState(props.user.imag);
    const [firstName, setFirstName] = React.useState(props.user.first_name);
    const [lastName, setLastName] = React.useState(props.user.last_name);
    const [date, setDate] = React.useState(props.user.date_fin);
    const [roles,setRoles] = React.useState([])
    const [companies,setCompanies] = React.useState([])
    const [role,setRole] = React.useState("")
    const [company,setCompany] = React.useState("")
    const [email, setEmail] = React.useState(props.user.email);
    const [details,setDetails] = useState({})
    const [password,setPassword] = React.useState("")


    const fetchCompanies = async () => {
      try {
        // Get the base URL for the API from environment variables
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
        const url = `${API_BASE_URL}/company/`;
    
        const companies = await axios.get(url);
        setCompanies(companies.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
        throw error;
      }
    };
    
    const fetchRoles = async () => {
      try {
        // Get the base URL for the API from environment variables
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
        const url = `${API_BASE_URL}/role/`;
    
        const roles = await axios.get(url);
        setRoles(roles.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
        throw error;
      }
    };
    
    const handleDetails = async (id) => {
      try {
        // Get the base URL for the API from environment variables
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
        const url = `${API_BASE_URL}/user_role_company/${id}/`;
    
        const details = await axios.get(url);
        console.log(details.data[0]);
        setDetails(details.data[0]);
        setCompany(details.data[0].id_company);
        setRole(details.data[0].id_role);
      } catch (error) {
        console.error("Error fetching user details:", error);
        throw error;
      }
    };

    const profileUpload= async (e)=>{
        const formData=new FormData()
        formData.append("file",e.target.files[0])
        formData.append("upload_preset","oztadvnr")
        await axios.post("https://api.cloudinary.com/v1_1/dl4qexes8/upload",formData).then((response)=>{
          setImage(response.data["secure_url"])
        
        }).catch((error)=>{
          throw error
        })
        }

        useEffect(()=>{
          handleDetails(props.user.id)  
          fetchCompanies()
          fetchRoles()        
        },[])

  return (
    <div>
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="formes">
          <input type="text" placeholder="First name" className="textInputes" value={firstName || ""} onChange={(e)=>setFirstName(e.target.value)} />
          <input type="text" placeholder="Last name" className="textInputes"  value={lastName || ""} onChange={(e)=>setLastName(e.target.value)} />
          <input type="text" placeholder="Email" className="textInputes"  value={email || ""} onChange={(e)=>setEmail(e.target.value)} />
          <div className="custome-select">
  <select className="tests"  value={role} onChange={(e)=>{
    setRole(e.target.value)
  }} >
    <option value="" className="selectionFirst" >Role</option>
      {
        roles.map((role,i)=>{
          return <option value={role.id}>{role.role}</option>
        })
      }
  </select>
</div>
            <div className="custome-select">
  <select className="tests"  value={company} onChange={(e)=>{
    setCompany(e.target.value)
  }}>
    <option value="" className="selectionFirst">Company</option>
    {
        companies.map((company,i)=>{
          return <option value={company.id}>{company.namecompany}</option>
        })
      }
  </select>
</div>
          <div className="finalsDates"><p >Final Date :</p></div>
          <input type="date" placeholder="Date"  className="datesInputes" value={date || ""} onChange={(e)=>setDate(e.target.value)} />
          {/* Replacing the input with the custom file upload label */}
          <label className="custume-file-upload" htmlFor="file">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
                {/* SVG code */}
              </svg>
            </div>
            <div className="texte">
              {/* <span>{image.slice(0,30)+"..."}</span> */}
              <img src={image || add} alt="" className="addImage"/>
            </div>
            <input type="file" id="file"  onChange={(e)=>profileUpload(e)}  />
          </label>
          {/* End of custom file upload label */}
          <div className="modalButtons">
          <Button className="modalBtn" onClick={props.handleCloseUpdate}>Cancel</Button>
            <Button className="modalBtn" onClick={(e)=>{
                e.preventDefault();
                props.handleUpdate(props.user.id,{first_name:firstName,last_name:lastName,email:email,imag:image,password:password,date_fin:date})
                props.handleCloseUpdate();
                props.handleUpdateRole(props.user.id,{user:props.user.id,role:role,company:company})
            }}>Update</Button>
            
          </div>
        </div>
      </Box>
    </Modal>
  </div>
  )
}

export default UpdateModal