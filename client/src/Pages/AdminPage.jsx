import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom";

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
            </div>
            <div>
                <ul>Manage Users
                    <li>C</li>
                    <li>R</li>
                    <li>U</li>
                    <li>D</li>
                </ul>
            </div>
            <button onClick={handleLogout}>
                    Log Out
                </button>
        </div>
    )
}