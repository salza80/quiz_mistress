const React = require('react');
const QuizActions= require('../actions/quiz_actions')



var Answer = React.createClass({
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
  answerQuestion: function(){
    QuizActions.answerQuestion(this.props.answer)
  },
  render: function() {
    return (
        <li onClick={this.answerQuestion} className="list-group-item">
          <span className='fa' aria-hidden="true"></span>
          <span>{this.props.answer.title}</span>
        </li>
    );
  }
});

module.exports = React.createFactory(Answer);
