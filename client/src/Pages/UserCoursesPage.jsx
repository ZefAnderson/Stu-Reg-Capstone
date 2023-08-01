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
                <td>{data.course_id}</td>
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
                    </tr>
                    {courseRows}
                </tbody>
            </table>
        </>
    )
}
