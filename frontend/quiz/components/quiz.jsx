const React = require('react');
const QuizStore = require('../stores/quiz_store')
const QuizActions= require('../actions/quiz_actions')
const Question= require('./question.jsx')

var Quiz = React.createClass({
  getInitialState: function() {
    return {
            title: 'test1',
            question: {}
          };
  },

  onStoreChange: function(data){
    console.log(data)
    console.log(data.question)
    this.setState({
      title: data.title,
      question: data.question,
    }, this.onStateUpdated);
  },
  onStateUpdated: function(){
   
  },
  conponentWillMount: function(){
    
  },
  componentDidMount: function() {
      this.unsubscribe = QuizStore.listen(this.onStoreChange);
      QuizActions.Load(this.props.url_name)
    },
  componentWillUnmount: function() {
    this.unsubscribe();
  },
  render: function() {
    return (
      <div className="QuizContainer">
        <div className="row">
          <div className="col-md-12">
            {this.state.title}
            {this.props.url_name}
            <question question={this.state.question}></question>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = React.createFactory(Quiz);
