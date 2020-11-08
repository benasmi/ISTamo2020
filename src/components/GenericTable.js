import React, { useState } from "react";
import { Table } from "rsuite-table";
import { Column } from "rsuite-table";
import { HeaderCell } from "rsuite-table";
import { Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import Button from "@material-ui/core/Button";

export const GenericTable = ({header, data, handleUpdate, handleRemove }) => {

    return (
      <Table data={data} height={50*data.length} width={((data.length-1) * 90)}>
          {header.map(headCell=>{
              return (
                  <Column align="center" width={100} >
                      <HeaderCell>{headCell.label}</HeaderCell>
                      <Cell dataKey={headCell.id} />
                  </Column>
              )
          })}
        <Column align="center" width={200}>
          <HeaderCell>Veiksmai</HeaderCell>
          <Cell>
              {(rowData, rowIndex) => {
                  return (
                      <span>
                        <Button color='primary' onClick={()=>{handleUpdate(data[rowIndex].id)}}>
                             Keisti
                        </Button>
                        <Button color='secondary' onClick={()=>{handleRemove(data[rowIndex].id)}}>
                             Naikinti
                        </Button>
                </span>
                  )
              }}

          </Cell>
        </Column>
      </Table>
    );
  };