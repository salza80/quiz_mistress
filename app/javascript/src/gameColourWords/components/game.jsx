import React from 'react'
import GameStore from '../stores/game_store'
import GameActions from '../actions/game_actions'
import GameBoard from './gameBoard.jsx'
import LevelStart from './levelStart.jsx'
import GameOver from './gameOver.jsx'
import ScoreList from './scoreList.jsx'
import PlaySound from './playSound.jsx'

export default class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameover:false,
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
  componentDidMount() {
    this.unsubscribe = GameStore.listen(this.onStoreChange)
    GameActions.Load()
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    const { gameover, level } = this.state
    let content = null
    if (gameover){
      content = <GameOver />
    } else if (!level.running){
      content = <LevelStart/>
    }else{
      content = <GameBoard level={level}></GameBoard>
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
              <h4 className="card-title"> {level.title}</h4>
            </div>
          </div>
          {content}
          <ScoreList />
        </div>
        <PlaySound/>
      </div>
    )
  }
}
