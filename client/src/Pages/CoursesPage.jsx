import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom";

export function CoursesPage() {
    const [courseData, setCourseData] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    // }

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('/api/courses');
            let parsedData = await data.json();
            console.log(parsedData);
            setCourseData(parsedData);
        }
        fetchData();
    }, []);

    let coursesTable = courseData.map((data) => {
        return (
            <tr>
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
        <div>
            <header>
                Courses
            </header>
            {/* <form on Submit={handleSubmit}>
                <label>Find course by name:
                    <input
                        type="text"
                        value={searchKey}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                </label>
                <button type="submit">Find</button>
            </form> */}
            <table>
                <tr>
                    <th>Course ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Schedule</th>
                    <th>Classroom</th>
                    <th>Capacity</th>
                    <th>Credit Hours</th>
                    <th>Tuition</th>
                </tr>
                {coursesTable}
            </table>
            <button>
                <NavLink to='/student'>Return to Profile</NavLink>
            </button>
        </div>
    );
};

