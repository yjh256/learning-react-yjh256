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
