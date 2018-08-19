import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import theApp from './reducers'
import mySaga from './sagas'
import Quiz from './components/quiz'
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  theApp,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(mySaga)
const node = document.getElementById('renderer')
const props = JSON.parse(node.getAttribute('data-props'))
render(
  <Provider store={store}>
    <Quiz {...props}/>
  </Provider>,
  node
)
