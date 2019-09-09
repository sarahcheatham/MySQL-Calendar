import React, { Component } from 'react';

const MonthHeader = props => {
    return (
        <tr month={props.month} className={props.className}>
            <th>{props.month}</th>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    )
} 
    
export default MonthHeader;