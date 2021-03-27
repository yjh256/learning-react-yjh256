// React.createElement를 사용해 리액트 element를 생성할 수 있다.
// 첫 번째 인자는 element의 type, 두 번째 인자는 element의 property, 세 번째 인자는 element의 자식 노드를 표현한다.
// DOM element에 있는 attribute를 리액트 element의 property로 표현할 수 있다.
React.createElement("h1", {id: "recipe-0", data-type: "title"}, "구운 연어");

// createElement가 실제로 만들어낸 element
{
    $$typeof: Symbol(React.element),
    "type": "h1",
    "key": null,
    "ref": null,
    "props": {"children": "구운 연어"},
    "_owner": null,
    "_store": {}
}
