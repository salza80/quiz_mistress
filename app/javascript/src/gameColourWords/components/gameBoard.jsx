import React from 'react'
import AnswerBlock from './answerBlock.jsx'
import AnswerList from './answerList.jsx'
import StrikeList from './strikeList.jsx'
import GameTimer from './gameTimer.jsx'

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props)
    this.currentMS = 0
  }

  wordStyle = () => {
    return {
      color: this.props.level.question.hex
    }
  }
  onTimerChange = (ms) => {
    this.currentMS = ms
  }

  onAnswerClick = (answerHex) => {
    this.props.onAnswerClick(this.currentMS, answerHex, this.props.level.question.hex)
  }

  render() {

    const { level: { question, seconds, colours, strikes, onTimeOut } } = this.props
    return (
      <div className="card-block game-board">
        <div className="row">
          <div className="col-12">
              <GameTimer key={question.key} onTimerChange={this.onTimerChange} onTimeout={onTimeOut} seconds={seconds} />
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
            <AnswerList colours={colours} onAnswerClick={this.onAnswerClick} ></AnswerList>
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
