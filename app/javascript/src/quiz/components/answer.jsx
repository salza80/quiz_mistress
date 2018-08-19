import React from 'react'

export default class Answer extends React.Component {
  answerQuestion = () => {
    const {answer: {id}, onNextClick} = this.props
    onNextClick(id)
  }

  render() {
    const { answer: { title }} = this.props
    return (
        <li onClick={this.answerQuestion} className="list-group-item">
          <span className='fa' aria-hidden="true"></span>
          <span>{title}</span>
        </li>
    )
  }
}
