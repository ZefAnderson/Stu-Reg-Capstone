import { useEffect } from "react";
import { useState } from "react"

export default function UserListModal ({onClose, user}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setEmail(user.email);
            setFname(user.firstname);
            setLname(user.lastname);
            setPhone(user.telephone);
            setAddress(user.address);
        }
    }, [user]);

    const handleSubmit = async (user) => {
        try {
            const response = await fetch('/api/updateuser', {
                method: 'POST',
                body: JSON.stringify({ username: username, email: email, fname: fname, lname: lname, phone: phone, address: address, userid: user.userid }),
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                console.error('Error updating user data:', response.statusText);
                return;
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <div className="modalBackground">
            <div className="modalContent">
                <header>
                    Update User Info
                </header>
                <form id="myForm" 
                onSubmit={handleSubmit}
                >
                    <label>Username: 
                        <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    <label>Email: 
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>Phone Number: 
                        <input 
                            type="text"
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
                    <br />
                    <button type="submit">Update</button>
                </form>
                <button onClick={onClose}>Done</button>
            </div>
        </div>
    )
}