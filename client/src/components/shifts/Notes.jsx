import React from 'react';
import { Table } from 'react-bootstrap';
import _ from 'lodash';

export default ({ notes }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        {_.map(notes, note => {
          if(note){
            return(
              <tr key={note._id + 'tr'}>
                <td key={note._id + 'title'}>{note.title}</td>
                <td key={note._id + 'message'}>{note.message}</td>
              </tr>
            )
          }
        })}
      </tbody>
    </Table>
  )
}
