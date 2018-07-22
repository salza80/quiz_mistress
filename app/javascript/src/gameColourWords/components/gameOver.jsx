import React from 'react'
import GameOverSound from "../sounds/gameover.mp3"
import Sound from 'react-sound'

export default class GameOver extends React.Component {
  render() {
   
    return (
        <div className="card-block">
         GAME OVER!
         <Sound url={GameOverSound} playStatus={Sound.status.PLAYING} loop={false} />
       </div>

    )
  }
}
