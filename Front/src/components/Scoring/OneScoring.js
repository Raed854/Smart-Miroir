import React, { useEffect } from 'react'
import "./oneScoring.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OneScoring = (props) => {
    
  

    return (
        <tr className="one-tip">
            <td>
                <img className="tip-img" src={props.scoring.image} alt=''/>
            </td>
            <td>
                <h5>{props.scoring.first_name} {props.scoring.last_name}</h5>
            </td>
            <td>
                <h5>{props.scoring.date}</h5>
            </td>
            <td>
                <h5>{props.scoring.hour}</h5>
            </td>
        </tr>
    );
}

export default OneScoring;
