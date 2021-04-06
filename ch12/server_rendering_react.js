// 간단한 express 앱 예제
import express from 'express'

const logger = (req, res, next) => {}
  console.log(`'${req.url}'에 대한 ${req.method} 요청`)
  next()
}

const sayHello = (req, res) =>
  res.status(200).send("<h1>Hello World</h1>")

const app = express()
  .use(logger)
  .use(sayHello)

app.listen(3000, () =>
  console.log(`'http://localhost:3000'에서 조리법 앱 작동 중`)
)

// Menu component를 서버에서 렌더링하는 조리법 앱
import React from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'
import Menu from './components/Menu'
import data from './assets/recipes.json'

global.React = React

const html = renderToString(<Menu recipes={data} />)

const logger = (req, res, next) => {
  console.log(`'${req.url}'에 대한 ${req.method} 요청`)
  next()
}

const sendHTMLPage = (req, res) =>
  res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>리액트 조리법 앱</title>
        </head>
        <body>
          <div id="react-container">${html}</div>
        </body>
      </html>
    `)

const app = express()
  .use(logger)
  .use(sendHTMLPage)

app.listen(3000, () =>
  console.log(`'http://localhost:3000'에서 조리법 앱 작동 중`)
)

// 브라우저에서 실행할 index-client.js
import React from 'react'
import { render } from 'react-dom'
import Menu from './components/Menu'

window.React = React

alert('bundle loaded, Rendering in browser')

render(
  <Menu recipes={__DATA__} />,
  document.getElementById("react-container")
)

alert('render complete')

// isomorphic 앱으로 만들기 위해 변경한 조리법 앱
const sendHTMLPage = (req, res) =>
  res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>리액트 조리법 앱</title>
        </head>
        <body>
          <div id="react-container">${html}</div>
          <script>
            window.__DATA__ = ${JSON.stringify(data)}
          </script>
          <script src="bundle.js"></script>
        </body>
      </html>
    `)

const app = express()
  .use(logger)
  .use(express.static('./assets'))
  .use(sendHTMLPage)
