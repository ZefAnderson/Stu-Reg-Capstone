export default function CourseRegisterErrorModal ({onClose}) {

    return (
        <div className="modalBackground">
            <div className="modalContent">
                <p>"You are already registered for this class"</p>
                <button onClick={onClose}>Done</button>
            </div>
        </div>
    )
}