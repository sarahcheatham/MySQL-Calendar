import React from 'react';
import "./Form.css";
import { connect } from 'react-redux';
import { toggleDropDown } from '../../store/actions';
import { loadPosts, createPost } from '../../store/actions/postActions';
import FormHeader from './FormHeader';
import { Button } from 'reactstrap';

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
                        DATE:
                        <input className="formInput" type="text" style={{color: "var(--evening-blue)"}} name="date" value={this.props.date} onChange={this.handleFormChange} placeholder={new Date()}/>
                    </label>
                    <label>
                        TIME:
                        <input className="formInput" type="text" name="time" onChange={this.handleFormChange}/>
                    </label>
                    <label>
                        LOCATION:
                        <input className="formInput" type="text" name="location" onChange={this.handleFormChange}/>
                    </label>
                    <label>
                        DESCRIPTION:
                        <input className="formInput" type="text" name="desc" onChange={this.handleFormChange} />
                    </label>
                    <button id="formSubmit" type="submit" value="Submit">SUBMIT</button>
                </form>
        )
    }
    render(){
        const form = this.renderForm();
        let signToShow = "";
        this.props.dropDown ? signToShow = " - " : signToShow = " + ";
        return (
            <div id="formContainer">
                <Button id="createButton" onClick={this.handleFormShow}>CREATE A NEW EVENT{signToShow}</Button>
                {this.props.dropDown && form}
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

