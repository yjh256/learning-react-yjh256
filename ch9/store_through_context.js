// context를 이용한 App component
import { Component } from 'react'
import PropTypes from 'react-types'
import AddColorForm from './AddColorForm'
import SortMenu from './SortMenu'
import ColorList from './ColorList'
import { sortFunction } from '../lib/array-helpers'

const App extends Component {
  getChildContext() { // context를 정의하는 객체를 반환한다.
    return {
      store: this.props.store
    }
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe(
      () => this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { colors, sort } = store.getState()
    const sortedColors = [...colors].sort(sortFunction(sort))
    return (
      <div className="app">
        <SortMenu />
        <AddColorForm />
        <ColorList colors={sortedColors} />
      </div>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

App.childContextTypes = { // context를 사용하려면 반드시 이 단계를 거쳐야 한다.
  store: PropTypes.object.isRequired
}

exports default App

// 자식 component가 context를 이용해는 예제
const AddColorForm = (props, { store }) => {
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

// AddColorForm component가 사용할 context 변수를 리액트에 알려주기 때문에
// 이 정의는 필수로 입력해야 한다.
AddColorForm.contextTypes = {
  store: PropTypes.object
}

// component class가 context를 사용하는 예제
import { Component } from 'react'
import PropTypes from 'react-types'
import StarRating from './StarRating'
import TimeAgo from './Timeago'
import FaTrash from 'react-icons/lib/fa/trash-o'
import { rateColor, removeColor } from '../actions'

class Color extends Component {
  render() {
    const { id, title, color, rating, timestamp } = this.props
    const { store } = this.context
    return (
      <section className="color" style={this.style}>
        <h1 ref="title">{title}</h1>
        <button onClick={() =>
              store.dispatch(removeColor(id))
            }>
          <FaTrash />
        </button>
        <div className="color" style={{ backgroundColor: color }}></div>
        <Timeago timestamp={timestamp} />
        <div>
          <StarRating starsSelected={rating} onRate={rating =>
            store.dispatch(rateColor(id, rating))
          } />
        </div>
      </section>
    )
  }
}

Color.contextTypes = {
  store: PropTypes.object
}

Color.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  rating: PropTypes.number
}

Color.defaultProps = {
  rating: 0
}

export default Color
