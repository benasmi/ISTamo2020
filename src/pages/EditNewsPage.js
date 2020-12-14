import React, {useContext, useEffect, useState} from 'react'
import {useParams} from "react-router";
import API from "../networking/api";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
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


export default function EditNewsPage(){
    const classes = useStyles();
    const {addConfig} = useContext(ToastContext);
    let { id } = useParams();
    let history = useHistory();

    const [updatingNew, setUpdatingNew] = useState(
        {
            title: '',
            content: ''
        }
    );


    function changeData(event){
        const {name, value} = event.target;
        let data = {...updatingNew};
        data[name] = value;
        setUpdatingNew(data);
    }

    useEffect(()=>{
        if(id){
            API.News.getNews(`?id=${id}`).then(response=>{
                console.log(response[0]);
                setUpdatingNew(response[0])
            }).catch(err=>{

            })
        }
    },[id]);

    function updateNew() {
        if(updatingNew.title.length === 0 || updatingNew.content.length === 0){
            addConfig(false, "Klaida!@");
            return;
        }

        API.News.updateNews({...updatingNew}).then(response=>{
            history.push(`/app/news`)
            addConfig(true, "Naujiena sėkmingai atnaujinta");
        }).catch(()=>{
            addConfig(false, "Klaida!");
        })
    }

    return (

        <div className={classes.paper}>
            <Typography component="h1" variant="h4">
                Atnaujinti naujieną
            </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                id="title"
                label="Pavadinimas"
                name="title"
                value={updatingNew.title}
                onChange={changeData}
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                value={updatingNew.content}
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
                onClick={updateNew}
                style={{width: 200}}
                variant="contained"
                color="primary"
                className={classes.submit}>
                Atnaujinti
            </Button>
        </div>
    );
}