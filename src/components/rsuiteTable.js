import React, { useState } from "react";
import { Table } from "rsuite-table";
import { Column } from "rsuite-table";
import { HeaderCell } from "rsuite-table";
import { Cell } from "rsuite-table";
import fakeData from "../data/MarksData.json";
import "rsuite-table/dist/css/rsuite-table.css";

export const Rsuittable = () => {
    const [fakeDatum] = useState(fakeData);
  
    return (
      <Table data={fakeDatum} height={400} width={1080} >
        <Column width={40} align="center" fixed >
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="id" />
        </Column>
        <Column width={150} align="center" fixed >
          <HeaderCell>Dalykas</HeaderCell>
          <Cell dataKey="subject" />
        </Column>
        <Column width={90} align="center" >
          <HeaderCell>Savaitė</HeaderCell>
          <Cell />
        </Column>
        <Column width={40} align="center" fixed >
          <HeaderCell>1</HeaderCell>
          <Cell dataKey="w1" />
        </Column>
        <Column width={40} align="center" fixed >
          <HeaderCell>2</HeaderCell>
          <Cell dataKey="w2" />
        </Column>
        <Column width={40} align="center" fixed >
          <HeaderCell>3</HeaderCell>
          <Cell dataKey="w3" />
        </Column>
        <Column width={40} align="center" fixed >
          <HeaderCell>4</HeaderCell>
          <Cell dataKey="w4" />
        </Column>
        <Column width={40} align="center" fixed >
          <HeaderCell>5</HeaderCell>
          <Cell dataKey="w5" />
        </Column>
        <Column width={40} align="center" fixed >
          <HeaderCell>6</HeaderCell>
          <Cell dataKey="w6" />
        </Column>
        <Column width={40} align="center" fixed >
          <HeaderCell>7</HeaderCell>
          <Cell dataKey="w7" />
        </Column>
        <Column width={40} align="center" fixed >
          <HeaderCell>8</HeaderCell>
          <Cell dataKey="w8" />
        </Column>
        <Column width={40} align="center" fixed >
          <HeaderCell>9</HeaderCell>
          <Cell dataKey="w9" />
        </Column>
        <Column width={40} align="center" fixed >
          <HeaderCell>10</HeaderCell>
          <Cell dataKey="w10" />
        </Column>
        <Column width={40} align="center" fixed >
          <HeaderCell>11</HeaderCell>
          <Cell dataKey="w11" />
        </Column>
        <Column width={40} align="center" fixed >
          <HeaderCell>12</HeaderCell>
          <Cell dataKey="w12" />
        </Column>
        <Column width={40} align="center" fixed >
          <HeaderCell>13</HeaderCell>
          <Cell dataKey="w13" />
        </Column>
        <Column width={40} align="center" fixed >
          <HeaderCell>14</HeaderCell>
          <Cell dataKey="w14" />
        </Column>
        <Column width={40} align="center" fixed >
          <HeaderCell>15</HeaderCell>
          <Cell dataKey="w15" />
        </Column>
        <Column width={40} align="center" fixed >
          <HeaderCell>16</HeaderCell>
          <Cell dataKey="w16" />
        </Column>
        <Column width={160} fixed="right" align="right">
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