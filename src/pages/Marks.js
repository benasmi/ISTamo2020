import React, {useState} from 'react'
import {GenericTable} from "../components/GenericTable";
import fakeData from "../data/MarksData.json";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import {useHistory} from "react-router-dom";
import GradeIcon from '@material-ui/icons/Grade';
import ListAltIcon from '@material-ui/icons/ListAlt';

export default function Marks(){
    let history = useHistory();
    const tableHeader = [
        {id: "id", label: "Id"},
        {id: "subject", label: "Dalykas"},
        {id: "week", label: "Savaitė"},
        {id: "w1", label: "1"},
        {id: "w2", label: "2"},
        {id: "w3", label: "3"},
        {id: "w4", label: "4"},
        {id: "w5", label: "5"},
        {id: "w6", label: "6"},
        {id: "w7", label: "7"},
        {id: "w8", label: "8"},
        {id: "w9", label: "9"},
        {id: "w10", label: "10"},
        {id: "w11", label: "11"},
        {id: "w12", label: "12"},
        {id: "w13", label: "13"},
        {id: "w14", label: "14"},
        {id: "w15", label: "15"},
        {id: "w16", label: "16"},
    ]

    const [marks, setMarks] = useState(fakeData);


    return (
        <>
        <div>
            <Typography variant={'h3'}>
                Pažymių langas
            </Typography>
            <div style={{padding: 16}}>
                <Button
                    style={{marginLeft: 16}}
                    variant={'contained'}
                    startIcon={<AddIcon/>}
                    color='primary'
                    onClick={()=>{
                        history.push('/app/marks/create')
                    }}>
                    Rašyti naują pažymį
                </Button>
                <Button
                    style={{marginLeft: 16}}
                    variant={'contained'}
                    startIcon={<GradeIcon/>}
                    color='primary'
                    onClick={()=>{
                        history.push('/app/marks/ratings')
                    }}>
                    Peržiūrėti reitingus
                </Button>
                <Button
                    style={{marginLeft: 16}}
                    variant={'contained'}
                    startIcon={<ListAltIcon/>}
                    color='primary'
                    onClick={()=>{
                        history.push('/app/marks/average')
                    }}>
                    Vidurkio skaičiuoklė
                </Button>
            </div>

        </div>
        <div style={{marginTop: 32}}>
              <GenericTable
                  data={marks}
                  header={tableHeader}
                  handleRemove={()=>{
                  }}
                  handleUpdate={()=>{
                      history.push(`/app/marks/${1}`)

                  }}
              />
        </div>

        </>
      );
}