import { combineReducers } from 'redux'
import { shuffle } from 'underscore'
import {
  START_LEVEL,
  CORRECT_ANSWER,
  WRONG_ANSWER,
  SOUND_FINISHED,
  GAME_OVER,
  NEXT_LEVEL,
  NEW_GAME
} from '../actions'

function getNextLevel(state) {
  let newLevel = {}
  newLevel['question'] = {}
  newLevel['no'] = state.no + 1
  newLevel['running'] = false
  newLevel['seconds'] = state.seconds - Math.ceil(state.seconds * .1)
  newLevel['strikes'] = []
  newLevel.strikes['no'] = 0
  newLevel.strikes['total'] = 3
  newLevel['colours'] = shuffle([...state.colours])
  newLevel['all_colours'] = shuffle([...state.all_colours])
  if (newLevel.all_colours.length>=1) {
    newLevel.colours.push(newLevel.all_colours.pop())
  }
  newLevel.colours.forEach((colour) => ( colour['complete'] = false ))
  return newLevel
}

function getNextQuestion(colours, question){
  var remainingColours = shuffle(getRemainingColours([...colours]))
  var c1 = remainingColours[0]
  var c2
  if (remainingColours.length<=1){
    c2 = remainingColours[0]
  } else {c2 = remainingColours[1]}
  var question = {}
  question['match'] = getRandomMatchOn()
  if (question['match'] === 'Word') {
    question['title'] = c1.title
    question['answer'] =  c1.hex
    question['hex'] = c2.hex
  } else {
    question['hex'] = c1.hex
    question['answer'] =  c1.hex
    question['title'] = c2.title
  }
  question['key'] = (question.key + 1) || 1
  return question
}

function getRemainingColours(colours){
  return colours.filter(function(colour){
    return !colour.complete
  })
}

function getRandomMatchOn(){
  if(Math.random() >.5){
    return 'Word'
  } else {return 'Colour'}
}


const initLevelState = {
  no:1,
  running: false,
  seconds:16,
  question: {},
  colours: [
    { hex: '#FF0000', title:'Red'},
    { hex: '#00FF00', title:'Green'},
    { hex: '#0000ff', title:'Blue'}
  ],
  strikes: {
    no:0,
    total:3
  },
  all_colours: [
    { hex: '#660099', title:'Purple'},
    { hex: '#ff6600', title:'Orange'},
    { hex: '#ff33ff', title:'Pink'},
    { hex: '#663300', title:'Brown'},
    { hex: '#000000', title:'Black'},
    { hex: '#0099FF', title:'Light blue'},
    { hex: '#000099', title:'Dark blue'}
  ]
}

function level(state = initLevelState, action) {
  switch (action.type) {
    case NEW_GAME:
      return initLevelState
    case CORRECT_ANSWER:
      let question = {}
      let running = state.running
      const newColours = state.colours.map((colour, index)=> {
        if (colour.hex!=action.hex){
          return {...colour}
        }
        return {...colour, complete: true}
      })
      const remainingColours = getRemainingColours(newColours)
      if (remainingColours.length > 0){ 
        question = getNextQuestion(newColours, state.question)
      } else {
        return getNextLevel(state)
      }
      return {...state, question, running, colours: newColours }
    case WRONG_ANSWER:
      let strikes = { no: state.strikes.no + 1, total: 3 }
      let gameover = strikes.no === 3 ? true : false
      return {...state, strikes, gameover, question: getNextQuestion(state.colours, state.question)}
    case NEXT_LEVEL:
      return getNextLevel(state)
    case START_LEVEL:
      return {...state, running: true, question: getNextQuestion(state.colours, state.question)}
    default:
      return state
  }
}

function whichSound(state = '', action){
  switch (action.type) {
    case CORRECT_ANSWER:
      return 'correct'
    case WRONG_ANSWER:
      return 'wrong'
    case SOUND_FINISHED:
      return ''
    default:
      return state
  }
}

function results(state = [], action) {
  switch (action.type) {
    case NEW_GAME:
      return []
    case CORRECT_ANSWER:
      let score={}
      score['levelNo'] = action.levelNo
      score['reactionTime'] = action.ms/1000
      score['points'] = Math.round((5/(action.ms/1000)) *10,2)
      return state.concat([score])
    default:
      return state
  }
}
const theApp = combineReducers({
  level,
  whichSound,
  results
})

export default theApp
