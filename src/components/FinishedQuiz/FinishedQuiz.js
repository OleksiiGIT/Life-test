import React from 'react'
import classes from './FinishedQuiz.css'

const FinishedQuiz = props => {
    return(
        <div className={classes.FinishedQuiz}>
            <ul>
                { props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ]

                    return (
                        <li key={index}>
                            <strong>{ index + 1 }</strong>. &nbsp;
                            {quizItem.question}
                            <i className={ cls.join(' ') }></i>
                        </li>
                    )

                }) }

            </ul>

            <p>Right 4 of 10</p>

            <div>
                <button>Repeat</button>
            </div>
        </div>
    )
}

export default FinishedQuiz