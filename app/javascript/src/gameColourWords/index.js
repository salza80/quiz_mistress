import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import theApp from './reducers'
import Game from './components/game.jsx'
​
const store = createStore(theApp)
​
render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('renderer')
)
