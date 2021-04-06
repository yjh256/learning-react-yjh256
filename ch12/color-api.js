import { Router } from 'express'
import { v4 } from 'uuid'

// action이 생성되면 먼저 서버에 dispatch하고
// 응답 객체에 action을 넣어 클라이언트에 보낸다.
const dispatchAndRespond = (req, res, action) => {
  req.store.dispatch(action)
  res.status(200).json(action)
}

const router = Router()

// 서버의 상태에 있는 현재 색 배열을 응답한다.
// 이 경로는 단지 서버에 있는 색의 목록을 보기 위해 추가한 것이며
// 실제 브라우저에서는 이 API를 사용하지 않는다.
router.get("/colors", (req, res) =>
  res.status(200).json(req.store.getState().colors)
)

// 새로운 COLOR action 객체를 만들어서 dispatchAndRespond에 보낸다.
router.post("/colors", (req, res) =>
  dispatchAndRespond(req, res, {
    type: "ADD_COLOR",
    id: v4(),
    title: req.body.title,
    color: req.body.color,
    timestamp: new Date().toString()
  })
)

// 색의 평점을 바꾼다.
// 경로 파라미터에서 색 ID를 얻어서 새 액션 객체를 만들 때 사용한다.
router.put("/color/:id", (req, res) =>
  dispatchAndRespond(req, res, {
    type: "RATE_COLOR",
    id: req.params.id,
    rating: paseInt(req.body.rating)
  })
)

// 경로 파라미터에 있는 ID에 해당하는 색을 삭제한다.
router.delete("/color/:id", (req, res) =>
  dispatchAndRespond(req, res, {
    type: "REMOVE_COLOR",
    id: req.params.id
  })
)
export default router

// ./server/app.js 파일에 새 경로와 body-parser import를 추가한다.
import bodyParser from 'body-parser'
import api from './color-api'

// bodyParser 미들웨어와 API 경로를 추가한다.
export default express()
  .use(logger)
  .use(fileAssets)
  .use(bodyParser.json())
  .use(addStoreToRequestPipeline)
  .use('/api',api)
  .use(matchRoutes)
