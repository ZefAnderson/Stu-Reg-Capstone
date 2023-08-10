import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom";

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
                <p>User Summary</p>
                <ul>
                    <li>Username: {user[0]?.username}</li>
                    <li>First Name: {user[0]?.firstname}</li>
                    <li>Last Name: {user[0]?.lastname}</li>
                    <li>Email: {user[0]?.email}</li>
                    <li>Telephone: {user[0]?.telephone}</li>
                    <li>Address: {user[0]?.address}</li>
                </ul>
                <button>
                    <NavLink to='/updateuser'>Edit Profile</NavLink>
                </button>
            </div>
            <div>
                <button>
                    <NavLink to='/usercourses'>My Courses</NavLink>
                </button>
            </div>
            <div>
                <button onClick={handleLogout}>
                    Log Out
                </button>
            </div>
        </div>
    )
}
