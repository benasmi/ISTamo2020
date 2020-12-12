import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';


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




export default function ScheduleAddTest(){

    const classes = useStyles();


    function handleAction() {
        alert(`Atsiskaitymas pridėtas`);
    }

    const [state, setState] = React.useState({
        classNr: '',
        classLetter: '',
        testDate: '',
        testTime:'',
        subject:'',
        name: 'hai',
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
        ...state,
        [name]: event.target.value,
        });
    };


    const [selectedDate, setSelectedDate] = React.useState(new Date('2021-01-01T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        
        
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

            <Typography component="h1" variant="h5">
              Pridėti atsiskaitymą
            </Typography>

            <form className={classes.form} noValidate>


                
            <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="classNr">Klasė</InputLabel>
                    <Select
                    native
                    value={state.classNr}
                    onChange={handleChange}
                    inputProps={{
                        name: 'classNr',
                        id: 'classNr',
                    }}
                    >
                    <option aria-label="None" value="" />
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="classLetter">Klasės raidė</InputLabel>
                    <Select
                    native
                    value={state.classLetter}
                    onChange={handleChange}
                    inputProps={{
                        name: 'classLetter',
                        id: 'classLetter',
                    }}
                    >
                    <option aria-label="None" value="" />
                    <option value={"A"}>A</option>
                    <option value={"B"}>B</option>
                    <option value={"C"}>C</option>
                    <option value={"D"}>D</option>
                    <option value={"E"}>E</option>
                    <option value={"F"}>F</option>
                    <option value={"G"}>G</option>
                    </Select>
                </FormControl>


                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="testTime">Testo laikas</InputLabel>
                    <Select
                    native
                    value={state.testTime}
                    onChange={handleChange}
                    inputProps={{
                        name: 'testTime',
                        id: 'testTime',
                    }}
                    >
                    <option aria-label="None" value="" />
                    <option value={"9:00-10:30"}>9:00-10:30</option>
                    <option value={"11:00-12:30"}>11:00-12:30</option>
                    <option value={"13:30-15:00"}>13:30-15:00</option>
                    <option value={"15:30-17:00"}>15:30-17:00</option>
                    </Select>
                </FormControl>




                <TextField 
                    id="date"
                    label="Data"
                    type="date"
                    defaultValue="2021-01-01"
                    className={classes.formControl}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />


                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="subject">Pamoka</InputLabel>
                    <Select
                    native
                    value={state.subject}
                    onChange={handleChange}
                    inputProps={{
                        name: 'subject',
                        id: 'subject',
                    }}
                    >
                    <option aria-label="None" value="" />
                    <option value={"Matematika"}>Matematika</option>
                    <option value={"Lietuvių kalba"}>Lietuvių kalba</option>
                    <option value={"Fizika"}>Fizika</option>
                    <option value={"Anglų kalba"}>Anglų kalba</option>
                    <option value={"Istorija"}>Istorija</option>
                    </Select>
                </FormControl>



                <Button
                onClick={handleAction}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
               >
                Sukurti
               </Button>

            </form>
            </div>
            <Box mt={8}>
            <Copyright />
            </Box>    
        
        </Container>


    )
}