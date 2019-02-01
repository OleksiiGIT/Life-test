import axios from '../../axios/axios-quiz'
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FINISH_QUIZ, FINISH_TIMER,
    QUIZ_NEXT_QUESTIONS,
    QUIZ_SET_STATE,
    RETRY_HANDLER
} from "./actionTypes";

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try{
            const response = await axios.get('/quizes.json')

            const quizes = []

            Object.keys(response.data).forEach((key) => {

                quizes.push({
                    id: key,
                    name: Object.values(response.data[key][0].quizName)
                })

            })

            dispatch(fetchQuizesSuccess(quizes))

        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try{

            const respond = await axios.get(`/quizes/${quizId}.json`)
            const quiz = respond.data[0].quiz

            dispatch(fetchQuizSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerState){
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key]){
                return
            }
        }

        const question = state.quiz[state.activeQuestion]
        const results = state.results

        if (question.rightAnswerId === answerId ){
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            dispatch(quizSetState({[answerId]: 'success'}, results))

        }else {
            results[question.id] = 'error'
            dispatch(quizSetState({[answerId]: 'error'}, results))
        }

        const timer = window.setTimeout(()=>{

            if (isQuizFinished(state)) {
                dispatch(finishQuiz())
            }else {
                dispatch(quizNextQuestion(state.activeQuestion + 1))
            }

            window.clearTimeout(timer)
        },500)
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState, results
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ,
    }
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTIONS,
        number
    }
}

export function retryHandler() {
    return {
        type: RETRY_HANDLER
    }
}

export function timerEnd() {
    return {
        type: FINISH_TIMER
    }
}