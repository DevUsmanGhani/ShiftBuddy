import React from 'react';
import { Table } from 'react-bootstrap';
import _ from 'lodash';

export default ({ cashDrops }) => {
  return (
    <Table className="paid-out-table">
      <thead>
        <tr>
          <th className="center">Number</th>
          <th className="center">Amount ($)</th>
        </tr>
      </thead>
      <tbody>
        {_.map(cashDrops, cashDrop => {
          if(cashDrop){
            return(
              <tr key={cashDrop._id + 'tr'}>
                <td className="center" key={cashDrop._id + 'name'}>{cashDrop.name}</td>
                <td className="center" key={cashDrop._id + 'amt'}>{cashDrop.amount}</td>
              </tr>
            )
          }
        })}
      </tbody>
    </Table>
  )
}
