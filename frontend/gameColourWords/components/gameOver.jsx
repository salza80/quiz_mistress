const React = require('react');
const GameActions = require('../actions/game_actions.js'); 


var GameOver = React.createClass({
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
   
    return (
        <div className="card-block">
         GAME OVER!
       </div>

    );
  }
});

module.exports = React.createFactory(GameOver);
