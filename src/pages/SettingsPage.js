import React, {useContext, useEffect, useState} from 'react'
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {useParams} from "react-router";
import {useHistory} from "react-router-dom";
import API from "../networking/api";
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

export default function SettingsPage() {
    const classes = useStyles();
    const {addConfig} = useContext(ToastContext);

    let { id } = useParams();
    let history = useHistory();

    const [settings, setSettings] = useState({
        version: '',
        school_name: '',
        school_address: '',
        school_number: '',
        alter_date: ''
    });

    function changeData(event){
        const {name, value} = event.target;
        setSettings({
            ...settings,
            [name]: value
        })
    }

    useEffect(()=>{
        API.System.getSettings().then(response=>{
            setSettings(response)
        }).catch(()=>{
            addConfig(false, "Serverio klaida");
        })
    }, []);

    function updateSettings() {
        API.System.updateSettings({...settings}).then(res=>{
            addConfig(true, "Sėkmingai atnaujinta!")
        }).catch(()=>{
            addConfig(false, "Serverio klaida");
        })
    }

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h4">
                Nustatymų langas
            </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                id="version"
                label="Versija"
                name="version"
                value={settings.version}
                onChange={changeData}
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                value={settings.school_name}
                name="school_name"
                label="Mokyklos pavadinimas"
                type="text"
                onChange={changeData}
                id="school_name"
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                id="school_address"
                label="Mokyklos adresas"
                name="school_address"
                value={settings.school_address}
                onChange={changeData}
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                value={settings.school_number}
                name="school_number"
                label="Mokyklos tel. nr"
                type="text"
                onChange={changeData}
                id="school_number"
            />

            <Button
                onClick={updateSettings}
                style={{width: 200}}
                variant="contained"
                color="primary"
                className={classes.submit}>
                Atnaujinti
            </Button>
        </div>
    )

}