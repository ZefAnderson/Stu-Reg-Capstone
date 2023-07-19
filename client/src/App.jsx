import { useState, useEffect } from 'react';
import { ReactDOM } from 'react-dom/client';
// import { AdminPage } from './Pages/AdminPage';
// import { CoursesPage }  from './Pages/CoursesPage';
// import { RegistrationPage } from './Pages/RegistrationPage';
// import { UserProfilePage } from './Pages/UserProfilePage';
// import './App.css'

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('reached handleSubmit');
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({username: username, password: password}),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 200) {
//          setData(res.body);
        } else {
          const error = new Error(res.error);
          throw error;
        }

      })
      .catch(err => {
        console.error(err);
        alert(`Error logging in please try again ${err}`);
      });
  }

  return (
    <>
      <div>
      </div>
      <h1>Log in or create a new user</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>password
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type='submit'>Login</button>
      </form >
      <button>
        Create New User
      </button>
      <div className="card">
        <p>
          <h1>{!data ? "Loading..." : data}</h1>
        </p>
      </div>
    </>
  )
}
export default App
