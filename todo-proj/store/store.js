const { createStore } = Redux

// export const INCREMENT_BY = 'INCREMENT_BY'

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'

// export const TOGGLE_CART = 'TOGGLE_CART'
// export const ADD_TO_CART = 'ADD_TO_CART'
// export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
// export const CLEAR_CART = 'CLEAR_CART'

const initialState = {
	todos: [],
	loggedinUser: null,
	// showCart: false,
	// cart: [],
}

export function appReducer(state = initialState, cmd = {}) {
	switch (cmd.type) {

		// case INCREMENT_BY:
		// 	return { ...state, count: state.count + cmd.diff }

		case SET_TODOS:
			return { ...state, todos: cmd.todos }

		case REMOVE_TODO:
			var todos = state.todos.filter(todo => todo._id !== cmd.todoId)
			return { ...state, todos }

		case ADD_TODO:
			return { ...state, todos: [...state.todos, cmd.todo] }

		case UPDATE_TODO:
			var todos = state.todos.map(todo => (todo._id === cmd.todo._id ? cmd.todo : todo))
			return { ...state, todos }

		case SET_USER:
			return { ...state, loggedinUser: cmd.loggedinUser }

		case SET_USER_SCORE:
			const loggedinUser = { ...state.loggedinUser, score: cmd.score }
			return { ...state, loggedinUser }

		// case TOGGLE_CART:
		// 	return { ...state, showCart: !state.showCart }

		// case ADD_TO_CART:
		// 	return { ...state, cart: [...state.cart, cmd.car] }

		// case REMOVE_FROM_CART:
		// 	var cart = state.cart.filter(car => car._id !== cmd.carId)
		// 	return { ...state, cart }

		// case CLEAR_CART:
		// 	return { ...state, cart: [] }

		default:
			return initialState
	}
}

export const store = createStore(appReducer)
// window.gStore = store

// store.subscribe(() => {
// 	console.log('Current state is:', store.getState())
// })
