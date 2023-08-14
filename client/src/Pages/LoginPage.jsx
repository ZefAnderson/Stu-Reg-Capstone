import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginModal from "../Modals/LoginModal";

export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [modalData, setModalData] = useState(false);

    const navigate = useNavigate()

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
            if (response.status === 200) {
                const data = await response.json();
                window.localStorage.setItem('token', data.token);
                if (data.isadmin) {
                    window.localStorage.setItem('role', 'admin')
                }
                const route = data.isadmin ? "/admin" : "/student";
                navigate(route);
            } else {
                setModalData(true);
            }
        } catch (error) {
            console.log("Error during login:", error);
        }
    }

    return (
        <div>
            <form className="input-form">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>Username:<br /></label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Password:<br /></label>                          </td>
                            <td>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <hr />
                <div className="actions">
                    <button><NavLink to='/registration'>Register...</NavLink></button>
                    <button class='ui-button' type="submit" onClick={handleLogin}>Login</button>
                </div>

                {modalData &&
                    <LoginModal onClose={() => setModalData(false)} />
                }

            </form>
        </div >
    )
}
