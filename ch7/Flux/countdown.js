// 상태가 없는 react component인 view
const CountDown = ({count, tick, reset}) => {
  if (count) {
    setTimeout(() => tick(), 1000)
  }

  return (count) ?
    <h1>{count}</h1> :
    <div onClick={() => reset(10)}>
      <span>축하합니다!!</span>
      <span>{처음부터 다시 시작하려면 클릭하세요}</span>
    </div>
}

// action
const countdowmActions = dispatcher =>
  ({
    tick(currentCount) {
      dispatcher.handleAction({ type: 'TICK '})
    },
    reset(count) {
      dispatcher.handleAction({
        type: 'RESET',
        count
      })
    }
  })

// Dispatcher
import Dispatcher from 'flux'

class CountDownDispatcher extends Dispatcher {
  handleAction(action) {
    console.log('dispatching action:',action)
    this.dispatch({
      source: 'VIEW_ACTION',
      action
    })
  }
}

// store
import { EventEmitter } from 'events'

class CountdownStore extends EventEmitter {
  constructor(count=5, dispatcher) {
    super()
    this._count = count
    this.dispatcherIndex = dispatcher.register(
      this.dispatch.bind(this)
    )
  }

  get count() {
    return this._count
  }

  dispatch(payload) {
    const { type, count } = payload.action
    switch(type) {
      case "TICK":
        this._count = this._count - 1
        this.emit("TICK", this._count)
        return true
      case "RESET":
        this._count = count
        this.emit("RESET", this._count)
        return true
    }
  }
}

// 각 부분을 연결한다.
const appDispatcher = new CountDownDispatcher()
const actions = countdownActions(appDispatcher)
const store = new CountdownStore(10, appDispatcher)

const render = count => ReactDOM.render(
  <Countdown count={count} {...action} />,
  document.getElementById('react-container')
)

store.on("TICK", () => render(store.count))
store.on("RESET", () => render(store.count))
render(store.count)
