import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom";

export function UpdateUserPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [userid, setUserid] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const tokenParts = token.split('.');
                const encodedPayload = tokenParts[1];
                const decodedPayload = atob(encodedPayload);
                const payload = JSON.parse(decodedPayload);

                const defaultUsername = payload.username;
                const defaultEmail = payload.email;
                const defaultFname = payload.firstname;
                const defaultLname = payload.lastname;
                const defaultPhone = payload.telephone;
                const defaultAddress = payload.address;
                const defaultUserid = payload.userId;

                setUsername(defaultUsername);
                setEmail(defaultEmail);
                setFname(defaultFname);
                setLname(defaultLname);
                setPhone(defaultPhone);
                setAddress(defaultAddress);
                setUserid(defaultUserid);
            } catch (error) {
                console.error('Error decoding or parsing token:', error);
            }
        }
    }, []);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = window.localStorage.getItem('token');
    
            if (!token) {
              console.error('No token found in local storage');
              return;
            }
        
            const isUserAdmin = isTokenAdmin(token);

            const response = await fetch('/api/updateuser', {
                method: 'POST',
                body: JSON.stringify({ username: username, email: email, fname: fname, lname: lname, phone: phone, address: address }),
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                console.error('Error updating user data:', response.statusText);
                return;
            }
            const route = isUserAdmin ? "/admin" : "/student";
            navigate(route);            
    } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const handleReturn = () => {
        const token = window.localStorage.getItem('token');
        const isUserAdmin = isTokenAdmin(token);
        const route = isUserAdmin ? "/admin" : "/student";
        navigate(route);            
    }

    const isTokenAdmin = (token) => {
        try {
          const tokenPayloadBase64 = token.split('.')[1];
          const tokenPayloadJSON = atob(tokenPayloadBase64);
          const tokenPayload = JSON.parse(tokenPayloadJSON);
          return tokenPayload?.isadmin || false;
        } catch (error) {
          console.error('Error parsing token:', error);
          return false;
        }
      };
      

    return (
        <div>
            <header>
                Update User Info
            </header>
            <form id="myForm" onSubmit={handleSubmit}>
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
                <button onClick={handleReturn}>
                    Go Back
                </button>
            </form>
        </div>
    )
}