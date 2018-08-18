import React from 'react';
import { Table } from 'react-bootstrap';
import _ from 'lodash';

export default ({ cashDrops }) => {
  return (
    <Table className="paid-out-table" bordered condensed hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {_.map(cashDrops, cashDrop => {
          if(cashDrop){
            return(
              <tr key={cashDrop._id + 'tr'}>
                <td key={cashDrop._id + 'name'}>{cashDrop.name}</td>
                <td key={cashDrop._id + 'amt'}>${cashDrop.amount}</td>
              </tr>
            )
          }
        })}
      </tbody>
    </Table>
  )
}
