// ski event 데이
const historicDatesForSkiing = [
  {
    year: 1879,
    event: "스키 생산 시작"
  },
  {
    year: 1882,
    event: "미국 스키 클럽 창설"
  },
  {
    year: 1924,
    event: "제 1회 겨울 올림픽 개최"
  },
  {
    year: 1926,
    event: "첫 번째 미국 스키샵이 문을 엶"
  },
  {
    year: 1932,
    event: "북아메리카 최초로 견인 로프 작동 시작"
  },
  {
    year: 1936,
    event: "첫 번째 리프트 작동 시작"
  },
  {
    year: 1949,
    event: "스쿼밸리, 매드 리버 글렌 개장"
  },
  {
    year: 1958,
    event: "첫 번째 곤돌라 작동 시작"
  },
  {
    year: 1964,
    event: "플라스틱 버클 부츠 출시"
  }
]

// D3를 통한 시각화
import d3 from 'd3'
import { Component } from 'react'
import { render } from 'react-dom'

class Timeline extends Component {

  constructor({data=[]}) {
    // extent 함수는 수로 이루어진 배열에서 최솟값과 최댓값을 찾아준다.
    const times = d3.extent(data.map(d => d.year))
    const range = [10, 500]
    super({data})
    this.state = {data, times, range}
  }

  componentDidMount() {
    let group
    const { data, times, range } = this.state
    const { target } = this.refs
    // domain은 정의역을, range는 치역을 정한다.
    // scale 함수는 배율 함수로 시간의 값을 x축 상의 좌포로 interpolate해준다.
    const scale = d3.time.scale().domain(times).range(range)

    // D3로 SVG element를 만들고 그 element를 target element에 추가한다.
    d3.select(target)
      .append('svg')
      .attr('height', 230)
      .attr('width', 700)

    // 현재 target은 svg element 하나만을 자식 element로 가지고 있다.
    // D3는 target의 첫 번째 자식인 svg element를 선택해 타임라인 배열에 있는
    // 모든 데이터 지점을 담기 위한 group element를 추가한다.
    // group element를 추가한 후 scale 함수를 이용해 x좌표를 계산하고
    // translate로 위치를 잡아준다.
    group = d3.select(target.children[0])
              .selectAll('g')
              .enter()
              .append('g')
              .attr(
                'transform',
                (d, i => 'translate(' + scale(d.year) + ', 0)')
              )

    // D3는 circle element와 style을 그룹에 추가한다.
    group.append('circle')
        .attr('cy', 190)
        .attr('r', 5)
        .style('fill', 'blue')

    group.append('text')
        .text(d => d.year + ' - ' + d.event)
        .style('font-size', '9px')
        .attr('y', 130)
        .attr('x', -130)
        attr('transform', 'rotate(-45)')
  }



  render() {
    return (
      <div className="timeline">
        <h1>{this.props.name} 타임라인</h1>
        <div ref="target"></div>
      </div>
    )
  }
}



render(
  <Timeline name="스키의 역사" data={historicDatesForSkiing} />,
  document.getElementById('react-container')
)

// D3로 SVG element를 만드는 대신 SVG element를 반환하는 Canvas component를 만든다.
const Canvas = ({children}) =>
  <svg height="200" with="500">
    {children}
  </svg>

// group element를 설정하고 x축 상에 위치를 정해주기 위한 TimelineDot component
const TimelineDot = ({position, txt}) =>
  <g transform={`translate(${position},0)`}>
    <circle cy={160} r={5} style={{fill: 'blue'}} />
    <text y={115} x={-95} transform="rotate(-45)" style={{fontSize: '10px'}}>{txt}</text>
  </g>

// 리팩토링한 Timeline

class Timeline extends Component {

  constructor({data=[]}) {
    const times = d3.extent(data.map(d => d.year))
    const range = [10, 500]
    super({data})
    this.scale = d3.time.scale().domain(times).range(range)
    this.state = {data, times, range}
  }
  render() {
    const { data } = this.state
    const { scale } = this
    return (
      <div className="timeline">
        <h1>{this.props.name} 타임라인</h1>
        <Canvas>
          {data.map((d, i) =>
            <TimelineDot position={scale(d.year)} txt={`${d.year} - ${d.event}`} />
          )}
        </Canvas>
      </div>
    )
  }
}
