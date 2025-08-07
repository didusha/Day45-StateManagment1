import { userService } from '../../services/user.service.js'
import { CLEAR_CART, SET_USER, SET_USER_SCORE, store } from '../store.js'

export function login(credentials) {
	return userService.login(credentials)
        .then(loggedinUser => store.dispatch({ type: SET_USER, loggedinUser }))
}

export function signup(credentials) {
	return userService.signup(credentials)
        .then(loggedinUser => store.dispatch({ type: SET_USER, loggedinUser }))
}

export function logout() {
	return userService.logout()
        .then(() => store.dispatch({ type: SET_USER, loggedinUser: null }))
}

export function checkout(amount) {
	return userService.updateScore(-amount)
        .then(score => {
            store.dispatch({ type: CLEAR_CART })
            store.dispatch({ type: SET_USER_SCORE, score })
        })
}
