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
            <form onSubmit={handleSubmit}>
                <label>Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label>Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type='submit'>Login</button>
            </form>
            <button type='submit'>Register New User</button>
        </div>
    )
}