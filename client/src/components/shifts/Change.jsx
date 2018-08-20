import React from 'react';
import { Table } from 'react-bootstrap';
import _ from 'lodash';
import showOrDash from '../../utils/showOrDash';


export default ({ starting, ending }) => {
  if (!_.isEmpty(starting)) {
    starting = starting.replace(/'/g, '"');
    ending = ending.replace(/'/g, '"');
  }
  if (!_.isEmpty(ending)) {
    starting = JSON.parse(starting);
    ending = JSON.parse(ending);
  }
  const changeTypes = ['pennies', 'nickels', 'dimes', 'quarters', 'ones', 'fives', 'tens', 'twenties']
  let total = 0;
  return (
    <Table>
      <thead>
        <tr>
          <th>Change Type</th>
          <th className="right">Starting Quantity</th>
          <th className="right">Ending Quantity</th>
          <th className="right">Quantity Used</th> 
          <th className="right">Amount Used ($)</th>
        </tr>
      </thead>
      <tbody>
        {_.map(changeTypes, changeType => {
            let moneyDiff = calcChangeUsed(starting[changeType] - ending[changeType], changeType);
            total += moneyDiff;
            return(
              <tr key={changeType}>
                <td key={changeType + 'name'}>{changeType.charAt(0).toUpperCase() + changeType.slice(1)}</td>
                <td key={changeType + 'starting'} className="right">{starting[changeType]}</td>
                <td key={changeType + 'ending'} className="right">{ending[changeType]}</td>
                <td key={changeType + 'numDiff'} className="right">{showOrDash(starting[changeType] - ending[changeType])}</td>  
                <td key={changeType + 'moneyDiff'} className="right">{showOrDash(moneyDiff.toFixed(2))}</td> 
              </tr>
            )
        })}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td className="right bold">Total:</td>
          <td className="right bold">{total.toFixed(2)}</td>
        </tr>
      </tbody>
    </Table>
  )
}

const calcChangeUsed = (amtUsed, type, total) => {
  const changeValues = {'pennies': 0.5, 'nickels': 2, 'dimes': 5, 'quarters': 10, 'ones': 20, 'fives': 40, 'tens': 40, 'twenties': 100}
  return(amtUsed * changeValues[type]);
}
