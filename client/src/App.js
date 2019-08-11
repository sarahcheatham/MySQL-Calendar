import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Calendar from './components/Calendar';
import Form from './components/Form';
import fakeData from './api/calendar.json';
import { connect } from 'react-redux';
import { loadUsers, loadPosts } from './store/actions';

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
    //uncomment when working with SQL database
    this.props.loadUsers();
    // console.log(this.props)
    this.props.loadPosts(1);
    // this.setState({ fakeData })
  }

  selectDate = date => {
    // console.log("date:", date)
    this.setState({selectedDate: date.selectedDate})
  }
  
  render(){
    console.log(this.props)
    return (
      <div className="App">
        {/* <Header user={this.state.user} fakeData={this.state.fakeData}/> */}
        <Header/>
        <span id="empty-span"></span>
        {/* <Calendar posts={this.props.posts.posts} onDateSelect={this.selectDate}/> */}
        {/* <Calendar fakeData={this.state.fakeData} onDateSelect={this.selectDate}/> */}
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
      // users: {
      //     loading: state.users.loading,
      //     error: state.users.error,
      //     userArr: state.users.userArr
      // },
      // posts: {
      //     loading: state.posts.loading,
      //     error: state.posts.error,
      //     postArr: state.posts.postArr
      // }
  }
}

const mapDispatchToProps = dispatch => {
  return {
      loadUsers: () => dispatch(loadUsers()),
      loadPosts: (userId) => dispatch(loadPosts(userId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (App);

