import React, {Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { isEmpty } from '../../functions/isEmpty';
import TableRow from './TableRow';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import MonthHeader from './MonthHeader';
import TableBody from './TableBody';
import { distinct } from '../../functions/distinct';
import dateFns from 'date-fns';

const EventTable = props => {
    if(!isEmpty(props.posts)){
        return (
            <Table hover>
                <thead>
                    <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Description</th>
                    </tr>
                </thead>
                <TableBody/>
            </Table>
        ) 
    } else {
        return <LoadingSpinner/>
    }
}

export default EventTable