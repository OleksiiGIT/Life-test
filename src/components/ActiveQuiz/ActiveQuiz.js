import React from 'react'
import classes from './ActiveQuiz.css'
import AnswersList from './AnswersList/AnswersList'
import {Timer} from "../Timer/Timer";

const TIME_PER_QUESTION = '5'

const ActiveQuiz = props => {
    return (
        <div className={classes.ActiveQuiz}>
            <Timer
                timePoints={props.questionLength * TIME_PER_QUESTION}
                timerEnd={props.timerEnd}
            />
            <p className={classes.Question}>
            <span>
                <strong>{ props.questionNumber }.</strong>&nbsp;
                {props.question}
            </span>
                <small>{ props.questionNumber } of { props.questionLength }</small>
            </p>

            <AnswersList
                answers={props.answers}
                onAnswerClick={props.onAnswerClick}
                answerState={props.answerState}
            />

        </div>
    )
}

export default ActiveQuiz
