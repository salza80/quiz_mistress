import React from 'react'
import ReactDOM from 'react-dom'
import Game from './components/game.jsx'

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('renderer')
  ReactDOM.render(
    <Game />,
    node
  )
})


