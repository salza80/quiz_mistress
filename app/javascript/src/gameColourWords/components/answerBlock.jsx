import React from 'react'
import GameActions from '../actions/game_actions.js'

export default class AnswerBlock extends React.Component {
  colourClick = () => {
    const { index, colour: { complete } } = this.props
    if(complete==false){
      GameActions.ColourClick(index)
    }
  }
  blockStyle = () => {
    let blockcolour = "#D3D0D0"
    const { index, colour: { complete, hex } } = this.props
    if (complete == false){
      blockcolour= hex
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
