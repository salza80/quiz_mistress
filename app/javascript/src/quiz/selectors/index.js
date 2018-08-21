import { isEmpty } from 'underscore'

export const getCurrentQuestion = (state) => {
  const { question } = state
  if (question.currentIndex === -1) { return { isFinished: true } }
  if (isEmpty(question.list)){ return undefined }
  return question.list[question.currentIndex]
}

export const getAnswers = (state) => (state.answers)

export const getQuiz = (state) => (state.quiz)
