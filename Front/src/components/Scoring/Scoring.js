import React, { useState, useEffect } from "react";
import { DateRangePicker } from 'rsuite';
import { useDispatch } from "react-redux";
import { getAllScoring, getAllScoringbyCompany } from "../../redux/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AllScoring from "../Scoring/AllScoring";
import "./scoring.css";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Scoring = () => {
  const navigate = useNavigate();
  const [scoring, setScoring] = useState([]);
  const [reload, setReload] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [range, setRange] = useState(null);

  const dispatch = useDispatch();

  const fetchScoring = async () => {
    if (JSON.parse(sessionStorage.getItem('data')).roles_companies[0].company === 'startup village') {
      const scoringData = await dispatch(getAllScoring());
      setScoring(scoringData.payload.reverse());
    } else {
      const scoringData = await dispatch(getAllScoringbyCompany());
      setScoring(scoringData.payload.reverse());
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value === "") {
      // If the search input is empty, reset the scoring data
      fetchScoring();
    }
  };

  const handleSearchSubmit = () => {
    const [first_name, last_name] = searchInput.split(" ");
    fetchFilteredScoring(first_name, last_name);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const fetchFilteredScoring = async (first_name, last_name) => {
    try {
      let url = `${process.env.REACT_APP_API_BASE_URL}/pointages/`;

      const params = new URLSearchParams();

      if (first_name) params.append('first_name', first_name);
      if (last_name) params.append('last_name', last_name);
      if (range && range[0] && range[1]) {
        const startDate = range[0].toISOString().split('T')[0];
        const endDate = range[1].toISOString().split('T')[0];
        params.append('date_debut', startDate);
        params.append('date_fin', endDate);
      }

      url += `?${params.toString()}`;
      
      const response = await axios.get(url);
      setScoring(response.data);
    } catch (error) {
      console.error("Error fetching filtered scoring:", error);
    }
  };

  useEffect(() => {
    fetchScoring();
    console.log("user view reloaded");
  }, [reload]);

  useEffect(() => {
    console.log(scoring);
  }, [scoring]);

  useEffect(() => {
    if (sessionStorage.getItem('auth')[3] !== '1') {
      navigate('/home/404');
    }
  }, [navigate]);

  // Function to format the date to string
  const formatDateToString = (date) => {
    return date ? date.toDateString() : ''; // Format date to string or return empty string if date is null
  };

  return (
    <div className="users-view">
      <div className="users-options">
        <div className="DateRangePickerContainer">
          {/* Display the selected date range */}
         
          {/* Render the DateRangePicker component */}
          <DateRangePicker onChange={setRange} />
        </div>
        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="search-icon"
            onClick={handleSearchSubmit}
          />
        </div>
      </div>

      <AllScoring
        scoring={scoring}
        setReload={setReload}
        reload={reload}
        fetchScoring={fetchScoring}
        refetch={() => setReload(prev => !prev)}
      />
    </div>
  );
};

export default Scoring;
