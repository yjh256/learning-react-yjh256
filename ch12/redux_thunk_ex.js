// ./src/store/index.js 파일에서 redux-thunk를 import한다.
import thunk from 'redux-thunk'

// storeFactory의 redux middleware에 thunk를 추가한다.
const middleware = server => [
  (server) ? serverLogger : clientLogger,
  thunk
]

const storeFactory = (server = false, initialState={}) =>
  applyMiddleware(...middleware(server))(createStore)(
    combineReducers({colors}),
    initialState
  )

export default storeFactory

// thunk를 이용한 addColor
export const addColor = (title, color) =>
  (dispatch, getState) => {

    setTimeout(() =>
      dispatch({
        type: "ADD_COLOR",
        index: getState().colors.length + 1,
        timestamp: new Date().toString(),
        title,
        color
      }), 2000)
  }

...

store.dispatch(addColor("jet", "#000000"))

// thunk가 RANDOM_RATING_STARTED action을 즉시 dispatch한 뒤
// 반복적으로 특정 색의 평점을 임의로 변경하는 RATE_COLOR action을 dispatch한다.
export const rateColor = id =>
  (dispatch, getState) => {
    dispatch({ type: "RANDOM_RATING_STARTED" })
    setInterval(() =>
      dispatch({
        type: "RATE_COLOR",
        id,
        rating: Math.floor(Math.random()*5)
      }), 1000)
  }

...

store.dispatch(
  rateColor("f9005b4e-975e-433d-a646-79df172e1dbb")
)

// fetchThenDispatch 함수
import fetch from 'isomorphic-fetch'

const parseResponse = response => response.json()

const logError = error => console.error(error)

const fetchThenDispatch = (dispatch, url, method, body) =>
  fetch(
    url,
    {
      method,
      body,
      headers: { 'Content-Type': 'applicaiton/json' }
    }
  ).then(parseResponse)
   .then(dispatch)
   .catch(logError)

// fetchThenDispatch를 활용해 만든 thunk들
export const addColor = (title, color) => dispatch =>
  fetchThenDispatch(
    dispatch,
    '/api/colors',
    'POST',
    JSON.stringify({title, color})
  )

export const removeColor = id => dispatch =>
  fetchThenDispatch(
    dispatch,
    `/api/color/${id}`,
    'DELETE'
  )

export const rateColor = (id, rating) => dispatch =>
  fetchThenDispatch(
    dispatch,
    `/api/color/${id}`,
    'PUT',
    JSON.stringify({rating})
  )
