const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

import { userService } from '../services/user.service.js'
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
const { useSelector } = ReactRedux


export function AppHeader() {
    const navigate = useNavigate()

    const loggedinUser = useSelector(state => state.loggedinUser)
    const todos = useSelector(state => state.todos) || []

    function onLogout() {
        logout()
            .then(() => navigate('/'))
            .catch(err => showErrorMsg('OOPs try again'))
    }

    
    const doneTodos = todos.filter(todo => todo.isDone === true)
    const progress = todos.length > 0 ? (doneTodos.length / todos.length) * 100 : 0

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {loggedinUser ? (
                    < section className="login-container">
                        <Link to={`/user/${loggedinUser._id}`}>Hello {loggedinUser.fullname}</Link>
                        <button onClick={onLogout}>Logout</button>
                        <span>{loggedinUser.balance.toLocaleString()}</span>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup />
                    </section>
                )}
                <div>
                    <nav className="app-nav">
                        <NavLink to="/" >Home</NavLink>
                        <NavLink to="/about" >About</NavLink>
                        <NavLink to="/todo" >Todos</NavLink>
                        <NavLink to="/dashboard" >Dashboard</NavLink>
                    </nav>
                    <span>{progress}%</span>
                    <progress value={progress} max="100"></progress>
                </div>

            </section>
            <UserMsg />
        </header>
    )
}
