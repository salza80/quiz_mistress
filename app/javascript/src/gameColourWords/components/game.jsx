import React from 'react'
import GameBoard from './gameBoard.jsx'
import LevelStart from './levelStart.jsx'
import GameOver from './gameOver.jsx'
import ScoreList from './scoreList.jsx'
import PlaySound from './playSound.jsx'

import { startLevel, correctAnswer, wrongAnswer, gameOver } from '../actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    level: state.level,
    results: state.results
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAnswerClick: (ms, answerHex, questionHex) => {
      if (answerHex === questionHex) {
        dispatch(correctAnswer(answerHex, ms))
      } else {
        dispatch(wrongAnswer())
      }
    },
    onTimeOut: () => {
      dispatch(wrongAnswer())
    },
    onStartLevel: () => {
      dispatch(startLevel())
    },
    onGameOver: () => {
      dispatch(gameOver())
    }
  }
}

class Game extends React.Component {
  render() {
    const { level, onAnswerClick, onTimeOut, onStartLevel, results } = this.props
    let content = null
    if (level.gameover){
      content = <GameOver />
    } else if (!level.running){
      content = <LevelStart onStartLevel={onStartLevel}/>
    }else{
      content = <GameBoard level={level} onAnswerClick={onAnswerClick} onTimeOut={onTimeOut}></GameBoard>
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
              <h4 className="card-title"> Level {level.no}</h4>
            </div>
          </div>
          {content}
          <ScoreList results={results} />
        </div>
        <PlaySound/>
      </div>
    )
  }
}

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)

export default GameContainer
