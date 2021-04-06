// universal javascript 코드 예제
var printNames = response => {
  var people = JSON.parse(response).results,
      names = people.map({name}) => `${name.last}, ${name.first}`)
  console.log(names.join('\n'))
}

// 모든 javascript 코드가 universal하지 않다는 것의 예시
const request = new XMLHttpRequest()
request.open('GET', 'https://api.randomuser.me/?nat=US&results=10')
request.onload = () => printNames(request.response)
request.send()

// 노드를 사용하는 경우
const https = require('https')
https.get(
  'https://api.randomuser.me/?nat=US&results=10',
  res => {
    let results = ''

    res.setEncoding('utf8')
    res.on('data', chunk => results += chunk)

    res.on('end', () => printNames(results))
  }
)

// universal 코드 예제
var printNames = response => {
  var people = JSON.parse(response).results,
      names = people.map({name}) => `${name.last}, ${name.first}`)
  console.log(names.join('\n'))
}

if (typeof window !== 'undefined') {
  const request = new XMLHttpRequest()
  request.open('GET', 'https://api.randomuser.me/?nat=US&results=10')
  request.onload = () => printNames(request.response)
  request.send()
} else {
  const https = require('https')
  https.get(
    'https://api.randomuser.me/?nat=US&results=10',
    res => {
      let results = ''

      res.setEncoding('utf8')
      res.on('data', chunk => results += chunk)

      res.on('end', () => printNames(results))
    }
  )
}

// Star component
const Star = ({ selected=false, onClick=f=>f }) =>
  <div className={(selected) ? "star selected" : "star"}
      onClick={onClick}>
  </div>

// javascript로 컴파일된 Star component
const Star = ({ selected=false, onClick=f=>f }) =>
  React.createElement(
    "div",
    {
      className: selected ? "star selected" : "star",
      onClick: onClick
    }
  )

// 브라우저에서 직접 HTML로 렌더링한다.
ReactDOM.render(<Star />)

// HTML 문자열로 렌더링한다.
var html = ReactDOM.readerToString(<Star />)
