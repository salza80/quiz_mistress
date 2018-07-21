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
    return (
      <div className="row score" style={this.blockStyle()}>
        <div className="col-2">
          {this.props.result.levelNo}
        </div>
         <div className="col-2">
         {this.props.result.reactionTime}
        </div>
        <div className="col-2">
         {this.props.result.points}
        </div>
      </div>
    )
  }
}
