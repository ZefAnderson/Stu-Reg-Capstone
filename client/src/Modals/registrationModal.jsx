export default function RegistrationModal ({onClose}) {

    return (
        <div className="modalBackground">
            <div className="modalContent">
                <p>"You're all registered!  Please proceed to the login page"</p>
                <button onClick={onClose}>Done</button>
            </div>
        </div>
    )
}