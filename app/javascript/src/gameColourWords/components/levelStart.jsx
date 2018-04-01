import React from 'react'
import GameActions from '../actions/game_actions.js'

export default class LevelStart extends React.Component {
  StartLevel(e){
    e.preventDefault();
    GameActions.StartLevel()
  }
  render() {
    return (
        <div className="card-block">
          <button className="btn btn-primary" onClick={this.StartLevel}>Start Level</button>
       </div>

    )
  }
}

