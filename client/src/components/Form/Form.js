import React from 'react';
import "./Form.css";
import { connect } from 'react-redux';
import { toggleDropDown } from '../../store/actions';
import { loadPosts, createPost } from '../../store/actions/postActions';
import FormHeader from './FormHeader';
import { Link } from 'react-router-dom';

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            time: "",
            location: "",
            desc: "",
            show: false,
        }
    }

    handleFormChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    handleFormShow = e => {
        e.preventDefault();
        this.props.toggleDropDown()
    }

    handleFormSubmit = e => {
        e.preventDefault();
        
        const date = this.props.date;
        const time = this.state.time;
        const location = this.state.location;
        const description = this.state.desc;
        const userId = 1;

        const newPost = { userId, date, time, location, description };
    
        this.props.createPost(userId, newPost)
        this.props.loadPosts(userId)
        this.setState({ 
            time: "",
            location: "",
            desc: ""
        })
    }

    renderForm(){
        return (
            <form id="form" onSubmit={this.handleFormSubmit}>
                    <label>
                        Date:
                        <input className="formInput" type="text" style={{color: "var(--evening-blue)"}} name="date" value={this.props.date} onChange={this.handleFormChange} placeholder={new Date()}/>
                    </label>
                    <label>
                        Time:
                        <input className="formInput" type="text" name="time" onChange={this.handleFormChange}/>
                    </label>
                    <label>
                        Location:
                        <input className="formInput" type="text" name="location" onChange={this.handleFormChange}/>
                    </label>
                    <label>
                        Description:
                        <input className="formInput" type="text" name="desc" onChange={this.handleFormChange} />
                    </label>
                    <button id="formSubmit" type="submit" value="Submit">Submit</button>
                </form>
        )
    }
    render(){
        const form = this.renderForm();
        let signToShow = "";
        this.props.dropDown ? signToShow = " - " : signToShow = " + ";
        return (
            <div id="formContainer">
                <FormHeader/>
                <button id="createButton" onClick={this.handleFormShow}>{signToShow}</button>
                {this.props.dropDown && form}
                <button id="edit-table-btn" type="button"> 
                    <Link to={"/calendar/edit"}>Edit Calendar</Link> 
                </button> 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        posts: state.posts,
        dropDown: state.dropDown 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadPosts: (userId) => dispatch(loadPosts(userId)),
        createPost: (userId, newPost) => dispatch(createPost(userId, newPost)),
        toggleDropDown: () => dispatch(toggleDropDown())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Form);
