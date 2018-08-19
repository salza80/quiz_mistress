import React from 'react'
import AnswerList from './answerList.jsx'
import ImageReference from '../../shared/components/imageReference.jsx'

export default class Question extends React.Component {
  onNextClick = (answer_id) => {
    const {question: { id }} = this.props
    this.props.onNextClick(id, answer_id)
  }
  
  render() {
    const {question, onNextClick} = this.props
    return (
      <div className="question card text-center">
        <div className="card-header">
          <div className="question-title">
            <div className="row">
              <div className="col-md-10 col-xs-12">
                <h4 className="card-title">  Q. {question.title}</h4>
              </div>
            </div>
          </div>
        </div>
        <ImageReference image={question.image} ></ImageReference>
        <div className="card-block">
          <div className="question-description">
            <p className="card-text">{question.description}</p>
          </div>
           <AnswerList answers={question.answers} onNextClick={this.onNextClick}></AnswerList>
        </div>
      </div>
    )
  }
}

