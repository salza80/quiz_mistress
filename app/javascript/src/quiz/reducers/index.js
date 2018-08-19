import { combineReducers } from 'redux'
import {
  LOAD_DATA,
  ANSWER_QUESTION,
  PREV_QUESTION,
  DATA_LOADED,
  DATA_LOAD_FAILED
} from '../actions'

function question(state = {list: [], currentIndex: 0}, action) {
  switch (action.type) {
    case DATA_LOADED:
      return {list: action.data.questions, currentIndex: 0}
    case DATA_LOAD_FAILED:
      return {list: [], currentIndex: 0}
    case PREV_QUESTION:
      return {...state, currentIndex: state.currentIndex <= 0 ? state.currentIndex : state.currentIndex - 1}
    case ANSWER_QUESTION:
      return {...state, currentIndex: state.currentIndex >= state.list.length -1 ? state.currentIndex : state.currentIndex + 1}
    default:
      return state
  }
}

function answers(state = [], action){
  switch (action.type) {
    case ANSWER_QUESTION:
      let answers = state.slice()
      answers.push({question_id: action.question_id, answer_id: action.answer_id})
      return answers
    default:
      return state
  }
}

function quiz(state = {loaded: false, error: false, errorMessage: '', title: '', url_name: '', preview: false}, action) {
  switch (action.type) {
    case DATA_LOADED:
      return {...state, loaded: true, error: false, errorMessage:'', title: action.data.title, url_name: action.data.url_name}
    case DATA_LOAD_FAILED:
      return {...state, loaded: false, error: true, errorMessage:action.errorMessage, title: '', url_name: ''}
    default:
      return state
  }
}

const theApp = combineReducers({
  quiz,
  question,
  answers
})

export default theApp
