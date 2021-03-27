// React.createClass를 사용해 리액트 component를 만드는 예제
const IngredientsList = React.createClass({
    displayName: "IngredientsList",
    render() {
        return React.createElement("ul", {"className": "ingredients"},
            React.createElement("li", null, "연어 500그램"),
            React.createElement("li", null, "잣 1컵"),
            React.createElement("li", null, "버터 상추 2컵"),
            React.createElement("li", null, "옐로 스쿼스 1개"),
            React.createElement("li", null, "올리브 오일 1/2컵"),
            React.createElement("li", null, "마늘 3쪽")
        )
    }
});

const list = React.createElement(IngredientsList, null, null);

ReactDOM.render(
    list,
    document.getElementById('react-container')
);

// 리액트 component에 데이터를 넘길 때는 프로퍼티로 넘긴다.
// 재사용 가능한 재료 리스트를 만들기 위해 재료들이 들어 있는 배열을 이 component에 넘길 수 있다.
const IngredientsList = React.createClass({
    displayName: "IngredientsList",
    render() {
        return React.createElement("ul", {className: "ingredients"},
            this.props.items.map((ingredients, i) =>
                React.createElement("li", { key: i }, ingredient)
            )
        )
    }
});

const items = [
    "연어 500그램",
    "잣 1컵",
    "버터 상추 2컵",
    "옐로 스쿼시 1개",
    "올리브 오일 1/2컵",
    "마늘 3쪽"
];

ReactDOM.render(
    React.createElement(IngredientsList, {items}, null),
    document.getElementById('react-container')
);

// component는 객체이므로 내부에 코드를 캡슐화할 수 있다.
// 그러므로 list 원소를 하나 생성하는 method를 만들어서 list를 만들 때 사용할 수 있다.
const IngredientsList = React.createClass({
    displayName: "IngredientsList",
    renderListItem(ingredient, i) {
        return React.createElement("li", { key: i }, ingredient)
    },
    render() {
        return React.createElement("ul", {className: "ingredients"},
            this.props.items.map(this.renderListItem)
        )
    }
});

// React.Component 추상 클래스를 상속해서 component를 만드는 예제
class IngredientsList extends React.Component {

    renderListItem(ingredient, i) {
        return React.createElement("li", { key: i }, ingredient)
    }

    render() {
        return React.createElement("ul", { className: "ingredients" },
            this.props.items.map(this.renderListItem)
        )
    }
}

// 상태가 없는 함수형 component를 만드는 예제
const IngredientsList = props =>
    React.createElement("ul", { className: "ingredients" },
        props.items.map((ingredient, i) =>
            React.createElement("li", { key: i }, ingredient)
        )
    );

// props를 구조 분해해서 점(.) 구문을 사용해 프로퍼티에 접근하지 않아 더 간단해진 예제
const IngredientsList = ({items}) =>
    React.createElement("ul", { className: "ingredients" },
        items.map((ingredient, i) =>
            React.createElement("li", { key: i }, ingredient)
        )
    );
