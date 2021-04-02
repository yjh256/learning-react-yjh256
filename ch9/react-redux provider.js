// App component
import { Menu, NewColor, Colors } from './containers'

const App = () =>
  <div className="app">
    <Menu />
    <NewColor />
    <Colors />
  </div>

exports default App

// Provider를 사용하는 예제
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import storeFactory from './store'

const store = storeFactory()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-container')
)
