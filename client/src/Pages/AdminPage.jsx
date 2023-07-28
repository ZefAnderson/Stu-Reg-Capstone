import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom";

export function AdminPage() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('/api/userprofile');
            let parsedData = await data.json();
            console.log(parsedData);
            setUser(parsedData);
        }
        fetchData();
    }, []);

    return (
        <div>
            <header>
            Welcome, Firstname Lastname!
            </header>
            <div>
                <ul>User Summary
                    <li>{user.firstname} first name</li>
                    <li>{user.lastname} last name</li>
                    <li>{user.email} email</li>
                    <li>{user.telephone} phone number</li>
                    <li>{user.address} address</li>
                </ul>
            </div>
            <div>
                <ul>Manage Users
                    <li>C</li>
                    <li>R</li>
                    <li>U</li>
                    <li>D</li>
                </ul>
            </div>
        </div>
    )
}