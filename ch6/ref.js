// submit method를 추가해 자식 element와 상호작용하는 예제
import { Component } from 'react'
import { render } from 'react-dom'

class AddColorForm extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit(e) {
    const { _title, _color } = this.refs
    e.preventDefault();
    alert(`새로운 색: ${_title.value} ${_color.value}`)
    _title.value='';
    _color.value='#000000';
    _title.focus();
  }
  render() {
    return (
      <form onSubmit={this.submit}>
        <input ref="_title" type="text" placeholder="색 이름..." required />
        <input ref="_color" type="color" required />
        <button>추가</button>
      </form>
    )
  }
}
