import { isEmpty } from 'underscore'

export const getCurrentQuestion = (state) => {
  if (isEmpty(state.question.list)){ return undefined; }
  let question = state.question.list[state.question.currentIndex]
  question.isLast = state.question.list.length === state.currentIndex -1
  return question
}
