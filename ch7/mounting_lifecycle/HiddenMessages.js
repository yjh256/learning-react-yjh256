// HeddenMessages component
class HiddenMessages extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message: [
        "The crow crows after midnight",
        "Jericho Jericho Go",
        "엄마가 섬그늘에 굴 따러 가면"
      ],
      showing: -1
    }
  }

  componentWillMount() {
    this.interval = setInterval(() => {
      this.setState(prevState => {
        let { showing, messages } = prevState
        showing = (++showing >= messages.length) ?
          0 : showing
        return {showing}
      })
    }, 1000)
  }

  componentWillMount() {
    clearInterval(this.interval)
  }

  render() {
    const { messages, showing } = this.state
    return (
      <div className="hiddden-messages">
        {messages.map((message, i) =>
          <HiddenMessage key={i} hide={(i!==showing)}>{message}</HiddenMessage>
        )}
      </div>
    )
  }
}

// HeddenMessage component
const Letter = XRegExp('\\pL','g')  // 유니코드 문자 클래스(\pL), global 옵션

class HiddenMessage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hidden: typeof props.hide === "boolean" ? props.hide : true
    }
  }

  // 부모의 프로퍼티가 바뀐 경우 변경된 프로퍼티를 component 내부 상태에 반영한다.
  componentWillReceiveProps(nextProps) {
    this.setState({hidden: nextProps.hide})
  }

  render() {
    const { children } = this.props
    const { hidden } = this.state
    return (
      <p>
        {(hidden) ?
          children.replace(Letter, "x") :
          children
        }
      </p>
    )
  }
}
