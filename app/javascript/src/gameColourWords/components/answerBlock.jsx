import React from 'react'
import GameActions from '../actions/game_actions.js'

export default class AnswerBlock extends React.Component {

  colourClick = () => {
    if(this.props.colour.complete==false){
      GameActions.ColourClick(this.props.index)
    }
  }
  blockStyle = () => {
    let blockcolour = "#D3D0D0"
    if (this.props.colour.complete ==false){
      blockcolour=this.props.colour.hex
    }
    return {
      backgroundColor:blockcolour,
      minHeight: "2em"
    }
  }
  render() {
    return (
      <div className="answer-block" style={this.blockStyle()} onClick={this.colourClick}>
      </div>
    )
  }
}
