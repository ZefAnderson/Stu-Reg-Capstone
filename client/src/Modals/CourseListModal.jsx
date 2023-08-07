import { useEffect, useState } from "react";

export default function CourseListModal ({onClose, course}) {
    const [courseid, setCourseid] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [schedule, setSchedule] = useState('');
    const [classroom, setClassroom] = useState('');
    const [capacity, setCapacity] = useState('');
    const [creditHours, setCreditHours] = useState('');
    const [tuition, setTuition] = useState('');
    const [currid, setCurrid] = useState('');

    useEffect(() => {
        if (course) {
            setCourseid(course.courseid);
            setTitle(course.title);
            setDescription(course.description);
            setSchedule(course.schedule);
            setClassroom(course.classroom_number);
            setCapacity(course.maximum_capacity);
            setCreditHours(course.credit_hours);
            setTuition(course.tuition_cost);
            setCurrid(course.courseid);
        }
    }, [course]);

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/courseupdate', {
                method: 'POST',
                body: JSON.stringify({ 
                    courseid: courseid, 
                    title: title, 
                    description: description, 
                    schedule: schedule, 
                    classroom: classroom, 
                    capacity: capacity, 
                    creditHours: creditHours, 
                    tuition: tuition,
                    currid: currid 
                }),
                headers: {
                    'Content-type': 'application/json',
                }
            });
            if (!response.ok) {
                console.error('Error updating course data:', response.statusText);
                return;
            }
        } catch (error) {
            console.error('Error updating course data:', error);
        }
    }

    return (
        <div className="modalBackground">
            <div className="modalContent">
                <header>
                    Update Course Info
                </header>
                <form id="myForm"
                    onSubmit={handleSubmit}
                >
                    <label>Course ID:
                        <input
                        type="text"
                        value={courseid}
                        onChange={(e) => setCourseid(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>Title: 
                        <input 
                            type="text" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>Description: 
                        <input 
                            type="text" 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>Schedule: 
                        <input 
                            type="text" 
                            value={schedule}
                            onChange={(e) => setSchedule(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>Classroom Number: 
                        <input 
                            type="text" 
                            value={classroom}
                            onChange={(e) => setClassroom(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>Maximum Capacity: 
                        <input 
                            type="integer"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>Credit Hours: 
                        <input 
                            type="integer"
                            value={creditHours}
                            onChange={(e) => setCreditHours(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>Tuition Cost: 
                        <input 
                            type="money"
                            value={tuition}
                            onChange={(e) => setTuition(e.target.value)}
                        />
                    </label>
                    <br />
                    <button type="submit">Update</button>
                </form>
                <button onClick={onClose}>Done</button>
            </div>
        </div>
    )
}