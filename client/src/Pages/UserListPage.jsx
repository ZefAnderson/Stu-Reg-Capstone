import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"

export function UserListPage() {
    const[userList, setUserList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('/api/userlist');
            let parsedData = await data.json();
            setUserList(parsedData);
        }
        fetchData();
    }, []);
    
    const handleDelete = async (userid) => {
        try {
            const response = await fetch('/api/delete', {
                method: 'POST',
                body: JSON.stringify({ userid: userid }),
                headers: {
                    'Content-type': 'application/json',
                }
            })
        } catch (error) {
            console.error('Error deleting user data:');
        }
    }
    let usersTable = userList.map((data) => {
        let userid = data.userid;
        let createDate = new Date(data.createdate);
        let month = String(createDate.getMonth() + 1).padStart(2, '0');
        let day = String(createDate.getDate()).padStart(2, '0');
        let year = String(createDate.getFullYear()); 
        let mmddyyyy = month + '/' + day + '/' + year;  
        return (
            <tr key={userid}>
                <td>
                    <button>Edit</button>
                </td>
                <td>{data.username}</td>
                <td>{data.firstname}</td>
                <td>{data.lastname}</td>
                <td>{data.email}</td>
                <td>{data.isadmin? 'Yes' : 'No'}</td>
                <td>{data.telephone}</td>
                <td>{data.address}</td>
                <td>{mmddyyyy}</td>
                <td>
                    <button onClick={() => handleDelete(userid)}>Delete</button>
                </td>
            </tr>
        )
    })


    return (
        <div>
            <header>
                Users
            </header>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Admin?</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Date Created</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {usersTable}
                </tbody>
            </table>
            <button>
                <NavLink to='/admin'>Return to Profile</NavLink>
            </button>

        </div>
    )
}