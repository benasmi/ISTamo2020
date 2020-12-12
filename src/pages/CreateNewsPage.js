import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';




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



export default function CreateNewsPage(){

    const classes = useStyles();


    function handleAction() {
        alert(`Pridedama naujiena`);
    }

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

            <Typography component="h1" variant="h5">
              Pridėti naujieną
            </Typography>

            <form className={classes.form} noValidate>


                
                <TextField
                id="antrase"
                label="Antraštė"
                style={{ margin: 8 }}
                placeholder="Antraštė"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
                />

                <TextField
                id="linkas"
                label="Nuoroda į nuotrauką"
                style={{ margin: 8 }}
                placeholder="www.photo.com/photo.jpg"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
                />
                


                <TextField
                id="tekstas"
                label="Naujienos tekstas"
                multiline
                style={{ margin: 8 }}
                fullWidth
                rows={20}
                variant="outlined"
                />



                <Button
                onClick={handleAction}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
               >
                Pridėti
               </Button>

            </form>
            </div>
            <Box mt={8}>
            <Copyright />
            </Box>    
        
        </Container>
    )
}