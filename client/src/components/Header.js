import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: [],
            userName: ""
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.users.userArr !== this.props.users.userArr){
            this.setState({ user: this.props.users.userArr})
        }
    }

   
    
    // const firstUser = props.user;
    // if(firstUser){
    //     console.log("here")
    // }
    
    // uncomment when working with SQL database
    // const userName = props.users.map(user => user.firstName);
    // const userName = props.user.map(u => u.first_name)
    render(){
        const user = this.state.user.map(u => u.first_name)
        console.log("user:", user)
        // const userName = this.props.fakeData[0]
        // let userName = 'Sarah';
        return (
            <header id="user-calendar-header">
                <span>{user}'s Calendar</span>
            </header>
        );
    }
    
}
const mapStateToProps = state => {
    return {
        users: {
            loading: state.users.loading,
            error: state.users.error,
            userArr: state.users.userArr
        }
    }
    
}

export default connect(mapStateToProps)(Header);
// export default Header;