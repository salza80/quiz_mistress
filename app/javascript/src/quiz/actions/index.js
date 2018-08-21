export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const PREV_QUESTION = 'PREV_QUESTION'
export const FINISH_QUIZ = 'FINISH_QUIZ'
export const SHOW_RESULT = 'SHOW_RESULT'
export const LOAD_DATA = 'LOAD_DATA'
export const DATA_LOADED = 'DATA_LOADED'
export const DATA_LOAD_FAILED = 'DATA_LOAD_FAILED'

export const answerQuestion = (question_id, answer_id) => ({
  type: ANSWER_QUESTION,
  question_id,
  answer_id
})

export const prevQuestion = () => ({
  type: PREV_QUESTION
})

export const loadData = (url_name, preview) => ({
  type: LOAD_DATA,
  url_name,
  preview
})

export const dataLoaded = (data) => ({
  type: WRONG_ANSWER,
  data
})

export const finishQuiz = () => ({
  type: FINISH_QUIZ
})

export const dataLoadFailed = (message) => ({
  type: DATA_LOAD_FAILED,
  message
})

export const showResult = (resultURL) => ({
  type: SHOW_RESULT,
  resultURL
})
