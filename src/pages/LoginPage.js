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
import {isAuthenticated} from '../helpers/tokenStorage'
import Redirect from "react-router-dom/es/Redirect";
import history from '../helpers/history'
import { useHistory } from "react-router-dom";

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
}));




export default function LoginPage() {
 
  let history = useHistory();

  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')




  function dummyLogin(){
    if(username === 'test' && password === 'test'){
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        history.push("/app/news")
    }
  }

  if (isAuthenticated()) {
    return <Redirect to="/app" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Prisijungti
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
            value={username}
            onChange={(event)=>setUsername(event.target.value)}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            name="password"
            label="Slaptazodis"
            type="password"
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Prisiminti mane"
          />
          <Button
            onClick={dummyLogin}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Prisijungti
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Pamirsote slaptazodi?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Neturite paskyros? Spauskite cia"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}