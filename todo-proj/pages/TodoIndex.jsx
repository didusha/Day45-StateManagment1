import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodos, removeTodo, saveTodo } from "../store/actions/todo.actions.js"
import { INCREMENT_BY, SET_FILTERBY } from "../store/store.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoIndex() {

    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos)
    const filterBy = useSelector(state => state.filterBy)
    const isLoading = useSelector(state => state.isLoading)
    const [maxPage, setMaxPage] = useState(null)

    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()
    const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

    useEffect(() => {
        setSearchParams(filterBy)
        loadTodos(filterBy)
            .then(maxPage => setMaxPage(maxPage))
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
            .then(savedTodo => {
                showSuccessMsg(`Todo is ${(savedTodo.todo.isDone) ? 'done' : 'back on your list'}`)
                if (savedTodo.todo.isDone) updateUserBalance()
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo' + todoToSave._id)
            })
    }

    function updateUserBalance() {
        dispatch({ type: INCREMENT_BY })
        showErrorMsg('Awesome! You’ve earned +10 to your balance 💰')
    }

    function onSetFilterBy(filterBy) {
        dispatch({ type: SET_FILTERBY, filterBy })
    }

    function onChangePage(diff) {
        if (filterBy.pageIdx === null) return

        let nextPageIdx = +filterBy.pageIdx + diff
        if (nextPageIdx < 0) nextPageIdx = maxPage - 1
        else if (nextPageIdx >= maxPage) nextPageIdx = 0;
        dispatch({ type: SET_FILTERBY, filterBy: { ...filterBy, pageIdx: nextPageIdx } })
    }

    if (!todos) return <div>no todos to show...</div>
    return (
        <section className="todo-index">
            <TodoFilter onSetFilterBy={onSetFilterBy} defaultFilter={defaultFilter} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            <div className='pagination'>
                <button onClick={() => onChangePage(-1)}> ⬅️ </button>
                <span>{filterBy.pageIdx >= 0 ? filterBy.pageIdx + 1: 1}</span>
                <button onClick={() => onChangePage(1)}> ➡️ </button>
            </div>
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