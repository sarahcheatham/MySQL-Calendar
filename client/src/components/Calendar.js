import React from 'react';
import dateFns from 'date-fns';
import { connect } from 'react-redux';
import { loadPosts } from '../store/actions/index';

class Calendar extends React.Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        events: []
    };

    componentDidMount(){
        this.props.loadPosts(1)
    }

    componentDidUpdate(prevProps, prevState){
        console.log("prevState:", prevState.events)
        console.log("props:", this.props.posts.postArr)
        if(prevProps.posts.postArr !== this.props.posts.postArr ){
            //not empty
            this.setState({events: this.props.posts.postArr})
        }
    }

    renderHeader(){
        const dateFormat = "MMMM YYYY";
        return (
            <div className="header row flex-middle" id="calendar-header">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>chevron_left</div>
                </div>
                <div className="col col-center">
                    <span>
                        {dateFns.format(this.state.currentMonth, dateFormat)}
                    </span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        )
    }

    // renders the days of the week labels on the calendar
    renderDays(){
        const dateFormat = "dddd";
        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currentMonth);

        for(let i =0; i < 7; i++){
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }
        return <div className="days row">{days}</div>;
    }

    formatEvents(){
        const format = "ddd MMM DD YYYY";
        // console.log(this.state.events)

        // uncomment when connected to the database
        const events = this.state.events.map(item => {
            const date = dateFns.format(item.date, format)
            const id = item.id;
            const location = item.location;
            const time = item.time;
            const description = item.description
            return {id, date, time, location, description}
        });
        // uncomment when not connected to database
        // const events = this.props.fakeData.map(item => {
        //     const date = dateFns.format(item.date, format)
        //     const id = item.id;
        //     const location = item.location;
        //     const time = item.time;
        //     const description = item.description
        //     return {id, date, time, location, description}
        // });
        return events
    }

    renderActivity(activity, index){
        const format = "ddd MMM DD YYYY";
        const { currentMonth } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const unformattedDays = dateFns.eachDay(
            new Date(startDate),
            new Date(endDate)
        )

        const calendarDays = unformattedDays.map(day => {
            return dateFns.format(day, format)
        })

        let location = "";
        let time = "";
        let description = "";

        for(let i = 0; i < calendarDays.length; i++){
            if(activity.date === calendarDays[i]){
                location = activity.location;
                time = activity.time;
                description = activity.description;
            }
        }
        return (
            <span className="activity" key={index}>
                <div className="desc">{description}</div>
                <div className="time">{time}</div>
                <div className="location">{location}</div>
            </span>
        )
    }

    // renders the date boxes of the calendar
    renderCells(){
        const format = "ddd MMM DD YYYY";
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const events = this.formatEvents();
        
        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";
        
        while(day <= endDate){
            for(let i = 0; i < 7; i++){
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`col cell ${
                            !dateFns.isSameMonth(day, monthStart)
                                ? "disabled"
                                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                        }`}
                        key={day}
                        onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                        {events.map((event, index)=> {
                            if(dateFns.format(cloneDay.toString(), format) === event.date){
                                return this.renderActivity(event, index)
                            }
                            return ""
                        })}
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }


    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
        this.props.onDateSelect({
            selectedDate: day
        })
    };

    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };

    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    };

    render(){
        return (
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // users: state.users,
        posts: state.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadPosts: userId => dispatch(loadPosts(userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Calendar);
// export default Calendar;