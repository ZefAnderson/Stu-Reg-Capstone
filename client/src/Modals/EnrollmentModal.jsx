import { useEffect, useState } from "react";

export default function EnrollmentModal ({onClose, course}) {
    const [studentList, setStudentList] = useState([]);

    const handleUnenroll = async (course, student) => {
        const response = await fetch('/api/admindrop', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
            body:
                JSON.stringify({courseid: course.courseid, userid: student.userid})
        });
        if (!response.ok) {
                console.error('Error dropping course:', response.statusText);
                return;
        }
        console.log(student);
        const updatedStudentList = studentList.filter(s => s.userid !== student.userid);
        setStudentList(updatedStudentList);
    }

    useEffect(() => {
        const fetchStudents = async () => {
            if (course) {
                const students = await fetch(`/api/getstudents?courseid=${course.courseid}`);
                const parsedData = await students.json();
                setStudentList(parsedData);
            }
        };
        fetchStudents();
    }, [course]);

    let studentElements = null;

    if (studentList.length > 0) {
        studentElements = studentList.map((student) => (
            <li key={student.userid}>
                {student.firstname} {student.lastname}
                <button onClick={() => handleUnenroll(course, student)}>
                    Unenroll
                </button>
            </li>
        ));
    } else {
        studentElements = <li key='no-students'>No students enrolled.</li>;
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