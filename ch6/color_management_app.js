{
  colors: [
    {
      "id": "0175d1f0-a8c6-41bf-8d02-df5734d829a4",
      "title": "해질녘 바다",
      "color": "#00c4e2",
      "rating": "5"
    },
    {
      "id": "83c7ba2f-7392-4d7d-9e23-35adbe186046",
      "title": "잔디",
      "color": "#26ac56",
      "rating": 3
    },
    {
      "id": "a11e3995-b0bd-4d58-8c48-5e49ae7f7f23",
      "title": "밝은 빨강",
      "color": "#ff0000",
      "rating": 0
    }
  ]
}

// 상태가 없는 함수형 component의 형태로 바꾼 StarRating
const StarRating = ({starsSelected=0, totalStars=5, onRate=f=>f}) =>
  <div className="star-rating">
    {[...Array(totalStars)].map((n, i) =>
      <Star key={i} selected={i<starsSelected} onClick={()=>onRate(i+1)}/>
    )}
    <p>별점: {starsSelected} / {totalStars}</p>
  </div>

// 루트 component App
class App extend Component {
  constructor(props) {
    super(props)
    this.state = {
      colors: []
    }
  }

  render() {
    const { colors } = this.state
    return (
      <div className="app">
        <AddColorForm />
        <ColorList colors={colors} />
      </div>
    )
  }
}

// ColorList component
const ColorList = ({ colors=[] }) =>
  <div className="color-list">
    {(colors.length === 0) ?
      <p>색이 없습니다. (색을 추가해주세요)</p> :
      colors.map(color =>
        <Color key={color.id} {...color} />
      )
    }
  </div>

// Color component
const Color = ({ title, color, rating=0 }) =>
  <section className="color">
    <h1>{title}</h1>
    <div className="color" style={{ backgroundColor: color }}></div>
    <div>
      <StarRating starsSelected={rating} />
    </div>
  </section>

// 색 추가 기능을 더한 루트 component App
import { Component } from 'react'
import { v4 } from 'uuid'
import AddColorForm from './AddColorForm'
import ColorList from './ColorList'

export class App extend Component {
  constructor(props) {
    super(props)
    this.state = {
      colors: []
    }
    this.addColor = this.addColor.bind(this)
  }

  addColor(title, color) {
    const colors = [
      ...this.state.colors,
      {
        id: v4(),
        title,
        color,
        rating: 0
      }
    ]
    this.setState({colors})
  }

  render() {
    const { addColor } = this
    const { colors } = this.state
    return (
      <div className="app">
        <AddColorForm onNewColor={addColor}/>
        <ColorList colors={colors} />
      </div>
    )
  }
}

// 색의 평점을 지정하거나 색을 제거하는 기능을 추가한 Color component
const Color = ({ title, color, rating=0, onRemove=f=>f, onRate=f=>f }) =>
  <section className="color">
    <h1>{title}</h1>
    <button onClick={onRemove}>X</button>
    <div className="color" style={{ backgroundColor: color }}></div>
    <div>
      <StarRating starsSelected={rating} onRate={onRate} />
    </div>
  </section>

// 위 Color component를 반영한 ColorList component
const ColorList = ({ colors=[], onRate=f=>f, onRemove=f=>f }) =>
  <div className="color-list">
    {(colors.length === 0) ?
      <p>색이 없습니다. (색을 추가해주세요)</p> :
      colors.map(color =>
        <Color key={color.id} {...color}
          onRate={(rating) => onRate(color.id, rating)}
          onRemove={() => onRemove(color.id)} />
      )
    }
  </div>

// 위 ColorList를 반양한 App component
class App extend Component {
  constructor(props) {
    super(props)
    this.state = {
      colors: []
    }
    this.addColor = this.addColor.bind(this)
    this.rateColor = this.rateColor.bind(this)
    this.removeColor = this.removeColor.bind(this)
  }

  addColor(title, color) {
    const colors = [
      ...this.state.colors,
      {
        id: v4(),
        title,
        color,
        rating: 0
      }
    ]
    this.setState({colors})
  }

  rateColor(id, rating) {
    const colors = this.state.colors.map(color =>
      (color.id !== id) ?
        color :
        {
          ...color,
          rating
        }
    )
    this.setState({colors})
  }

  removeColor(id) {
    const colors = this.state.colors.filter(
      color => color.id !== id
    )
    this.setState({colors})
  }

  render() {
    const { addColor, rateColor, removeColor } = this
    const { colors } = this.state
    return (
      <div className="app">
        <AddColorForm onNewColor={addColor}/>
        <ColorList colors={colors} onRate={rateColor} onRemove={removeColor}/>
      </div>
    )
  }
}
