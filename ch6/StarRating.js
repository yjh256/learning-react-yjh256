const StarRating = createClass({
  displayName: 'StarRating',
  propTypes: {
    totalStars: PropTypes.number
  },
  getDefaultProps() {
    return {
      totalStars: 5
    }
  },
  getInitialState() {
    return {
      starsSelected: 0
    }
  },
  componentWillMount() {
    const { starsSelected } = this.props
    if (starsSelected) {
      this.setState({starsSelected})
    }
  },
  change(starsSelected) {
    this.setState({starsSelected})
  },
  render() {
    const {totalStars} = this.props
    const {starsSelected} = this.state
    return (
      <div className="star-rating">
        {[...Array(totalStars)].map((n, i) =>
          <Star key={i} selected={i<starsSelected} onClick={() => this.change(i+1)} />
        )}
        <p>별점: {starsSelected} / {totalStars}</p>
      </div>
    )
  }
})

// ES6 class에서 상태를 나타내는 예시
class StarRating extends Component {
  constructor(props) {
    super(props)
    this.state = {
      starsSelected: 0
    }
    this.change = this.change.bind(this)
  }
  change(startsSelected) {
    this.setState({startsSelected})
  }
  render() {
    const {totalStars} = this.props
    const {starsSelected} = this.state
    return (
      <div className="star-rating">
        {[...Array(totalStars)].map((n, i) =>
          <Star key={i} selected={i<starsSelected} onClick={() => this.change(i+1)} />
        )}
        <p>별점: {starsSelected} / {totalStars}</p>
      </div>
    )
  }
}

StarRating.propTypes = {
  totalStars: PropTypes.number
}

StarRating.defaultProps = {
  totalStars: 5
}

render(
  <StarRating totalStars={7} starsSelected={3} />,
  document.getElementById('react-container')
)

// ES6 클래스 component를 사용하는 경우 더 쉽게 상태를 초기화할 수 있다.
constructor(props) {
  super(props)
  this.state = {
    starsSelected: props.starsSelected || 0
  }
  this.change = this.chage.bind(this)
}
