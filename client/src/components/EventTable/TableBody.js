import React, { Component } from 'react';
import TableRow from './TableRow';
import MonthHeader from './MonthHeader';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import { isEmpty } from '../../functions/isEmpty';
import { distinct } from '../../functions/distinct';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

class TableBody extends Component {
    constructor(props){
        super(props);
    }
    

    renderRows = (posts, target) => {
        const rows = posts.map((post, index)=> {
            const date = dateFns.format(post.date, 'MM/DD/YYYY');
            return <TableRow key={index} date={date} time={post.time} location={post.location} description={post.description}/>
        })
        return rows
    }


    renderMonthHeader = (target, posts) => {
        const header = posts.map((post, index)=> {
            const month = dateFns.format(post.date, "MMMM");
            for(let i = 0; i < target.length; i++){
                if(target[i] === index){
                    return <MonthHeader key={i} target={index} month={month} className="month-header"/>
                }
            }
        })
        return header
    }

    targetMonths = months => {
        const indexArr = []
        const targetIndex = months.forEach((mo, i)=> {
            if(distinct(mo, i, months)){
                indexArr.push(i)
            }
        })
        return indexArr
    }

    getMonths = () => {
      const month = this.props.posts.map(post => dateFns.format(post.date, "MMMM"))    
      return month
    }

    render(){
        if(!isEmpty(this.props.posts)){
            const months = this.getMonths();
            const target = this.targetMonths(months);
            const monthHeader = this.renderMonthHeader(target, this.props.posts);
            const rows = this.renderRows(this.props.posts, target);
            const everything = rows.map((row, index)=> {
                const header = monthHeader.filter(r => r !== undefined)
                for(let i = 0; i < header.length; i++){
                    console.log(row, index)
                    if(header[i].props.target === index){
                        rows.splice(index, 0, header[i])
                    }
                }
                
            })
            return(
                <tbody>
                    {everything}
                    {rows}
                </tbody>
            )
        } else {
            return <LoadingSpinner/>
        }
        
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.postArr
    }
}

export default connect(mapStateToProps)(TableBody)