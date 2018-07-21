import React from 'react'
import QuizActions from '../actions/quiz_actions'

export default class Answer extends React.Component {
  answerQuestion = () => {
    QuizActions.answerQuestion(this.props.answer)
  }

  render() { 
    return (
        <li onClick={this.answerQuestion} className="list-group-item">
          <span className='fa' aria-hidden="true"></span>
          <span>{this.props.answer.title}</span>
        </li>
    )
  }
}
