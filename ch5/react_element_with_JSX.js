// 번호가 붙지 않은 리스트에 대한 JSX
<ul>
    <li>연어 500그램</li>
    <li>잣 1컵</li>
    <li>버터 상추 2컵</li>
    <li>옐로 스쿼시 1개</li>
    <li>올리브 오일 1/2컵</li>
    <li>마늘 3쪽</li>
</ul>

// JSX에서는 단순히 클래스 이름을 사용해 component를 정의하면 된다.
<IngredientsList list={[...]}/>

// JSX와 Array.map()을 사용하는 예제
<ul>
    {this.props.ingredients.map((ingredient, i) =>
        <li key={i}>{ingredient}</li>
    )}
</ul>
