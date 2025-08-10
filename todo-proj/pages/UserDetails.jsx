const { useState, useEffect } = React
const { useParams, useNavigate, NavLink } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux


import { userService } from "../services/user.service.js"
import { utilService } from "../services/util.service.js"
import { save, updatePrefs } from "../store/actions/user.actions.js"

export function UserDetails() {

    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const navigate = useNavigate()

    function onSaveUserPref(ev) {
        ev.preventDefault()

        const formData = new FormData(ev.target)
        const updatedFields = Object.fromEntries(formData.entries())

        updatePrefs(updatedFields)
            .then(() => navigate(`/user/${loggedinUser._id}`))
    }

    if (!loggedinUser) return <div>Loading...</div>

    return <section className="user-details">
        <h1>Profile</h1>
        <p>Name: {loggedinUser.fullname}</p>
        <p>Balance: {loggedinUser.balance.toLocaleString()}</p>
        <h3>Activities</h3>
        <ul>
            {loggedinUser.activities.map((activity, idx) => (
                <li key={idx}>
                    <span className="activity-date">{utilService.formatTimeAgo(activity.at)}:</span> 
                    <span> {activity.txt}</span>
                </li>
            ))}
        </ul>

        <form onSubmit={onSaveUserPref} >
            <label htmlFor="fullname">FullName</label>
            <input defaultValue={loggedinUser.fullname} type="text" name="fullname" id="fullname" />

            <label htmlFor="color">Color:</label>
            <input defaultValue={loggedinUser.color} type="color" name="color" id="color" />

            <label htmlFor="bgColor">BG Color:</label>
            <input defaultValue={loggedinUser.bgColor} type="color" name="bgColor" id="bgColor" />

            <button type="submit">Save</button>

        </form>

        <button onClick={() => navigate(`/todo/}`)}>Back</button>
    </section>
}
