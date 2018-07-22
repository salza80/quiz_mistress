import React from 'react'
import SoundStore from '../stores/sound_store'
import GameActions from '../actions/game_actions'
import Sound from 'react-sound'
import CorrectSound from "../sounds/correct.mp3"
import WrongSound from "../sounds/wrong.mp3"
import GameOver from "../sounds/gameover.mp3"

export default class PlaySound extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
            sound:{
              whichSound: "",
            }
          }
  }


  onStoreChange = (data) => {

  }
  onStateUpdated = () => {
   
  }

  onSoundChange = (data) => {
    this.setState({
      sound: data 
    }, this.onStateUpdated)
  }
  onSoundFinished = () => {
    GameActions.SoundFinished()
  }
  componentDidMount() {
      this.unsubscribe = SoundStore.listen(this.onSoundChange)
      GameActions.Load()
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    const { sound } = this.state

    let content = null
    let soundComponent = null
    let correct = <Sound url={CorrectSound} onFinishedPlaying={this.onSoundFinished} playStatus={sound.whichSound === "correct" ? Sound.status.PLAYING : Sound.status.STOPPED} loop={false}/>
    let wrong = <Sound url={WrongSound} onFinishedPlaying={this.onSoundFinished} playStatus={sound.whichSound === "wrong" ? Sound.status.PLAYING : Sound.status.STOPPED} loop={false} />
    // if (sound.playing){
    //   soundComponent = <Sound url={sound.soundFile} onFinishedPlaying={this.onSoundFinished} playStatus={Sound.status.PLAYING} />
    // }
    
    return (
    <div>
     {correct} {wrong}
    </div>
    )
  }
}
