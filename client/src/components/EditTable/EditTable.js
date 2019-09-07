import React, {Component } from 'react';
import { connect } from 'react-redux';


class EditTable extends Component {
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props)
        return (
            <div>Table</div>
        )
    }
}
const mapStateToProps = state => {
    return {
        posts: state.posts
    }
}
export default connect(mapStateToProps)(EditTable)