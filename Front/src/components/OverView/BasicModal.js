import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "./basicModal.css";
import axios from "axios";
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

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [role, setRole] = React.useState({});
  const [company,setCompany] = React.useState(0)
  const [email, setEmail] = React.useState("");
  const [roles,setRoles] = React.useState([])
  const [companies,setCompanies] = React.useState([])
  const [password, setPassword] = React.useState("");

  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [roleError, setRoleError] = React.useState(false);
  const [companyError, setCompanyError] = React.useState(false);
  const [dateError, setDateError] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  
  const fetchCompanies = async () => {
    try {
      // Obtenir l'URL de base de l'API depuis les variables d'environnement
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
      const url = `${API_BASE_URL}/company/`;
  
      const companies = await axios.get(url);
      setCompanies(companies.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des entreprises :", error);
      throw error;
    }
  };
  
  const fetchRoles = async () => {
    try {
      // Obtenir l'URL de base de l'API depuis les variables d'environnement
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
      const url = `${API_BASE_URL}/role/`;
  
      const roles = await axios.get(url);
      setRoles(roles.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des rôles :", error);
      throw error;
    }
  };
  
  const handleOpen = () =>{
    setOpen(true);
    setImage("")
  }
  const handleClose = () => {
    setOpen(false);
  setFirstNameError(false);
  setLastNameError(false);
  setEmailError(false);
  setRoleError(false);
  setCompanyError(false);
  setDateError(false);
  setImageError(false);
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
    const validateFields = () => {
      let isValid = true;
      if (!firstName) {
        setFirstNameError(true);
        isValid = false;
      }
      if (!lastName) {
        setLastNameError(true);
        isValid = false;
      }
      if (!email) {
        setEmailError(true);
        isValid = false;
      }
      if (!role) {
        setRoleError(true);
        isValid = false;
      }
      if (!company) {
        setCompanyError(true);
        isValid = false;
      }
      if (!date) {
        setDateError(true);
        isValid = false;
      }
      if (!image) {
        setImageError(true);
        isValid = false;
      }
      return isValid;
    }
  

    const handleAdd = async (body) => {
      try {
        if (validateFields()) {
          if (date) {
            body.date_fin = date;
          }
          const roleObj = JSON.parse(role);
    
          // Accédez aux propriétés 'id' et 'auth' de l'objet de rôle
          const roleId = roleObj.id;
          const roleAuth = roleObj.auth;
    
          console.log("Identifiant de rôle sélectionné :", roleId);
          console.log("Autorisation de rôle sélectionnée :", roleAuth);
          body['roles'] = roleAuth;
    
          // Obtenez l'URL de base de l'API depuis les variables d'environnement
          const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
          const newUserUrl = `${API_BASE_URL}/users/create/`;
          const createUserRoleCompanyUrl = `${API_BASE_URL}/create_user_role_company/`;
    
          // Créez un nouvel utilisateur
          const newUser = await axios.post(newUserUrl, body);
          console.log("ID du nouvel utilisateur :", newUser.data.id);
    
          // Créez une relation utilisateur-rôle-entreprise
          await axios.post(createUserRoleCompanyUrl, { user: newUser.data.id, role: roleId, company: company });
    
          props.setReload(!props.reload);
          props.fetchUsers();
          handleClose();
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error);
        throw error;
      }
    };

    React.useEffect(()=>{
        fetchCompanies()
        fetchRoles()
    },[image])



  return (
<div>
      <Button className="addBtn" onClick={handleOpen}>
        Add
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="formes">
            <input type="text" placeholder="First name" className={`textInputes ${firstNameError ? 'error' : ''}`} onChange={(e) => setFirstName(e.target.value)} />
            {firstNameError && <p className="error-message">Please enter a first name</p>}
            <input type="text" placeholder="Last name" className={`textInputes ${lastNameError ? 'error' : ''}`} onChange={(e) => setLastName(e.target.value)} />
            {lastNameError && <p className="error-message">Please enter a last name</p>}
            <input type="email" placeholder="Email" className={`textInputes ${emailError ? 'error' : ''}`} onChange={(e) => setEmail(e.target.value)} />
            {emailError && <p className="error-message">Please enter a valid email address</p>}
            <div class="custome-select">
              <select className={`tests ${roleError ? 'error' : ''}`} onChange={(e) => setRole(e.target.value)}>
                <option value="" className="selectionesFirst">Role</option>
                {roles.map((role, i) => <option value={JSON.stringify({id:role.id,auth:role.autorisation}) }>{role.role}</option>)}
              </select>
              {roleError && <p className="error-message">Please select a role</p>}
            </div>
            <div className="custome-select">
              <select className={`tests ${companyError ? 'error' : ''}`} onChange={(e) => setCompany(e.target.value)}>
                <option value="" className="selectionesFirst">Company</option>
                {companies.map((company, i) => <option value={company.id}>{company.namecompany}</option>)}
              </select>
              {companyError && <p className="error-message">Please select a company</p>}
            </div>
            <div className="finalsDates"><p>Final Date :</p></div>
            <input type="date" placeholder="Date" className={`datesInputes ${dateError ? 'error' : ''}`} onChange={(e) => setDate(e.target.value)} />
            {dateError && <p className="error-message">Please select a date</p>}
            <label className={`custume-file-upload ${imageError ? 'error' : ''}`} htmlFor="file">
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
                  {/* SVG code */}
                </svg>
              </div>
              <div className="texte">
                <img src={image || add} alt="" className="addImage" />
              </div>
              <input type="file" id="file" onChange={(e) => profileUpload(e)} />
            </label>
            {imageError && <p className="error-message">Please select an image</p>}
            <div className="modalButtons">
              <Button className="modalBtn" onClick={handleClose}>Cancel</Button>
              <Button className="modalBtn" onClick={(e) => {
                e.preventDefault();
                handleAdd({ first_name: firstName, last_name: lastName, email: email, imag: image, password: password, date_fin: date });
              }}>Add</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
