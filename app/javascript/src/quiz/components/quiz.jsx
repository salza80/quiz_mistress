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
      this.unsubscribe = QuizStore.listen(this.onStoreChange);
      QuizActions.Load(this.props.url_name, this.props.preview)
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return (
      <div className="quiz-container card text-center">
        <div className="quiz card-header heading-bk">
          <div className="quiz-title">
            <h2 className="card-title"> {this.state.title}</h2>
          </div>
        </div>
        <div className="question-container card-block">
          <Question question={this.state.question}></Question>
        </div>
      </div>
    );
  }
}
