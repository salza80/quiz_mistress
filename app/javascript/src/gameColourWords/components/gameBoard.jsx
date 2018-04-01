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
    return (
      <div className="card-block game-board">
        <div className="row">
          <div className="col-12">
              <GameTimer key={this.props.level.question.key} onTimerChange={this.onTimerChange} onTimeout={this.timeout} seconds={this.props.level.seconds} />
          </div>
        </div>
        <div className="row">      
          <div className="col-12">
            <span className="question-box">
            Match on  <span>{this.props.level.question.match} </span>:
            <span style={this.wordStyle()} > {this.props.level.question.title}</span>
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <AnswerList colours={this.props.level.colours}></AnswerList>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <StrikeList strikes={this.props.level.strikes}></StrikeList>
          </div>
        </div>
      </div>

    )
  }
}
