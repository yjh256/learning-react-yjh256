const { render } = ReactDOM;

// ReactDOMFactories를 이용해 리액트 element를 만드는 예제
// 첫 번째 인자는 프로퍼티, 두 번째 인자는 자식 노드다.
ReactDOMFactories.h1(null, "Baked Salmon");

// factory와 map을 함께 사용하는 예제
var items = [
    "연어 500그램",
    "잣 1컵",
    "버터 상추 2컵",
    "옐로 스쿼시 1개",
    "올리브 오일 1/2컵",
    "마늘 3쪽"
];

var list = ReactDOMFactories.ul(
    { className: "ingredients" },
    items.map((ingredient, key) =>
        React.createElement("li", {key}, ingredient)
    )
)

ReactDOM.render(
    list,
    document.getElementById('react-container')
);

const IngredientsList = ({ list }) =>
    React.createElement('ul', null,
        list.map((ingredient, i) =>
            React.createElement('li', {key: i}, ingredient)
        )
    );

const Ingredients = React.createFactory(IngredientsList)

const list = [
    "연어 500그램",
    "잣 1컵",
    "버터 상추 2컵",
    "옐로 스쿼시 1개",
    "올리브 오일 1/2컵",
    "마늘 3쪽"
];

render(
    Ingredients({list}),
    document.getElementById('react-container')
);
