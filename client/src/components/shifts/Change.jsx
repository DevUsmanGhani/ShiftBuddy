import React from 'react';
import { Table } from 'react-bootstrap';
import _ from 'lodash';

export default ({ starting, ending }) => {
  starting = starting.replace(/'/g, '"');
  ending = ending.replace(/'/g, '"');
  starting = JSON.parse(starting);
  ending = JSON.parse(ending);  
  const changeTypes = ['pennies', 'nickels', 'dimes', 'quarters', 'ones', 'fives', 'tens', 'twenties']
  let total = 0;
  return (
    <Table>
      <thead>
        <tr>
          <th>Change Type</th>
          <th>Starting Quantity</th>
          <th>Ending Quantity</th>
          <th>Quantity Used</th> 
          <th>Amount Used ($)</th>
        </tr>
      </thead>
      <tbody>
        {_.map(changeTypes, changeType => {
            let moneyDiff = calcChangeUsed(starting[changeType] - ending[changeType], changeType);
            total += moneyDiff;
            return(
              <tr key={changeType}>
                <td key={changeType + 'name'}>{changeType.charAt(0).toUpperCase() + changeType.slice(1)}</td>
                <td key={changeType + 'starting'}>{starting[changeType]}</td>
                <td key={changeType + 'ending'}>{ending[changeType]}</td>
                <td key={changeType + 'numDiff'}>{starting[changeType] - ending[changeType]}</td>  
                <td key={changeType + 'moneyDiff'}>{moneyDiff.toFixed(2)}</td> 
              </tr>
            )
        })}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>Total:</td>
          <td>{total.toFixed(2)}</td>
        </tr>
      </tbody>
    </Table>
  )
}

const calcChangeUsed = (amtUsed, type, total) => {
  const changeValues = {'pennies': 0.5, 'nickels': 2, 'dimes': 5, 'quarters': 10, 'ones': 20, 'fives': 40, 'tens': 40, 'twenties': 100}
  return(amtUsed * changeValues[type]);
}
