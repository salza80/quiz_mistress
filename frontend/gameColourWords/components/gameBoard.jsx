const React = require('react');
const GameActions = require('../actions/game_actions.js'); 
const AnswerList = require('./answerList.jsx')


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
            <span style={this.wordStyle()} >{this.props.level.question.title}</span>
          </div>
            <div className="col-6">
            timer 
          </div>

        </div>
         <div className="row">
          <div className="col-12">
            <AnswerList colours={this.props.level.colours}></AnswerList>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = React.createFactory(GameBoard);
