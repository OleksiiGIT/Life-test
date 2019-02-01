import React, {Component} from 'react'

class TimerDisplay extends Component {

    render() {

        if (this.props.timeLeft === 0) {
            return (
                <p>Time finished</p>
            )
        }

        if (this.props.timeLeft === 0 || this.props.timeLeft === null) {
            return (
                <p></p>
            )
        }

        let minutes = parseInt(this.props.timeLeft / 60, 10)
        let seconds = parseInt(this.props.timeLeft % 60, 10)

        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds

        return (
            <p>{minutes} : {seconds}</p>
        )
    }
}

export default TimerDisplay

