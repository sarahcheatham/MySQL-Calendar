import React from 'react';
import { connect } from 'react-redux';
import { loadPosts, createPost, toggleDropDown } from '../store/actions';
import FormHeader from './FormHeader';

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            date: "",
            time: "",
            location: "",
            desc: "",
            show: false,
        }
    }
    

    componentDidMount(){
        console.log(this.props)
    }

    handleFormChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    handleFormShow = e => {
        this.props.toggleDropDown()
        console.log(this.props.dropDown)
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
        

    }

    renderForm(){
        return (
            <form id="form" onSubmit={this.handleFormSubmit}>
                    <label>
                        Date:
                        <input className="formInput" type="text" style={{color: "var(--tumeric)"}} name="date" value={this.props.date} onChange={this.handleFormChange} placeholder={new Date()}/>
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
       
        return (
            <div id="formContainer">
                <FormHeader/>
                <button id="createButton" onClick={this.handleFormShow}> + </button>
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

