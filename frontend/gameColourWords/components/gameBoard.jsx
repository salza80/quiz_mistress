const React = require('react');
const GameActions = require('../actions/game_actions.js'); 
const AnswerList = require('./answerList.jsx')
const StrikeList = require('./strikeList.jsx')
const GameTimer = require('./gameTimer.jsx')

var GameBoard = React.createClass({
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
  timeout: function(){
    GameActions.TimedOut();
  },
  wordStyle: function(){
    return {
      color: this.props.level.question.hex
    }
  },
  render: function() {

   
    return (
      <div className="card-block game-board">
        <div className="row">
          <div className="col-6">
            Match on  <span>{this.props.level.question.match} </span>:
            <span style={this.wordStyle()} >{this.props.level.question.title}</span>
          </div>
            <div className="col-6">
              <GameTimer key={this.props.level.question.key} onTimeout={this.timeout} seconds={this.props.level.seconds} />
          </div>

        </div>
         <div className="row">
          <div className="col-12">
            <AnswerList colours={this.props.level.colours}></AnswerList>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <StrikeList strikes={this.props.level.strikes}></StrikeList>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = React.createFactory(GameBoard);
