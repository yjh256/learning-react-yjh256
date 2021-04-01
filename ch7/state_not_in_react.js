// 기존의 startTicking 함수
const startTicking = (() =>
    setInterval(
        compose(
            clear,
            getCurrentTime,
            abstractClockTime,
            convertToCivilianTime,
            doubleDigits,
            formatClock("hh:mm:ss tt"),
            display(log)
        ),
        oneSecond()
    )
startTicking()

// 시간을 보여주는 리액트 component
const AlarmClockDisplay = ({hours, minutes, seconds, ampm}) =>
    <div className="clock">
        <span>{hours}</span>
        <span>:</span>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
        <span>{ampm}</span>
    </div>

// 위 코드를 반영한 startTicking 함수
const startTicking = (() =>
    setInterval(
        compose(
            clear,
            getCurrentTime,
            abstractClockTime,
            convertToCivilianTime,
            doubleDigits,
            formatClock("hh:mm:ss tt"),
            render(AlarmClockDisplay)
        ),
        oneSecond()
    )
startTicking()

// 화면을 렌더링할 고차 함수 render
const react = Component => clvilianTime =>
    ReactDOM.render(
        <Component {...civilianTime} />,
        <document.getElementById('react-container')
    )
