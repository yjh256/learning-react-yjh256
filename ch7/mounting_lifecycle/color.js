import { Star, StarRating } from '../components'

export class Color extends Component {

  componentWillMount() {
    this.style = { backgroundColor: "#CCC" }
  }

  render() {
    const { title, rating, color, onRate } = this.props
    return (
      <section className="color" style={this.style}>
        // 리액트 16은 참조를 문자열이 아닌 함수로 정의하기를 권장한다.
        // 이때 이 참조를 사용하려면 this.refs._title이 아닌 this._title이라고 써야 한다.
        <h1 ref={input => this._title = input}>{title}</h1>
        <div className="color" style={{ backgroundColor: color }}></div>
        <StarRating starsSelected={rating} onRate={onRate} />
      </section>
    )
  }
}

Color.propTypes = {
  title: PropTypes.string,
  rating: PopTypes.number,
  color: PropTypes.string,
  onRate: PropTypes.func
}

Color.defaultProps = {
  title: undefined,
  rating: 0,
  color: "#000000",
  onRate: f=>f
}

// componentWillUpdate()를 Color component에 추가한다.
componentWillUpdate() {
  this.style = null
}

// shouldComponentUpdate(nextProps)를 Color component에 추가한다.
shouldComponentUpdate(nextProps) {
  const { rating } = this.props // 아직 갱신 전이므로 이전 프로퍼티를 this.props로 접근할 수 있다.
  return rating !== nextProps.rating
}

// 갱신 전후에 실행되는 method
componentWillUpdate(nextProps) {
  const { title, rating } = this.props
  this.style= null
  this._title.style.backgroundColor = "red"
  this._title.style.color = "white"
  alert(`${title}: 평점 ${rating} -> ${nextProps.rating}`)
}

componentDidUpdate(prevProps) {
  const { title, rating } = this.props
  const status = (rating > prevProps.rating) ? '좋아짐' : '나빠짐'
  console.log(`${title} 평점이 ${status}`)
  this._title.style.backgroundColor = ""
  this._title.style.color = black
}
