import { useState, useEffect } from "react";

export function RegistrationPage() {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch("/api/registration")
          .then((res) => res.json())
          .then((data) => setData(data.message));
      }, []);

    return (
        <div>
            <header>
                Register New User
            </header>
            <form>
                <label for="username">Username: </label>
                <input type="text" id="username"></input><br></br>
                <label for="email">Email: </label>
                <input type="text" id="email"></input><br></br>
                <label for="password">Password: </label>
                <input type="text" id="password"></input><br></br>
                <label for="fname">First Name: </label>
                <input type="text" id="fname"></input><br></br>
                <label for="lname">Last Name: </label>
                <input type="text" id="lname"></input><br></br>
                <label for="phone">Phone Number: </label>
                <input type="number" id="phone"></input><br></br>
                <label for="address">Address: </label>
                <input type="text" id="address"></input>
            </form>
            <button>
                Submit
            </button>
        </div>
    )
}