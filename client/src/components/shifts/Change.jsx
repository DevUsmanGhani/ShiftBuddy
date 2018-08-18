import React from 'react';
import { Table } from 'react-bootstrap';
import _ from 'lodash';

export default ({ starting, ending }) => {
  const changeTypes = ['pennies', 'nickels', 'dimes', 'quarters', 'ones', 'fives', 'tens', 'twenties']
  return (
    <Table>
      <thead>
        <tr>
          <th>Change Type</th>
          <th>Starting Amount</th>
          <th>Ending Amount</th>
          <th>Amount Used</th> 
          <th>Amount Used ($)</th>
        </tr>
      </thead>
      <tbody>
        {_.map(changeTypes, changeType => {
            return(
              <tr key={changeType}>
                <td key={changeType + 'name'}>{changeType}</td>
                <td key={changeType + 'starting'}>{starting.changeType}</td>
                <td key={changeType + 'ending'}>{ending.changeType}</td>
                <td key={changeType + 'numDiff'}>{ending.changeType - starting.changeType}</td>  
                <td key={changeType + 'moneyDiff'}>{calcChangeUsed(ending.changeType - starting.changeType, changeType)}</td> 
              </tr>
            )
        })}
      </tbody>
    </Table>
  )
}

const calcChangeUsed = (amtUsed, type) => {
  const changeValues = {'pennies': 0.01, 'nickels': 0.05, 'dimes': 0.10, 'quarters': 0.25, 'ones': 1.00, 'fives': 5.00, 'tens': 10.00, 'twenties': 20.00}
  return(amtUsed * changeValues[type])
}
