// unmountComponentAtNode를 사용하는 예제
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { getClockTime } from './lib'
const { Component } = React
const { target } = document.getElementById('react-container')

class Clock extends Component {

  constructor() {
    super()
    this.state = getClockTime()
  }

  componentDidMount() {
    console.log("시계 시작 중")
    this.ticking = setInterval(() =>
        this.setState(getClockTime())
      , 1000)
  }

  componentWillMount() {
    clearInterval(this.ticking)
    console.log("시계 중단 중")
  }

  render() {
    const { hours, minutes, seconds, timeOfDay } = this.state
    return (
      <div className="clock">
        <span>{hours}</span>
        <span>:</span>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
        <span>:</span>
        <span>{timeOfDay}</span>
        <button onClick={this.props.onClose}>x</button>
    )
  }
}

render(
  <Clock onClose={() => unmountComponentAtNode(target)} />,
  target
)
