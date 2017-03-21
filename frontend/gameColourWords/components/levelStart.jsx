const React = require('react');
const GameActions = require('../actions/game_actions.js'); 


var LevelStart = React.createClass({
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
  StartLevel: function(e){
    e.preventDefault();
    GameActions.startLevel()
  },
  render: function() {
   
    return (
      <div className="levelStart card text-center">
        <div className="card-header">
          <div className="question-title">
            <h4 className="card-title"> {this.props.level.title}</h4>
          </div>
        </div>
        <div className="card-block">
          <button className="btn btn-primary" onClick={this.StartLevel}>Start Level</button>
       </div>
      </div>
    );
  }
});

module.exports = React.createFactory(LevelStart);
