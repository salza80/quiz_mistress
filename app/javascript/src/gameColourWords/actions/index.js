const START_LEVEL = 'START_LEVEL'
const COLOUR_CLICK = 'COLOUR_CLICK'
const TIMED_OUT = 'TIMED_OUT'
const TIME_UPDATED = 'TIME_UPDATED'
const LOAD = 'LOAD'
const ADD_RESULT = 'ADD_RESULT'
const CORRECT_ANSWER='CORRECT_ANSWER'
const WRONG_ANSWER='WRONG_ANSWER'
const SOUND_FINISHED = 'SOUND_FINISHED'
const GAME_OVER = 'GAME_OVER'
const NEXT_LEVEL = 'NEXT_LEVEL'

export const timeUpdated = ms => ({
  type: TIME_UPDATED,
  ms
})

export const startLevel = () => ({
  type: START_LEVEL
})

export const correctAnswer = hex => ({
  type: CORRECT_ANSWER,
  hex
})

export const wrongAnswer = () => ({
  type: WRONG_ANSWER
})

export const gameOver = () => ({
  type: GAME_OVER
})

export const timeOut = () => ({
  type: TIME_OUT
})
