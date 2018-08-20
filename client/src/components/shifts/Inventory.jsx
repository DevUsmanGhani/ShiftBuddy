import _ from 'lodash'
import React from 'react';
import { Table } from 'react-bootstrap';

export default ({ starting, ending }) => {
  if (!_.isEmpty(starting)) {
    starting = starting.replace(/'/g, '"');
    ending = ending.replace(/'/g, '"');
  }
  if (!_.isEmpty(ending)) {
    starting = JSON.parse(starting);
    ending = JSON.parse(ending);
  }
  return (
    <Table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Starting Quantity</th>
          <th>Ending Quantity</th>
          <th>Quantity Sold</th> 
        </tr>
      </thead>
      <tbody>
        {_.map(Object.keys(starting), item => {
          console.log(item);
            return(
              <tr key={item}>
                <td key={item + 'name'}>{item}</td>
                <td key={item + 'starting'}>{starting[item]}</td>
                <td key={item + 'ending'}>{ending[item]}</td>
                <td key={item + 'numDiff'}>{starting[item] - ending[item]}</td>  
              </tr>
            )
        })}
      </tbody>
    </Table>
  )
}
