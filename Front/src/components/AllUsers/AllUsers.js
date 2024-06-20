import React, { useEffect, useState } from "react";
import OneUser from "../OneUser/OneUser";
import "./allUsers.css";
import axios from "axios";

const AllUsers = (props) => {




  useEffect(()=>{

  },[])


  return (
    <div className="allUsersContent">
      <table className="table">
        <thead>
          <tr className="optionsUsers">
            <th scope="col">Profile image</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Company</th>
            <th scope="col">Blocked</th>
            <th scope="col">Delete</th>
            <th scope="col">Edit</th>
            <th scope="col">Permission</th>
            <th scope="col">Generate Password</th>

          </tr>
        </thead>
        <tbody>
          {props.users.map((user, index) => {
            return (
              <OneUser
                user={user}
                key={index}
                setReload={props.setReload}
                reload={props.reload}
                fetchUsers={props.fetchUsers}
                refetch={props.refetch}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
