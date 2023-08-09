import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import EnrollmentModal from "../Modals/EnrollmentModal";

export function RegistrationManagementPage() {
    const [courseList, setCourseList] = useState([]);
    const [modalData, setModalData] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('/api/courses');
            let parsedData = await data.json();
            setCourseList(parsedData);
        }
        fetchData();
    }, []);

    const handleManager = (course) => {
        setSelectedCourse(course);
        setModalData(true);
    }

    let coursesTable = courseList.map((course) => {
        return (
            <tr key={course.courseid}>
                <td>{course.title}</td>
                <td>{course.maximum_capacity}</td>
                <td>#</td>
                <td>
                    <button onClick={() => handleManager(course)}>
                        Manage Enrollment
                    </button>
                </td>
            </tr>
        )
    })

    if(searchTerm) {
        coursesTable = courseList
        .filter(data => data.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((data) => {
            let courseid = data.courseid;
            return (
                <tr key={data.courseid}>
                    <td>{data.title}</td>
                    <td>{data.maximum_capacity}</td>
                    <td>#</td>
                    <td>
                        <button onClick={() => handleManager(data)}>
                            Manage Enrollment
                        </button>
                    </td>
                </tr>
            )
        })      
    }          

    return(
        <div>
            <header>
                Registration Management
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
                        <th>
                            Course
                        </th>
                        <th>
                            Capacity
                        </th>
                        <th>
                            Enrolled
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {coursesTable}
                </tbody>
            </table>
            {modalData &&
                <EnrollmentModal 
                    onClose={() => setModalData(false)} 
                    course={selectedCourse}
                />
            }
            <button>
                <NavLink to="/admin">
                    Go back
                </NavLink>
            </button>
        </div>
    )
}