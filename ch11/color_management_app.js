// id field로 객체를 찾는 findById 함수
import { compose } from 'redux'

export const getFirstArrayItem = array => array[0]

export const filterArrayById = (array, id) =>
  array.filter(item => item.id === id)

export const findById = compose(
  getFirstArrayItem,
  filterArrayById
)

// router parameter를 지정하는 예제
<Route exact path="/:id" component={UniqueIDHeader} />

const UniqueIDHeader = ({match}) => <h1>{match.params.id}</h1>

// 사용자가 어떤 색을 선택한 경우 렌더링해야 하는 ColorDetails component
// history.goBack() method는 이전에 사용자가 봤던 위치를 다시 표시한다.
const ColorDetails = ({ title, color }) =>
  <div className="color-details" style={{backgroundColor: color}}
      onClick={() => history.goBack()}>
    <h1>{title}</h1>
    <h1>{color}</h1>
  </div>

// router parameter로부터 가져온 사용자가 선택한 색을
// 상태에서 찾아내 표현 component에 전달해주는 Color container
export const Color = connect(
  (state, props) => findById(state.colors, props.match.params.id)
)(ColorDetails)


// App component를 처음 렌더링할 떄는 이 component를 HashRouter로 감싸야 한다.
import { HashRouter } from 'react-router-dom'

...

render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('react-container')
)

// App에 경로를 추가한다.
import { Route, Switch } from 'react-router-dom'
import Menu from './ui/Menu'
import { Colors, Color, NewColor } from './containers'
import '../stylesheets/APP.scss'

const App = () =>
  <Switch>
    <Route exact path="/:id" component={Color} />
    <Route path="/" component={() => (
      <div className="app">
        <Menu />
        <NewColor />
        <Colors />
      </div>
    )} />
  </Switch>

export default App

// Color component
import { withRouter } from 'react-router'

...

class Color extends Component {
  render() {
    const {
      id, title, color, rating, timestamp, onRemove, onRate, history
    } = this.props
    return (
      <section className="color" style={this.style}>
        <h1 ref="title" onClick={() => history.push(`/${id}`)}>{title}</h1>
        <button onClick={onRemove}><FaTrash /></button>
        <div className="color" onClick={() => history.push(`/${id}`)}
          style=({ backgroundColor: color })>
        </div>
        <TimeAgo timestamp={timestamp} />
        <div>
          <StarRating starsSelected={rating} onRate={onRate} />
        </div>
      </section>
    )
  }
}

export default withRouter(Color)

// 색 정렬 방법을 router로 옮기기

// 정렬 방벙을 router로 옮겼을 때 Colors container
export const Colors = connect(
  ({colors}, {match}) =>
    ({
      colors: sortColor(colors, match.params.sort)
    }),
  dispatch =>
    ({
      onRemove(id) {
        dispatch(removeColor(id))
      },
      onRate(id, rating) {
        dispatch(rateColor(id, rating))
      }
    })
)(ColorList)

// Menu component 수정
import { NavLink } from 'react-router'

const selectedStyle = { color : 'red' }

const Menu = ({ match }) =>
  <nav className="menu">
    <NavLink to="/" style={match.isExact && selectedStyle}>날짜</NavLink>
    <NavLink to="/sort/title" activeStyle={selectedStyle}>이름</NavLink>
    <NavLink to="/sort/rating" activeStyle={selectedStyle}>평점</NavLink>
  </nav>

export default Menu

// App component 수정
const App = () =>
  <Switch>
    <Route exact path="/:id" component={Color} />
    <Route path="/" component={() => (
      <div className="app">
        <Route component={Menu} />
        <NewColor />
        <Switch>
          <Route exact path="/" component={Colors} />
          <Route path="/sort/:sort" component={Colors} />
        </Switch>
      </div>
    )} />
  </Switch>
