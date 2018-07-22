import React from 'react'

export default class Score extends React.Component {
  blockStyle(){
    let blockcolour = "#D3D0D0"
    // if (this.props.colour.complete ==false){
    //   blockcolour=this.props.colour.hex
    // }
    return {
      backgroundColor:blockcolour,
    }
  }
  render() {
    const { result: { levelNo, reactionTime, points } } = this.props
    return (
      <div className="row score" style={this.blockStyle()}>
        <div className="col-2">
          {levelNo}
        </div>
         <div className="col-2">
         {reactionTime}
        </div>
        <div className="col-2">
         {points}
        </div>
      </div>
    )
  }
}
