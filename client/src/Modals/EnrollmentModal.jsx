import { useEffect, useState } from "react";

export default function EnrollmentModal ({onClose, course}) {
    const [studentList, setStudentList] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

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
        const updatedStudentList = studentList.filter(s => s.userid !== student.userid);
        setStudentList(updatedStudentList);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/getuserid?firstname=${firstName}&lastname=${lastName}`);
        const data = await response.json();
        if (!response.ok || data.length === 0) {
            alert('Error: Student not found in the database.');
            return;
        }        
        const userid = data[0].userid; 
    
        const enrollmentResponse = await fetch('/api/registerforcourse', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ courseid: course.courseid, userid: userid })
        });
        if (!enrollmentResponse.ok) {
            console.error('Error enrolling student:', enrollmentResponse.statusText);
            return;
        }
        const students = await fetch(`/api/getstudents?courseid=${course.courseid}`);
        const parsedData = await students.json();
        setStudentList(parsedData);
        setFirstName('');
        setLastName('');
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
                <p>Enroll Another Student</p>
                <form onSubmit={handleSubmit}>
                    <label> First Name
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>
                    <label> Last Name
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                    <button type="submit">Enroll</button>
                </form>
                <button onClick={onClose}>Done</button>
            </div>
        </div>
    )
}