import React from 'react'
import GameoverSound from "../sounds/gameover.mp3"
import Sound from 'react-sound'

export default class GameOver extends React.Component {
  render() {
    const { onNewGame } = this.props
    return (
        <div className="card-block">
         GAME OVER!
         <br />
        <button className="btn btn-primary" onClick={onNewGame}>New Game</button>
        <Sound url={GameoverSound} playStatus={Sound.status.PLAYING} loop={false} />
       </div>

    )
  }
}
