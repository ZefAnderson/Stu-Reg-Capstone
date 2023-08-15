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

    const userData = user?.map((user) => {
        return (

            <>
                <tr key={user.firstname}><td className="label">First Name:</td><td className="value">{user.firstname}</td></tr>
                <tr key={user.lastname}><td className="label">Last Name:</td><td className="value">{user.lastname}</td></tr>
                <tr key={user.email}><td className="label">Email:</td><td className="value">{user.email}</td></tr>
                <tr key={user.username}><td className="label">Username:</td><td className="value">{user.username}</td></tr>
                <tr key={user.telephone}><td className="label">Telephone:</td><td className="value">{user.telephone}</td></tr>
                <tr key={user.address}><td className="label">Address:</td><td className="value">{user.address}</td></tr>
            </>
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
            <form className="profile-form">
            <div className="user-profile">

                <div className="center-contents">
                    <table class="profile-table">
                        <thead>
                            <tr><td colspan='2'>
                                <form>
                                    <label>Student User Summary</label>
                                </form>
                            </td></tr>
                        </thead>
                        <tbody>
                            {userData}
                        </tbody>
                    </table>
                </div>
                <div className="profile-buttons">
                    <button onClick={handleLogout}>Log Out</button>
                    <button><NavLink to='/usercourses'>My Courses</NavLink></button>
                </div>
            </div>
            </form>
        </div>
    )
}
