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

    let courseRows = courseData.map((data) => {
        return (
            <tr>
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
                        <th>Course ID</th>
                    </tr>
                    {courseRows}
                </tbody>
            </table>
        </>
    )
}
