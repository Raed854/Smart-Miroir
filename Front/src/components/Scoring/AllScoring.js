import React, { useEffect } from "react";
import "./allScoring.css";
import axios from "axios";
import OneScoring from "./OneScoring";

const AllScoring = (props) => {

  useEffect(() => {

  }, []);

  return (
    <div className="all-users-content">
      <table className="users-table">
        <thead>
          <tr className="users-options-wrapper">
            <th scope="col">Profile image</th>
            <th scope="col">Username</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {props.scoring.map((scoring, index) => {
            return (
              <OneScoring
                scoring={scoring}
                key={index}
                setReload={props.setReload}
                reload={props.reload}
                fetchScoring={props.fetchScoring}
                refetch={props.refetch}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllScoring;
