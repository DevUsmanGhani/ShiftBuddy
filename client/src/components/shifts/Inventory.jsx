import _ from 'lodash'
import React from 'react';
import { Table } from 'react-bootstrap';
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
  return (
    <Table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th className="right">Starting Quantity</th>
          <th className="right">Ending Quantity</th>
          <th className="right">Quantity Sold</th> 
        </tr>
      </thead>
      <tbody>
        {_.map(Object.keys(starting), item => {
          console.log(item);
            return(
              <tr key={item}>
                <td key={item + 'name'}>{item}</td>
                <td className="right" key={item + 'starting'}>{starting[item]}</td>
                <td className="right" key={item + 'ending'}>{ending[item]}</td>
                <td className="right" key={item + 'numDiff'}>{showOrDash(starting[item] - ending[item])}</td>  
              </tr>
            )
        })}
      </tbody>
    </Table>
  )
}
