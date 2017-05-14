const React = require('react');
const Score = require('./score.jsx')
const ResultStore = require('../stores/result_store')


var ScoreList = React.createClass({
  getInitialState: function() {
    return {
            results: [],
            totalScore:0
            }
  },

 onStoreChange: function(data){
    this.setState({
      results: data.results,
      totalScore: data.totalScore
    }, this.onStateUpdated);
  },
  onStateUpdated: function(){
   
  },
  conponentWillMount: function(){
    
  },
  componentDidMount: function() {
      this.unsubscribe = ResultStore.listen(this.onStoreChange);
    },
  componentWillUnmount: function() {
    this.unsubscribe();
  },
  render: function() {
    var aList = this.state.results.map(function(result,i) {
      return (
        <Score index={i} result={result} key={i}> </Score>
      );
     });
    return (
    <div className="card-block score-list">
       {aList}
        <div>Total Score: {this.state.totalScore}</div>
    </div>
    );
  }
});

module.exports = React.createFactory(ScoreList);
