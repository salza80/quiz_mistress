const React = require('react');
const GameStore = require('../stores/game_store')
const GameActions= require('../actions/game_actions')
const GameBoard= require('./gameBoard.jsx')
const LevelStart = require('./levelStart.jsx')

var Game = React.createClass({
  getInitialState: function() {
    return {
            level: {
              no:1,
              running: false,
              title:"",
              question: {
                title: "",
                hex: "",
                match: ""
              },
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

    let content = null;

    if (this.state.level.running==false){
      content = <LevelStart/>;
    }else{
      content =  <GameBoard level={this.state.level}></GameBoard>
    }
    return (
      <div className="game-container card text-center">
        <div className="game card-header heading-bk">
          <div className="game-title">
            <h2 className="card-title"> Word Colour Game</h2>
          </div>
        </div>
      <div className="levelStart card text-center">
        <div className="card-header">
          <div className="question-title">
            <h4 className="card-title"> {this.state.level.title}</h4>
          </div>
        </div>
        {content}
      </div>
    </div>
    );
  }
});

module.exports = React.createFactory(Game);
