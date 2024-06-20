import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers,getAllUsersByCompany } from "../../redux/userSlice";
import AllUsers from "./AllUsers";
import BasicModal from "../OverView/BasicModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ereur from "../ereur";

const UsersView = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const refetch = ()=>{
    setReload((prev) => !prev)
  
  } 
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    console.log(sessionStorage.getItem('auth')[4] );
    let users;
    if (JSON.parse(sessionStorage.getItem('data')).roles_companies[0].company === 'startup village') {
      users = await dispatch(getAllUsers());
    } else {
      users = await dispatch(getAllUsersByCompany()); 
    }
    setUsers(users.payload.reverse());
  };
  

  const fetchFilteredUsers = async (first_name, last_name) => {
    try {
      let url = `${process.env.REACT_APP_API_BASE_URL}/users/filter/`;
  
      // Check if first_name and/or last_name are provided to construct the URL
      if (first_name && last_name) {
        url += `?first_name=${first_name}&last_name=${last_name}`;
      } else if (first_name) {
        url += `?first_name=${first_name}`;
      } else if (last_name) {
        url += `?last_name=${last_name}`;
      }
      
      const response = await axios.get(url);
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs filtrés :", error);
      // Gérer l'erreur ici
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(e.target.value);
    setSearchInput(value);
    if (value === "") {
      // If the search input is empty, reset the scoring data
      fetchUsers();
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };
  const handleSearchSubmit = () => {
    const [first_name, last_name] = searchInput.split(" ");
    fetchFilteredUsers(first_name, last_name);
  };

  useEffect(() => {
    fetchUsers();
  }, [reload]);

  useEffect(() => {
    if(sessionStorage.getItem('auth')[0]!='1'){
      navigate('/home/404');
    }
  }, []);

  return (
    <div className="usersView">
      <div className="usersOptions">
        <div className="searchSection">
          <input 
            type="text" 
            className="searchInput" 
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <FontAwesomeIcon 
            icon={faMagnifyingGlass} 
            className="searchIcon" 
            onClick={handleSearchSubmit}
          />
        </div>

        {parseInt(sessionStorage.getItem('auth')[5], 10) !== 0 && 
        (<BasicModal
          setReload={setReload}
          reload={reload}
          fetchUsers={fetchUsers}
        />)}
      </div>
      <AllUsers
        users={users}
        setReload={setReload}
        reload={reload}
        fetchUsers={fetchUsers}
        refetch={refetch}
      />
    </div>
  );
};

export default UsersView;
