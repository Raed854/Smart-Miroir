import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro"; 
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import "./chart.css";
import { useNavigate } from "react-router-dom";
const ChartComponent = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [chartData, setChartData] = useState({
    barChartData: {
      labels: ['Happy', 'Naturel', 'Sad'],
      datasets: [
        {
          data: [0, 0, 0], // Initial data, will be updated after fetching from API
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }
      ]
    },
    doughnutChartData: {
      labels: ['Happy', 'Naturel', 'Sad'],
      datasets: [
        {
          label: '# of Votes',
          data: [0, 0, 0], // Initial data, will be updated after fetching from API
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }
      ]
    }
  });

  const fetchData = async () => {
    try {
      let response;

      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
      
      if (JSON.parse(sessionStorage.getItem('data')).roles_companies[0].company === 'startup village') {
        response = await fetch(`${API_BASE_URL}/etat/`);
      } else {
        const companyId = JSON.parse(sessionStorage.getItem('data')).roles_companies[0].company;
        response = await fetch(`${API_BASE_URL}/etat/${companyId}/`);
      }
      
      if (!response.ok) {
        throw new Error('La réponse du réseau n\'était pas correcte');
      }
      const data = await response.json();
      // Assuming the response data structure is like: { happy: 65, naturel: 59, sad: 80 }
      setChartData({
        barChartData: {
          ...chartData.barChartData,
          datasets: [{
            ...chartData.barChartData.datasets[0],
            data: [data.Happy, data.Neutral, data.Sad]
          }]
        },
        doughnutChartData: {
          ...chartData.doughnutChartData,
          datasets: [{
            ...chartData.doughnutChartData.datasets[0],
            data: [data.Happy, data.Neutral, data.Sad]
          }]
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    const value = e.target.value;
    setSearchInput(value);
    if (value === "") {
      // If the search input is empty, reset the chart data
      fetchData();
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };
  const handleSearchSubmit = () => {
    const [first_name, last_name] = searchInput.split(" ");
    handleSearch(first_name, last_name);
  };
  const handleSearch = async (first_name, last_name) => {
    try {
      let url = `${process.env.REACT_APP_API_BASE_URL}/etatbypersonne/`;

      if (first_name && last_name) {
        // Correcting query parameter concatenation
        url += `?first_name=${first_name}&last_name=${last_name}`;
      }
      
      const response = await fetch(url);
      console.log(url);
      const data = await response.json();
      console.log(data);
  
      setChartData({
        barChartData: {
          ...chartData.barChartData,
          datasets: [{
            ...chartData.barChartData.datasets[0],
            data: [data.Happy, data.Neutral, data.Sad]
          }]
        },
        doughnutChartData: {
          ...chartData.doughnutChartData,
          datasets: [{
            ...chartData.doughnutChartData.datasets[0],
            data: [data.Happy, data.Neutral, data.Sad]
          }]
        }
      });
    } catch (error) {
      console.error("Error fetching filtered scoring:", error);
    }
  };
  
  useEffect(() => {
    fetchData(); // Fetch data on initial render
  }, []);
  useEffect(() => {
    if(sessionStorage.getItem('auth')[4]!='1'){
      navigate('/home/404');
    }
  }, []);

  return (
    <div className="users-view">
      <div className="users-options">
      
        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress} // Add this line
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="search-icon"
            onClick={handleSearchSubmit}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '1', marginRight: '100px' }}>
              <div style={{ width: "700px", height: "400px" }}>
                <Bar data={chartData.barChartData} />
              </div>
            </div>
            <div style={{ flex: '1' }}>
              <div style={{ width: "500px", height: "400px" }}>
                <Doughnut data={chartData.doughnutChartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
