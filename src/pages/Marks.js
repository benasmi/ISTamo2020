import React, {useEffect, useState} from 'react'
import {GenericTable} from "../components/GenericTable";
import fakeData from "../data/MarksData.json";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import {useHistory} from "react-router-dom";
import GradeIcon from '@material-ui/icons/Grade';
import ListAltIcon from '@material-ui/icons/ListAlt';
import API from "../networking/api";
import Chip from "@material-ui/core/Chip";
import * as moment from "moment";

export default function Marks(){
    let history = useHistory();

    const [marks, setMarks] = useState(undefined);

    useEffect(()=>{
        API.Marks.getMarks().then(response=>{
            console.log(response);
            setMarks(response)
        }).catch(()=>{

        })
    },[])


    function renderMakrs(){
        if(!marks){
            return null;
        }
        return marks.map(subject=>{
            return <div style={{marginTop: 64}}>
                <Typography variant="h3">
                    {`${subject.name} - ${subject.hours} valandų`}
                </Typography>
                <div>
                    {subject.marks.map(mark =>{
                        return <Chip  onClick={()=>editMark(mark)} style={{marginLeft: 8}} label={`${mark.mark} | ${mark.mark_type} - ${moment(mark.insertion_date).format("LL")}`} key={mark.id} />
                    })}
                </div>
            </div>
        })
    }

    function editMark(mark){
        console.log(mark);
        history.push(`/app/marks/create/${mark.id}`)
    }

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
            {renderMakrs()}
        </div>

        </>
      );
}