import {ADD_TEST_NAME, CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "./actionTypes"
import axios from '../../axios/axios-quiz'

export function createQuizQuestion(item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function resetQuizCreation() {
    return {
        type: RESET_QUIZ_CREATION
    }
}

export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        await axios.post('/quizes.json', getState().create.quiz).then(() => {alert('Test create')}).catch((e) => {alert(e)})
        dispatch(resetQuizCreation())
    }
}

export function addTestName(testName) {
    return (dispatch, getState) => {
        const quizWithName = {quiz: getState().create.quiz, quizName: testName}
        dispatch(addName(quizWithName))
    }
}

export function addName(name) {
    return {
        type: ADD_TEST_NAME,
        name
    }
}