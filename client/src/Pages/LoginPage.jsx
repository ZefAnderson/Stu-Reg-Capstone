import { useState, useEffect } from "react";
export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
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
                <label>Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br />
                </label>
                <label>Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                </label>
                <button type="submit" onClick={handleLogin}>Login</button>
                <button type="button" onClick={() => {
                    window.location.href = '/registration';
                }} >Register a new User
                </button>
            </form>
        </div >
    )
}
