// 역방향 데이터 흐름 예제
const logColor = (title, color) =>
  console.log(`새로운 색: ${title} | ${value}`)

<AddColorForm onNewColor={logColor} />

// AddColorForm의 submit method
submit() {
  const {_title, _color} = this.refs
  this.props.onNewColor(_title.value, _color.value)
  _title.value=''
  _color.value='#000000'
  _title.focus()
}

// 선택적 함수 프로퍼티 예제
if (this.props.onNewColor) {
  this.props.onNewColor(_title.value, _color.value)
}

// component의 propTypes와 defaultProps에 함수 프로퍼티를 지정하는 방법도 있다.
AddColorForm.propTypes {
  onNewColor: Proptypes.func
}

AddColorForm.defaultProps {
  onNewColor: f=>f // 이 화살표 함수는 단순히 자신이 받은 첫 번째 인자를 다시 반환한다.
}

// 함수형 component 참조 예제
const AddColorForm = ({onNewColor=f=>f}) => {
  let _title, _color
  const submit = e => {
    e.preventDefault()
    onNewColor(_title.value, _color.value)
    _title.value=''
    _color.value='#000000'
    _title.focus()
  }
  return (
    <form onSubmit={submit}>
      <input ref={input => _title=input} type="text" placeholder="색 이름.." required/>
      <input ref={input => _color=input} type="color" required/>
      <button>추가</button>
    </form>
  )
}
