import { userService } from '../../services/user.service.js'
import { CLEAR_CART, SET_USER, SET_USER_SCORE } from '../reducers/user.reducer.js'
import { store } from '../store.js'


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

export function updatePrefs(updatedFields) {
        const loggedinUser = store.getState().userModule.loggedinUser
        const userToUpdate = {
                ...loggedinUser,
                fullname: updatedFields.fullname,
                prefs: {
                        color: updatedFields.color,
                        bgColor: updatedFields.bgColor
                }
        }
        return save(userToUpdate)
}

export function save(user) {
        return userService.save(user)
                .then(loggedinUser => store.dispatch({ type: SET_USER, loggedinUser }))
}

export function updateUserActivity(msg, todoTitle) {
        const activity = {
                txt: msg + todoTitle,
                at: Date.now()
        }
        const loggedinUser = store.getState().userModule.loggedinUser
        const updatedUser = {
                ...loggedinUser,
                activities: [...loggedinUser.activities, activity]
        }
        return save(updatedUser)
}