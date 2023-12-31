import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import CourseListModal from "../Modals/CourseListModal";
import AddCourseModal from "../Modals/AddCourseModal";

export function AdminCoursesPage() {
    const [courseList, setCourseList] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);


    useEffect(() => {
        const fetchCourseList = async () => {
            const courseData = await fetch('/api/courses');
            let courseParsedData = await courseData.json();
            setCourseList(courseParsedData);
        }
        fetchCourseList();
    }, []);

    const handleEdit = (course) => {
        setSelectedCourse(course);
        setEditModal(true);
    }

    const handleAdd = () => {
        setAddModal(true);
    }

    const handleClose = () => {
        setEditModal(false);
        setAddModal(false);
    }

    const handleDelete = async (courseid) => {
        try {
            const response = await fetch('/api/coursedelete', {
                method: 'POST',
                body: JSON.stringify({ courseid: courseid }),
                headers: {
                    'Content-type': 'application/json',
                }
            })
            if (response.ok) {
                setCourseList(prevCourseList => prevCourseList.filter(course => course.courseid !== courseid));
            } else {
                console.error('Error deleting user data:', response);
            }
        } catch (error) {
            console.error('Error deleting user data:');
        }
    }

    let courseTable = courseList.map((data) => {
        let courseid = data.courseid;

        return (
            <tr key={courseid}>
                <td className="admin-button-cell">
                    <button onClick={() => handleEdit(data)}>Edit</button>
                </td>
                <td className="admin-button-cell">
                    <button onClick={() => handleDelete(courseid)}>Delete</button>
                </td>
                <td>{data.title}</td>
                <td>{data.description}</td>
                <td>{data.schedule}</td>
                <td>{data.maximum_capacity}</td>
                <td>{data.tuition_cost}</td>
                <td>
                </td>
            </tr>
        )
    })

    if (searchTerm) {
        courseTable = courseList
            .filter(course => course.title.toLowerCase().includes(searchTerm.toLowerCase()))
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
            <table className="data-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Schedule</th>
                        <th>Capacity</th>
                        <th>Tuition Cost</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {courseTable}
                </tbody>
            </table>
            <div>
                <button onClick={handleAdd}>
                    Add New Course
                </button>
                <button>
                    <NavLink to='/admin'>Go Back</NavLink>
                </button>
            </div>
            {editModal &&
                <CourseListModal
                    course={selectedCourse}
                    onClose={handleClose} />
            }
            {addModal &&
                <AddCourseModal
                    onClose={handleClose} />
            }

        </div>
    )
}
