
import React from 'react';

const Header = (props) => {
    let userName = '';
    const firstUser = props.fakeData[0];
    if(firstUser){
        userName = firstUser.user.firstName
    }
    // const userName = props.dummieUsers.map(user => user.username)
    // uncomment when working with SQL database
    // const userName = props.users.map(user => user.firstName);
    return (
        <header id="user-calendar-header">
            <span>{userName}'s Calendar</span>
        </header>
    );
}
export default Header;