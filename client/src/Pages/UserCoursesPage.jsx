import { useState, useEffect } from "react"

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

    const handleDrop = async (course_id) => {
        const response = await fetch('/api/dropcourse', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            },
            body:
                JSON.stringify({course_id: course_id})
        });
        if (!response.ok) {
            console.error('Error dropping course:', response.statusText);
            return;
        }
        let parsedData = await response.json();
        // console.log(parsedData);
        setCourseData(parsedData);
    }

    let courseRows = courseData.map((data) => {
        return (
            <tr>
                <td>
                    <button onClick={() => handleDrop(data.course_id)}>
                        Drop
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
                        <th>Capacity</th>
                        <th>Credits</th>
                        <th>Tuition</th>
                    </tr>
                    {courseRows}
                </tbody>
            </table>
        </>
    )
}
