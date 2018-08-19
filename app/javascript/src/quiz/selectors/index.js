import { isEmpty } from 'underscore'

export const getCurrentQuestion = (state) => {
  const { question } = state
  if (isEmpty(question.list)){ return undefined; }
  let currentQuestion = question.list[question.currentIndex]
  currentQuestion.isLast = ((question.list.length-1) === question.currentIndex )
  return currentQuestion
}
