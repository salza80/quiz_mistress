import React from 'react'
import Strike from './strike.jsx'

export default class StrikeList extends React.Component {
  render() {
    const scores =[1,2,3];
    const aList = scores.map((i) =>
        <Strike striked={i <= this.props.strikes.no} key={i}> </Strike>
      );
     
    return (
     <div className="strike-list"> 
       {aList}
    </div>
    )
  }
}
