import { userService } from "../../services/user.service.js"

export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'
export const INCREMENT_BY = 'INCREMENT_BY'

const initialState = {
	loggedinUser: userService.getLoggedinUser(),
}


export function userReducer(state = initialState, cmd = {}) {
	switch (cmd.type) {

		case SET_USER:
			return { ...state, loggedinUser: cmd.loggedinUser }

		case SET_USER_SCORE:
			var loggedinUser = { ...state.loggedinUser, score: cmd.score }
			return { ...state, loggedinUser }

		case INCREMENT_BY:
			var loggedinUser = { ...state.loggedinUser, balance: state.loggedinUser.balance + 10 }
			return { ...state, loggedinUser }

		default:
			return state
	}
}
