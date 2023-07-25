import { useState, useEffect } from "react";
export function HomePage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                'Content-type': 'application/json'
            }
        })
    }

    return (
        <div>
            <header>
                Login
            </header>
            <form>
                <label>Username:</label>
                <input type="text" id="username"></input><br />
                <label>Password:</label>
                <input type="password" id="password"></input><br />
                <button type="submit">Login</button>
                <button type="button" onClick={() => {
                    window.location.href = '/registration';
                }} >Register a new User
                </button>
            </form>
        </div>
    )
}