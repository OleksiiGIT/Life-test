import React, {Component} from 'react'
import classes from './Timer.css'
import TimerDisplay from './TimerDisplay'

export class Timer extends Component {

    state = {
        timeLeft: null,
        timer: null,
        initialTime: this.props.timePoints
    }

    componentDidMount() {
        let timer = setInterval(() => {
            const timeLeft = this.state.timeLeft - 1
            if (timeLeft === 0) {
                clearInterval(timer)
            }
            this.setState({
                timeLeft
            })
        }, 1000)
        return this.setState({
            timeLeft: this.state.initialTime,
            timer: timer
        })
    }

    render() {

        if ( this.state.timeLeft === 0 ) {
            this.props.timerEnd()
        }

        return (
            <div className={classes.Timer}>
                <TimerDisplay
                    timeLeft={this.state.timeLeft}
                />
            </div>
        )
    }
}

