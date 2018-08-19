import React from 'react'
import Answer from './answer.jsx'

export default class Question extends React.Component {
  render() {
    const { answers, onNextClick } = this.props
    var aList = answers.map(function(answer,i) {
      return (
        <Answer index={i} answer={answer} onNextClick={onNextClick} key={i}> </Answer>
      )
     })
    return (
     <div className="quiz-answers well"> 
      <p>Select your answer!</p>
      <ul className="answer-box list-group">
       {aList}
      </ul>
    </div>
    )
  }
}
