// ReactDOM.render
// 첫 번째 인자는 렌더링할 리액트 element이고, 두 번째 인자는 렌더링이 일어날 대상 DOM 노드이다.
var dish = React.createElement("h1", null, "구운 연어");
ReactDOM.render(dish, document.getElementById('react-container'));
