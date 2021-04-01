// store 생성 및 reducer 조합 예
import { createStore, combineReducers } from 'redux'
import { colors, sort } from './reducer'

const store1 = createStore(color)

console.log(store.getState()) // {}

const store2 = createStore(
  combineReducers({ colors, sort })
)

console.log(store.getState())
// {
//  colors: []
//  sort: "SORTED_BY_DATE"
// }

// store를 통해 action을 dispatch하는 예
store2.dispatch({
  type: "ADD_COLOR",
  id: 5,
  title: "pink",
  color: "#F142FF",
  timestamp: "Thu Mar 10 2016 01:11:12 GMT-0800 (PST)"
})

// store 구독 예제
const unsubscribeLogger = store.subscribe(() =>
  console.log('색 개수:', store.getState().colors.length)
)

// 구독을 해제하고 싶을 때 호출한다.
unsubscribeLogger()

// localStorage를 통해 브라우저에서 영속적인 상태 정보를 사용하는 예제
const store = createStore(
  combineReducers({ colors, sort }),
  (localStorage['redux-store']) ?
    JSON.parse(localStorage['redux-store']) :
    {}
)

store.subscribe(() => {
  localStorage['redux-store'] = JSON.stringify(store.getState())
})
