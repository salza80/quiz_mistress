export const START_LEVEL = 'START_LEVEL'
export const CORRECT_ANSWER = 'CORRECT_ANSWER'
export const WRONG_ANSWER = 'WRONG_ANSWER'
export const SOUND_FINISHED = 'SOUND_FINISHED'
export const NEXT_LEVEL = 'NEXT_LEVEL'
export const NEW_GAME = 'NEW_GAME'

export const startLevel = () => ({
  type: START_LEVEL
})

export const newGame = () => ({
  type: NEW_GAME
})

export const correctAnswer = (levelNo, hex, ms) => ({
  type: CORRECT_ANSWER,
  levelNo,
  hex,
  ms
})

export const wrongAnswer = () => ({
  type: WRONG_ANSWER
})

export const soundFinished = () => ({
  type: SOUND_FINISHED
})
