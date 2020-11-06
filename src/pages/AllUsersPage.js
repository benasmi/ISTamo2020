import React from 'react'
import { Userstable } from "../components/usersTable";



export default function AllUsersPage(){
    return (
        <div className="app">
          <div className="containers">
            <Userstable />
          </div>
        </div>
      );
}