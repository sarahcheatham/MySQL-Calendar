import React from 'react';
import dateFns from 'date-fns';

const TableRow = props => {
    return (
        <tr>
            <th>{props.date}</th>
            <td>{props.time}</td>
            <td>{props.location}</td>
            <td>{props.description}</td>
        </tr>
    )
}

export default TableRow;