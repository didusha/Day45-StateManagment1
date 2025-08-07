import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodos, removeTodo, saveTodo } from "../store/actions/todo.actions.js"
import { SET_FILTERBY } from "../store/store.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoIndex() {

    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos)
    const filterBy = useSelector(state => state.filterBy)
    const isLoading = useSelector(state => state.isLoading)

    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()
    const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

    useEffect(() => {
        setSearchParams(filterBy)
        loadTodos(filterBy)
    }, [filterBy])


    function onRemoveTodo(todoId) {
        if (!confirm('Sure to delete?')) return
        removeTodo(todoId)
            .then(() => showSuccessMsg(`Todo removed`))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        saveTodo(todoToSave)
            .then(savedTodo => showSuccessMsg(`Todo is ${(savedTodo.todo.isDone) ? 'done' : 'back on your list'}`))
            .catch(err => {         // how to demo the error to see the message?
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ') //+ todoId?
            })
    }

    function onSetFilterBy(filterBy) {
        dispatch({ type: SET_FILTERBY, filterBy })
    }


    // if (!todos) return <div>Loading...</div>
    return (
        <section className="todo-index">
            <TodoFilter onSetFilterBy={onSetFilterBy} defaultFilter={defaultFilter} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            {!isLoading && <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />}
            {isLoading && <div>Loading...</div>}
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>
        </section>
    )
}