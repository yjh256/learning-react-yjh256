// HTML의 unordered list를 react element로 표현하는 예제
React.createElement(
    "ul",
    { className: "ingredients" },
    React.createElement("li", null, "연어 500그램"),
    React.createElement("li", null, "잣 1컵"),
    React.createElement("li", null, "버터 상추 2컵"),
    React.createElement("li", null, "옐로 스쿼시 1개"),
    React.createElement("li", null, "올리브 오일 1/2컵"),
    React.createElement("li", null, "마늘 3쪽")
);

// 위 코드로 생성된 리액트 element는 다음과 같다.
{
    "type": "ul",
    "props": {
        "children": [
            { "type": "li", "props": { "children": "연어 500그램" } ... },
            { "type": "li", "props": { "children": "잣 1컵" } ... },
            { "type": "li", "props": { "children": "버터 상추 2컵" } ... },
            { "type": "li", "props": { "children": "옐로 스쿼시 1개" } ... },
            { "type": "li", "props": { "children": "올리브 오일 1/2컵" } ... },
            { "type": "li", "props": { "children": "마늘 3쪽" } ... }
        ]
    }
    ...
};
