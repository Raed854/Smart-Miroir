import React from 'react'
import "./navbar.css"
import logo from "../../assets/logo-Startup-village.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='navbar' >
        <img src={logo} alt='' className='logo' />
        <Link className='logOutButton' to='/'>Logout</Link>
    </div>
  )
}

export default NavBar