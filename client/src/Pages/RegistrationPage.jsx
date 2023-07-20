import { useState, useEffect } from "react";

export function RegistrationPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/registration', {
            method: 'POST',
            body: JSON.stringify({ username: username, email: email, password: password, fname: fname, lname: lname, phone: phone, address: address }),
            headers: {
                'Content-type': 'application/json'
            }
        })
    }

    return (
        <div>
            <header>
                Register New User
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
                <label>Email: 
                    <input 
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <label>First Name: 
                    <input 
                        type="text" 
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                    />
                </label>
                <br />
                <label>Last Name: 
                    <input 
                        type="text" 
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                    />
                </label>
                <br />
                <label>Phone Number: 
                    <input 
                        type="number" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </label>
                <br />
                <label>Address: 
                    <input 
                        type="text" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
            </form>
            <button type="submit">Register</button>
        </div>
    )
}