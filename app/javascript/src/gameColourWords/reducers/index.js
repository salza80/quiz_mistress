import { combineReducers } from 'redux'
import { shuffle } from 'underscore'
import {
  START_LEVEL,
  TIME_UPDATED,
  CORRECT_ANSWER,
  WRONG_ANSWER,
  SOUND_FINISHED,
  GAME_OVER,
  NEXT_LEVEL
} from './actions'

function getNextLevel(state) {
  let newLevel = {}
  let newAllColours= []
  newLevel.no = state.no + 1
  newLevel.running = false
  newLevel.seconds = state.seconds - Math.ceil(state.seconds * .1)
  newLevel.strikes.no = 0
  if(state.all_colours.length>=1){
      newLevel.colours = state.colours.concat([all_colours[0]])
      newLevel.all_colours = state.all_colours.slice(0)
    }
    for( var i=0; i<newLevel.colours; i++){
      try{
        newLevel.colours[i]["complete"] = false;
      }catch(e){}
    }
    newLevel.colours = shuffle(newLevel.colours)
    return { ...state, ...newLevel}
}

function getNextQuestion(level){
  var coloursCopy = getRemainingColours(level.colours)
  coloursCopy = shuffle(coloursCopy)

  var c1 = coloursCopy[0]
  var c2
  if (coloursCopy.length<=1){
    c2 = colours[0]
  } else {c2 = coloursCopy[1]}
  var question = {}
  question["match"] = getRandomMatchOn()
  if(question["match"]=="Word"){
    question["title"] = c1.title
    question["answer"] =  c1.title
    question["hex"] = c2.hex
  }else{
    question["hex"] = c1.hex
    question["answer"] =  c1.hex
    question["title"] = c2.title
  }     
  return question
}


function getRemainingColours(colours){
  return colours.filter(function(colour){
    return colour.complete == false
  })
}

function getRandomMatchOn(){
  if(Math.random() >.5){
    return "Word"
  } else {return "Colour"}
}


const initLevelState = {
  no:0,
  running: false,
  seconds:16,
  question: {},
  colours: [
    { hex: "#FF0000", title:"Red"},
    { hex: "#00FF00", title:"Green" }
  ],
  strikes: {
    no:0,
    total:3
  }
  all_colours: [
    { hex: "#0000ff", title:"Blue"},
    { hex: "#660099", title:"Purple"},
    { hex: "#ff6600", title:"Orange"},
    { hex: "#ff33ff", title:"Pink"},
    { hex: "#663300", title:"Brown"},
    { hex: "#000000", title:"Black"},
    { hex: "#99ff00", title:"Lime"},
    { hex: "#0099FF", title:"Light blue"},
    { hex: "#000099", title:"Dark blue"}
  ],
}


function level(state =  initLevelState, action) {
  switch (action.type) {
    case CORRECT_ANSWER:
      const newColours = state.colours.map((colour, index)=> {
        if (colour.hex!=action.hex){
          return colour
        }
        colour.complete = true
        return colour
      })
      let question = state.question
      let running = state.running
      const getRemainingColours = getRemainingColours(state.colour)
      if (getRemainingColours.length > 0){
        let question = getNextQuestion(state)
      } else {
        running = false
      }
      return {...state, question, running, colours }
    case WRONG_ANSWER:
      let strikes = { no: state.strikes.no + 1, total: 3 }
      let gameover = strikes.no === 3 ? true : false
      return {...state, strikes, gameover}
    case NEXT_LEVEL:
      return getNextLevel(state)
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
    case CORRECT_ANSWER:
      let score={}
      score["levelNo"] = action.levelNo
      score["reactionTime"] = action.ms/1000
      score["points"] = Math.round((5/(action.ms/1000)) *10,2)
      return state.concat([score])
    default:
      return state
  }
}

function timeMS(state = 0, action) {
  switch (action.type) {
    case TIME_UPDATED:
      return action.ms
    default:
      return state
  }
}

​const theApp = combineReducers({
  level,
  whichSound,
  results,
  timeMS
})
​
export default theApp
