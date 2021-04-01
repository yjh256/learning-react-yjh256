import { Component } from 'react'

const Expandable = ComposedComponent =>
  class Expandable extends Component {
    constructor(props) {
      super(props)
      const collapsed =
        (props.hidden && props.hidden === true) ? true : false
      this.state = {collapsed}
      this.expandCollapse = this.expandCollapse.bind(this)
    }

    expandCollapse() {
      let collapsed = !this.state.collapsed
      this.setState({collapsed})
    }

    render() {
      return <ComposedComponent expandCollapse={this.expandCollapse}
        {...this.state} {...this.props} />
    }
  }

// Expandable을 통해 간단히 나타낸 HiddenMessage 예제
const ShowHideMessage = ({children, collapsed, expandCollapse}) =>
  <p onClick={expandCollapse}>
    {(collapsed) ? children.replace(Letter, "x") : children}
  </p>

const HiddenMessage = Expandable(ShowHideMessage)

// MenuBtton을 사용해 내용 표시 여부를 토글할 수 있는 PopUpButton 예제
class MenuButton extends Component {
  componentWillReceiveProps(nextProps) {
    const collapsed =
      (nextProps.collapsed && nextProps.collapsed === true) ? true : false
    this.setState({collapsed})
  }

  render() {
    const {children, collapsed, txt, expandCollapse} = this.props
    return (
      <div className="pop-button">
        <button onClick={expandCollapse}>{txt}</button>
        {(!collapsed) ?
          <div className="pop-up">
            {children}
          </div> :
          ""
        }
      </div>
    )
  }
}

const PopUpButton = Expandable(MenuButton)

render(
  <PopUpButton hidden={true} txt="팝업 토글">
    <h1>숨겨진 content</h1>
    <p>이 content는 처음에 숨겨져 있습니다.</p>
  </PopUpButton>,
  document.getElementById('react-container')
)
