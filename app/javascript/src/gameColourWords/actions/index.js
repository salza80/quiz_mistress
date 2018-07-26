export const START_LEVEL = 'START_LEVEL'
export const CORRECT_ANSWER = 'CORRECT_ANSWER'
export const WRONG_ANSWER = 'WRONG_ANSWER'
export const SOUND_FINISHED = 'SOUND_FINISHED'
export const GAME_OVER = 'GAME_OVER'
export const NEXT_LEVEL = 'NEXT_LEVEL'

export const startLevel = () => ({
  type: START_LEVEL
})

export const correctAnswer = (hex, ms) => ({
  type: CORRECT_ANSWER,
  hex,
  ms
})

export const wrongAnswer = () => ({
  type: WRONG_ANSWER
})

export const gameOver = () => ({
  type: GAME_OVER
})

export const soundFinished = () => ({
  type: SOUND_FINSIHED
})
