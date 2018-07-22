import React from 'react'
import AnswerBlock from './answerBlock.jsx'
import GameActions from '../actions/game_actions.js'
import AnswerList from './answerList.jsx'
import StrikeList from './strikeList.jsx'
import GameTimer from './gameTimer.jsx'

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props)
    this.currentMS = 0
  }

  timeout(){
    GameActions.TimedOut();
  }
  wordStyle = () => {
    return {
      color: this.props.level.question.hex
    }
  }
  onTimerChange(ms) {
    GameActions.TimeUpdated(ms)
  }
  render() {
    const { level: { question, seconds, colours, strikes } } = this.props
    return (
      <div className="card-block game-board">
        <div className="row">
          <div className="col-12">
              <GameTimer key={question.key} onTimerChange={this.onTimerChange} onTimeout={this.timeout} seconds={seconds} />
          </div>
        </div>
        <div className="row">      
          <div className="col-12">
            <span className="question-box">
            Match on  <span>{question.match} </span>:
            <span style={this.wordStyle()} > {question.title}</span>
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <AnswerList colours={colours}></AnswerList>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <StrikeList strikes={strikes}></StrikeList>
          </div>
        </div>
      </div>

    )
  }
}
