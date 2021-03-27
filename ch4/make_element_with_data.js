// 위 예제를 javascript 배열로 간단하게 표현할 수 있다.
var items = [
    "연어 500그램",
    "잣 1컵",
    "버터 상추 2컵",
    "옐로 스쿼시 1개",
    "올리브 오일 1/2컵",
    "마늘 3쪽"
];

React.createElement(
    "ul",
    { className: "ingredients" },
    items.map(ingredient =>
        React.createElement("li", null, ingredient);
);

// key 프로퍼티를 추가한다.
React.createElement(
    "ul",
    { className: "ingredients" },
    items.map((ingredient, i) =>
        React.createElement("li", { key: i }, ingredient);
);
