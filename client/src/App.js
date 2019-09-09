import React, { Component } from 'react';
import './App.css';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import EventTablePage from './pages/EventTablePage/EventTablePage';
import fakeData from './api/calendar.json';
import { connect } from 'react-redux';
import { loadUsers } from './store/actions/userActions';
import { loadPosts } from './store/actions/postActions';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

 class App extends Component {
   constructor(){
    super();
    this.state = {
      user: [],
      posts: [],
      fakeData: [],
      selectedDate: "",
      userName: "",
    }
  }

  componentDidMount(){
    this.props.loadUsers();
    this.props.loadPosts(1);
  }

  // selectDate = date => {
  //   this.setState({selectedDate: date.selectedDate})
  // }
  
  render(){
    return (
      <Router>
      <div className="calendar-app">
        {/* <Header/>
        <span id="empty-span"></span>
        <Calendar onDateSelect={this.selectDate}/>
        <Form onChange={this.selectDate} date={this.state.selectedDate}/> */}
          <Switch>
            <Route exact path="/" component={CalendarPage}/>
            <Route path="/events" component={EventTablePage}/>
          </Switch>
      </div>
      </Router>
    );
  }
}
const mapStateToProps = state => {
  return {
    users: state.users,
    posts: state.posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
      loadUsers: () => dispatch(loadUsers()),
      loadPosts: (userId) => dispatch(loadPosts(userId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (App);

