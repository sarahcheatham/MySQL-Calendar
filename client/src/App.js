import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Calendar from './components/Calendar/Calendar';
import Form from './components/Form/Form';
import fakeData from './api/calendar.json';
import { connect } from 'react-redux';
import { loadUsers } from './store/actions/userActions';
import { loadPosts } from './store/actions/postActions';

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

