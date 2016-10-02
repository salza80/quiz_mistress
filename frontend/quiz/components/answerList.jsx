const React = require('react');
const Answer = require('./answer.jsx')


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
    var aList = this.props.answers.map(function(answer,i) {
      return (
        <Answer index={i} answer={answer} key={i}> </Answer>
      );
     });
    return (
     <div className="quiz-answers well"> 
      <p>Select your answer!</p>
      <ul className="answer-box list-group">
       {aList}
      </ul>
    </div>
    );
  }
});

module.exports = React.createFactory(AnswerList);
