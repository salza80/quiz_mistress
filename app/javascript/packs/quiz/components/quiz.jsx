const React = require('react');
const QuizStore = require('../stores/quiz_store')
const QuizActions= require('../actions/quiz_actions')
const Question= require('./question.jsx')

var Quiz = React.createClass({
  getInitialState: function() {
    return {
            title: '',
            question: {
              answers: []
            }
          };
  },

  onStoreChange: function(data){
    this.setState({
      title: data.title,
      question: data.question
    }, this.onStateUpdated);
  },
  onStateUpdated: function(){
   
  },
  conponentWillMount: function(){
    
  },
  componentDidMount: function() {
      this.unsubscribe = QuizStore.listen(this.onStoreChange);
      QuizActions.Load(this.props.url_name, this.props.preview)
    },
  componentWillUnmount: function() {
    this.unsubscribe();
  },
  render: function() {
    return (
      <div className="quiz-container card text-center">
        <div className="quiz card-header heading-bk">
          <div className="quiz-title">
            <h2 className="card-title"> {this.state.title}</h2>
          </div>
        </div>
        <div className="question-container card-block">
          <Question question={this.state.question}></Question>
        </div>
      </div>
    );
  }
});

module.exports = React.createFactory(Quiz);
