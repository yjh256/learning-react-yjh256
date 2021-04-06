// ./server/app.js
import express from 'express'
import path from 'path'
import fs from 'fs'

const fileAssets = express.static(
  path.join(__dirname, '../../dist/assets')
)

const logger = (req, res, next) => {
  console.log(`'${req.url}'에 대한 ${req.method} 요청`)
  next()
}

const respond = (req, res) =>
  res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>유니버셜 색 관리 앱</title>
        </head>
        <body>
          <div id="react-container">ready...</div>
        </body>
      </html>
  `)

export default express()
  .use(logger)
  .use(fileAssets)
  .use(respond)

// ./src/server/index.js
// 노드에서 실행되도록 만든 서버의 시작점
import React from 'react'
import app from './app'

global.React = React

app.set('port', process.env.PORT || 3000)
  .listen(
    app..get('port'),
    () => console.log('색 관리 앱 작동 중')
  )

// 서버에서 작동하도록 storeFactory 변경
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { colors } from './reducers'

const clientLogger = store => next => action => {
  let result
  console.groupCollapsed("디스패칭", action.type)
  console.log('이전 상태', store.getState())
  console.log('액션', action)
  result = next(action)
  console.log('다음 상태', store.getState())
  console.groupEnd()
}

const serverLogger = store => next => action => {
  console.log('\n 서버 액션 디스패칭 \n')
  console.log(action)
  console.log('\n')
  return next(action)
}

const middleware = server =>
  (server) ? serverLogger : clientLogger

const storeFactory = (server = false, initialState={}) =>
  applyMiddleware(middleware)(createStore)(
    combineReducers({colors}),
    initialState
  )

export default storeFactory

// 서버에서 실행 가능한 store instance 생성
import storeFactory from '../store'
import initialState from '../../data/initialState.json'

const serverStore = storeFactory(true, initialState)

// store 인스턴스에 dispatch될 때마다 initialState 갱신
serverStore.subscribe(() =>
  fs.writeFile(
    path.join(__dirname, '../../data/initialState.json'),
    JSON.stringify(serverStore.getState()),
    error => (error) ?
      console.log("상태 저장 오류!", error) :
      null
  )
)

// ./server/app.js에 serverStore를 요청 파이프라인에 넣는 미들웨어를 추가한다.
const addStoreToRequestPipeline = (req, res, next) => {
  req.store = serverStore
  next()
}

export default express()
  .use(logger)
  .use(fileAssets)
  .use(addStoreToRequestPipeline)
  .use(htmlResponse)
