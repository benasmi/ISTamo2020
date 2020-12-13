import React, {useContext, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import API from "../networking/api";
import {useParams} from "react-router";
import {useHistory} from "react-router-dom";
import {ToastContext} from "../contexts/ToastContext";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © Informacinių sistemų dienyno projektas '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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



export default function CreateNewMarkPage(){

    const classes = useStyles();

    const [markConfig, setMarkConfig] = useState({
        mark: '',
        description: '',
        subject: -1,
        student: -1,
        mark_type: '-1'
    });



    const [availableSubjects, setAvailableSubjects] = useState([]);
    const [users, setUsers] = useState([])

    let { id } = useParams();
    let history = useHistory();

    const {addConfig} = useContext(ToastContext);


    function changeData(event){
        const {name, value} = event.target;
        console.log(name, value)
        setMarkConfig({
            ...markConfig,
            [name]: value
        })

    }

    useEffect(()=>{
            API.Subjects.getSubjects().then(subject => {
                setAvailableSubjects(subject)
            }).catch(err=>{

            })

            API.Users.getUsers().then(user=>{
                setUsers(user);
            }).catch(err=>{

            });
        if(id){
            API.Marks.getMark(`?id=${id}`).then(mark=>{
                const cMark = mark[0];
                cMark.student = cMark.fk_userId;
                cMark.subject = cMark.fk_subjectId;
                setMarkConfig(cMark);

            }).catch(err=>{
                addConfig(false, "Nepavyko gauti pažymio")
            })
        }

    },[])

    function addMark() {
        if(!id){
            API.Marks.insertMark({subjectId: markConfig.subject, mark_type: markConfig.mark_type, userId: markConfig.student, mark: markConfig.mark, description: markConfig.description}).then(res=>{
                addConfig(true, "Pazymys pridetas");
                history.push("/app/marks")
            }).catch(err=>{
                addConfig(false, "Klaida");
            })
        }else{
            API.Marks.updateMark({id: id, subjectId: markConfig.subject, mark_type: markConfig.mark_type, userId: markConfig.student, mark: markConfig.mark, description: markConfig.description}).then(res=>{
                addConfig(true, "Pazymys atnaujintas");
                history.push("/app/marks")
            }).catch(err=>{
                addConfig(false, "Klaida");
            })
        }

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    {id ? 'Pakeisti pažymį' : 'Pridėti naują pažymį'}
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        min={0}
                        max={10}
                        type="number"
                        id="mark"
                        label="Pazymys"
                        name="mark"
                        value={markConfig.mark}
                        onChange={changeData}
                        autoFocus
                    />
                     <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={markConfig.description}
                        name="description"
                        label="Aprašymas"
                        type="text"
                        onChange={changeData}
                        id="description"
                    />

                    <div>
                        <FormControl className={classes.formControl}>
                            <Select
                                value={markConfig.subject}
                                onChange={changeData}
                                displayEmpty
                                className={classes.selectEmpty}
                                name={"subject"}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="-1" disabled>
                                    Pasirinkite dalyką
                                </MenuItem>
                                {availableSubjects.map(sub =>{
                                    return <MenuItem value={sub.id}>{sub.name}</MenuItem>

                                })}
                            </Select>
                        </FormControl>
                    </div>

                    <div>
                        <FormControl className={classes.formControl}>
                            <Select
                                value={markConfig.student}
                                onChange={changeData}
                                displayEmpty
                                className={classes.selectEmpty}
                                name={"student"}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="-1" disabled>
                                   Pasirinkite mokinį
                                </MenuItem>
                                {users.map(sub =>{
                                    return <MenuItem value={sub.id}>{sub.name} {sub.surname}</MenuItem>

                                })}
                            </Select>
                        </FormControl>
                    </div>

                    <div>
                        <FormControl className={classes.formControl}>
                            <Select
                                value={markConfig.mark_type}
                                onChange={changeData}
                                displayEmpty
                                name={"mark_type"}
                                className={classes.selectEmpty}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="-1" disabled>
                                    Pažymio tipas
                                </MenuItem>
                                <MenuItem value="Lankomumas">Lankomumas</MenuItem>
                                <MenuItem value="Kontrolinis">Kontrolinis</MenuItem>
                                <MenuItem value="Savarankiskas">Savarankiskas</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <Button
                        onClick={addMark}
                        style={{width: 200}}
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Pridėti pažymį
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );


}