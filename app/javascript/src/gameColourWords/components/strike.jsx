import React from 'react'

export default class Strike extends React.Component {
  blockStyle = () => {
    let blockcolour = "#f2f2f2"
    if (this.props.striked == true){
      blockcolour= "#ff0000"
    }
    return {
      color:blockcolour,
      minWidth: "10px",
      minHeight: "10px"
    }
  }
  render() {
    return (
      <div className="fa fa-times" style={this.blockStyle()} ></div>
    )
  }
}
