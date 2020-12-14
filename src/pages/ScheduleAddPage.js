import React, {useContext, useEffect, useState} from 'react'
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import {useParams} from "react-router";
import {useHistory} from "react-router-dom";
import {parseSchedule} from "./SchedulePage";
import API from "../networking/api";
import {ToastContext} from "../contexts/ToastContext";

const week_days = [1,2,3,4,5,6];
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

export default function ScheduleAddPage(){
    const classes = useStyles();
    let { id } = useParams();
    let history = useHistory();

    const {addConfig} = useContext(ToastContext)

    const [schedule, setSchedule] = useState({weekDay: '-1', subjectTime: '7:45', subjectId: '-1', roomId: '-1', scheduleId: '-1', id: id});
    const [globalSchedule, setGlobalSchedule] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(()=>{
        if(id){
            API.Schedule.getScheduleForEditing(`?id=${id}`).then(res=>{
                const sch = res[0];
                setSchedule({
                    id: id,
                    weekDay: sch.week_day,
                    subjectTime: sch.subject_time,
                    subjectId: sch.fk_subjectId,
                    roomId: sch.fk_roomId,
                    scheduleId: sch.fk_scheduleId
                })
            }).catch(err=>{

            })
        }

        API.Subjects.getSubjects().then(subs=>{
            setSubjects(subs);
        }).catch(err=>{

        });

        API.Schedule.getGlobalSchedule().then(re=>{
            setGlobalSchedule(re);
        }).catch(err=>{

        })

        API.Rooms.getRooms().then(r=>{
            setRooms(r)
        }).catch(err=>{

        })
    },[])

    function changeData(event){
        const {name, value} = event.target;
        console.log(name, value)
        setSchedule({
            ...schedule,
            [name]: value
        })

    }

    function addSchedule() {
        console.log("Payload", {...schedule})
        if(id){
            API.Schedule.updateSchedule({...schedule}).then(res=>{
                addConfig(true, "Tvarkaraščio laikas atnaujintas")
                history.push("/app/schedule");
            }).catch(err=>{
                addConfig(false, "Klaida")
            })
        }else{
            API.Schedule.addScheduleToSubject({...schedule}).then(res=>{
                addConfig(true, "Laikas prie dalyko pridėtas sėkmingai")
                history.push("/app/schedule");
            }).catch(err=>{
                addConfig(false, "Klaida")
            })
        }

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    {id ? 'Pakeisti tvarkaraštį' : 'Pridėti naują laiką prie tvarkaraščio'}
                </Typography>
                <form className={classes.form} noValidate>
                    <div style={{display: 'flex', flexDirection:'row', alignItems: 'center'}}>
                        <FormControl className={classes.formControl}>
                            <Select
                                value={schedule.weekDay}
                                onChange={changeData}
                                displayEmpty
                                className={classes.selectEmpty}
                                name={"weekDay"}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="-1" disabled>
                                    Pasirinkite dieną
                                </MenuItem>
                                {week_days.map(day =>{
                                    return <MenuItem value={day}>{parseSchedule(day)}</MenuItem>

                                })}
                            </Select>
                        </FormControl>
                        <TextField
                            id="subjectTime"
                            name="subjectTime"
                            label="Laikas"
                            type="time"
                            onChange={changeData}
                            value={schedule.subjectTime}
                            defaultValue={schedule.subjectTime}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </div>

                    <div>
                    <FormControl className={classes.formControl}>
                        <Select
                            value={schedule.subjectId}
                            onChange={changeData}
                            displayEmpty
                            className={classes.selectEmpty}
                            name={"subjectId"}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="-1" disabled>
                                Pasirinkite dalyką
                            </MenuItem>
                            {subjects.map(s =>{
                                return <MenuItem value={s.id}>{s.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    </div>

                    <div>
                        <FormControl className={classes.formControl}>
                            <Select
                                value={schedule.scheduleId}
                                onChange={changeData}
                                displayEmpty
                                className={classes.selectEmpty}
                                name={"scheduleId"}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="-1" disabled>
                                    Pasirinkite tvarkaraštį
                                </MenuItem>
                                {globalSchedule.map(s =>{
                                    return <MenuItem value={s.id}>{s.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </div>

                    <div>
                        <FormControl className={classes.formControl}>
                            <Select
                                value={schedule.roomId}
                                onChange={changeData}
                                displayEmpty
                                className={classes.selectEmpty}
                                name={"roomId"}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="-1" disabled>
                                    Pasirinkite kambarį
                                </MenuItem>
                                {rooms.map(s =>{
                                    return <MenuItem value={s.id}>{s.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </div>

                    <Button
                        onClick={addSchedule}
                        style={{width: 200}}
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        {id ?  'Atnaujinti': 'Pridėti tvarkaraštį'}
                    </Button>
                </form>
            </div>
        </Container>
    );

}