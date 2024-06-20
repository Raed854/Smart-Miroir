import React, { useState } from "react";
import "./login.css";
import login from "../../assets/login.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


  const handleLogin = async () => {
    try {
    
      const response = await axios.post(`${API_BASE_URL}/users/login/`, {
        email: username,
        password: password
      });


      sessionStorage.setItem('auth', response.data.autorisation[0].autorisation);
      sessionStorage.setItem('data', JSON.stringify(response.data));

     
      navigate('/home');
    } catch (error) {
      
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="loginContainer">
      <div className="imageContainer">
        <img src={login} alt="" className="loginImage" />
      </div>
      <div className="formContainer">
      
        <div className="containerLogin">
          <div className="carde">
            <a className="login">Log in</a>
            <div className="inputBox">
              <input
                type="text"
                required="required"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="user">Email</span>
            </div>
            <div className="inputBox">
              <input
                type="password"
                required="required"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>Password</span>
            </div>
            <button className="enter" onClick={handleLogin}>
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
