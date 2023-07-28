import { useState } from "react";
import { NavLink } from "react-router-dom";
export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                window.localStorage.setItem('token', data.token)
                window.location.href = (data.isadmin) ? "/adminpage" : "/studentpage";
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
                <button>
                    <NavLink to='/registration'>Register a New User</NavLink>
                </button>
            </form>
        </div >
    )
}
