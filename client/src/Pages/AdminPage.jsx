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

    const userData = user?.map((user) => {
        return (
            <tbody key={user.userid}>
                <tr key={user.firstname}>
                    <td className="label">First Name:</td>
                    <td className="value">{user.firstname}</td>
                </tr>
                <tr key={user.lastname}>
                    <td className="label">Last Name:</td>
                    <td className="value">{user.lastname}</td>
                </tr>
                <tr key={user.email}>
                    <td className="label">Email:</td>
                    <td className="value">{user.email}</td>
                </tr>
                <tr key={user.username}>
                    <td className="label">Username:</td>
                    <td className="value">{user.username}</td>
                </tr>
                <tr key={user.telephone}>
                    <td className="label">Telephone:</td>
                    <td className="value">{user.telephone}</td>
                </tr>
                <tr key={user.address}>
                    <td className="label">Address:</td>
                    <td className="value">{user.address}</td>
                </tr>
            </tbody>
        )
    });

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
            <div className="center-contents">
                <form className="profile-form">
                    <table className="profile-table">
                        <thead>
                            <tr>
                                <td colSpan='2'>
                                    <label>Admin User Summary</label>
                                </td>
                            </tr>
                        </thead>
                        {userData}
                    </table>
                </form>
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
