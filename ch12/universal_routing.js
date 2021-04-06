// BrowserRouter를 사용해 routing한다.
import { BrowserRouter } from 'react-router-dom'

...

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('react-container')
)

// 서버에서 routing하기 위해 필요한 모듈
import { Provider } from 'react-redux'
import { compose } from 'redux'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

// 서버에서 HTML 응답을 생성하는 함수를 compose를 이용해 표현
const htmlResponse = compose(
  buildHTMLPage, // 3단계
  renderComponentsToHTML, // 2단계
  makeClientStoreFrom(serverStore) // 1단계
)

// makeClientStoreFrom method
const makeClientStoreFrom = store => url =>
  ({
    store: storeFactory(false, store.getState()),
    url
  })

// renderComponentsToHTML method
const renderComponentsToHTML = ({url, store}) =>
  ({
    state: store.getState(),
    html: renderToString(
      <Provider store={store}>
        <StaticRouter location={url} context={{}}>
          <App />
        </StaticRouter>
      </Provider>
    )
  })

// buildHTMLPage method
const buildHTMLPage = ({html, state}) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>universal 색 관리 앱</title>
    </head>
    <body>
      <div id="react-container">${html}</div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(state)}
      </script>
      <script src="/bundle.js"></script>
    </body>
  </html>
`
