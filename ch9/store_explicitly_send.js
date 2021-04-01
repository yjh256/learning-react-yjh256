// Aoo을 렌더링할 때 store를 프로퍼티로 전달하고
// store가 변경될 때마다 render 함수가 호출된다.
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import storeFactory from './store'

const store = storeFactory()
const render = () =>
  ReactDOM.render(
    <App store={store}/>,
    document.getElementById('react-container')
  )

store.subscribe(render)
render()

// store를 App에 넘긴 경우 store를 사용해야 하는
// 자식 component에 store를 계속 전달해야 한다.
import AddColorForm from './AddColorForm'
import SortMenu from './SortMenu'
import ColorList from './ColorList'

const App = ({ store }) =>
  <div className="app">
    <SortMenu store={store} />
    <AddColorForm store={store} />
    <ColorList store={store} />
  </div>

exports default App


// AddColorForm component는 store를 이용해 action을 dispatch할 수 있다.
import { Component } from 'react'
import PropTypes from 'prop-types'
import { addColor } from '../actions'

const AddColorForm = ({ store }) => {
  let _title, _color
  const submit = e => {
    e.preventDefault()
    store.dispatch( addColor(_title.value, _color.value) )
    _title.value = ''
    _color.value= '#000000'
    _title.focus()
  }
  return (
    <form className="add-color" onSubmit={submit}>
      <input ref={input => _title = input} type="text" placeholder="색 이름..." required />
      <input ref={input => _color = input} type="color" required />
      <button>ADD</button>
    </form>
  )
}

AddColorForm.propTypes = {
  store: PropTypes.object
}

exports default AddColorForm

// ColorList component는 store의 getState method를 이용해
// 원래의 색 목록을 얻어서 적절히 정렬한다.
// ColorList는 RATE_COLOR와 REMOVE_COLOR action을 dispatch할 수 있다.
import PropTypes from 'prop-types'
import Color from './Color'
import { rateColor, removeColor } from '../actions'
import { sortFunction } from '../lib/array-helpers'

const ColorList = ({ store }) => {
  const { colors, sort } = store.getState()
  const sortedColors = [...colors].sort(sortFunction(sort))
  return (
    <div className="color-list">
      {(colors.length === 0) ?
        <p>No Colors Listed. (Add a Color)</p> :
        sortedColors.map(color =>
          <Color key={color.id} {...color} onRate={(rating) =>
            store.dispatch(rateColor(color.id, rating))
          }
          onRemove={() =>
            store.dispatch(removeColor(color.id))
          } />
        )
      }
    </div>
  )
}

ColorList.propTypes = {
  store: PropTypes.object
}

export default ColorList
