import React from 'react';
import { connect } from 'react-redux';
import { loadPosts, createPost } from '../store/actions';
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
        this.setState({show: true})
    }

    handleFormSubmit = e => {
        e.preventDefault();
        
        const date = this.props.date;
        const time = this.state.time;
        const location = this.state.location;
        const description = this.state.desc;
        const userId = 1;

        // this.props.createPost(userId, { ...date, time, location, description })
        let options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ date, time, location, description })
        }
        fetch(`/users/${userId}/posts`, options).then((res)=>{
            return res.json()
        }).then((res)=>{
            console.log("response:", res)
        }).catch((err)=>{
            console.log("error:", err)
        })
        this.props.loadPosts(userId)

    }

    renderForm(){
        return (
            <form id="form" onSubmit={this.handleFormSubmit}>
                    <label>
                        Date:
                        <input className="formInput" type="text" name="date" value={this.props.date} onChange={this.handleFormChange} placeholder={new Date()}/>
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
        return (
            <div id="formContainer">
                <FormHeader/>
                <button id="createButton" onClick={this.handleFormShow}> + </button>
                {this.state.show ? this.renderForm() : <div></div>}
            </div>
        )
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
        loadPosts: (userId) => dispatch(loadPosts(userId)),
        createPost: (userId, newPost) => dispatch(createPost(newPost))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Form);
// export default Form;
