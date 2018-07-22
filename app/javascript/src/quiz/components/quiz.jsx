import React from 'react'
import QuizStore from '../stores/quiz_store'
import QuizActions from '../actions/quiz_actions'
import Question from './question'

export default class Quiz extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      question: {
        answers: []
      }
    }
  }

  onStoreChange = (data) => {
    this.setState({
      title: data.title,
      question: data.question
    })
  }
  
  componentDidMount() {
    const { url_name, preview } = this.props
    this.unsubscribe = QuizStore.listen(this.onStoreChange);
    QuizActions.Load( url_name, preview)
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { question, title } = this.state
    return (
      <div className="quiz-container card text-center">
        <div className="quiz card-header heading-bk">
          <div className="quiz-title">
            <h2 className="card-title"> {title}</h2>
          </div>
        </div>
        <div className="question-container card-block">
          <Question question={question}></Question>
        </div>
      </div>
    );
  }
}
