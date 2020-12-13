import React, {useEffect, useState} from 'react'
import Typography from "@material-ui/core/Typography";
import API from "../networking/api";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";



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


export default function CalculateAverageReportPage(){
    const classes = useStyles();
    const [marks, setMarks] = useState(undefined);

    const [selectedSubject, setSelectedSubject] = useState('-1');

    const [currentSelectedMark, setCurrentSelectedMark] = useState(0);
    const [currentMarks, setCurrentMarks] = useState([])
    const availableMarks = [2,3,4,5,6,7,8,9,10];

    useEffect(()=>{
        API.Marks.getMarks().then(response=>{
            console.log(response);
            setMarks(response)
        }).catch(()=>{

        })
    },[]);

    function calculateAvg(){
        const sum = currentMarks.map(row=>row.mark).reduce((a, b) => a + b, 0);
        return ((sum / currentMarks.length) || 0).toPrecision(3)

    }

    function changeData(event){
        const {name, value} = event.target;
        const subject = marks.find(row=>row.id===value);
        const cMarks = subject.marks;
        setSelectedSubject(subject.id);
        setCurrentMarks(cMarks)
    }


    function addToMark(){
        if(currentSelectedMark){
            setCurrentMarks([...currentMarks, {mark: currentSelectedMark}])
        }
    }


    return (
        <div>
            <Typography variant="h3">
                Vidurkio skaičiavimo forma
            </Typography>

            <div>
                <FormControl className={classes.formControl}>
                    <Select
                        onChange={changeData}
                        displayEmpty
                        name={"mark_type"}
                        value={selectedSubject}
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="-1" disabled>
                            Kurio dalyko vidurkį norite skaičiuoti?
                        </MenuItem>
                        { marks ?
                            marks.map(subject=>{
                                return <MenuItem value={subject.id}>{subject.name}</MenuItem>
                            }) : null
                        }
                    </Select>
                </FormControl>
            </div>

            <Typography style={{marginTop: 16}} variant="h6">
                Pažymiai
            </Typography>
            <div>
                <div style={{marginTop: 8}}>
                    {
                        currentMarks.map(row=>{
                            return <Chip style={{marginLeft: 8}} id={row.id} label={row.mark}/>
                        })
                    }
                </div>
            </div>

            <Typography style={{marginTop: 32}} variant="h6">
                Vidurkis: {calculateAvg()}
            </Typography>

            <Button
                onClick={addToMark}
                style={{width: 200}}
                variant="contained"
                color="primary"
                className={classes.submit}>
                Pridėti pažymį
            </Button>


            <FormControl className={classes.formControl}>
                <Select
                    value={currentSelectedMark}
                    onChange={event => setCurrentSelectedMark(event.target.value)}
                    displayEmpty
                    name={"mark_type"}
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="0" disabled>
                        Pažymys
                    </MenuItem>
                    {
                        availableMarks.map(i=>{
                            return <MenuItem value={i}>{i}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </div>
    )
}