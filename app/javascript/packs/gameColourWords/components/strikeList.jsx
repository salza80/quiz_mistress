const React = require('react');
const Strike = require('./strike.jsx')


var StrikeList = React.createClass({
  getInitialState: function() {
    return {
           
          };
  },

  conponentWillMount: function(){
    
  },
  componentDidMount: function() {
   
   
    },
  componentWillUnmount: function() {

  },
  render: function() {
    const scores =[1,2,3];
    const aList = scores.map((i) =>
        <Strike striked={i <= this.props.strikes.no} key={i}> </Strike>
      );
     
    return (
     <div className="strike-list"> 
       {aList}
    </div>
    );
  }
});

module.exports = React.createFactory(StrikeList);
