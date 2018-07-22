import React from 'react'
import GameActions from '../actions/game_actions.js'

export default class AnswerBlock extends React.Component {
  colourClick = () => {
    const { index, colour: { complete } } = this.props
    if(!complete){
      GameActions.ColourClick(index)
    }
  }
  blockStyle = () => {
    const { index, colour: { complete, hex } } = this.props
    return {
      backgroundColor: complete ? "#D3D0D0" : hex,
      minHeight: "2em"
    }
  }
  render() {
    return (
      <div className="answer-block" style={this.blockStyle()} onClick={this.colourClick} />
    )
  }
}
