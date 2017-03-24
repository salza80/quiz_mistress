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
    if(this.props.colour.complete==false){
      GameActions.ColourClick(this.props.index)
    }
  },
  blockStyle: function(){
    var blockcolour = "#D3D0D0"
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
      <div className="answer-block" style={this.blockStyle()} onClick={this.colourClick}></div>
    );
  }
});

module.exports = React.createFactory(AnswerBlock);
