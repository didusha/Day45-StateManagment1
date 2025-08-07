import { ADD_TODO, REMOVE_TODO, SET_LOADING, SET_TODOS, store, UPDATE_TODO } from '../store.js'

import { todoService } from '../../services/todo.service.js'

export function loadTodos(filterBy = {}) {
        store.dispatch({ type: SET_LOADING, isLoading: true })
        return todoService.query(filterBy)
                .then(todos => store.dispatch({ type: SET_TODOS, todos }))
                .finally(() => store.dispatch({ type: SET_LOADING, isLoading: false }))
}

export function removeTodo(todoId) {
        return todoService.remove(todoId)
                .then(() => store.dispatch({ type: REMOVE_TODO, todoId }))
}

export function saveTodo(todo) {
        const type = todo._id ? UPDATE_TODO : ADD_TODO
        return todoService.save(todo)
                .then(savedTodo => store.dispatch({ type, todo: savedTodo }))
}
