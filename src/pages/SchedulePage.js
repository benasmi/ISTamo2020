import React, {useEffect, useState} from 'react'
import Table from '@material-ui/core/Table';
import {GenericTable} from "../components/GenericTable";
import ScheduleData from '../data/ScheduleData.json'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import GradeIcon from "@material-ui/icons/Grade";
import ListAltIcon from "@material-ui/icons/ListAlt";
import {useHistory} from "react-router-dom";
import API from "../networking/api";
import Chip from "@material-ui/core/Chip";
import * as moment from "moment";


export function parseSchedule(num){
    switch (num) {
        case 1:
            return 'Pirmadienis'
        case 2:
            return 'Atradienis'
        case 3:
            return 'Trečiadienis'
        case 4:
            return 'Ketvirtadienis'
        case 5:
            return 'Penktadienis'
    }
}

export default function SchedulePage(){
    let history = useHistory();
    const [scheduleData, setScheduleData] = useState([]);

    useEffect(()=>{
        API.Schedule.getSchedule().then(response=>{
            setScheduleData(response)
        }).catch(err=>{

        })

    },[])



    function editSchedule(subjectTime){
        history.push(`/app/schedule/create/${subjectTime.id}`)
    }

    function ScheduleData(){
        return scheduleData.map(subject=>{
            return <div style={{marginTop: 32}}>
                <Typography variant='h5'>
                    {subject.name} - {subject.description}({subject.hours}H)
                </Typography>
                <div>
                    {subject.schedule.map(subjectTime =>{
                        return <Chip  onClick={()=>editSchedule(subjectTime)} style={{marginLeft: 8}} label={`${parseSchedule(subjectTime.week_day)} - ${subjectTime.subject_time} | ${subjectTime.room.description}(${subjectTime.room.name})`} key={subjectTime.id} />
                    })}
                </div>
            </div>
        })
    }

    return (
            <>
                <div>
                    <Typography variant={'h3'}>
                        Tvarkaraščio langas
                    </Typography>
                    <div style={{padding: 16}}>
                        <Button
                            style={{marginLeft: 16}}
                            variant={'contained'}
                            startIcon={<AddIcon/>}
                            color='primary'
                            onClick={()=>{
                                history.push('/app/schedule/create')
                            }}>
                            Pridėti tvarkaštį
                        </Button>
                        <Button
                            style={{marginLeft: 16}}
                            variant={'contained'}
                            startIcon={<GradeIcon/>}
                            color='primary'
                            onClick={()=>{
                                history.push('/app/schedule/test')
                            }}>
                            Pridėti atsiskaitymą
                        </Button>
                        <Button
                            style={{marginLeft: 16}}
                            variant={'contained'}
                            startIcon={<ListAltIcon/>}
                            color='primary'
                            onClick={()=>{
                                history.push('/app/schedule/report')
                            }}>
                            Atsiskaitymų išklotinė
                        </Button>
                    </div>

                </div>


          <div style={{marginTop: 32}}>
              {ScheduleData()}
          </div>
                </>
          
      );

    
}