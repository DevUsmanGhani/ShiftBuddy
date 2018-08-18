import React from 'react';
import { Table } from 'react-bootstrap';
import _ from 'lodash';

export default ({ paidOuts }) => {
  return (
    <Table className="paid-out-table" >
      <thead>
        <tr>
          <th>Company</th>
          <th className="right">Amount ($)</th>
          <th className="longer">Notes</th>
        </tr>
      </thead>
      <tbody>
        {_.map(paidOuts, paidOut => {
          if(paidOut){
            return(
              <tr key={paidOut._id + 'tr'}>
                <td key={paidOut._id + 'name'}>{paidOut.name}</td>
                <td className="right" key={paidOut._id + 'amt'}>{paidOut.amount}</td>
                <td className="notes"key={paidOut._id + 'notes'}>{paidOut.notes || "No Notes"}</td>
              </tr>
            )
          }
        })}
      </tbody>
    </Table>
  )
}
