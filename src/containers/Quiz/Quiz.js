import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component{

    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: "What's up?",
                rightAnswerId: 1,
                answers: [
                    {text: 'Fine', id: 1},
                    {text: 'Bad', id: 2},
                    {text: 'Good', id: 3},
                    {text: 'Not so good', id: 4}
                ]
            },
            {
                id: 2,
                question: "What is your name?",
                rightAnswerId: 3,
                answers: [
                    {text: 'Roma', id: 1},
                    {text: 'Seva', id: 2},
                    {text: 'Lesha', id: 3},
                    {text: 'Vigen', id: 4}
                ]
            }
        ]
    }

    onAnswerClick = (answerId) => {

        if (this.state.answerState){
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success'){
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId ){

            if (!results[answerId]) {
                results[answerId] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })

            const timer = window.setTimeout(()=>{

                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                }else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timer)
            },500)

        }else {
            results[answerId] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }

    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Fill the answers</h1>

                    {
                        this.state.isFinished
                        ?
                            <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                            />
                        :
                            <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClick}
                                questionLength={this.state.quiz.length}
                                questionNumber={this.state.activeQuestion + 1}
                                answerState={this.state.answerState}
                            />
                    }

                </div>
            </div>
        )
    }
}

export default Quiz