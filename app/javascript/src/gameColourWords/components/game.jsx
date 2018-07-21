import React from 'react'
import GameStore from '../stores/game_store'
import SoundStore from '../stores/sound_store'
import GameActions from '../actions/game_actions'
import GameBoard from './gameBoard.jsx'
import LevelStart from './levelStart.jsx'
import GameOver from './gameOver.jsx'
import ScoreList from './scoreList.jsx'
import Sound from 'react-sound'

export default class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
            gameover:false,
            sound:{
              soundFile:"",
              playing:false
            },
            level: {
              no:1,
              running: false,
              title:"",
              seconds:0,
              question: {
                key:"",
                title: "",
                hex: "",  
                match: ""
              },
              colours: []
            }
          }
  }

  onStoreChange = (data) => {
    this.setState({
      gameover: data.gameover,
      level: data.level
    }, this.onStateUpdated);
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
      this.unsubscribe = GameStore.listen(this.onStoreChange);
      this.unsubscribe = SoundStore.listen(this.onSoundChange);
      GameActions.Load()
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {

    let content = null;
    let sound = null;
    if (this.state.sound.playing){
      sound = <Sound url={this.state.sound.soundFile} onFinishedPlaying={this.onSoundFinished} playStatus={Sound.status.PLAYING} />
    }
    if(this.state.gameover==true){
      content = <GameOver />
    }else if (this.state.level.running==false){
      content = <LevelStart/>;
    }else{
      content = <GameBoard level={this.state.level}></GameBoard>
    }
    return (
      <div className="gamecolourwords game-container card text-center">
        <div className="game card-header heading-bk">
          <div className="game-title">
            <h2 className="card-title"> Word Colour Game</h2>
          </div>
        </div>
      <div className="levelStart card text-center">
        <div className="card-header">
          <div className="question-title">
            <h4 className="card-title"> {this.state.level.title}</h4>
          </div>
        </div>
        {content}
        <ScoreList />
      </div>
      {sound}
    </div>
    )
  }
}
