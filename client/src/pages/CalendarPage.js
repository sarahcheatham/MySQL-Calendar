import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Calendar from '../components/Calendar/Calendar';
import Header from '../components/Header/Header';
import Form from '../components/Form/Form';

class CalendarPage extends Component {
    constructor(props){
        super(props);
        this.state ={
            selectedDate: "",
        }
    }
    selectDate = date => {
        this.setState({selectedDate: date.selectedDate})
      }
    render(){
        return (
            <div className="App">
                <Header/>
                <span id="empty-span"></span>
                <Calendar onDateSelect={this.selectDate}/>
                <Form onChange={this.selectDate} date={this.state.selectedDate}/>
            </div>
        )
    }
}

export default CalendarPage;