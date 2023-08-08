import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom";

export function UserCoursesPage() {
    const [courseData, setCourseData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalCreditHours, setTotalCreditHours] = useState(0);
    const [totalTuitionCost, setTotalTuitionCost] = useState(0);


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

    const handleDrop = async (courseid, credit_hours, tuition_cost) => {
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
        const droppedCourse = courseData.find(course => course.courseid === courseid);
        setTotalCreditHours(totalCreditHours - credit_hours);
        setTotalTuitionCost(totalTuitionCost - parseFloat(droppedCourse.tuition_cost.replace(/[^0-9.-]+/g, '')));
    }

    useEffect(() => {
        const initialCreditHours = courseData.reduce((total, course) => total + course.credit_hours, 0);
        const initialTuitionCost = courseData.reduce((total, course) => total + parseFloat(course.tuition_cost.replace(/[^0-9.-]+/g, '')), 0);
        setTotalCreditHours(initialCreditHours);
        setTotalTuitionCost(initialTuitionCost);
    }, [courseData]);    

    let courseRows = courseData.map((data) => {
        return (
            <tr key={data.courseid}>
                <td>
                    <button onClick={() => handleDrop(data.courseid, data.credit_hours, data.tuition_cost)}>
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

    if(searchTerm) {
        courseRows = courseData
        .filter(data => data.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((data) => {
            let courseid = data.courseid;

            return (
                <tr key={courseid}>
                    <td>
                        <button onClick={() => handleEdit(data)}>Edit</button>
                    </td>
                    <td>{data.title}</td>
                    <td>{data.description}</td>
                    <td>{data.schedule}</td>
                    <td>{data.maximum_capacity}</td>
                    <td>{data.tuition_cost}</td>
                    <td>
                    <button onClick={() => handleDelete(courseid)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <>
            <header>User Courses</header>
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
            <div>
                <p>Total Credit Hours Enrolled: {totalCreditHours}</p>
                <p>Total Tuition Cost: ${totalTuitionCost}</p>
            </div>
            <button>
                <NavLink to='/student'>Return to Profile</NavLink>
            </button>

        </>
    )
}
