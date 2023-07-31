import { useState } from "react";
import { NavLink } from "react-router-dom";
import LoginModal from "../Modals/LoginModal";

export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [modalData, setModalData] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ username: username, password: password }),
                headers: {
                    "Content-type": "application/json"
                }
            })
            if (response.status === 200){
                const data = await response.json();
                window.localStorage.setItem('token', data.token)
                window.location.href = (data.isadmin) ? "/adminpage" : "/studentpage";
            } else {
                setModalData(true);
            }
        }catch (error) {
            console.log("Error during login:", error);
        }
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

                {modalData &&
                    <LoginModal onClose={() => setModalData(false)} />
                }
                
            </form>
        </div >
    )
}
