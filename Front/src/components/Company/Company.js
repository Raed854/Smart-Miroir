import React , { useEffect, useState } from "react";
import './company.css';
import axios from "axios";
import CompanyAddModal from "./CompanyAddModal";
import OneCompany from "./OneCompany";
const Company = () => {
    const [reload,setReload] = useState(false)
    const [companies,setCompanies] = useState([])

    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/company/`);
        setCompanies(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des entreprises :', error);
        // Gérer l'erreur ici
      }
    };

    useEffect(()=>{
        fetchCompanies()
    },[reload,companies.length])
  return (
    <div className="allUsersContent">
            <div className="hidingAdd">
               
                <CompanyAddModal setReload={setReload} relaod={reload} fetchCompanies={fetchCompanies} />    
            </div>
    <table className="tableRole">
      <thead>
        <tr className="optionsUsersRole">
          <th scope="col" colSpan={1}>Company</th>
          <th scope="col">Delete</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company, i) => {
          return (
            <OneCompany company={company} key={i} setReload={setReload} relaod={reload} fetchCompanies={fetchCompanies} />

          );
        })}
      </tbody>
    </table>
  </div>
  )
}

export default Company



