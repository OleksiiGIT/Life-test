import React from 'react'
import classes from './FinishedQuiz.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

const FinishedQuiz = props => {

    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success'){
            total++
        }

        return total
    }, 0)

    return(
        <div className={classes.FinishedQuiz}>
            <ul>
                { props.quiz.map((quizItem, index) => {

                    let resultIcon = 'fa-times'
                    const resultIconColor = []

                    if (props.results[quizItem.id]) {
                        resultIcon = props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check'
                        resultIconColor.push(props.results[quizItem.id])
                    }else{
                        resultIconColor.push('error')
                    }

                    const cls = [
                        'fa',
                        resultIcon,
                        classes[resultIconColor],
                    ]

                    return (
                        <li key={index}>
                            <strong>{ index + 1 }</strong>. &nbsp;
                            {quizItem.question}
                            <i className={ cls.join(' ') } />
                        </li>
                    )

                }) }
            </ul>

            <p>Right {successCount} of {props.quiz.length}</p>

            <div>
                <Button onClick={props.onRetry} type="primary">Repeat</Button>
                <Link to='/'>
                    <Button type="success">Go to the tests list</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz