import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import RegisterCourseModal from "../Modals/RegisterCourseModal";
import CourseRegisterErrorModal from "../Modals/CourseRegisterErrorModal";

export function CoursesPage() {
    const [courseData, setCourseData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalData, setModalData] = useState(false);
    const [errorModal, setErrorModal] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('/api/courses');
            let parsedData = await data.json();
            console.log(parsedData);
            setCourseData(parsedData);
        }
        fetchData();
    }, []);

    const navigate = useNavigate();

    async function handleRegister(courseid) {
        const token = localStorage.getItem('token');
        const tokenParts = token.split('.');
        const encodedPayload = tokenParts[1];
        const decodedPayload = atob(encodedPayload);
        const payload = JSON.parse(decodedPayload);

        const userId = payload.userid;
        console.log(`userId: ${userId}`);

        const response = await fetch('/api/registerforcourse', {
            method: 'POST',
            body: JSON.stringify({ userid: userId, courseid: courseid }),
            headers: {
                'Content-type': 'application/json'
            }
        });
        if (!response.ok) {
            console.error('Error updating user data:', response.statusText);
            setErrorModal(true);
            return;
        }
        setModalData(true);
        navigate("/courses");

    }

    let coursesTable = courseData.map((data) => {
        return (
            <tr key={data.courseid}>
                <td>
                    <button onClick={() => handleRegister(data.courseid)}>
                        Register
                    </button>
                </td>
                <td>{data.courseid}</td>
                <td>{data.title}</td>
                <td>{data.description}</td>
                <td>{data.schedule}</td>
                <td>{data.classroom_number}</td>
                <td>{data.maximum_capacity}</td>
                <td>{data.credit_hours}</td>
                <td>{data.tuition_cost}</td>
            </tr>
        )
    })

    if(searchTerm) {
        coursesTable = courseData
        .filter(data => data.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((data) => {
            let courseid = data.courseid;

            return (
                <tr key={courseid}>
                    <td>
                        <button onClick={() => handleRegister(data.courseid)}>
                            Register
                        </button>
                    </td>
                    <td>{data.courseid}</td>
                    <td>{data.title}</td>
                    <td>{data.description}</td>
                    <td>{data.schedule}</td>
                    <td>{data.classroom_number}</td>
                    <td>{data.maximum_capacity}</td>
                    <td>{data.credit_hours}</td>
                    <td>{data.tuition_cost}</td>
                </tr>
            )
        })
    }

    return (
        <div>
            <header>
                Courses
            </header>
            <form>
                <label> Search by Course Title
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </label>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>Course ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Schedule</th>
                        <th>Classroom</th>
                        <th>Capacity</th>
                        <th>Credit Hours</th>
                        <th>Tuition</th>
                    </tr>
                </thead>
                <tbody>                    
                    {coursesTable}
                </tbody>
            </table>
            {modalData &&
                <RegisterCourseModal onClose={() => setModalData(false)} />
            }
            {errorModal &&
                <CourseRegisterErrorModal onClose={() => setErrorModal(false)} />
            }

            <button>
                <NavLink to='/student'>Return to Profile</NavLink>
            </button>
        </div>
    );
};
