import React, {useState} from 'react'
import Table from '@material-ui/core/Table';
import {GenericTable} from "../components/GenericTable";
import ScheduleData from '../data/ScheduleData.json'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import GradeIcon from "@material-ui/icons/Grade";
import ListAltIcon from "@material-ui/icons/ListAlt";
import {useHistory} from "react-router-dom";




export default function SchedulePage(){
    let history = useHistory();

    const [scheduleDate, setScheduleData] = useState(ScheduleData)
    const tableHeader = [
        {id: "time", label: "Laikas"},
        {id: "mon", label: "Pirmadienis"},
        {id: "tue", label: "Antradienis"},
        {id: "wed", label: "Trečiadienis"},
        {id: "thu", label: "Ketvirtadienis"},
        {id: "fri", label: "Penktadienis"}
    ]


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
              <GenericTable
                  header={tableHeader}
                  data={scheduleDate}
                  handleUpdate={()=>{
                      history.push('/app/schedule/1')
                  }}
                  handleRemove={()=>{}}
              />
          </div>
                </>
          
      );

    
}