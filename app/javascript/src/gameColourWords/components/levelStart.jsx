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
    GameActions.StartLevel()
  },
  render: function() {
   
    return (
        <div className="card-block">
          <button className="btn btn-primary" onClick={this.StartLevel}>Start Level</button>
       </div>

    );
  }
});

module.exports = React.createFactory(LevelStart);
