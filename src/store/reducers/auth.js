import {AUTH_FALLED, AUTH_LOGOUT, AUTH_SUCCESS} from "../actions/actionTypes"

const initialState = {
    token: null,
    error: null
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state, token: action.token
            }
        case AUTH_LOGOUT:
            return {
                ...state, token: null
            }
        case AUTH_FALLED:
            return {
                ...state, error: action.message
            }
        default:
            return state
    }
}