import React from 'react'

export default class LevelStart extends React.Component {
  StartLevel = (e) => {
    e.preventDefault()
    this.props.onStartLevel()
  }
  render() {
    return (
        <div className="card-block">
          <button className="btn btn-primary" onClick={this.StartLevel}>Start Level</button>
       </div>

    )
  }
}

