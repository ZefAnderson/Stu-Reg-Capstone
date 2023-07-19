import { useState, useEffect } from 'react'
// import { AdminPage } from './Pages/AdminPage';
// import { CoursesPage }  from './Pages/CoursesPage';
// import { RegistrationPage } from './Pages/RegistrationPage';
// import { UserProfilePage } from './Pages/UserProfilePage';
// import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  
  return (
    <>
      <div>
      </div>
      <h1>Log in or create a new user</h1>
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