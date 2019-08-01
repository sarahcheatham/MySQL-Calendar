import React from 'react';
// import { connect } from 'react-redux';
import { loadPosts, createPost } from '../store/actions';
import FormHeader from './FormHeader';

class Form extends React.Component{
    state = {
        posts: [],
        date: "",
        time: "",
        location: "",
        desc: "",
        show: false,
    }

    handleFormChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    handleFormShow = e => {
        this.setState({show: true})
    }

    handleFormSubmit = e => {
        e.preventDefault();
        
        const id = this.props.posts.posts.posts.length + 1;
        const date = this.props.date;
        const time = this.state.time;
        const location = this.state.location;
        const description = this.state.desc;
        const userId = 1;

        this.props.createPost({ id, date, time, location, description, userId })
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
        posts: {
            loading: state.loading,
            error: state.error,
            posts: state.posts
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadPosts: () => dispatch(loadPosts()),
        createPost: newPost => dispatch(createPost(newPost))
    }
}

// export default connect(mapStateToProps, mapDispatchToProps) (Form);
export default Form;
