import React, {useState} from 'react'
import { GenericTable } from "../components/GenericTable";
import fakeData from "../data/UsersData.json";
import {useHistory} from "react-router-dom";


export default function AllUsersPage(){

    let history = useHistory();

    const tableHeader = [
        {id: "id", label: "Id"},
        {id: "vardas", label: "Vardas"},
        {id: "pavarde", label: "Pavardė"},
        {id: "klasesNr", label: "Vardas"},
        {id: "klasesR", label: "Vardas"},
        {id: "userType", label: "Vardas"}
    ]

    const [usersData, setUsersData] = useState(fakeData);

    return (
          <div>
            <GenericTable
                data={usersData}
                header={tableHeader}
                handleRemove={(id)=>{}}
                handleUpdate={(id)=>{
                    history.push(`/app/edit/${id}`)}}
            />
          </div>
      );
}