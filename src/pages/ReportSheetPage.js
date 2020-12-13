import React, {useEffect, useState} from 'react'
import API from "../networking/api";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import jsPDF from "jspdf";
import Button from "@material-ui/core/Button";
import html2canvas from "html2canvas";

export default function ReportSheetPage(){

    const [settings, setSettings] = useState({school_name: ''});
    const [report, setReport] = useState();

    useEffect(()=>{
       API.System.getSettings().then(res=>{
           setSettings(res)
       }) .catch(()=>{

       });

        API.System.getReport().then(rp=>{
            console.log("RP", rp)
          setReport(rp)
        }).catch(()=>{

        })
    },[])


    function exportAsPdf(){
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save("download.pdf");
            })
        ;
    }

    return (
        <Paper elevation={3} style={{padding: 16, width: '45%', height: 1500}} id="divToPrint">
            <Typography variant='h4'>{settings.school_name}</Typography>
            <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Typography style={{color: 'gray'}} variant='h5'>{settings.school_address}</Typography>
                <Typography style={{color: 'gray'}} variant='h5'>{settings.school_number}</Typography>
            </div>
            <Divider style={{marginTop: 8}}/>
            <Typography variant='h6' style={{marginTop: 32}}>
                Mokyklos dalykai
            </Typography>
            <div>
                {console.log(report)}
                {report ? report.schoolSubjects.map(row=>{
                    return (
                        <div style={{border: '1px solid', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, padding: 8}}>
                            <Typography variant="subtitle1">
                                {row.name}
                            </Typography>
                            <Typography variant="subtitle1">
                                {row.description}
                            </Typography>
                            <Typography variant="subtitle1">
                                {row.hours} H
                            </Typography>
                        </div>
                    )
                }) : null}
            </div>
            <Divider style={{marginTop: 32}}/>
            <Typography variant='h6' style={{marginTop: 8}}>
                Mokyklos mokiniai
            </Typography>
            <TableContainer component={Paper} style={{marginTop: 8}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Vardas</TableCell>
                            <TableCell align="right">Pavardė</TableCell>
                            <TableCell align="right">Paštas)</TableCell>
                            <TableCell align="right">Dalykų skaičius</TableCell>
                            <TableCell align="right">Vidurkis</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {report ? report.studentsData.map(row=>{
                            return (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.surname}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.subjectsCount}</TableCell>
                                    <TableCell align="right">{row.average}</TableCell>
                                </TableRow>
                            )
                        }) : null}
                        <TableRow>
                            <TableCell rowSpan={4} />
                            <TableCell colSpan={2}><b>Bendras studentų vidurkis</b></TableCell>
                            <TableCell align="right"><b>{report? report.schoolAverage : 0}</b></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button style={{marginTop: 16}}variant='contained' color='primary' onClick={exportAsPdf}>
                Parsisiųsti
            </Button>
        </Paper>
    );
}