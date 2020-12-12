import React, {useState} from 'react'
import Table from '@material-ui/core/Table';
import {GenericTable} from "../components/GenericTableEdit";
import ScheduleData from '../data/ScheduleData.json'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import GradeIcon from "@material-ui/icons/Grade";
import ListAltIcon from "@material-ui/icons/ListAlt";
import {useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
  }));



export default function ScheduleEditPage(){

    let history = useHistory();

    const [scheduleDate, setScheduleData] = useState(ScheduleData)
    const tableHeader = [
        {id: "time", label: "Laikas"},
        {id: "mon", label: "Pirmadienis"},
        {id: "tue", label: "Antradienis"},
        {id: "wed", label: "Trečiadienis"},
        {id: "thu", label: "Ketvirtadienis"},
        {id: "fri", label: "Penktadienis"}
    ]


    function handleAction() {
        alert(`Tvarkaračio pakeitimai išsaugoti`);
      }

      const classes = useStyles();

    return (
        <>

        <Typography variant={'h3'}>
            Keisti tvarkaraštį
        </Typography>

        <div style={{marginTop: 32}}>
        <GenericTable
            header={tableHeader}
            data={scheduleDate}
            handleUpdate={()=>{
                history.push('/app/schedule/1')
            }}
            handleRemove={()=>{}}
        />
        </div>

        <Button
        onClick={handleAction}
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        >
        Išsaugoti
        </Button>

        </>
        



    )
}