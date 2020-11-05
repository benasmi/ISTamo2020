import React from 'react'
import Table from '@material-ui/core/Table';





export default function SchedulePage(){




    return (
        
          <div >
            
            <Table border="1px">
                <tr>  <th>Laikas</th> <th>Pirmadienis</th> <th>Antradienis</th> <th>Trečiadienis</th> <th>Ketvirtadienis</th> <th>Penktadienis</th>  </tr>
                <tr>  <td>9:00-10:30</td> <td>1</td> <td>2</td> <td>3</td> <td>4</td> <td>5</td> </tr>
                <tr>  <td>11:00-12:30</td> <td>1</td> <td>2</td> <td>3</td> <td>4</td> <td>5</td> </tr>
                <tr>  <td>13:30-15:00</td> <td>1</td> <td>2</td> <td>3</td> <td>4</td> <td>5</td> </tr>
                <tr>  <td>15:30-17:00</td> <td>1</td> <td>2</td> <td>3</td> <td>4</td> <td>5</td> </tr>
            </Table>



          </div>
          
      );

    
}