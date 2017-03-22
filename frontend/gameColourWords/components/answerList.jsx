const React = require('react');
const AnswerBlock = require('./answerBlock.jsx')


var AnswerList = React.createClass({
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
    var aList = this.props.colours.map(function(colour,i) {
      return (
        <AnswerBlock index={i} colour={colour} key={i}> </AnswerBlock>
      );
     });
    return (
     <div className="answers-list well"> 
       {aList}
    </div>
    );
  }
});

module.exports = React.createFactory(AnswerList);
