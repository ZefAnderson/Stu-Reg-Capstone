export default function RegisterCourseModal ({onClose}) {

    return (
        <div className="modalBackground">
            <div className="modalContent">
                <p>"Registration Success!  This course has been added to your schedule"</p>
                <button onClick={onClose}>Done</button>
            </div>
        </div>
    )
}