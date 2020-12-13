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



export default function AddUserPage(){
    
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [role, setRole] = useState('');

    const [availableSubjects, setAvailableSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    let { id } = useParams();
    let history = useHistory();

    const {addConfig} = useContext(ToastContext);

    useEffect(()=>{
        if(id){
            API.Users.findOneUser(`/${id}`).then(user=>{
               setUsername(user.email);
               setName(user.name);
               setSurname(user.surname);
               setRole(user.roleId);
               if(user.subjects){
                   setSelectedSubjects(user.subjects)
                   getAvailableSubjects(user.subjects)
               }else{
                   getAvailableSubjects([]);
               }

            }).catch(err=>{

            });
        }

        getAvailableSubjects([]);


    },[id]);

    function getAvailableSubjects(alreadySelected){
        API.Subjects.getSubjects().then(subjects =>{
            console.log({alreadySelected, subjects});
            for(let i = 0; i<alreadySelected.length; i++){
                subjects = subjects.filter(row=>row.id!==alreadySelected[i].id);
            }
            setAvailableSubjects(subjects)
        }).catch(()=>{
            addConfig(false, "Klaida gaunant dalykus!");
        })
    }

    function handleAction() {
        const ids = selectedSubjects.map(row=>row.id);
        if(id){
            API.Users.updateUsers({subjects: ids, birthday: "1999-08-08", address:"Address", id_code: 123, name: firstname, surname: surname, email: username, password: password, roleId: role, id:id}).then(response=>{
                history.push('/app/users')
                addConfig(true, "Vartotojas sėkmingai atnaujintas!")
            }).catch(()=>{
                addConfig(false, "Klaida!")
            });
        }else{
            API.Users.insertUser(
                {subjects: ids, birthday: "1999-08-08", address:"Address", id_code: 123, name: firstname, surname: surname, email: username, password: password, roleId: role }).then(r =>{
                history.push('/app/users')
                addConfig(true, "Vartotojas sėkmingai pridėtas!")
            }).catch(()=>{
                addConfig(false, "Klaida!")
            })
        }
      }

    function handleInput(value){
        setSelectedSubjects([...selectedSubjects, value]);
        setAvailableSubjects(availableSubjects.filter(row=>row.id!==value.id))
    }

    function deselectChip(chip) {
        setSelectedSubjects(selectedSubjects.filter(row=>row.id!==chip.id));
        setAvailableSubjects(oldVal=>[...availableSubjects, chip])
    }

    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            
            <Typography component="h1" variant="h5">
                {id ? 'Atnaujinti vartotoją' : 'Pridėti naują vartotoją'}
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Vartotojo vardas"
                name="email"
                disabled={!!id}
                value={username}
                onChange={(event)=>setUsername(event.target.value)}
                autoFocus
              />
                {!id && <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                disabled={!!id}
                value={password}
                name="password"
                label="Slaptažodis"
                type="password"
                onChange={(event)=>setPassword(event.target.value)}
                id="password"
              />}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={firstname}
                name="firstname"
                label="Vardas"
                type="text"
                onChange={(event)=>setName(event.target.value)}
                id="firstname"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={surname}
                name="surname"
                label="Pavardė"
                type="text"
                onChange={(event)=>setSurname(event.target.value)}
                id="surname"
              />

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="UserType">Vartotojo tipas</InputLabel>
                    <Select
                    native
                    value={role}
                    onChange={(event)=>setRole(event.target.value)}>
                    <option aria-label="None" value="" />
                    <option value={1}>Mokinys</option>
                    <option value={2}>Tėvas</option>
                    <option value={3}>Mokytojas</option>
                    <option value={4}>Administratorius</option>
                    </Select>
                </FormControl>



                <div style={{marginTop: 16}}>
                    {selectedSubjects.map(row=>{
                        return <Chip  style={{marginLeft: 8}} onDelete={() => deselectChip(row)} label={row.name} key={row.id} />
                    })}
                </div>

                <Autocomplete
                    id="combo-box-demo"
                    disableClearable
                    onChange={(_, selected) => handleInput(selected)}
                    options={availableSubjects}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300, marginTop: 24 }}
                    renderInput={(params) => <TextField {...params} label="Dalykai" variant="outlined" />}
                />

              <Button
                onClick={handleAction}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                  {id ? 'Atnaujinti' : 'Pridėti'}
              </Button>
              
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      );


}