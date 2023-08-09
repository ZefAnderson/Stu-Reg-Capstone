import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom";

export function AdminPage() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('/api/userprofile', {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`
                }
            });
            let parsedData = await data.json();
            console.log(parsedData);
            setUser(parsedData);
        }
        fetchData();
    }, []);

    const userData = user?.map( (user) => {
        return (
        <ul key={user.userid}>User Summary
            <li key={user.username}>{user.username}</li>
            <li key={user.firstname}>{user.firstname}</li>
            <li key={user.lastname}>{user.lastname}</li>
            <li key={user.email}>{user.email}</li>
            <li key={user.telephone}>{user.telephone}</li>
            <li key={user.address}>{user.address}</li>
        </ul>
        )
    })

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <div>
            <header>
            Welcome, {user[0]?.firstname}!
            </header>
            <div>
                {userData}
            </div>
            <button>
                <NavLink to='/updateuser'>Update Profile</NavLink>
            </button>
            <button>
                <NavLink to='/userlist'>Manage Users</NavLink>
            </button>
            <button>
                <NavLink to='/admincourses'>Manage Courses</NavLink>
            </button>
            <button>
                <NavLink to='/registrationmanagement'>Manage Registration</NavLink>
            </button>

            <button onClick={handleLogout}>
                    Log Out
                </button>
        </div>
    )
}