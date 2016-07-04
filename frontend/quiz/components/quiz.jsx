const React = require('react');
const QuizStore = require('../stores/quiz_store')


var Quiz = React.createClass({
  getInitialState: function() {
    return {
            title: 'test1',
          };
  },
  onStoreChange: function(data){
    this.setState({
      title: data.title,
    }, this.onStateUpdated);
  },
  onStateUpdated: function(){
   
  },
  componentDidMount: function() {
      this.unsubscribe = QuizStore.listen(this.onStoreChange);
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
          </div>
        </div>
      </div>
    );
  }
});

module.exports = React.createFactory(Quiz);
