import React from 'react';
import { Table } from 'react-bootstrap';
import _ from 'lodash';

export default ({ paidOuts }) => {
  return (
    <Table className="paid-out-table" bordered condensed hover>
      <thead>
        <tr>
          <th>Company</th>
          <th>Amount</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {_.map(paidOuts, paidOut => {
          if(paidOut){
            return(
              <tr key={paidOut._id + 'tr'}>
                <td key={paidOut._id + 'name'}>{paidOut.name}</td>
                <td key={paidOut._id + 'amt'}>${paidOut.amount}</td>
                <td key={paidOut._id + 'notes'}>{paidOut.notes}</td>
              </tr>
            )
          }
        })}
      </tbody>
    </Table>
  )
}
