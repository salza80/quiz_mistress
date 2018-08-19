import React from 'react'
import Question from './question'
import Finished from './finished'
import { getCurrentQuestion } from '../selectors'

import { answerQuestion, prevQuestion, loadData, finishQuiz } from '../actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    quiz: state.quiz,
    question: getCurrentQuestion(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onNextClick: (question_id, answer_id) => {
      dispatch(answerQuestion(question_id, answer_id))
    },
    onPrevClick: () => {
      dispatch(prevQuestion())
    },
    loadData: () => {
      dispatch(loadData(ownProps.url_name, ownProps.preview))
    },
    onFinishClick: () => {
      dispatch(finishQuiz())
    }
  }
}

class Quiz extends React.Component {

  componentWillMount() {
    this.props.loadData()
  }

  render() {
    const {question, quiz: {loaded, error, errorMessage, title}, onNextClick, onFinishClick } = this.props

    if (error) {
      return (<div>{errorMessage}</div>)
    }

    if (!loaded) {
      return (<div>Loading...</div>)
    }

    if (question.isFinished) {
      return ( <Finished onFinishClick={onFinishClick}></Finished>)
    }

    return (
      <div className="quiz-container card text-center">
        <div className="quiz card-header heading-bk">
          <div className="quiz-title">
            <h2 className="card-title"> {title}</h2>
          </div>
        </div>
        <div className="question-container card-block">
          <Question question={question} onNextClick={onNextClick}></Question>
        </div>
      </div>
    );
  }
}


const QuizContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz)

export default QuizContainer
