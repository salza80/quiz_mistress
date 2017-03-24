const React = require('react');
const Score = require('./score.jsx')
const ResultStore = require('../stores/result_store')


var ScoreList = React.createClass({
  getInitialState: function() {
    return {
            results: []
            }
  },

 onStoreChange: function(data){
    this.setState({
      results: data.results
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
    </div>
    );
  }
});

module.exports = React.createFactory(ScoreList);
