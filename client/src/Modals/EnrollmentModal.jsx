import { useEffect, useState } from "react";

export default function EnrollmentModal ({onClose, course}) {
    const [studentList, setStudentList] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            if (course && course.courseid) {
                const students = await fetch(`/api/getstudents?courseid=${course.courseid}`)
                const parsedData = await students.json();
                setStudentList(parsedData);
            }
        }
        fetchStudents();
    }, [course]);

    let studentElements = null;

    if (studentList.length > 0) {
        studentElements = studentList.map((user) => (
            <li key={user.userid}>
                {user.firstname} {user.lastname}
                <button>Unenroll</button>
            </li>
        ));
    } else {
        studentElements = <li key='key'>No students enrolled.</li>;
    }

    return (
        <div className="modalBackground">
            <div className="modalContent">
                <header>
                    {course ? `Students Enrolled In ${course.title}` : "No Course Selected"}                
                </header>
                <ul>
                    {studentElements}
                </ul>
                <button onClick={onClose}>Done</button>
            </div>
        </div>
    )
}