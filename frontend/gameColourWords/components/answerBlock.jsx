const React = require('react');
const GameActions = require('../actions/game_actions.js'); 


var AnswerBlock = React.createClass({
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
  colourClick: function(){
    GameActions.colourClick(this.props.index)
  },
  blockStyle: function(){
    var blockcolour = "#FFFFFF"
    if (this.props.colour.complete ==false){
      blockcolour=this.props.colour.hex
    }
    return {
      backgroundColor:blockcolour,
      minWidth: "10px",
      minHeight: "10px"
    }
  },
  render: function() {

   
    return (
      <div className="answer-block" style={this.blockStyle()} onClick={this.colourClick()}></div>

    );
  }
});

module.exports = React.createFactory(AnswerBlock);
