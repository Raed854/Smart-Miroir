import React from "react";
import "./sidebar.css";
import {Link, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faChartPie,
  faChartLine,
  faBars,
  faBuilding,
  faCircleUser,
  faCircleXmark
} from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  const navigate=useNavigate();
  return (
    <div className="containerer">
      <div className="sidebar-headeres">
        <div className="images-frame">
          <FontAwesomeIcon icon={faBars} className="hamburger" />
        </div>
      </div>
      <div className="sidebar-bottom">
        <div className="options-container">
        <Link to='/home' className="option-item">
          <div className="option-item">
            <FontAwesomeIcon icon={faUsers} className="icons" />
            <p className="option-item-text">Users</p>
          </div>
          </Link>
          <Link to='role' className="option-item">
          <div className="option-item">
            <FontAwesomeIcon icon={faCircleUser} className="icons" />
            <p className="option-item-text">Role</p>
          </div>
          </Link>

          <Link to='company' className="option-item">
          <div className="option-item">
            <FontAwesomeIcon icon={faBuilding} onClick={()=>navigate("/home")} className="icons" />
            <p className="option-item-text">Company</p>
          </div>

          </Link>

          <Link to='scoring' className="option-item">

          <div className="option-item">
            <FontAwesomeIcon icon={faChartPie} className="icons" />
            <p className="option-item-text">Time Card</p>
          </div>

          </Link>

          <Link to='chart' className="option-item">
            <FontAwesomeIcon icon={faChartLine} className="icons" />
            <p className="option-item-text">Satisfaction</p>
          </Link>
          <Link to='image_problemme' className="option-item">
          <div className="option-item">
           <FontAwesomeIcon icon={faCircleXmark}  className="icons" />
            <p className="option-item-text">Unknown faces</p>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
