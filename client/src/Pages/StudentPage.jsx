import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom";

export function StudentPage() {
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

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    return (
        <div>
            <header>
                Welcome, {user[0]?.firstname}!
            </header>
            <div>
                {userData}
                <button>
                    <NavLink to='/updateuserpage'>Update Info</NavLink>
                </button>
            </div>
            <div>
                <h3>Simplified Schedule</h3>
            </div>
            <div>
                <h3>tuition detail</h3>
            </div>
            <div>
                <button>link to calendar</button>
                <button>
                    <NavLink to='/courses'>Course lookup</NavLink>
                </button>
                <button onClick={handleLogout}>
                    Log Out
                </button>
            </div>
        </div>
    )
}