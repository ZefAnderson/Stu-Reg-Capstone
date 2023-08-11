import { useState } from "react";
import { NavLink } from "react-router-dom";
import RegistrationModal from "../Modals/RegistrationModal";

export function RegistrationPage() {
    const [modalData, setModalData] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/registration', {
                method: 'POST',
                body: JSON.stringify({ username: username, email: email, password: password, fname: fname, lname: lname, phone: phone, address: address }),
                headers: {
                    'Content-type': 'application/json'
                }
            });
        } catch (error) {
            console.log("error registering a new user")
        }

        setModalData(true);
        setUsername('');
        setEmail('');
        setPassword('');
        setFname('');
        setLname('');
        setPhone('');
        setAddress('');
    }

    return (
        <div>
            <header>
                Register New User
            </header>
            <form id="myForm" onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr><td className="label"><label>First Name:</label></td>
                            <td>
                                <input
                                    type="text"
                                    value={fname}
                                    onChange={(e) => setFname(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr><td className="label"><label>Last Name:</label></td>
                            <td>
                                <input
                                    type="text"
                                    value={lname}
                                    onChange={(e) => setLname(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr><td className="label"><label>Email:</label></td>
                            <td>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr><td className="label"><label>Username:</label></td>
                            <td>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr><td className="label"><label>Password:</label></td>
                            <td>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr><td className="label"><label>Phone Number:</label></td>
                            <td>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr><td className="label"><label>Address:</label></td>
                            <td>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Register</button>
            </form>
            {modalData &&
                <RegistrationModal onClose={() => setModalData(false)} />
            }
            <button>
                <NavLink to='/'>Return to Login Page</NavLink>
            </button>
        </div>
    )
}
