export default function CourseFullModal ({onClose}) {

    return(
        <div className="modalBackground">
            <div className="modalContent">
                <p>The selected course is full</p>
                <button onClick={onClose}>Done</button>
            </div>
        </div>
    )
}