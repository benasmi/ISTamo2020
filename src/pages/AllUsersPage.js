import React, {useEffect, useState} from 'react'
import { GenericTable } from "../components/GenericTable";
import fakeData from "../data/UsersData.json";
import {useHistory} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import API from "../networking/api";


export default function AllUsersPage(){

    let history = useHistory();

    const tableHeader = [
        {id: "id", label: "Id"},
        {id: "name", label: "Vardas"},
        {id: "surname", label: "Pavardė"},
        {id: "email", label: "Paštas"},
        {id: "fk_roleId", label: "Rolė"}
    ];

    const [usersData, setUsersData] = useState([]);

    useEffect(()=>{
        API.Users.getUsers().then(response=>{
            setUsersData(response)
        }).catch(err=>{

        })
    },[]);

    function deleteUser(id) {
        API.Users.deleteUser({id}).then(res=>{
            setUsersData(usersData.filter(row=>row.id !== id))
        }).catch(err=>{

        })
    }

    return (
        <>
            <div>
                <Typography variant={'h4'}>
                    Vartotojų lentelė
                </Typography>
                <Button
                    startIcon={<AddIcon/>}
                    color='primary'
                    onClick={()=>{
                        history.push('/app/adduser/')
                    }}>
                    Sukurti vartotoją
                </Button>
                <br/>
                <br/>
            </div>
            <div>
                <GenericTable
                    data={usersData}
                    header={tableHeader}
                    handleRemove={(id)=>{
                        deleteUser(id)
                    }}
                    handleUpdate={(id)=>{
                        history.push(`/app/adduser/${id}`)}}
                />
            </div>
        </>
      );
}