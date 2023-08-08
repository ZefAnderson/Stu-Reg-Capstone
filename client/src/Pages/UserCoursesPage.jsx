import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom";

export function UserCoursesPage() {
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        const fetchUserCourses = async () => {
            const response = await fetch('/api/usercourses', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                console.error('Error updating user data:', response.statusText);
                return;
            }
            let parsedData = await response.json();
            console.log(parsedData);
            setCourseData(parsedData);
        }
        fetchUserCourses();
    }, []);

    const handleDrop = async (courseid) => {
        const response = await fetch('/api/dropcourse', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            },
            body:
                JSON.stringify({course_id: courseid})
        });
        if (!response.ok) {
            console.error('Error dropping course:', response.statusText);
            return;
        }
        let parsedData = await response.json();
        setCourseData(parsedData);
    }

    let courseRows = courseData.map((data) => {
        return (
            <tr key={data.courseid}>
                <td>
                    <button onClick={() => handleDrop(data.courseid)}>
                        Drop
                    </button>
                </td>
                <td>{data.courseid}</td>
                <td>{data.title}</td>
                <td>{data.description}</td>
                <td>{data.schedule}</td>
                <td>{data.classroom_number}</td>
                <td>{data.credit_hours}</td>
                <td>{data.tuition_cost}</td>
            </tr>
        )
    })

    return (
        <>
            <header>User Courses</header>
            <table>
                <tbody>
                    <tr>
                        <th>Action</th>
                        <th>Course ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Schedule</th>
                        <th>Room Number</th>
                        <th>Credit Hours</th>
                        <th>Tuition</th>
                    </tr>
                    {courseRows}
                </tbody>
            </table>
            <button>
                <NavLink to='/student'>Return to Profile</NavLink>
            </button>

        </>
    )
}
