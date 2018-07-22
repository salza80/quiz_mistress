import React from 'react'
import ReactDOM from 'react-dom'
import Quiz from './components/quiz.jsx'

const node = document.getElementById('renderer')
const props = JSON.parse(node.getAttribute('data-props'))
export default ReactDOM.render(
  <Quiz {...props} />,
  node
)
