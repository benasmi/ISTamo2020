import React, { useState } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export const GenericTable = ({header, data, handleUpdate, handleRemove }) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {header.map(headCell=>{
                            return <TableCell align="let">{headCell.label}</TableCell>
                        })}
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) =>{
                        return (
                            <TableRow key={row.name}>
                                {
                                    header.map(head =>{
                                        return  <TableCell component="th" align="left" scope="row">
                                            <TextField id="outlined-basic" label="" defaultValue={row[head.id]} />
                                            </TableCell>

                                    })
                                }
                                
                            </TableRow>
                        )
                    })}

                </TableBody>
            </Table>
        </TableContainer>
    );
  };