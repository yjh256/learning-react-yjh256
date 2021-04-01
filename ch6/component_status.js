// 별점을 표시하는 StarRating 예제
const Star = ({ selected=false, onClick=f=>f }) =>
  <div className={(selected) ? "star selected" : "star"} onClick={onClick}></div>

Star.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func
}
