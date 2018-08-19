import React from 'react';
import destructureDate from '../../utils/destructureDate';
import { Table } from 'react-bootstrap';
import _ from 'lodash';

export default ({ checks }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Company</th>
          <th className="right">Amount ($)</th>
          <th className="right">Check #</th> 
        </tr>
      </thead>
      <tbody>
        {_.map(checks, check => {
          if(check){
            const { month: startMonth, day: startDay } = destructureDate(check.date);
            return(
              <tr key={check._id + 'tr'}>
                <td key={check._id + 'date'}>{startMonth} {startDay}</td>
                <td key={check._id + 'name'}>{check.name}</td>
                <td className="right" key={check._id + 'amt'}>{check.amount.toFixed(2)}</td>
                <td className="right" key={check._id + 'num'}>{check.num}</td>   
              </tr>
            )
          }
        })}
      </tbody>
    </Table>
  )
}
