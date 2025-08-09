const { useState, useEffect } = React
const { useParams, useNavigate, NavLink } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux


import { userService } from "../services/user.service.js"
import { utilService } from "../services/util.service.js"
import { save } from "../store/actions/user.actions.js"
import { SET_USER } from "../store/store.js"


export function UserDetails() {

    const dispatch = useDispatch()
    // const [user, setUser] = useState(null)
    const loggedinUser = useSelector(state => state.loggedinUser)
    // const [bugs, setBugs] = useState(null)

    const params = useParams()
    const navigate = useNavigate()

    // useEffect(() => {
    //     loadUser()
    //     loadBugs()
    // }, [params.userId])


    // function loadUser() {
    //     userService.getById(params.userId)
    //         // .then(setUser)
    //         .catch(err => {
    //             console.log('err:', err)
    //             navigate('/')
    //         })
    // }

    function onSaveUserPref(ev) {
        ev.preventDefault()

        const formData = new FormData(ev.target)
        const updatedFields = Object.fromEntries(formData.entries())
        console.log("🚀 ~ onSaveUserPref ~ updatedFields:", updatedFields)

        const userToUpdate = {
            ...loggedinUser,
            fullname: updatedFields.fullname,
            prefs: {
                color: updatedFields.color,
                bgColor: updatedFields.bgColor
            }
        }
        save(userToUpdate)
            .then(() => navigate(`/user/${loggedinUser._id}`))
    }


    // console.log("🚀 ~ UserDetails ~ loggedinUser:", loggedinUser)
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


// function loadBugs() {
//     bugService.query({ userId: params.userId })
//         .then(res => {
//             setBugs(res.bugs)
//         })
//         .catch(err => showErrorMsg(`Couldn't load bugs - ${err}`))
// }

{/* <p>Activities: {loggedinUser.activities}</p> */ }
{/* {user.isAdmin && <p>Role: Admin</p>}
        {user.isAdmin && <NavLink to="/user" >See all users</NavLink>} */}