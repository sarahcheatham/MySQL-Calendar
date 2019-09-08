import React, { Component } from 'react';
import EventTable from '../../components/EventTable/EventTable';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class EventTablePage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Container>
                <EventTable {...this.props}/>
            </Container>
        )
    }
}
const mapStateToProps = state => {

    return {
        posts: state.posts.postArr
    }
}
export default withRouter(connect(mapStateToProps)(EventTablePage));