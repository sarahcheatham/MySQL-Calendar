import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Calendar from '../components/Calendar/Calendar';
import Header from '../components/Header/Header';
import Form from '../components/Form/Form';
import { Link } from 'react-router-dom';
import { Row, Button } from 'reactstrap';
import editIcon from '../icons/edit-icon.svg';

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
        const editTableBtn = { 
            color: "var(--eclipse)",
            backgroundColor: "var(--mermaid)",
            textDecoration: 'none',
            fontFamily: "operetta-8, serif",
            fontWeight: 500,
            fontStyle: "normal",
            fontSize: "18px"
        }
        return (
            <div className="App">
                {/* <Header/> */}
                <span id="empty-span">
                    <Button id="edit-table-btn" className="btn" type="button" style={editTableBtn}> 
                        <Link to={"/calendar/edit"} style={editTableBtn}><img src={editIcon} style={{paddingBottom: 5}} height={"28px"}/>{" "}EDIT CALENDAR</Link> 
                    </Button>
                </span>
                <Calendar onDateSelect={this.selectDate}/> 
                <Form onChange={this.selectDate} date={this.state.selectedDate}/>
            </div>
        )
    }
}

export default CalendarPage;