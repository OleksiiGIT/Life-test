import {ADD_TEST_NAME, CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "../actions/actionTypes"

const initialState = {
    quiz: []
}

export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_QUIZ_QUESTION:
            return {
                ...state, quiz: [...state.quiz, action.item]
            }
        case RESET_QUIZ_CREATION:
            return {
                ...state, quiz: []
            }
        case ADD_TEST_NAME:
            return {
                ...state, quiz: [action.name]
            }
        default:
            return state
    }
}