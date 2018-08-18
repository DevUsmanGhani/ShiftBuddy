import React from 'react';
import { Table } from 'react-bootstrap';
import _ from 'lodash';

export default ({ checks }) => {
  return (
    <Table className="paid-out-table" >
      <thead>
        <tr>
          <th>Date</th>
          <th>Company</th>
          <th className="right">Amount</th>
          <th className="right">Check #</th> 
        </tr>
      </thead>
      <tbody>
        {_.map(checks, check => {
          if(check){
            return(
              <tr key={check._id + 'tr'}>
                <td key={check._id + 'date'}>Aug 18</td>
                <td key={check._id + 'name'}>{check.name}</td>
                <td className="right" key={check._id + 'amt'}>${check.amount}</td>
                <td className="right" key={check._id + 'num'}>{check.num}</td>   
              </tr>
            )
          }
        })}
      </tbody>
    </Table>
  )
}
