const React = require('react');
const GameStore = require('../stores/game_store')
const GameActions= require('../actions/game_actions')
const LevelStart= require('./levelStart.jsx')

var Game = React.createClass({
  getInitialState: function() {
    return {
            level: {
              no:1,
              running: false,
              title:"",
              question: {},
              colours: []
            }
          }
  },
  onStoreChange: function(data){
    this.setState({
      level: data.level
    }, this.onStateUpdated);
  },
  onStateUpdated: function(){
   
  },
  conponentWillMount: function(){
    
  },
  componentDidMount: function() {
      this.unsubscribe = GameStore.listen(this.onStoreChange);
      GameActions.Load()
    },
  componentWillUnmount: function() {
    this.unsubscribe();
  },
  render: function() {
    return (
      <div className="game-container card text-center">
        <div className="game card-header heading-bk">
          <div className="game-title">
            <h2 className="card-title"> Word Colour Game</h2>
          </div>
        </div>
        <div className="game-content card-block">
          <LevelStart level={this.state.level}></LevelStart>
        </div>
      </div>
    );
  }
});

module.exports = React.createFactory(Game);
