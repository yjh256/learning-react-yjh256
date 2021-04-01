// PeopleList 예제
import { Component } from 'react'
import { render } from 'react-dom'
import fetch from 'isomorphic-fetch'

class PeopleList extends Component {

  constructor(props) {
    super(props)
    this.state = [
      data: [],
      loaded: false,
      loading: false
    ]
  }

  componentWillMount() {
    this.setState({loading:true})
    fetch('https://randomuser.me/api/?result=10')
      .then(response => response.json)
      .then(obj => obj.results)
      .then(data => this.setState({
        loaded: true,
        loading: false,
        data
      }))
  }

  render() {
    const { data, loading, loaded } = this.state
    return (loading) ?
      <div>데이터 로딩 중...</div> :
      <ol className="people-list">
        {data.map((person, i) => {
          const {first, last} = person.name
          return <li key={i}>{first} {last}</li>
        })}
      </ol>
  }
}

render(
  <PeopleList />,
  document.getElementById('react-container')
)

// 상태가 없는 함수형 component로 분리한 PeopleList
const PeopleList = ({data}) =>
  <ol className="people-list">
    {data.results.map((person, i) => {
      const {first, last} = person.name
      return <li key={i}>{first} {last}</li>
    })}
  </ol>

// HOC 예시
const DataComponent = (ComposedComponent, url) =>
  class DataComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        data: [],
        loading: false,
        loaded: false
      }
    }

    componentWillMount() {
      this.setState({loading:true})
      fetch(url)
        .then(response => response.json())
        .then(data => this.setState({
          loaded: true,
          loading: false,
          data
        }))
    }

    render() {
      return (
        <div className="data-component">
          {(this.state.loading) ?
            <div>데이터 로딩 중...</div> :
            <ComposedComponent {...this.state} />
          }
        </div>
      )
    }
  }

// 이제 이를 적용하기 위해서 PeopleList와 url을 인자로 넣어 새로운 component를 만든다.
const RandomMeUsers = DataComponent(
  PeopleList,
  "https://randomuser.me/api/"
)

render(
  <RandomMeUsers count={10} />,
  document.getElementById('react-container')
)

// HOC를 적용해볼 CountryDropDown Component
const countryNames = ({data, selected=""}) =>
  <select className="people-list" defaultValue={selected}>
    {data.map(({name}, i) =>
      <option key={i} value={name}>{name}</option>
    )}
  </select>

const CountryDropDown =
  DataComponent(
    CountryNames,
    "https://restcountries.eu/rest/v1/all"
  )

render(
  <CountryDropDown selected="United States" />, // HOC에 프로퍼티를 전달한다.
  document.getElementById('react-container')
)

// DataComponent의 render()에서 합성된 component에 프로퍼티를 전달하도록 코드를 변경한다.
render() {
  return (
    <div className="data-component">
      {(this.state.loading) ?
        <div>데이터 로딩 중...</div> :
        <ComposedComponent {...this.state} {...this.props} />
      }
    </div>
  )
}
