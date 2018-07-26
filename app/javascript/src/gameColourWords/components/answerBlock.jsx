import React from 'react'

export default class AnswerBlock extends React.Component {
  blockStyle = () => {
    const { index, colour: { complete, hex } } = this.props
    return {
      backgroundColor: complete ? "#D3D0D0" : hex,
      minHeight: "2em"
    }
  }
  render() {
    const { onClick, colour: { hex } } = this.props
    return (
      <div className="answer-block" style={this.blockStyle()} onClick={onClick(hex)} />
    )
  }
}
