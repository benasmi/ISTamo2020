import React, { useState } from "react";
import { Table } from "rsuite-table";
import { Column } from "rsuite-table";
import { HeaderCell } from "rsuite-table";
import { Cell } from "rsuite-table";
import fakeData from "../data/UsersData.json";
import "rsuite-table/dist/css/rsuite-table.css";

export const Userstable = () => {
    const [fakeDatum] = useState(fakeData);
  
    return (
      <Table data={fakeDatum} height={400} width={1180}>
        <Column width={40} align="center" fixed >
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="id" />
        </Column>
        <Column width={150} align="center" fixed >
          <HeaderCell>Vardas</HeaderCell>
          <Cell dataKey="vardas" />
        </Column>
        <Column width={150} align="center" fixed>
          <HeaderCell>Pavarde</HeaderCell>
          <Cell dataKey="pavarde" />
        </Column>
        <Column width={150} align="center" fixed >
          <HeaderCell>Vartotojo v.</HeaderCell>
          <Cell dataKey="username" />
        </Column>
        <Column width={150} align="center" fixed >
          <HeaderCell>Slaptazodis</HeaderCell>
          <Cell dataKey="pass" />
        </Column>
        <Column width={60} align="center" fixed >
          <HeaderCell>Klase</HeaderCell>
          <Cell dataKey="klasesNr" />
        </Column>
        <Column width={110} align="center" fixed >
          <HeaderCell>Klases raide</HeaderCell>
          <Cell dataKey="klasesR" />
        </Column>
        <Column width={150} align="center" fixed >
          <HeaderCell>Vartotojo tipas</HeaderCell>
          <Cell dataKey="userType" />
        </Column>
        <Column width={200} fixed="right" align="right">
          <HeaderCell>Veiksmai</HeaderCell>
          <Cell>
            {(rowData) => {
              function handleAction() {
                alert(`id:${rowData.id}`);
              }
              return (
                <span>
                  <a onClick={handleAction}>
                    {" "}
                    <b>Keisti</b>{" "}
                  </a>{" "}
                  |
                  <a onClick={handleAction}>
                    {" "}
                    <b>Naikinti</b>{" "}
                  </a>
                </span>
              );
            }}
          </Cell>
        </Column>
      </Table>
    );
  };