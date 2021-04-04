// 정의되지 않은 경로에 해당하는 주소를 주소창에 입력한 경우에 렌더링된다.
export const Whoops404 = ({ location }) =>
  <div className="whoops-404">
    <h1>'{location.pathname}' 경로의 자원을 찾을 수 없습니다.</h1>
  </div>

// 위 component를 경로 객체에 프로퍼티로 넘긴다.
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom'

...

render(
  <HashRouter>
    <div className="main">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/events" component={Events} />
        <Route path="/products" component={Products} />
        <Route path="/contact" component={Contact} />
        <Route component={Whoops404} />
      </Switch>
    </div>
  </HashRouter>,
  document.getElementById('react-container')
)
