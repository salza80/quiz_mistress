import { combineReducers } from 'redux'
import {
  START_LEVEL,
  COLOUR_CLICK,
  TIMED_OUT,
  TIME_UPDATED,
  LOAD,
  ADD_RESULT,
  CORRECT_ANSWER,
  WRONG_ANSWER,
  SOUND_FINISHED,
  GAME_OVER
} from './actions'

const initialState = {
  timeMS:0,
  gameover: false,
  level: {
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
  }, 
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
  results: [],
  totalScore:0,
  whichSound: ''
}

function getNextLevel(state) {
  const { level, all_colours } = state
  let newLevel = {}
  let newAllColours= []
  newLevel.no += 1
  newLevel.running = false
  newLevel.seconds = level.seconds - Math.ceil(level.seconds * .1)
  newLevel.strikes.no = 0
  if(all_colours.length>=1){
      newLevel.colours = level.colours.concat([all_colours[0]])
      newAllColours = all_colours.slice(0)
    }
    for( var i=0; i<newLevel.colours; i++){
      try{
        newLevel.colours[i]["complete"] = false;
      }catch(e){}
    }
    newLevel.colours = shuffle(newLevel.colours)
    return { level: newLevel, all_colours: newAllColours}
}
function getNextQuestion(state){
  const { level: { colours } } = state
  var coloursCopy = getRemainingColours(colours)
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


getRemainingColours(colours){
  return colours.filter(function(colour){
    return colour.complete == false
  })
},
getRandomMatchOn(){
  if(Math.random() >.5){
    return "Word"
  } else {return "Colour"}
}

function gameApp (state = initialState, action) {
  switch (action.type) {
    case START_LEVEL:
      let newState = Object.assign({}, state, getNextLevel(state))
      newState = Object.assign({}, state, getNextQuestion(state))
      return newState
    case TIME_UPDATED:
      return {...state, timeMS: action.ms}
    default:
      return state
  }
​
  // For now, don't handle any actions
  // and just return the state given to us.
  return state
}

const theApp = combineReducers({
  gameApp,
  todos
})
​
export default theApp
