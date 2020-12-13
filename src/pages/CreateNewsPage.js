import React, {useContext, useState} from 'react'
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import API from "../networking/api";
import {useHistory} from "react-router-dom";
import {ToastContext} from "../contexts/ToastContext";



const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
    },
    form: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }

}));


export default function CreateNewsPage(){
    const classes = useStyles();
    let history = useHistory();

    const {addConfig} = useContext(ToastContext);
    const [creatingNew, setCreatingNew] = useState(
        {
            title: '',
            content: ''
        }
    );


    function changeData(event){
        const {name, value} = event.target;
        let data = {...creatingNew};
        data[name] = value;
        setCreatingNew(data);
    }

    function publishNew() {
        API.News.insertNews({...creatingNew}).then(response=>{
            history.push('/app/news')
            addConfig(true, "Naujiena sėkmingai pridėta!")
        }).catch(err=>{
            addConfig(false, 'Klaida!')
        })
    }

    return (

            <div className={classes.paper}>
                <Typography component="h1" variant="h4">
                    Sukurti naujieną
                </Typography>
                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="title"
                        label="Pavadinimas"
                        name="title"
                        value={creatingNew.title}
                        onChange={changeData}
                        autoFocus
                />
                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        value={creatingNew.content}
                        name="content"
                        label="Turinys"
                        type="text"
                        multiline
                        rows={4}
                        rowsMax={4}
                        onChange={changeData}
                        id="password"
                />

                <Button
                        onClick={publishNew}
                        style={{width: 200}}
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Pridėti naujieną
                </Button>
            </div>
    );
}